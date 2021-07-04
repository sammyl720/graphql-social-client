import React, { useEffect, useReducer } from 'react';
import Context from './Context'
import reducer from './reducer';
import { LOGOUT, SET_ERROR, SET_LOADING, SET_MESSAGE, SET_OWNER, SET_TOKEN, SET_USER } from './types';
import {  useMutation, useLazyQuery, gql } from '@apollo/client'
import client from '../../apollo';
import {addUserPost} from '../../caching/index'
import LOGIN from '../../graphql/mutations/login'
import SIGN_UP from '../../graphql/mutations/signup'
import ADD_POST from '../../graphql/mutations/addPost';
import TOGGLE_LIKE_POST from '../../graphql/mutations/toggleLikePost';
import DELETE_POST from '../../graphql/mutations/deletePost';
import ME from '../../graphql/queries/me'
import { POST_FRAGMENT } from '../../graphql/fragments' 


function Provider ({ children }) {
  let token = null;
  useEffect(() => {
    if(window != undefined && window.localStorage.token){
      token = window.localStorage.token;
    }
  }, [])
  const initialState = {
    token,
    loading: false,
    error: null,
    message: null,
    me: null,
    user: null
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  // dispatch functions
  // set token
  const setToken = async (token) => {
    if(!window.localStorage.token){
      window.localStorage.setItem('token', token);
    } 
    dispatch({ type: SET_TOKEN, payload: token })
  }


  /// set current user
  const [loadMe] = useLazyQuery(ME, {
    onCompleted: (data) => {
      if(data.me.__typename == "User"){
        setOwner(data.me)
      } else {
        setError(data.me.message)
        setLoading(false)
      }
    },
    onError: (e) => {
      console.log(e)
      setError(e.message)
      setLoading(false)
    }
  })
  const setLoading = (loading) => {
    if(typeof loading !== 'boolean') return;
    dispatch({ type: SET_LOADING, payload: loading })
  }

  const setOwner = (owner) => {
    console.log('setting owner')
    if(!owner.name){
      console.log('no userr')
      setError("user not found")
      return null;
    }
    console.log('checking token')
    if(!state.token) return null;
    dispatch({ type: SET_OWNER, payload: owner })
  }

  // login
  const [login] = useMutation(LOGIN,
    {
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {
        if(data.login.errors){
          setError(data.login.error)
        } else if(data.login.token){
          setMessage("Succesfuly signed in")
          setToken(data.login.token)
        }
        setLoading(false)
      },
      onError: (error) => {
        setError(error.message)
        console.log(error)
        setLoading(false)
      },
      
  })



  const [signup] = useMutation(SIGN_UP,
    {
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {
        // console.log(data)
        if(data.signup.errors){
          console.log("errors")
          setError(data.signup.message)
        } else if(data.signup.token){
          setMessage("Succesfuly signed up")
          setToken(data.signup.token)
        }
        setLoading(false)
      },
      onError: (error) => {
        setError(error.message)
        console.log(error)
        setLoading(false)
      },
      
  })

  // createPost
  const [addPost] = useMutation(ADD_POST, {
    onCompleted: (data) => {
      if(data.addPost.errors){
        setLoading(false)
        setError(data.addPost.message)
      } else {
        console.log('you posted')
        setMessage(`You posted '${data.addPost.text}.'`)
        setLoading(false)
      }
    },
    onError: (error) => {
      setLoading(false);
      setError(error.message || '')
      console.log(error);;
    },
    update(cache, {data}) {
      if(data.addPost.id){
        const { addPost: newPost } = data;
        const { me: { posts: existingPosts } } = cache.readQuery({ query: ME })
        loadMe()
      }
    }
  });
  

  // like post 
  const [toggleLikePost] = useMutation(TOGGLE_LIKE_POST, {
    onCompleted: (data) => {
      console.log(data.toggleLikePost)
      // status means that mutation did not cencounter any errors on server
      if(data.toggleLikePost.status){
        // update the ui
        const { status } = data.toggleLikePost;
        console.log(status)
        loadMe()
      } else {
        setError(data.toggleLikePost.message)
      }
    },
    onError: (error) => {
      setError(error.message)
      console.log(error)
    },
    update: (cache, { data }) => {
      if(data.toggleLikePost.status){
        console.log('ewpm')
        let idRgx = /\((?<postId>[a-f0-9]+)\)/i
        let unliked = /unliked/.test(data.toggleLikePost.status)
        console.log(data)
        const id = data.toggleLikePost.status.match(idRgx).groups?.postId
        if(id){
          const identifier = `Post:${id}`;
          cache.modify({
            id: identifier,
            fields: {
              likes(likers, { readField }) {
                if(!unliked){
                  return [...likers, { __typename: 'User', id: state.me.id, name: state.me.name}]
                } else {
                  return likers.filter(liker => readField('id', liker) !== state.me.id)
                }
              },
              likeCount(prevCount) {
                return unliked ? prevCount - 1: prevCount + 1
              }
            }
          })
          loadMe()
        }
      }
    }
  })

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: (data) => {
      if(data.deletePost.status){
        setMessage(data.deletePost.status)
      } else if(data.deletePost.message){
        setError(data.deletePost.message)
      }
    },
    onError: (e) => console.log(e),
    update(cache, {data}) {
      let idRgx = /\((?<postId>[a-f0-9]+)\)/i
      if(data.deletePost.status){
        const id = data.deletePost.status.match(idRgx).groups?.postId
        if(id){
          const identifier = `Post:${id}`;
          cache.evict(identifier)
        }
      }
    }
  })
  const logout = () => {
    dispatch({ type: LOGOUT })
  }

  // set message
  const setMessage = (message, timer = 5000) => {
    dispatch({ type: SET_MESSAGE, payload: message })
    setTimeout(() => {
      dispatch({ type: SET_MESSAGE, payload: null })
    }, timer)
  }

  // set error
  const setError = (error, timer = 10000) => {
    dispatch({ type: SET_ERROR, payload: error })
    setTimeout(() => {
      dispatch({ type: SET_ERROR, payload: null })
    }, timer)
  }

  const setUser = (user) => {
    dispatch({ type: SET_USER, payload: user })
  }
  return (
    <Context.Provider value={{
      ...state,
      setToken,
      setLoading,
      setMessage,
      setError,
      logout,
      signup,
      login,
      setUser,
      setOwner,
      addPost,
      loadMe,
      toggleLikePost,
      deletePost
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider

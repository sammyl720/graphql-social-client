import React, { useEffect, useReducer } from 'react';
import { useRouter } from 'next/router'
import Context from './Context'
import reducer from './reducer';
import { LOGOUT, SET_ERROR, SET_LOADING, SET_MESSAGE, SET_OWNER, SET_TOKEN, SET_USER } from './types';
import { makeVar, useMutation, useLazyQuery, ReactiveVar} from '@apollo/client'

import {minute} from '../../utils/getTimeDiffernce'
import { expireTime, memoryToken } from '../../memory';
import LOGIN from '../../graphql/mutations/login'
import SIGN_UP from '../../graphql/mutations/signup'
import ADD_POST from '../../graphql/mutations/addPost';
import TOGGLE_LIKE_POST from '../../graphql/mutations/toggleLikePost';
import DELETE_POST from '../../graphql/mutations/deletePost';
import ME from '../../graphql/queries/me'
import GET_PUBLIC_USER from '../../graphql/queries/getPublicUser';
import REFRESH_TOKEN from '../../graphql/queries/refresh';
import { User } from '../../interfaces';
import axios, { AxiosError, AxiosResponse } from 'axios';

function Provider ({ children }) {
  const initialState = {
    loading: false,
    error: null,
    message: null,
    me: null,
    user: null
  }

  const router = useRouter()
  const setTimer = () => {
    /** 
     * isRunning: a reactive var boolean to indicate whether timer is running;
     * */
    let isRunning = makeVar(true)
    let timer = setTimeout(() => {
      // let timeLeft = (expireTime() - Date.now()) / minute;
      //   // console.log(`${timeLeft} minutes to refresh token`)
      //   // console.log(timeLeft < 14.7, timeLeft + ' less then 14.7?')
      //   // console.log('refreshing?')
      refreshToken()
      isRunning(false);
    }, minute * 14)
    return [timer, isRunning];
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  // dispatch functions
  // set token
  let tokenManagement: any[] = [];
  const setToken = async ({ token, expireTime: expiresIn }) => {
    if(tokenManagement.length > 0) {
      clearTimeout(tokenManagement[0])
      tokenManagement[1](false)
      tokenManagement = []
    }
    if(token){
      console.log('setting timer')
      console.log('there is a token')
      tokenManagement = setTimer()

      memoryToken(token)
      console.log('Timer is on? ', tokenManagement[1]?.() || false)
      console.log(`token set? ${!!memoryToken()}`)
    } else {
      console.log('deleting timer')
      
      console.log('Timer is on? ', tokenManagement[1]?.() || false)
      memoryToken(null)
    }
    if(expiresIn){
      expireTime(expiresIn)
    } else {
      expireTime(null)
    }
  }

  // request refresh token: local
  const [refreshToken] = useLazyQuery(REFRESH_TOKEN,{
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    onCompleted: ({ refresh }) => {
      console.log(refresh)
      if(refresh.token){
        console.log('refreshed!!!')
        setToken(refresh.token)
      } else {
        logout()
      }
    },
    onError: e => {
      console.log(e)
      setError(e.message)
    }
  })
  /// set current user
  const [loadMe, { refetch: refetchMe, stopPolling:stopPollingMe }] = useLazyQuery(ME, {
    onCompleted: (data) => {
      if(data.me.__typename == "User"){
        setOwner(data.me)
        
      } else {
        setError(data.me.message)
        setLoading(false)
      }
    },
    pollInterval: minute,
    onError: (e) => {
      console.log(e)
      setError(e.message)
      setLoading(false)
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
  })
  const setLoading = (loading) => {
    if(typeof loading !== 'boolean') return;
    dispatch({ type: SET_LOADING, payload: loading })
  }

  const setOwner = (owner: User | null) => {
    console.log('setting owner')
    if(!owner.name){
      console.log('no userr')
      setError("user not found")
      dispatch({ type: SET_OWNER, payload: null })
      setToken({ token: null, expireTime: null  })
      return null;
    }
    console.log('checking token')
    if(!memoryToken()) owner = null;
    dispatch({ type: SET_OWNER, payload: owner })
  }

  // login
  const [login] = useMutation(LOGIN,
    {
      onCompleted: (data) => {
        if(data.login.errors){
          setError(data.login.message)
        } else if(data.login.token){
          const { token, expireTime } = data.login;
          setToken({ token, expireTime: parseInt(expireTime) })
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
      onCompleted: (data) => {
        // console.log(data)
        if(data.signup.errors){
          console.log("errors")
          setError(data.signup.message)
        } else if(data.signup.token){
          setMessage("Succesfuly signed up")
          const { token, expireTime } = data.signup
          setToken({ token, expireTime: parseInt(expireTime) })
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
        refetchMe()
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
      }
    }
  });
  

  // like post 
  const [toggleLikePost] = useMutation(TOGGLE_LIKE_POST, {
    onCompleted: (data) => {
      // console.log(data.toggleLikePost)
      // status means that mutation did not cencounter any errors on server
      if(data.toggleLikePost.status){
        // update the ui
        const { status } = data.toggleLikePost;
        // console.log(status)
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
        let idRgx = /\((?<postId>[a-f0-9]+)\)/i
        let unliked = /unliked/.test(data.toggleLikePost.status)
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
        }
      }
    }
  })

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: (data) => {
      if(data.deletePost.status){
        setMessage(data.deletePost.status)
        refetchMe()
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
          cache.evict({id})
        }
      }
    }
  })
  const logout = async () => {
    memoryToken(null)
    expireTime(null)
    stopPollingMe?.()
    dispatch({ type: LOGOUT })
    try {
      const res: AxiosResponse = await axios(process.env.NEXT_PUBLIC_BASE_URL + '/logout')
    } catch (error) {
      console.log(error)
    } finally {
      router.push('/')
    }
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

  const setUser = (user: User ) => {
    dispatch({ type: SET_USER, payload: user })
  }

  const [getPublicUser] = useLazyQuery(GET_PUBLIC_USER, {
    onCompleted: (data) => {
      console.log(data)
      if(!data.publicUser.message){
        setUser(data.publicUser)
      } else {
        setError(data.publicUser.message)
        // router.push('/profile')
      }
    },
    onError: (err) => {
      setError(err.message)
      console.log(err)
    }
  })
  return (
    <Context.Provider value={{
      ...state,
      getPublicUser,
      refreshToken,
      refetchMe,
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

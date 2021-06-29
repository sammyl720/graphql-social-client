import React, { useEffect, useReducer } from 'react';
import Context from './Context'
import reducer from './reducer';
import { SET_ERROR, SET_LOADING, SET_MESSAGE, SET_TOKEN } from './types';
import { useQuery, useMutation } from '@apollo/client'
// import {SIGN_UP, LOGIN } from '../../graphql/mutations/index';
import LOGIN from '../../graphql/mutations/login'
import ME from '../../graphql/queries/me';
const Provider = ({ children }) => {
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
    user: null,
    test: "This is a test"
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  // dispatch functions
  // set token
  const setToken = token => {
    if(!window.localStorage.token){
      window.localStorage.setItem('token', token);
    } 
    dispatch({ type: SET_TOKEN, payload: token })
  }

  const setLoading = (loading) => {
    if(typeof loading !== 'boolean') return;
    dispatch({ type: SET_LOADING, payload: loading })
  }

  const me = (cb = (success) => (console.log(success))) => {
    if(!state.token) return null;
    setLoading(true)
    useQuery(ME, {
      onCompleted: (data) => {
        console.log(data)
        setLoading(false)
        return cb(true)
      },
      onError: (e) => {
        console.log(e)
        setLoading(false)
        return cb(true)
      }
    })
  }
  // signup
  // const signup = async (variables) => {
  //   try {
  //     setLoading(true)
  //     useMutation( SIGN_UP,
  //       {
  //         variables,
  //         onCompleted: (data) => {
  //           console.log(data)
  //         },
  //         onError: (error) => {
  //           console.log(erro)
  //         }
  //     })[0]()

  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // login
  const [login] = useMutation(LOGIN,
    {
      onCompleted: (data) => {
        console.log(data)
        if(data.login.errors){
          console.log("errors")
          setError(data.login.message)
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
  return (
    <Context.Provider value={{
      ...state,
      setToken,
      setLoading,
      setMessage,
      setError,
      me,
      // signup,
      login
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider

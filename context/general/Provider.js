import React, { useEffect, useReducer } from 'react';
import Context from './Context'
import reducer from './reducer';
import { LOGOUT, SET_ERROR, SET_LOADING, SET_MESSAGE, SET_OWNER, SET_TOKEN, SET_USER } from './types';
import {  useMutation } from '@apollo/client'

import LOGIN from '../../graphql/mutations/login'
import SIGN_UP from '../../graphql/mutations/signup'
import axios from 'axios';

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

  const setLoading = (loading) => {
    if(typeof loading !== 'boolean') return;
    dispatch({ type: SET_LOADING, payload: loading })
  }

  const setOwner = (owner) => {
    if(!owner.name){
      setError("user not found")
      return null;
    }
    if(!state.token) return null;
    dispatch({ type: SET_OWNER, payload: owner })
  }

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
  // login
  const [signup] = useMutation(SIGN_UP,
    {
      onCompleted: (data) => {
        console.log(data)
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
      setOwner
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider

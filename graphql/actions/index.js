import React, { useContext } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client';
import Context from '../../context/general/Context';
import ME from '../queries/me'

function useApollo() {
  const { setOwner, setMessage, setError, setLoading} = useContext(Context)
  const loadMeQuery = useLazyQuery(ME, {
    onCompleted: (data) => {
      if(data.me.__typename == "User"){
        setOwner(data.me)
      } else {
        // console.log(data.me)
        setError(data.me.message)
      }
      setLoading(false)
    },
    onError: (e) => {
      console.log(e)
      setError(e.message)
      setLoading(false)
    },
    pollInterval: 15000
  })
  return {
    loadMeQuery
  }
}

export default useApollo

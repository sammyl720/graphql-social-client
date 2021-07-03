import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import Loader from '../components/design/Loader'
import Toast from '../components/design/Toast'
import { useContext, useEffect } from 'react'
import Context from '../context/general/Context'
import ME from '../graphql/queries/me'

function Home() {
  const router = useRouter()
  const { token, me, loading, setLoading, setOwner, setError, error, message, setMessage } = useContext(Context)
  useEffect(() => {
    if(!token){
      router.push('/login')
    }
  }, [token])
  
  const { data } = useQuery(ME, {
    onCompleted: (data) => {
      if(data.me.__typename == "User"){
        setOwner(data.me)
        setMessage(`Welcome back ${data.me.name}`)
      } else {
        setError(data.me.message)
      }
      setLoading(false)
    },
    onError: (e) => {
      setError(e.message)
      setLoading(false)
    }
  })
  if (loading) return <Loader />;
  return (
    <div className="text-2xl text-blue-900 w-100 h-100">
      {message && (
        <Toast message={message} type='success' onLeave={() => setMessage(null) } />
      )}
      <h1>Feed</h1>
    </div>
  )
}

export default Home
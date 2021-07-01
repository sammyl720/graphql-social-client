import { useState } from 'react'
import Head from 'next/head'
import cookie from 'cookie'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import Loader from '../../components/design/Loader'
import Toast from '../../components/design/Toast'
import UserProfile from '../../components/design/UserProfile'
import { useContext, useEffect } from 'react'
import Context from '../../context/general/Context'
import ME from '../../graphql/queries/me'

function User() {
  const router = useRouter()
  const { token, me, loading, setLoading, setOwner, setError, error, message, setMessage } = useContext(Context)
  const [text, setText] = useState("This is a message")
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
        console.log(data.me)
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
    <div className="text-2xl w-100 h-100">

      {error && (
        <Toast message={error} type='error' onLeave={() => setError(null) } />
      )}
      {me && (
        <UserProfile user={me} />
      )}
    </div>
  )
}


export default User
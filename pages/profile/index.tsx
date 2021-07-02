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
  const { token, me, loading, setLoading, setOwner, setError, error, loadMe } = useContext(Context)
  useEffect(() => {
    if(!token){
      router.push('/login')
    } else {
      loadMe()
    }
  }, [token])
  if (loading) return <Loader />;
  return (
    <div className="text-2xl w-100 h-100 ">
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
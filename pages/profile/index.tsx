import { useState } from 'react'

import { useRouter } from 'next/router'
import Loader from '../../components/design/Loader'
import Toast from '../../components/design/Toast'
import UserProfile from '../../components/design/UserProfile'
import { useContext, useEffect } from 'react'
import Context from '../../context/general/Context'

function User() {
  const router = useRouter()
  const { token, loading, setLoading, me, setError, error, loadMe } = useContext(Context)
  useEffect(() => {
    if(!token){
      router.push('/login')
    } else {
      loadMe()
    }
  }, [token])
  useEffect(() => {}, [me])
  if (loading) return <Loader />;
  return (
    <div className=" max-w-screen-md mx-auto h-100 ">
      {me && (
        <UserProfile user={me} />
      )}
    </div>
  )
}


export default User
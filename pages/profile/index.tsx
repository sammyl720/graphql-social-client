import { useState } from 'react'
import client from '../../apollo'
import { useRouter } from 'next/router'
import Loader from '../../components/design/Loader'
import Toast from '../../components/design/Toast'
import UserProfile from '../../components/design/UserProfile'
import { useContext, useEffect } from 'react'
import ME from '../../graphql/queries/me'
import Context from '../../context/general/Context'

function User() {
  const router = useRouter()
  const { token, loading, setLoading, me, setError, error, loadMe } = useContext(Context)
  const user = client.readQuery({
    query: ME
  })
  useEffect(() => {
    if(!token){
      router.push('/login')
    } else {
      loadMe()
    }
  }, [token])
  useEffect(() => {
    console.log('loading me user', user)
  }, [user, me])
  if (loading) return <Loader />;
  return (
    <div className="max-w-screen-lg mx-auto h-100 ">
      {me && (
        <UserProfile user={user?.me || me} />
      )}
    </div>
  )
}


export default User
import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import Loader from '../../../components/design/Loader'
import Toast from '../../../components/design/Toast'
import UserProfile from '../../../components/design/UserProfile'
import { useContext, useEffect } from 'react'
import Context from '../../../context/general/Context'
import ME from '../../../graphql/queries/me'
import USER from '../../../graphql/queries/user'

function Profile({ uid }) {
  const router = useRouter()
  const { token, loading, setLoading, error, setError, message, setMessage, user, setUser } = useContext(Context)
  useEffect(() => {
    if(!token){
      router.push('/login')
    }
  }, [token])
  useQuery(USER, {
    variables: { id: uid },
    onCompleted: (data) => {
      if(data.user.__typename == "User"){
        setUser(data.user)
        setLoading(false)
      } else {
        setError(data.user.message)
        setLoading(false)
      }
    },
    onError: (e) => {
      console.log(e)
      setError(e.message)
      setLoading(false)

    }
  })
  if (loading) return <Loader />;
  return (
    <div className="text-2xl h-100">
      {user && (
        <UserProfile user={user} />
      )}
      <h3>fosdgosnno</h3>
    </div>
  )
}

export async function getStaticProps (context) {
  const { uid } = context.params
  return { props: {uid} }
}

export async function getStaticPaths(){
  return {
    paths: ['/profile/60d982ebfb413a0015de293a'],
    fallback: true
  }
}
export default Profile
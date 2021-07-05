import { memoryToken } from '../../memory'
import { useRouter } from 'next/router'
import Loader from '../../components/design/Loader'
import UserProfile from '../../components/design/UserProfile'
import { useContext, useEffect } from 'react'
import Context from '../../context/general/Context'

function User() {
  const router = useRouter()
  const { loading, setLoading, me, setError, error, loadMe } = useContext(Context)
  useEffect(() => {
    if(!memoryToken()){
      console.log('unauthorized route')
      router.push('/login')
    }
  }, [memoryToken(), process.browser, me])
  useEffect(() => {
  }, [me])
  if (loading) return <Loader />;
  return (
    <div className="max-w-screen-lg mx-auto h-100 ">
      {me && (
        <UserProfile user={me} />
      )}
    </div>
  )
}


export default User
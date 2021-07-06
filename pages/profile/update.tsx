import { memoryToken } from '../../memory'
import { useRouter } from 'next/router'
import Loader from '../../components/design/Loader'
import UserEdit from '../../components/design/UserEdit'
import { useContext, useEffect } from 'react'
import Context from '../../context/general/Context'

function Update() {
  const router = useRouter()
  const { loading, me } = useContext(Context)
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
        <UserEdit user={me} />
      )}
    </div>
  )
}


export default Update
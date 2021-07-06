import { useRouter } from 'next/router'
import Loader from '../components/design/Loader'
import { useContext } from 'react'
import Front from '../components/front/Front'
import Context from '../context/general/Context'
function Home() {
  const router = useRouter()
  const { me, loading } = useContext(Context)

  if (loading) return <Loader />;
  return (
    <div className="max-w-screen-lg mx-auto h-100 ">
      {me ? (
        <h1>You are logged in as {me.name}</h1>
      ) : (
        <Front />
      )}
    </div>
  )
}

export default Home
import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Loader from '../components/design/Loader'
import { useContext, useEffect } from 'react'
import Context from '../context/general/Context'
const query = gql`
  query {
    hello
  }
`
export default function Home() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const { token } = useContext(Context)
  useEffect(() => {
    if(!token){
      router.push('/login')
    } else {
      setReady(true)
    }
  }, [token])
  const { loading, data, error} = useQuery(query, {
    onCompleted: (d) => {
      console.log(d)
    },
    onError: (e) => {
      console.log(e)
    }
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  if (loading || !ready) return <Loader />;
  if (error) return <p>Error :(</p>;
  return (
    <div className="text-2xl text-blue-900">
      <h1>Social App</h1>
      {data.hello}
      <Loader />
    </div>
  )
}

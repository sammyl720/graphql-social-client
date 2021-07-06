import React, {useContext, useEffect, useState} from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/dist/client/link'
import Input from '../components/design/Input'
import Loader from '../components/design/Loader'
import Context from '../context/general/Context'
import { memoryToken } from '../memory'
const Login = () => {
  const { login, loading, setLoading, error, setError } = useContext(Context)
  const router = useRouter()
  useEffect(() => {
    setLoading(true)
    if(memoryToken()){
      router.push('/')
    } else {
      setLoading(false)
    }
  }, [memoryToken()])
  const [values, setValues] = useState({
    email: "",
    password: ""
  })

  const handleChange = e => {
    setValues(oldValues => ({ ...oldValues, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    login({ variables: values })
  }
  return (
    <form onSubmit={handleSubmit} className='bg-white max-w-sm flex flex-col p-4 mx-auto my-auto border rounded-lg shadow'>
      <Head>
        <title>Kesher | Login</title>
        <meta name="description" content="Login to connect to your peers." />
      </Head>
      {loading ? <Loader /> : (
        <>
          <h1 className='text-indigo-900 text-4xl mx-auto'>Login</h1>
        <Input
          title="Enter your E-Mail"
          label={<i className="far fa-envelope" />}
          name='email'
          type='email'
          value={values.email}
          placeholder="deborah@gmail.com"
          handleChange={handleChange}
          required={true}
        />
        <Input
          title="Enter your password"
          label={<i className="fas fa-lock" />}
          name='password'
          type='password'
          value={values.password}
          placeholder="password..."
          handleChange={handleChange}
          required={true}
        />

        <input className='btn' type="submit" value="Login" />
        <small className='text-center mt-2'>
        Don't have an account yet? <Link href='/signup'>
          <a className='text-blue-600 font-semibold'>Signup</a>
        </Link>
      </small>
        </>
      )}
    </form>
  )
}



export default Login

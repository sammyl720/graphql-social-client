import React, {useContext, useState, useEffect } from 'react'
import Link from 'next/dist/client/link'
import { useRouter } from 'next/router'
import Input from '../components/design/Input'
import Context from '../context/general/Context'
import Loader from '../components/design/Loader'
import Head from 'next/head'
import { memoryToken } from '../memory'
const Signup = () => {
  const router = useRouter()
  const { signup, setError, error, setLoading, loading } = useContext(Context)
  useEffect(() => {
    setLoading(true)
    if(memoryToken()){
      router.push('/profile')
    } else {
      setLoading(false)
    }
  }, [memoryToken()])
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    name: ''
  })

  const handleChange = e => {
    setValues(oldValues => ({ ...oldValues, [e.target.name]: e.target.value }))
  }
  
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(values.password !== values.confirmpassword){
      setError("Make sure passwords match")
    }
    signup({ variables: values })
    console.log('ready to Signup')
  }

  if(loading) return <Loader />
  return (
    <form onSubmit={handleSubmit} className='bg-white max-w-sm flex flex-col p-4 mx-auto my-auto border rounded-lg shadow'>
      <Head>
        <title>Kesher | Signup</title>
        <meta name="description" content="Signup to connect to your peers." />
      </Head>
      <h1 className='text-indigo-900 text-4xl mx-auto'>Signup</h1>
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
      <Input
        title="Confirm your password"
        label={<i className="fas fa-lock" />}
        name='confirmpassword'
        type='password'
        value={values.confirmpassword}
        placeholder="confirm password..."
        handleChange={handleChange}
        required={true}
      />
      <Input
        title="Your name"
        label={<i className="fas fa-user" />}
        name='name'
        type='text'
        value={values.name}
        placeholder="Deborah Smith"
        handleChange={handleChange}
        required={true}
      />

      <input className='btn' type="submit" value="Signup" />
      <small className='text-center mt-2'>
        Already have an account yet? <Link href='/login'>
          <a className='text-blue-600 font-semibold'>Login</a>
        </Link>
      </small>
    </form>
  )
}



export default Signup

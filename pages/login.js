import React, {useContext, useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Input from '../components/design/Input'
import Loader from '../components/design/Loader'
import Context from '../context/general/Context'
const Login = () => {
  const { login, loading, setLoading, token } = useContext(Context)
  const router = useRouter()
  useEffect(() => {
    if(token){
      router.push('/')
    }
  }, [token])
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
    login({ variables: values})
  }
  return (
    <form onSubmit={handleSubmit} className='bg-white max-w-sm flex flex-col p-4 mx-auto my-auto border rounded-lg shadow'>
      {loading ? <Loader /> : (
        <>
          <h1 className='text-indigo-900 text-4xl mx-auto'>Login</h1>
        <Input
          title="Enter your E-Mail"
          label={<i class="far fa-envelope" />}
          name='email'
          type='email'
          value={values.email}
          placeholder="deborah@gmail.com"
          handleChange={handleChange}
          required={true}
        />
        <Input
          title="Enter your password"
          label={<i class="fas fa-lock" />}
          name='password'
          type='password'
          value={values.password}
          placeholder="password..."
          handleChange={handleChange}
          required={true}
        />

        <input className='btn' type="submit" value="Login" />
        </>
      )}
    </form>
  )
}



export default Login

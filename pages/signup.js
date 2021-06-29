import React, {useState} from 'react'
import Input from '../components/design/Input'
const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmpassword: ""
  })

  const handleChange = e => {
    setValues(oldValues => ({ ...oldValues, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('ready to Signup')
  }
  return (
    <form onSubmit={handleSubmit} className='bg-white max-w-sm flex flex-col p-4 mx-auto my-auto border rounded-lg shadow'>
      <h1 className='text-indigo-900 text-4xl mx-auto'>Signup</h1>
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

      <input className='btn' type="submit" value="Signup" />
    </form>
  )
}



export default Signup

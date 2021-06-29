import React from 'react'

const Input = ({ 
  label,  
  name,
  type, 
  placeholder='',
  required=false,
  value,
  title="input",
  handleChange
}) => {
  return (
    <div className="flex-row flex my-4 items-center w-100justify-between border">
        <label title={title} htmlFor={name} className='bg-indigo-800 text-white p-2 px-4 rounded-l-md text-xl'>
          {label}
        </label>
        <input 
        className="focus:outline-none flex-grow ml-4 p-2 rounded-r-md"
        type={type} 
        name={name} 
        id={name} 
        placeholder={placeholder}
        value={value} 
        onChange={handleChange} 
        required={required} title={title} />
    </div>
  )
}

export default Input

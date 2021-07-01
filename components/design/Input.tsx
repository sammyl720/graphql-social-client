import React from 'react'


interface InputProps {
  label: string | HTMLElement;
  name:string;
  type:string;
  placeholder?:string;
  required?:boolean;
  value:string;
  tabIndex?: number;
  title?:string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => any;
}
const Input = ({
  tabIndex = 0,
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
    <div className={`flex-row flex my-4 items-center w-100 justify-between border`}>
        <label title={title} htmlFor={name} className='bg-indigo-800 text-white p-2 px-4 rounded-l-md text-xl'>
          {label}
        </label>
        <input 
        tabIndex={tabIndex}
        className={`focus:outline-none flex-grow ml-4 p-2 rounded-r-md `}
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

import React, { Attributes, useEffect, useRef } from 'react'


interface InputProps {
  label: string | HTMLElement;
  name:string;
  type:string;
  filename:string,
  placeholder?:string;
  required?:boolean;
  value:string;
  tabIndex?: number;
  title?:string;
  attributes: { [key: string]: any },
  handleChange: (e: React.FormEvent<HTMLInputElement>) => any;
}
const Input = ({
  tabIndex = 0,
  attributes = {},
  label,  
  name,
  type, 
  placeholder='',
  required=false,
  value,
  title="input",
  filename='',
  handleChange
}) => {

  const fileRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if(fileRef.current){
      fileRef.current.style.display = 'none'
    }
  }, [fileRef])
  return (
    <div className={`flex-row flex my-4 items-center w-100 justify-between border`}>
        <label title={title} htmlFor={name} className='bg-indigo-800 text-white p-2 px-4 rounded-l-md text-xl cursor-pointer'>
          {label}
        </label>
        <input 
        tabIndex={tabIndex}
        className={`focus:outline-none = flex-grow ml-4 p-2 rounded-r-md `}
        type={type} 
        name={name} 
        id={name} 
        placeholder={placeholder}
        value={value} 
        onChange={handleChange} 
        {...attributes}
        { ...type == 'file' && { ref:fileRef }}
        required={required} title={title} />
        { type == 'file' && (
          <small className='text-center flex-grow'>{filename.split('.')[0].replace(/[\W]+/, ' ')}</small>
        )}
    </div>
  )
}

export default Input

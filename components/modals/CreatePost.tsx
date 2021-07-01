import React, { useRef, useEffect, useState, FormEventHandler, InputHTMLAttributes } from 'react'
import { User } from '../../interfaces'
import Input from '../design/Input';
interface CreatePostProps {
  user: User;
  onDismiss: (boolean) => void;
}

interface Values {
  text: string;
  imgs: any[];
  public: boolean;
}
export default function CreatePost(props: CreatePostProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [values, setValues] = useState<Values>({
    text: '',
    imgs: [],
    public: true
  })
  useEffect(() => {
    if(divRef.current){
      console.log('color')
    }
  }, [divRef])

  const dismiss = () => {
    if(divRef.current){
      props.onDismiss((oldToggle) => !oldToggle)
    }
  }

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {

    const file = e.currentTarget.files[0];
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function(event){
      console.log(event)
      setValues({ ...values, [e.target.name]: [event.target.result] })
    }
    console.log(e.currentTarget.files[0].name)
  }

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      console.log(values)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div ref={divRef} className='modal absolute z-50 rounded-lg bg-white shadow-md inset-2 flex flex-col items-center p-4'>
      <span onClick={dismiss} className='ml-auto cursor-pointer'>
        <i className="fas fa-times" />
      </span>
      <form onSubmit={onSubmit}>
        <h1 className='text-bold text-center'>Create Post</h1>
        <Input 
          value={values.text}
          label={<i className='fas fa-paragraph' />}
          type='text'
          name='text'
          required={true}
          placeholder='What is on your mind?'
          title='What is on your mind?'
          handleChange={(e) => {
          setValues({ ...values, [e.target.name]: e.target.value })
        }} />
        <Input 
          value={values.text}
          label={<i className='fas fa-paragraph' />}
          type='file'
          name='imgs'
          required={false}
          placeholder='What is on your mind?'
          title='Add Images'
          handleChange={(e) => {
          handleFileChange(e)
        }} />
        
        <small className='mx-auto'>
          <label htmlFor="public">
            Public
          </label>
          <input 
            className='ml-2'
            type="checkbox" 
            name="public" 
            id="id" 
            checked={values.public}
            onChange={(e) => {
              setValues({ ...values, [e.target.name]: e.target.checked})
            }}
          />
        </small>
      </form>
      {values.imgs.length > 0 && (

        <img className='m-w-100 h-auto' src={values.imgs[0]} alt="test" />
      )}
    </div>
  )
}


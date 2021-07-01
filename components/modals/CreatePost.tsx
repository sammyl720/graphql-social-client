import React, { useRef, useEffect, useState } from 'react'
import { User } from '../../interfaces'
import UPLOAD from 'imgs/upload.png'
import Input from '../design/Input';
interface CreatePostProps {
  user: User;
  onDismiss: (boolean) => void;
}

interface Values {
  text: string;
  imgs: any[];
  public: boolean;
  resized?: string;
}
export default function CreatePost(props: CreatePostProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  
  const [text, setText] = useState<string>('')
  const [isPublic, setIsPublic] = useState<boolean>(true)
  const [imgs, setImgs] = useState<{ base64: string;filename:string}[]>([])
  const [inputFile, setInputFile] = useState<File>(null)
  const [resized, setResized] = useState<{ base64:string; filename:string}>({ filename: '', base64: ''});

  useEffect(() => {
    if(imgRef.current){
      const maxWidth = 400;
      imgRef.current.onload = function(e:Event){
        let canvas = document.createElement('canvas');
        const scaleSize = maxWidth / imgRef.current.width;

        canvas.width = maxWidth
        canvas.height = imgRef.current.height * scaleSize;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
        let data = canvas.toDataURL('image/jpeg');
        console.log(data)
        setResized({ base64: data.toString(), filename: imgs[0].filename || '' })
      }
    }
  }, [imgs, imgRef])
  const dismiss = () => {
    if(divRef.current){
      props.onDismiss((oldToggle) => !oldToggle)
    }
  }

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {

    const file = e.currentTarget.files[0];
    setInputFile(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function(event){
      setImgs([{
        base64: event.target.result.toString(),
        filename: file.name
      }])
    }
  }

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      console.log(resized, text, isPublic)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div ref={divRef} className='modal absolute z-50 rounded-lg bg-white shadow-md inset-1 p-3  flex flex-col items-center h-auto'>
      <span onClick={dismiss} className='ml-auto cursor-pointer'>
        <i className="fas fa-times" />
      </span>
      <form className='flex flex-col' onSubmit={onSubmit}>
        <h1 className='text-bold text-center'>Create Post</h1>
        <Input 
          value={text}
          label={<i className='fas fa-paragraph' />}
          type='text'
          name='text'
          required={true}
          placeholder='What is on your mind?'
          title='What is on your mind?'
          handleChange={(e) => {
          setText(e.target.value )
        }} />
        <Input 
          value={''}
          label={<i className='fas fa-images' />}
          type='file'
          name='imgs'
          attributes={{
            accept: 'image/*'
          }}
          filename={resized.filename || ''}
          required={false}
          placeholder='What is on your mind?'
          title='Add Images'
          handleChange={(e) => {
          handleFileChange(e)
        }} />
        {resized.base64 && (
          <img className='max-w-60 my-3 mx-auto h-auto' src={resized.base64} alt="test" />
        )}
        
        <small className='mx-auto'>
          <label htmlFor="public">
            Public
          </label>
          <input 
            className='ml-2'
            type="checkbox" 
            name="public" 
            id="id" 
            checked={isPublic}
            onChange={(e) => {
              setIsPublic(e.target.checked)
            }}
          />
        </small>
        <button type="submit" className='bg-indigo-800 p-2 text-white mb-2 cursor-pointer  rounded'>
          Post
        </button>
      </form>
      {imgs.length > 0 && (

        <img ref={imgRef} className='w-0 hidden h-auto' src={imgs[0].base64} alt="test" />
      )}
      
    </div>
  )
}


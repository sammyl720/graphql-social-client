import React, { useRef, useEffect, useState, useContext } from 'react'
import Context from '../../context/general/Context';
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
  resized?: string;
}

interface Img {
  base64: string;
  filename:string;
}
export default function CreatePost(props: CreatePostProps) {

  const { addPost, loading, setLoading } = useContext(Context)
  const divRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  
  const [text, setText] = useState<string>('')
  const [isPublic, setIsPublic] = useState<boolean>(true)
  const [imgs, setImgs] = useState<Img[]>([])
  const [resized, setResized] = useState<Img>({ filename: '', base64: ''});

  useEffect(() => {
    if(imgRef.current){
      let maxWidth = 500;
      imgRef.current.onload = function(e:Event){
        let canvas = document.createElement('canvas');
        let scaleSize = maxWidth / imgRef.current.width;
        let curHeight = imgRef.current.height;
        while(curHeight * scaleSize > 500){
          maxWidth -= 5;
          scaleSize = maxWidth / imgRef.current.width;
          curHeight = imgRef.current.height * scaleSize;
        }
        canvas.width = maxWidth
        canvas.height = curHeight;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
        let data = canvas.toDataURL('image/jpeg');
        setResized({ base64: data.toString(), filename: imgs[0].filename || 'default' })
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
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function(event){
      setImgs([{
        base64: event.target.result.toString(),
        filename: file.name.split('.')[0]
      }])
    }
  }

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const variables: {text: string; public:boolean; images?: Img } = {
        text,
        public: isPublic
      }
      if(!!resized.base64){
        variables.images = resized;
      }
      setLoading(true)
      addPost({ variables })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div ref={divRef} className='modal'>
      <span onClick={dismiss} className='ml-auto cursor-pointer'>
        <i className="fas fa-times" />
      </span>
      <form className='flex flex-col p-2 mx-auto max-w-screen-md h-full justify-evenly' onSubmit={onSubmit}>
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
          <img className='mx-auto h-auto' src={resized.base64} alt="test" />
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
        <div className='max-h-56 bg-red-500'>
          <img ref={imgRef} className='hidden max-h-full object-cover w-auto' src={imgs[0].base64} alt="test" />
        </div>
      )}
      
    </div>
  )
}


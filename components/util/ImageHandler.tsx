import React, { useState, useEffect, useRef} from 'react'
import { Image } from '../../interfaces';
import Input from '../design/Input';

interface Img {
  base64: string;
  filename:string;
}

interface ImageHandlerProps {
  image?:Image,
  cb?: (img: Img) => void
}

function ImageHandler({ image, cb }: ImageHandlerProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  
  const [imgs, setImg] = useState<Img | null>(null)
  const [resized, setResized] = useState<Img>({ filename: '', base64: ''});

  useEffect(() => {
    if(imgRef.current){
      let maxWidth = 500;
      imgRef.current.onload = function(e:Event){
        let canvas = document.createElement('canvas');
        let scaleSize = maxWidth / imgRef.current.width;
        let curHeight = imgRef.current.height;
        let shortend = false;
        while(curHeight * scaleSize > 600){
          maxWidth -= 5;
          scaleSize = maxWidth / imgRef.current.width;
          curHeight = imgRef.current.height * scaleSize;
          shortend = true;
        }
        canvas.width = maxWidth
        canvas.height = shortend ? curHeight : curHeight * scaleSize;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
        let data = canvas.toDataURL('image/jpeg');
        setResized({ base64: data.toString(), filename: imgs[0].filename || 'default' })
      }
    }
  }, [imgs, imgRef])

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {

    const file = e.currentTarget.files[0];
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function(event){
      setImg({
        base64: event.target.result.toString(),
        filename: file.name.split('.')[0]
      })
      cb({
        base64: event.target.result.toString(),
        filename: file.name.split('.')[0]
      })
    }
  }

  return (
    <div>
      <div className='max-h-56 bg-red-500'>
          <img ref={imgRef} className='hidden max-h-full object-cover w-auto' src={resized.base64 || image?.secure_url || ''} alt="Profile Image" />
        </div>
    <Input 
      value={''}
      label={<i className='fas fa-images' />}
      type='file'
      name='profile_img'
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
      </div>
  )
}

export default ImageHandler

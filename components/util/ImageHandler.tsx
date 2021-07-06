import React, { useState, useEffect, useRef} from 'react'
import { Image, Img } from '../../interfaces';
import Input from '../design/Input';


interface ImageHandlerProps {
  image?:Image,
  cb?: (img: Img) => void
}

function ImageHandler({ image, cb }: ImageHandlerProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  
  const [img, setImg] = useState<Img | null>(null)
  const [resized, setResized] = useState<Img>({ filename: '', base64: ''});
  const [reset, setReset] = useState(false)
  useEffect(() => {
    console.log('image lenth', imgRef.current.sizes, imgRef.current?.src.length, imgRef.current)
    if(img && reset){
      console.log('resizing')
      let maxWidth = 500;
      imgRef.current.onload = function(e:Event){
        let canvas = document.createElement('canvas');
        let scaleSize = maxWidth / imgRef.current.width;
        let curHeight = imgRef.current.height;
        let shortend = false;
        while(curHeight * scaleSize > 500){
          maxWidth -= 5;
          // console.log(`Resizing: width ${maxWidth}`)
          scaleSize = maxWidth / imgRef.current.width;
          curHeight = imgRef.current.height * scaleSize;
          shortend = true;
        }
        canvas.width = maxWidth
        canvas.height = shortend ? curHeight : curHeight * scaleSize;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
        let data = canvas.toDataURL('image/jpeg');
        setResized({ base64: data.toString(), filename: img.filename || 'default' })
      }
    }
  }, [img, imgRef.current])

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {

    const file = e.currentTarget.files[0];
    setReset(file.size > 6000000)
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

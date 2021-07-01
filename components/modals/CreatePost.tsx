import React, { useRef, useEffect } from 'react'
import { User } from '../../interfaces'

interface CreatePostProps {
  user: User;
  onDismiss: (boolean) => void;
}

export default function CreatePost(props: CreatePostProps) {
  const divRef = useRef<HTMLDivElement>(null)
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
  return (
    <div ref={divRef} className='modal absolute z-50 rounded-lg bg-white shadow-md sm:inset-2 lg:inset-y-40 lg:inset-x-80 flex flex-col items-center p-4'>
      <span onClick={dismiss} className='ml-auto cursor-pointer'>
        <i className="fas fa-times" />
      </span>
      <h1>Create Post</h1>
      {props.user.name}
    </div>
  )
}


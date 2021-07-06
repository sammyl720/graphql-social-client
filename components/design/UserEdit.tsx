import React, { useEffect, useState } from 'react'
import { EditUserInput, Img, User } from '../../interfaces'
import Input from './Input'
import ImageHandler from '../util/ImageHandler';
interface EditProps {
  user: User;
}
export default function UserEdit({ user }: EditProps ) {
  const [variables, setVariables] = useState<EditUserInput>({
    bio: user.bio,
    profile_img: user.profile_img || null,
    gender: user.gender,
    name: user.name,
    private: user.private
  })

  const [img, setImg] = useState<Img>(null)
  const [bioEditMode, setBioEditMode] = useState(false)

  useEffect(() => {

  }, [])
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(variables)
  }

  const handleChange = (e:React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.name, e.currentTarget.value)
  }
  return (
    <form onSubmit={handleSubmit} className={`flex flex-wrap flex-col items-center justify-between`}>
        <h3>Edit your profile</h3>
        <div className="flex my-2 items-center w-1/2 p-2 bg-gray-300 justify-between flex-grow">
          <div className='mr-4 ml-0'>
            <ImageHandler image={user.profile_img || null} cb={setImg} />
          </div>
          {user.profile_img && !img ? (
          <img className='w-48 h-48 object-cover ml-2' src={user.profile_img?.secure_url} alt='Profile Image' />
          ) : img ? (
            <img className='w-48 h-48 object-cover ml-2' src={img.base64} alt={img.filename} />
          ) : (
            <img className='w-48 h-48 object-cover ml-2' src="/imgs/user.png" alt='User Profile Image' />
          )}
        </div>
      <div className='flex items-center justify-between'>
      {bioEditMode ?  (
        <Input name='bio' value={user.bio || ''} title='Edit Your Bio' label='Bio' tabIndex={0} placeholder='Your Bio' attributes={{}} filename='' handleChange={handleChange} required={false} />
        ) : (
          <div className={`flex-row flex my-4 items-center w-100 justify-between border`}>
        <span className='bg-indigo-800 text-white p-2 px-4 rounded-l-md text-xl cursor-pointer'>
          Bio
        </span>
        <span className={`focus:outline-none flex-grow ml-4 p-2 rounded-r-md w-48`}>{variables.bio || 'Your bio'}</span>
        </div>
      )}
      
      <div className='text-xl ml-2 cursor-pointer' onClick={() => setBioEditMode(!bioEditMode)}>
        <i className={`fas fa-toggle-${bioEditMode ? 'off' : 'on'}`}/>
      </div>
      </div>

    </form>
  )
}

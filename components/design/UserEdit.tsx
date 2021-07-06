import React, { useContext, useEffect, useState } from 'react'
import { Img, User } from '../../interfaces'
import Input from './Input'
import ImageHandler from '../util/ImageHandler';
import Context from '../../context/general/Context';
interface EditProps {
  user: User;
}
export default function UserEdit({ user }: EditProps ) {
  const { updateProfile } = useContext(Context)
  const [bio, setBio] = useState(user.bio || '')

  const [img, setImg] = useState<Img>(null)
  const [bioEditMode, setBioEditMode] = useState(false)

  useEffect(() => {

  }, [])
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let variables = {}
    if(bio){
      variables['bio'] = bio;
    }

    if(img){
      variables['profile_img'] = img
    }

    // todo add option to clear/reset image
    console.log(variables)
    updateProfile({
      variables: { data: variables }
    })
  }

  const handleChange = (e:React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.name, e.currentTarget.value)
    console.log(e.currentTarget.value)
    setBio(e.currentTarget.value)
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
        <Input name='bio' type='text' value={bio || ''} title='Edit Your Bio' label='Bio' tabIndex={0} placeholder='Your Bio' attributes={{}} handleChange={handleChange} required={false} />
        ) : (
          <div className={`flex-row flex my-4 items-center w-100 justify-between border`}>
        <span className='bg-indigo-800 text-white p-2 px-4 rounded-l-md text-xl cursor-pointer'>
          Bio
        </span>
        <span className={`focus:outline-none flex-grow ml-4 p-2 rounded-r-md w-48`}>{user.bio || bio || 'Your bio'}</span>
        </div>
      )}
      
      <div className='text-xl ml-2 cursor-pointer' onClick={() => setBioEditMode(!bioEditMode)}>
        <i className={`fas fa-toggle-${bioEditMode ? 'off' : 'on'}`}/>
      </div>
      </div>
        <input type="submit" value="Update" />
    </form>
  )
}

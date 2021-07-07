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

  const handleBioChange = (e:React.FormEvent<HTMLTextAreaElement>) => {
    setBio(e.currentTarget.value)
  }
  return (
    <form onSubmit={handleSubmit} className={`flex flex-wrap flex-col p-4 justify-between min-w-max place-items-center rounded shadow`}>
        <h3 className='text-2xl font-bold text-purple-800 border-dotted hover:shadow-xl'>Edit your profile</h3>
        <div className="flex my-2 items-center p-2 rounded justify-center flex-grow">
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
      <div className='flex items-center w-full justify-evenly rounded'>
      {bioEditMode ?  (
        // <Input name='bio' type='text' value={bio || ''} title='Edit Your Bio' label='Bio' tabIndex={0} placeholder='Your Bio' attributes={{}} handleBioChange={handleBioChange} required={false} />
        <div className={`flex-row flex flex-grow p-2 my-4 items-center w-100 justify-between`}>
        <label htmlFor='bio' className='bg-indigo-800 text-white p-2 px-4 rounded-l-md text-xl cursor-pointer'>
          Bio
        </label>
          <textarea
            maxLength={255}
            className={`focus:outline-none ml-4 p-2 flex-grow`}
            id='bio'
            rows={5}
            name='bio'
            value={bio || ''}
            title='Edit Your Bio'
            placeholder='Your Bio'
            onChange={handleBioChange}
          />
        </div>
        ) : (
          <div className={`flex-row flex-grow p-2 flex my-4 items-center w-100 justify-between`}>
        <span className='bg-indigo-800 text-white p-2 px-4 rounded text-xl cursor-pointer'>
          Bio
        </span>
        <span className={`focus:outline-none flex-grow min-w-sm ml-4 p-2 rounded-r-md w-48`}>{user.bio || bio || 'Your bio'}</span>
        </div>
      )}
      
      <div className='text-xl m-2 cursor-pointer' onClick={() => setBioEditMode(!bioEditMode)}>
        <i className={`fas fa-toggle-${bioEditMode ? 'off' : 'on'}`}/>
      </div>
      </div>
        <input type="submit" className='my-4 px-3 py-1 rounded text-lg bg-purple-800 text-white' value="Update" />
    </form>
  )
}

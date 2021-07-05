import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/dist/client/link'
import Badge from './Badge'
import Posts from '../posts/Posts'
import Head from 'next/head'
import Context from '../../context/general/Context'
import CreatePost from '../modals/CreatePost'
import UserDashboard from './UserDashboard'
import { User } from '../../interfaces'
interface UserProfileProps {
  user: User
}
const UserProfile:React.FC<UserProfileProps> = ({ user }) => {
  const [toggleCreateModel, setToggleCreateModal] = useState(false)
  const { me } = useContext(Context)
  useEffect(() => {}, [me])
  const [view, setView] = useState("posts")
  return (
    <div className='flex flex-col sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto'>
      <Head>
        <title>Kesher | Profile </title>
        <meta name="description" content={`${user.name} is on kesher.`} />
      </Head>

          { user.id == me?.id && (
              <>
                <i className="fas fa-pen ml-auto mr-2 cursor-pointer" onClick={() => {
                setToggleCreateModal(oldToggle => !oldToggle)
              }} />
              { toggleCreateModel && (
    
                <CreatePost user={user} onDismiss={setToggleCreateModal} />
              )}
            </>
          )}
          <div className='flex flex-col gap-2'>
            <UserDashboard user={user} setView={setView} />
            
            {view == 'posts' && <Posts posts={user.posts} />}
          </div>
        </div>
  )
}

export default UserProfile

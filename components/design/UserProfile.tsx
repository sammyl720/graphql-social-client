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
    <div className='flex flex-col max-w-lg mx-auto'>
      <Head>
        <title>Kesher | Profile </title>
        <meta name="description" content={`${user.name} is on kesher.`} />
      </Head>
          <i className="fas fa-pen ml-auto cursor-pointer" onClick={() => {
            setToggleCreateModal(oldToggle => !oldToggle)
          }} />
          { toggleCreateModel && (

            <CreatePost user={user} onDismiss={setToggleCreateModal} />
          )}
          <div className='flex flex-col gap-2'>
            <UserDashboard user={user} setView={setView} />
            
            {view == 'posts' && <Posts posts={user.posts} />}
          </div>
        </div>
  )
}

export default UserProfile

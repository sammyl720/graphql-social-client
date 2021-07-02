import React, { useContext, useState } from 'react'
import Link from 'next/dist/client/link'
import Badge from './Badge'
import Posts from '../posts/Posts'
import Head from 'next/head'
import Context from '../../context/general/Context'
import CreatePost from '../modals/CreatePost'

import { User } from '../../interfaces'
interface UserProfileProps {
  user: User
}
const UserProfile:React.FC<UserProfileProps> = ({ user }) => {
  const [toggleCreateModel, setToggleCreateModal] = useState(false)
  const { me } = useContext(Context)
  const [view, setView] = useState("posts")
  return (
    <div className='p-2 flex flex-col gap-2 max-w-2xl mx-auto'>
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
            <figure className={`flex justify-between items-center flex-col max-content  max-w-md mx-auto p-5`}>
              <img className='profile' src={user.profile_img?.secure_url || '/imgs/user.png'} alt="profile picture" />
              <figcaption className='mt-1'>
                <Link href={`/profile/${user.id}`}>
                    <a>{user.name}</a>
                </Link>
              </figcaption>
            </figure>
            <div className='flex-grow flex flex-col'>
              <div className="flex flex-col w-100 md:flex-row items-center justify-between p-2">
                <Badge icon="fas fa-user-friends" text={`${user.posts.length} posts`} onClick={() => setView("posts") } />
                <Badge icon='fas fa-user-friends' text={`${user.following.length} Following`} onClick={() => setView('following')} />
                <Badge icon='fas fa-user-friends' text={`${user.followers.length} Followers`} onClick={() => setView('followers')} />
              </div>
            </div>
            {view == 'posts' && <Posts posts={user.posts} />}
          </div>
        </div>
  )
}

export default UserProfile

import React, { useContext, useState } from 'react'
import Link from 'next/dist/client/link'
import Badge from './Badge'
import Posts from '../posts/Posts'
import Context from '../../context/general/Context'
const UserProfile = ({ user }) => {
  const { me } = useContext(Context)
  const [view, setView] = useState("posts")
  return (
    <div className='p-2 flex flex-col gap-2 '>
          <div className='flex flex-col md:flex-row gap-2'>
            <figure className={`flex justify-between items-center flex-col max-content p-2  max-w-md mx-auto p-5`}>
              <img className='profile' src={user.profile_img || 'https://cdn.pixabay.com/photo/2016/03/05/13/05/family-1237701__340.jpg'} alt="profile picture" />
              <figcaption className='mt-1'>
                <Link href={`/profile/${user.id}`}>
                    <a>{user.name}</a>
                </Link>
              </figcaption>
            </figure>
            <div className='flex-grow flex flex-col'>
              <div className="flex w-100 items-center justify-between p-2">
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

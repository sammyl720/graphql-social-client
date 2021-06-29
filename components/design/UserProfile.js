import React from 'react'
import Link from 'next/dist/client/link'
const UserProfile = ({ user }) => {
  return (
    <div className='p-2 flex flex-col gap-2 '>
          <div className='flex flex-col md:flex-row gap-2'>
            <figure className={`flex justify-between items-center flex-col max-content p-2`}>
              <img className='max-w-sm' src={user.profile_img || '/imgs/user.png'} alt="profile picture" />
              <figcaption>
                <Link href={`/profile/${user.id}`}>
                    <a>{user.name}</a>
                </Link>
              </figcaption>
            </figure>
            <div className='flex-grow flex flex-col'>
              <div className="flex w-100 items-center justify-between p-2">
                <div className='flex flex-col items-center justify-between p-2'>
                  <i className="fas fa-user-friends" />
                  <strong>{user.followers.length} Followers</strong>
                </div>
                <div className='flex flex-col items-center justify-between p-2'>
                  <i className="fas fa-user-friends" />
                  <strong>{user.following.length} Following</strong>
                </div>
                <div className='flex flex-col items-center justify-between p-2'>
                  <i className="fas fa-user-friends" />
                  <strong>{user.followers.length} Followers</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default UserProfile

import React, { useContext } from 'react'
import Link from 'next/link';
import Badge from './Badge';
import { User } from '../../interfaces';
import Context from '../../context/general/Context';

interface DashBoardProps {
  user: User;
  setView: React.Dispatch<React.SetStateAction<string>>
}
function UserDashboard({ user, setView }: DashBoardProps) {
  const { me } = useContext(Context)
  return (
    <div>
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
          <Badge size='medium' icon="fas fa-user-friends" text={`${user.posts.length} posts`} onClick={() => setView("posts") } />
          <Badge size='medium' icon='fas fa-user-friends' text={`${user.following.length} Following`} onClick={() => setView('following')} />
          <Badge size='medium'  icon='fas fa-user-friends' text={`${user.followers.length} Followers`} onClick={() => setView('followers')} />
        </div>
      </div>
    </div>
  )
}

export default UserDashboard

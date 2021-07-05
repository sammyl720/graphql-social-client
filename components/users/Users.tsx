import React from 'react'
import { User } from '../../interfaces'
import UserComponent from './User';
interface UsersProps {
  users: User[]
}
export default function Users({ users }: UsersProps) {
  return (
    <div className='flex flex-wrap'>
      {users.map(user => {
        return <UserComponent user={user} key={user.id} />
      })}
    </div>
  )
}

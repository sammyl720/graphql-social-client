import React from 'react'
import { User } from '../../interfaces'
import Link from 'next/link'
import { Image, Transformation } from 'cloudinary-react'
interface UserProps {
  user: User
}
export default function UserComponent({ user }: UserProps) {
  return (
    <section className='bg-white p-2 min-w-min m-2 rounded shadow'>
      <Link href={`/profile/${user.id}`}>
        <a>
        <figure className="flex flex-col p-2 items-center">
          <Image className='w-24 h-24 mb-2' publicId={`${user.profile_img ? user.profile_img.public_id : 'picture-profile_j5jmd0.png'}`} cloudName={process.env.NEXT_PUBLIC_CLOUD_NAME}>
            <Transformation gravity="face" width="80" height="80" radius="40" crop="thumb" />
          </Image>
          
          <figcaption>
            {user.name}
          </figcaption>
        </figure>
        </a>
      </Link>
    </section>
  )
}

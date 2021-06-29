import React, { useState } from 'react'
import Badge from '../design/Badge'
export default function Post({ post }) {
  const date = new Date(post.created_on.full_date)
  console.log(date.getTime())
  const [drawer, setDrawer] = useState(false)
  return (
    <article className='flex  p-2 my-2 bg-gray-50 rounded shadow'>
      <figure className="flex flex-col min-w-max mr-2 items-center border">
        <img className='profile-small' src={`${post.user.profile_img || '/imgs/user.png'}`} alt="user" />
      </figure>
      <section className='flex flex-col justify-between w-full h-full p-2'>
        <small className='pl-1 mb-2'>{post.user.name} <time className="text-xs text-gray-500 ml-2" dateTime={date.toISOString()}>{post.created_on.date}</time></small>
        <p className="leading-12 px-1 py-1 border-b">
          {(post.text.length > 1 ) && !drawer ? (post.text.substr(0,50) + '...') : (post.text)}  
        </p>
          {(post.text.length > 1 ) && (
            <div className='my-2 mx-auto flex justify-center cursor-pointer w-10' onClick={() => setDrawer(old => !old)}>
                drawer ? (
                  <i className="fas fa-chevron-down"  />
                  ): (
                  <i className="fas fa-chevron-up" />
                  )
            </div>
            )}
            <div className="flex items-center justify-between m-1 mt-2">
              <Badge text={`${post.likes.length}`} icon="far fa-heart" row={true} />
              <Badge text={`${post.comments.length}`} icon="far fa-comments" row={true} />
            </div>
      </section>
    </article>
  )
}

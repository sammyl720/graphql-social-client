import React, { useState } from 'react'

export default function Post({ post }) {
  const date = new Date(post.created_on.full_date)
  console.log(date.getTime())
  const [drawer, setDrawer] = useState(false)
  let text = `
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus facere et architecto neque magnam quis iusto eligendi, quasi tempore fugit alias inventore quo sit molestias molestiae reprehenderit accusantium suscipit exercitationem.
  `
  return (
    <article className='flex  p-2 my-2 bg-gray-50 rounded shadow'>
      <figure className="flex flex-col min-w-max mr-2 items-center border">
        <img className='w-24 h-auto' src={`${post.user.profile_img || '/imgs/user.png'}`} alt="user" />
      </figure>
      <section className='flexflex-col justify-between w-full h-full p-2'>
        <small>{post.user.name} <time className="text-xs text-gray-500 ml-2" dateTime={date.toISOString()}>{post.created_on.date}</time></small>
        <p className="leading-12 px-1 py-1 border-b">
          {(post.text.length > 50 ) && !drawer ? (post.text.substr(0,50) + '...') : (post.text)}  
        </p>
          {(post.text.length > 300 ) && (
            <div className='my-2 mx-auto flex justify-center cursor-pointer w-10' onClick={() => setDrawer(old => !old)}>
                drawer ? (
                  <i className="fas fa-chevron-down"  />
                  ): (
                  <i className="fas fa-chevron-up" />
                  )
            </div>
            )}
      </section>
    </article>
  )
}

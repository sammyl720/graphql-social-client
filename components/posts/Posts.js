import React from 'react'
import Post from './Post'
export default function Posts({ posts }) {
  return (
    <div className="flex flex-col gap-2">
      {
        posts.map(post => {
          return <Post key={post.id} post={post} />
        })
      }
    </div>
  )
}

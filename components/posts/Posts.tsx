import React from 'react'
import Post from './Post'

import { Post as PostType } from '../../interfaces'

interface PostProps {
  posts: PostType[]
}
export default function Posts<PostProps>({ posts }) {
  return (
    <div className="flex flex-col gap-2">
      {
        posts.map((post: PostType) => {
          return <Post key={post.id} post={post} />
        })
      }
    </div>
  )
}

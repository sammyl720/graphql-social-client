import React, { useContext, useState, useEffect } from 'react'
import Badge from '../design/Badge'
import { Image, Transformation } from 'cloudinary-react'
import { Post as PostType } from '../../interfaces'
import getTimeDifference from '../../utils/getTimeDiffernce'
import Context from '../../context/general/Context'

interface PostProps {
  post: PostType;
  key:String;
}
export default function Post({ post }: PostProps) {
  const { me, toggleLikePost, deletePost } = useContext(Context);
  const date = new Date(post.created_on.full_date)
  const { text } = getTimeDifference(date)
  const [drawer, setDrawer] = useState(false)
  const isPostOwner = post.user.id == me.id;
  const [toggleLike, setToggleLike] = useState<boolean>(false)
  useEffect(() => {
    setToggleLike(post.likes.some(user => user.id == me.id))
  }, [post.likes])
  return (
    <article className='flex flex-col p-4 my-2 bg-gray-50 rounded shadow'>
      { isPostOwner && (
        <div className='w-4 ml-auto' onClick={() => {
          deletePost({ variables: { id: post.id }})
        }}>
          <i className='fas fa-trash text-red-600' />
        </div>
      )}
      <figure className="flex mr-2 items-center">
        {post.user.profile_img && (
          <Image 
            cloudName={process.env.NEXT_PUBLIC_CLOUD_NAME}
            public_id={post.user.profile_img.public_id}>
              <Transformation width='40' crop='scale' />
              <Transformation radius='50' />
          </Image>
        )}
        <div className="flex flex-col pl-1 ml-2 h-full">
          <small>{post.user.name}</small>
          <time className="text-xs text-gray-500" dateTime={date.toISOString()}>{text}</time>
        </div>
      </figure>
      <section className='flex flex-col justify-between w-full h-full my-2'>
        <p className="leading-12 px-1 my-2 py-1 border-b">
          {(post.text.length > 1 ) && !drawer ? (post.text.substr(0,50) + '...') : (post.text)}  
        </p>
        {post.images.length > 0 && (
          <Image 
          cloudName={process.env.NEXT_PUBLIC_CLOUD_NAME}
          publicId={post.images[0].public_id}>
            <Transformation width='200' crop='scale' />
        </Image>
        )}
        
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
              <Badge text={`${post.likes.length}`} icon={`fas fa-heart ${toggleLike && 'text-red-400'}`} onIconClick={() => {
                toggleLikePost({ variables: { id: post.id }})
              }} row={true} />
              <Badge text={`${post.comments.length}`} icon="far fa-comments" row={true} />
            </div>
      </section>
    </article>
  )
}

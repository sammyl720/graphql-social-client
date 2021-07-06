import React, { useState, useEffect} from 'react'
import Link from 'next/link'
import { Image, Transformation } from 'cloudinary-react'

const CustomLink = ({ href, title, current, img = null }) => {
  const [highlight, setHighlight] = useState(false)
  useEffect(() => {
    setHighlight(href == current)
  }, [current])
  return (
    <Link href={href}>
      {img ? (
        <a className='bg-transparent mr-4'>
          <Image
            cloudName={process.env.NEXT_PUBLIC_CLOUD_NAME}
            public_id={img}>
              <Transformation width='48' height='48' radius='24' crop='thumb' />
          </Image>
        </a>
      ) :(
      <a className={`${highlight ? 'text-blue-600 font-semibold' : 'text-indigo-50 hover:text-blue-300'} text-xl px-4`}>
        {title}
      </a>)}
    </Link>
  )
}

export default CustomLink

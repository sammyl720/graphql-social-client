import React, { useState, useEffect} from 'react'
import Link from 'next/link'

const CustomLink = ({ href, title, current }) => {
  const [highlight, setHighlight] = useState(false)
  useEffect(() => {
    setHighlight(href == current)
  }, [current])
  return (
    <Link href={href}>
      <a className={`${highlight ? 'text-blue-600 font-semibold' : 'text-indigo-50 hover:text-blue-300'} text-xl px-4`}>{title}</a>
    </Link>
  )
}

export default CustomLink

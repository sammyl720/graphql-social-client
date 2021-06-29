import React from 'react'

const Badge = ({ icon, text, onClick, size, row }) => {
  return (
  <div className={`flex cursor-pointer ${row ? 'gap-4 justify-center' : 'flex-col justify-between'} items-center  p-2 ${size == 'small' && 'text-sm'} `} onClick={onClick}>
    <i className={icon + ' mb-2'} />
    <strong>{text}</strong>
  </div>
  )
}

Badge.defaultProps = {
  icon: "fas fa-pen",
  text: "A PEN",
  onClick: () => 'hello',
  size: 'large',
  row: false
}

export default Badge

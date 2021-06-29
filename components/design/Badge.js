import React from 'react'

const Badge = ({ icon, text, onClick }) => {
  return (
    <div className='flex flex-col items-center justify-between p-2' onClick={onClick}>
    <i className={icon + ' mb-2'} />
    <strong>{text}</strong>
  </div>
  )
}

Badge.defaultProps = {
  icon: "fas fa-pen",
  text: "A PEN",
  onClick: () => 'hello'
}

export default Badge

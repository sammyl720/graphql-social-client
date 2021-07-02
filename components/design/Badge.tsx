import React from 'react'


interface BadgeProps {
  icon?: String;
  text?: String;
  onClick?: () => any;
  size?: "small" | "medium" | "large"
  row?: boolean
}


const Badge:React.FC<BadgeProps> = ({ icon, text, onClick, size, row }) => {
  return (
  <div className={`flex my-2 md:my-0  cursor-pointer ${row ? 'gap-4 justify-center' : 'flex-col justify-between'} items-center  p-2 ${size == 'small' && 'text-sm'} `} onClick={onClick}>
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

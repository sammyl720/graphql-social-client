import React from 'react'


interface BadgeProps {
  icon?: String;
  text?: String;
  onClick?: () => any;
  size?: "small" | "medium" | "large"
  row?: boolean,
  onIconClick?: () => any;
}


const Badge:React.FC<BadgeProps> = ({ icon, text, onClick, size, row, onIconClick }) => {
  return (
  <div className={`flex my-2 md:my-0  cursor-pointer ${row ? 'gap-4 justify-center' : 'flex-col justify-between'} items-center  p-2 ${size == 'small' && 'text-sm'} ${size == 'medium' && 'text-md'}`} onClick={onClick}>
    <i className={icon + ' mb-2'} onClick={onIconClick} />
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

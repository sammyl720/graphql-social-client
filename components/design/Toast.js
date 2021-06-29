import React, { useRef } from 'react'

const Toast = ({ type = 'default', message, onLeave}) => {
  const ref = useRef()
  const dismiss = () => {
    // console.log(ref.current.classList)
    ref.current.classList.add('leave')
    setTimeout(() => {
      onLeave()
    }, [3000])
  }
  return (
    <div ref={ref} className={`toast ${type}`} onClick={dismiss}>
      {message}
      <i className="fas fa-times dismiss" onClick={dismiss} />
    </div>
  )
}

export default Toast

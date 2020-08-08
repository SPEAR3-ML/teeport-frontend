import React from 'react'

const IconSpan = ({ icon: Icon, label }) => {
  return (
    <span className='d-flex flex-row flex-grow-1'>
      <span className='d-flex flex-column flex-grow-0'>
        <Icon className='flex-grow-1'/>
      </span>
      <span className='flex-grow-1 ml-2'>
        {label}
      </span>
    </span>
  )
}

export default IconSpan

import React from 'react'

const NotFound = () => {
  return (
    <div className='w-full h-[80vh] flex justify-center items-center '>
      <p>
        <span><img className='w-64 h-52 object-cover' src='/sadface.gif'/> </span>
        <span>The Page you are Looking for is not Found </span>
      </p>
       
    </div>
  )
}

export default NotFound
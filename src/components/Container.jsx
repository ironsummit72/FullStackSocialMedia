import React from 'react'

function Container({children,className}) {
  return (
    <div className={` w-full h-screen relative  flex-col  bg-gray-100 overflow-x-hidden ${className}`}>
    {children}
   </div>
  )
}

export default Container
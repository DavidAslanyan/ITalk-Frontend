import React from 'react'
import Image from 'next/image'
import hero3d from '../../../public/user-avatars/male-1.png'

const UserCircle = () => {
  return (
    <div className='relative'>
      <div className='z-30 w-8 absolute left-1 top-1'>
        <Image src={hero3d} alt="hero" />
      </div>
      <div className='z-20 absolute top-0 bg-white w-10 h-10 rounded-full'></div>
      {/* <div className='z-10 absolute top-[0.30rem] bg-gray-200 w-10 h-10 rounded-full'></div> */}
    </div>
  )
}

export default UserCircle;

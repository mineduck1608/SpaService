import React from 'react'
import { FaSpa } from 'react-icons/fa6'

interface HeaderProps {
  title: string
  position: string
}

const IntroHeader: React.FC<HeaderProps> = ({ title, position }) => {
  const isFacilities = title === 'Facilities'
  const isLeft = position === 'left'

  return (
    <div
      className={`${
        isFacilities
          ? 'mx-auto max-w-2xl px-2 py-3 text-left'
          : isLeft
            ? 'py-6 text-left'
            : 'mx-auto max-w-2xl py-6 text-center'
      }`}
      data-aos='fade-down'
      data-aos-delay='1000'
    >
      <h1 className={`text-5xl ${isFacilities ? 'text-white' : 'text-purple1'}`}>{title}</h1>
      {isFacilities ? (
        <div className='ml-3 flex items-center justify-start space-x-2'>
          <div className='h-px w-10 bg-white'></div>
          <FaSpa className='h-6 w-6' />
          <div className='h-px w-10 bg-white'></div>
        </div>
      ) : (
        <div className={`flex items-center ${isLeft ? 'ml-2 justify-start' : 'justify-center'} mt-2 space-x-4`}>
          <img
            src='https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png'
            alt=''
            className='h-6 w-auto'
          />
        </div>
      )}
    </div>
  )
}

export default IntroHeader

import React from 'react'

interface HeaderProps {
  title: string
  position: string
  size: string
}

const IntroHeader: React.FC<HeaderProps> = ({ title, position, size }) => {
  const isFacilities = title === 'Facilities'
  const isLeft = position === 'left'
  const isBig = size === 'big'

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
      <h1 className={`${isBig ? 'text-5xl' : 'text-3xl'} ${isFacilities ? 'text-white' : 'text-purple1'}`}>{title}</h1>
      {isFacilities ? (
        <div className='mt-1 flex items-center justify-start space-x-2'>
          <img
            src='https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png'
            alt=''
            className='h-6 w-auto brightness-0 invert'
          />
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

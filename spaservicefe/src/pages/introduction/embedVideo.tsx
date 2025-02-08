import React, { useState } from 'react'
import { CiPlay1 } from 'react-icons/ci'
import { X } from 'lucide-react'

export default function EmbedVideo() {
  const [isPlayed, setIsPlayed] = useState(false)
  const showVideo = () => {
    setIsPlayed(true)
  }
  const hideVideo = () => {
    setIsPlayed(false)
  }

  return (
    <div className='relative mt-32 overflow-hidden'>
      <div className='group'>
        <img
          src='https://senspa.com.vn/wp-content/uploads/2021/01/banner8.jpg'
          alt=''
          className='h-full w-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-150'
        />
        <button
          onClick={showVideo}
          className='absolute flex h-16 w-16 items-center justify-center rounded-full border border-white bg-black/30
                            text-white transition-all hover:bg-black/40 md:h-20 md:w-20 lg:h-24 lg:w-24'
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <CiPlay1 className='h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12' />
        </button>
      </div>
      {!isPlayed ? (
        <div></div>
      ) : (
        <div className='fixed mt-20 inset-0 z-50 flex items-center justify-center modal-bg'>
          <div className='relative aspect-video w-full max-w-7xl'>
            <button onClick={hideVideo} className='absolute right-2 top-2 text-3xl font-bold text-white'>
              <X />
            </button>
            <iframe
              className='h-full w-full bg-transparent'
              src='https://www.youtube.com/embed/U0kpKmENnLA?autoplay=1'
              title='Spa Video'
              frameBorder='0'
              allow='autoplay'
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}

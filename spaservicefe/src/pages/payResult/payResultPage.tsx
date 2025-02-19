import React, { useEffect, useState } from 'react'

export default function PayResultPage() {
  const [r, setR] = useState(false)

  useEffect(() => {
    const s = window.location.search.substring(1)
    if (s.length !== 0) {
      setR(s.includes('success'))
    }
  }, [])

  return (
    <div className='relative h-[100vh] w-full overflow-hidden'>
      {/* Hình ảnh nền */}
      <div
        className='h-full w-full bg-cover bg-center transition-all'
        style={{
          backgroundImage: `url(https://senspa.com.vn/wp-content/uploads/2020/11/banner-2.png)`
        }}
      ></div>
      <div className='absolute left-0 right-0 top-36 z-10 mt-32 flex justify-center'>
        <div className='flex w-3/5 justify-center'>
          <div className='flex w-2/3 items-center justify-center rounded-lg bg-white p-20 shadow-lg'>
            {r && (
              <div>
                <p className='text-center text-3xl font-bold text-green-400'>Payment successful!</p>
                <p className='text-xl'>Thank you for your consideration.</p>
                <p className='text-xl'>Please wait. We will redirect you to home page shortly...</p>
              </div>
            )}
            {!r && (
              <div>
                <p className='text-center text-3xl font-bold text-red-600'>Payment unsuccessful!</p>
                <p className='text-xl'>Due to an unexpected error, your payment could not be finished</p>
                <p className='text-xl'>Please try again, and if the errors keep happening, please contact us.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import CustomerApplication from './customerApplicationForm'
import IntroHeader from '../../components/introductionHeader'

const CustomerApplicationPage = () => {
  useEffect(() => {
    AOS.init({
      offset: 0,
      delay: 200,
      duration: 1200,
      once: true
    })
  }, [])

  return (
    <main className='overflow-x-hidden font-montserrat'>
      <div className='absolute inset-0 -z-10 h-full w-full bg-custom-bg3 bg-contain bg-left-top bg-no-repeat' />
      {/* Top Page */}
      <div className='relative'>
        <img
          src='https://senspa.com.vn/wp-content/uploads/2020/11/DSC5622.jpg'
          alt=''
          className='h-[50vh] w-full object-cover'
        />
        <div className='w-full' data-aos='fade-right' data-aos-delay='400'>
          <div className='container mx-auto flex justify-center px-1 py-3 md:justify-start'>
            <div className='text-md text-gray-400'>
              <a className='text-md text-gray-400 no-underline' href='/'>
                Home
              </a>
              <span className='mx-2'>&gt;</span>
              <span>Application</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <IntroHeader title='Application' position='middle' size='big' />
      <CustomerApplication />
    </main>
  )
}

export default CustomerApplicationPage

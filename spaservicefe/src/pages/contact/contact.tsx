import React, { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import ContactForm from './contactForm'
import IntroHeader from '../../components/introductionHeader'

const ContactPage = () => {
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
      <div className='absolute inset-0 w-full h-full bg-custom-bg3 bg-no-repeat bg-contain bg-left-top -z-10' />
      {/* Top Page */}
      <div className='relative'>
        <img
          src='https://senspa.com.vn/wp-content/uploads/2020/11/DSC5622.jpg'
          alt=''
          className='w-full h-[50vh] object-cover'
        />
        <div className='w-full' data-aos='fade-right' data-aos-delay='400'>
          <div className='container mx-auto flex justify-center px-1 py-3 md:justify-start'>
            <div className='text-md text-gray-400'>
              <a className='text-md text-gray-400 no-underline' href='/'>
                Home
              </a>
              <span className='mx-2'>&gt;</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <IntroHeader title='Contact' position='middle' size='big' />
      <ContactForm />

      {/* Address */}
      <div className='mt-20 mb-10 h-[600px]'>
        <iframe
          className='w-full h-full bg-transparent'
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.388742856933!2d106.7066873539341!3d10.781508963866614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f493415d4bd%3A0x4ca12ae2ae63ab5d!2zMTBCMSBMw6ogVGjDoW5oIFTDtG4sIELhur9uIE5naMOpLCBRdeG6rW4gMSwgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1739196741461!5m2!1svi!2s'
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        />
      </div>

      {/* Infor */}
      <div className='flex justify-center items-center'>
        <div>
          <IntroHeader title='SENVIET SPA QUỐC TẾ INTERNATIONAL TERMINAL' position='middle' size='medium' />
          <div className='text-center pb-12'>
            <p data-aos='fade-right' data-aos-delay='200'>
              Tầng 1, Ga đi Quốc tế
            </p>
            <p data-aos='fade-right' data-aos-delay='400'>
              3st floor, International Departure Terminal
            </p>
            <p data-aos='fade-right' data-aos-delay='600'>
              Tel : <span className='font-semibold'>(+84) 35 470 658</span>
            </p>
            <p data-aos='fade-right' data-aos-delay='800'>
              Website:{' '}
              <a className='transition-transform hover:text-purple1' href='/'>
                senvietspa.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ContactPage

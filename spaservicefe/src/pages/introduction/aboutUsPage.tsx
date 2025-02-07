import React, { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import IntroHeader from '../../components/introductionHeader'
import EmbedVideo from './embedVideo'
import History from './history'
import Facilities from './facilities'
import ChooseUs from './whyChooseUs'

const AboutUsPage = () => {
  const SpaData = [
    {
      id: 1,
      image: 'https://senspa.com.vn/wp-content/uploads/2020/12/icon-5.png',
      title: 'Hearing',
      description: 'Calming melodies help relieve stress and depression so you can slowly drift into deep sleep.',
      aosDelay: '300'
    },
    {
      id: 2,
      image: 'https://senspa.com.vn/wp-content/uploads/2020/12/icon-1.png',
      title: 'Smell',
      description:
        'The nose is welcomed by the pleasant aroma of plants and natural essential oil covering the entire floors.',
      aosDelay: '500'
    },
    {
      id: 3,
      image: 'https://senspa.com.vn/wp-content/uploads/2020/12/icon-4.png',
      title: 'Touch',
      description: 'Your bright smooth skin will be well cared for with gentle strokes to remove all muscle knots.',
      aosDelay: '700'
    },
    {
      id: 4,
      image: 'https://senspa.com.vn/wp-content/uploads/2020/12/icon-2.png',
      title: 'Visual',
      description:
        'Minimalistic decoration and gentle lighting help transcend your spirit to another realm and drown your body in deep relaxing moments.',
      aosDelay: '900'
    },
    {
      id: 5,
      image: 'https://senspa.com.vn/wp-content/uploads/2020/12/icon-3.png',
      title: 'Taste',
      description: 'Not only is our special drink delicious, but it is also rejuvenating for your health and skin.',
      aosDelay: '1100'
    }
  ]
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
      {/* Top Page */}
      <div className='relative'>
        <img
          src='https://senspa.com.vn/wp-content/uploads/2020/11/banner_gioithieu.jpg'
          alt=''
          className='h-[50vh] w-full object-cover'
        />
      </div>
      <div className='w-full' data-aos='fade-right' data-aos-delay='400'>
        <div className='container mx-auto flex justify-center px-32 py-5 md:justify-start'>
          <div className='text-md text-gray-400'>
            <a href='/'>Home</a>
            <span className='mx-2'>&gt;</span>
            <span>About Us</span>
          </div>
        </div>
      </div>

      {/* About Us */}
      <div className='container mx-auto my-10 bg-custom-bg5 bg-right-top bg-no-repeat px-4 pb-5'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          <div className='absolute inset-0 -z-10 h-full w-full bg-custom-bg3 bg-contain bg-left-top bg-no-repeat' />
          <div className='flex flex-col items-center text-center'>
            <IntroHeader title={'About Us'} position='middle' />
            <div className='max-w-lg text-lg text-gray-900'>
              <p className='' data-aos='fade-down' data-aos-delay='300'>
                Associated with the beauty of a sincere, romantic, yet very resilient flower, SenSpa is designed and
                decorated in a rustic and simple style, featuring bold traditional characteristics of Vietnam.
              </p>
              <p className='mt-6' data-aos='fade-down' data-aos-delay='200'>
                Located in the center of HCM City via an alley entrance, SenSpa is separated from the noisy atmosphere
                to open into a gentle and serene space.
              </p>
              <p className='mt-6' data-aos='fade-down' data-aos-delay='400'>
                With almost <span className='font-semibold'>30 therapists</span> being professionally trained and
                certified following <span className='font-bold'>international standards</span>, SenSpa is proud to be a
                perfect wellness destination that meets the needs of the most fastidious guests from all around the
                world.
              </p>
            </div>
          </div>
          <div className='mx-auto mt-5 grid max-w-lg grid-cols-2 gap-4'>
            <img
              src='http://4.bp.blogspot.com/-OsmPR1OeXjM/UgwAo1EgmEI/AAAAAAAAABQ/SFHlnU1583c/s1600/Small-treatment-room.jpg'
              alt=''
              className='h-60 rounded-bl-[5rem] rounded-tr-[5rem] object-cover'
              data-aos='fade-up'
              data-aos-delay='400'
            />
            <img
              src='https://wallpapercave.com/wp/wp4085230.jpg'
              alt=''
              className='mt-12 h-48 w-52 rounded-br-[5rem] rounded-tl-[5rem] object-cover'
              data-aos='fade-up'
              data-aos-delay='500'
            />
            <div className='relative' data-aos='fade-up' data-aos-delay='600'>
              <div className='text-l absolute inset-0 flex h-44 -translate-x-2 translate-y-3 flex-col items-center justify-center rounded-br-[5rem] rounded-tl-[5rem] bg-purple-900 p-6 text-white'>
                <div className='text-4xl font-bold'>21</div>
                <div className='text-3xl'>years</div>
                <div className='mt-2'>dedication to customers</div>
              </div>
              <div className='h-44 rounded-br-[5rem] rounded-tl-[5rem] bg-pink-800 object-cover p-6 text-white'></div>
            </div>
            <img
              src='https://2.bp.blogspot.com/-lSnHcuHJJWM/WD9pG-bIVeI/AAAAAAAAAOg/pxlMGhQi10gXxG0qKBNuU8vw5_jRIKteACLcB/s1600/first.jpg'
              alt=''
              className='h-56 rounded-bl-[5rem] rounded-tr-[5rem] object-cover'
              data-aos='fade-up'
              data-aos-delay='700'
            />
          </div>
        </div>
      </div>

      {/* History */}
      <History />

      {/* Video */}
      <EmbedVideo />

      {/* What is spa */}
      <div className='container mx-auto my-16 space-y-4'>
        <div className='mx-auto max-w-[100vh] space-y-1 text-center'>
          <IntroHeader title={'What is SPA?'} position='middle' />
          <p className='text-lg text-gray-900' data-aos='fade-right' data-aos-delay='400'>
            Today, SPA is defined as health and beauty treatments that helps balance the body and spirit. A true spa
            must be able to influence these senses and help re-energize the customers so they can become healthier and
            younger.
          </p>
        </div>
        <div className='flex flex-row flex-wrap justify-center gap-10'>
          {SpaData.map(({ id, image, title, description, aosDelay }) => (
            <div
              key={id}
              data-aos='fade-up'
              data-aos-delay={aosDelay}
              className='mt-8 flex max-w-[200px] flex-col items-center space-y-7 transition-all duration-300 hover:-translate-y-7'
            >
              <div className='relative transition-all duration-300 hover:-translate-y-3'>
                {/* <div className='text-5xl'>{icon}</div> */}
                <img src={image} alt='' />
              </div>
              <div className='text-center'>
                <h3 className='mb-3 text-xl font-extrabold text-black'>{title}</h3>
                <p className='text-sm text-black'>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why choose us */}
      <ChooseUs />

      {/* Gallery */}
      <Facilities />
    </main>
  )
}

export default AboutUsPage

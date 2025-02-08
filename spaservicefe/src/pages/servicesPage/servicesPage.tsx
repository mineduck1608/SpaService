import React, { useState } from 'react'
import { imgs, sample } from './servicesPage.util'
import { Link } from 'react-router-dom'
import { CategoryMenu } from './categoryMenu'
import ServiceList, { ServiceCard } from './serviceList'

export default function ServicesPage() {
  const [currentService, setCurrentService] = useState('XXX')
  return (
    <div>
      <img src={imgs.headerBg} alt='Header' className='w-full' />
      <div className='mb-20 p-2 md:ml-28  lg:ml-5 xl:ml-40'>
        <span className='font-normal text-gray-400'>
          <Link to={'/'}>Home</Link>
          &nbsp;&gt; {currentService}
        </span>
      </div>
      {/* Main container */}
      <div className='mb-20 flex md:ml-24 md:mr-24 lg:ml-5 lg:mr-5'>
        <div className='flex w-full justify-center bg-purple-200 lg:justify-normal'>
          {/* Left menu */}
          <div className='hidden w-[310px] lg:flex 2xl:ml-[17.5vw]'>
            <div id={'left-menu'} className='hidden justify-center lg:flex'>
              <CategoryMenu
                items={sample}
                onClickItem={(v) => {
                  setCurrentService(v)
                }}
              />
            </div>
          </div>
          {/* Services available */}
          <div className='w-5/6 bg-red-100 lg:ml-[5vw] 2xl:w-[45%]'>
            <ServiceList/>
          </div>
        </div>
      </div>
    </div>
  )
}

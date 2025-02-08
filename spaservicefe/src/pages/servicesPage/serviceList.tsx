import { Service } from '@/types/services'
import React from 'react'
import { imgs, service, service2 } from './servicesPage.util'

export default function ServiceList(prams?: { service: Service[] }) {
  return (
    <div className='bg-slate-300'>
      <div className='sm:flex justify-evenly'>
        <ServiceCard s={service} />
        <ServiceCard s={service2} />
      </div>
    </div>
  )
}
export function ServiceCard(params?: { s: Service }) {
  return (
    <div className='bg-green-200 w-full lg:w-[45%]'>
      {/* Container */}
      <div className=''>
        <img
          src={imgs.headerBg}
          alt='img'
          className='rounded-t-sm w-full'
        />
        <div className='mt-5'>
          <p className='text-center font-bold text-lg'>{params?.s.serviceName}</p>
        </div>
        <img 
          
        />
      </div>
    </div>
  )
}
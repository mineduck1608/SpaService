import { Service } from '@/types/services'
import React from 'react'
import { formatNumber, imgs, service, service2 } from './servicesPage.util'
import sep from '../../images/serviceBg/separator.png'

export default function ServiceList(params?: { service: Service[] }) {
  return (
    <div className='p-1'>
      <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>{params?.service.map((v) => <ServiceCard s={v} />)}</div>
    </div>
  )
}

export function ServiceCard(params?: { s: Service }) {
  return (
    <div className='w-full min-w-[300px] shadow'>
      {/* Container */}
      <div className='flex flex-col'>
        <img src={imgs.headerBg} alt='img' className='aspect-[1/0.5] w-full rounded-t-sm' />
        <div className='block p-1'>
          <p className='w-full text-center text-lg font-bold'>{params?.s.serviceName}</p>
        </div>
        <img src={sep} className='mb-2 mt-2 w-1/4 self-center' />
        <div className=''>
          <p className='text-center text-lg font-bold text-[#8D388A]'>{formatNumber(params?.s.price ?? 0)} Đ</p>
        </div>
        <div className='mb-2 flex justify-center'>
          <button className='w-1/2 rounded-br-xl rounded-tl-xl border-2 border-[#8D388A] bg-white p-2 text-[#8D388A] shadow'>
            Read More &gt;
          </button>
        </div>
      </div>
    </div>
  )
}

import { Service } from '@/types/services'
import React from 'react'
import { formatNumber } from '../servicesPage/servicesPage.util'

export default function ServiceOverview(params: { s: Service }) {
  return (
    <div className='flex rounded-lg bg-gray-100'>
      <img className='aspect-[1/0.65] w-1/3 rounded-l-lg' src={params.s.serviceImage} />
      <div className='flex flex-col justify-center pl-5'>
        <p className='text-2xl font-bold'>{params.s.serviceName}</p>
        <p className='text-xl font-bold text-purple1'>{formatNumber(params.s.price)} VND</p>
      </div>
    </div>
  )
}

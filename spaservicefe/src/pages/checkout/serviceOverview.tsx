import { Service } from '@/types/services'
import React, { useContext } from 'react'
import { formatNumber } from '../servicesPage/servicesPage.util'
import { ServiceCheckoutContext } from './checkoutContext'

export default function ServiceOverview(params: { s: Service }) {
  const context = useContext(ServiceCheckoutContext)
  const price = (params.s.price * (100 - context.req.active)) / 100
  return (
    <div className='flex rounded-lg bg-gray-100'>
      <img className='aspect-[1/0.65] w-1/3 rounded-l-lg' src={params.s.serviceImage} />
      <div className='flex flex-col justify-center pl-5'>
        <p className='text-2xl font-bold'>{params.s.serviceName}</p>
        <p className={`text-xl font-bold  ${context.req.active !== 0 ? 'text-[#00dd00]' : 'text-purple1'}`}>
          {formatNumber(price)} VND {context.req.active > 0 ? `(-${context.req.active}%)` : ''}
        </p>
      </div>
    </div>
  )
}

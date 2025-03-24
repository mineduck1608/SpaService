import { Service } from '@/types/services'
import React, { useContext } from 'react'
import { formatNumber } from '../servicesPage/servicesPage.util'
import { ServiceCheckoutContext } from './checkoutContext'

export default function ServiceOverview(params: { s: Service; membershipValue?: number }) {
  const context = useContext(ServiceCheckoutContext)
  const discount = context.req.active + (params.membershipValue ?? 0)
  const hasDiscount = discount > 0
  const price = (params.s.price * (100 - discount)) / 100

  return (
    <div className='flex rounded-lg bg-gray-200 p-4'>
      <img className='aspect-[1/0.65] w-1/3 rounded-l-lg' src={params.s.serviceImage} alt={params.s.serviceName} />
      <div className='flex flex-col justify-center pl-5'>
        <p className='text-2xl font-bold'>{params.s.serviceName}</p>

        {hasDiscount ? (
          <>
            <p className='text-xl font-bold text-gray-500 line-through'>{formatNumber(params.s.price)} VND</p>
            <p className='text-xl font-bold text-purple1'>{formatNumber(price)} VND</p>
          </>
        ) : (
          <p className='text-xl font-bold text-purple1'>{formatNumber(params.s.price)} VND</p>
        )}

        {params.membershipValue && params.membershipValue > 0 && (
          <p className='text-black'>Membership discount: {params.membershipValue}%</p>
        )}
        {context.req.active > 0 && <p className='text-black'>Discount: {context.req.active}%</p>}
      </div>
    </div>
  )
}

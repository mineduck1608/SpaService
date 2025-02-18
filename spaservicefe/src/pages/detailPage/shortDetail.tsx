import { Category } from '@/types/category'
import { Service } from '@/types/services'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { formatNumber } from '../servicesPage/servicesPage.util'
import seperator from '../../images/serviceBg/separator.png'

export default function ShortDetail(params: { d?: Service }) {
  const CATEGORY = JSON.parse(sessionStorage.getItem('categories') ?? '[]') as Category[]
  return (
    <div className='p-2'>
      <p className='text-3xl font-bold'>
        {params.d?.serviceName} ({params.d?.duration})
      </p>
      <img src={seperator} className='mb-3' />
      <p className='text-2xl font-bold text-purple1'>{formatNumber(params.d?.price ?? 0)} VND</p>
      <p className='font-bold'>Description:</p>
      <p className='mb-5'>{params.d?.description}</p>
      {/* Add cart */}
      <div className='mb-3 flex w-3/5 justify-between '>
        <button
          onClick={(e) => {
            sessionStorage.setItem('booked', JSON.stringify(params.d) ?? '')
            if (params.d) {
              window.location.assign('/check-out')
            }
          }}
          className='w-[45%] rounded-br-3xl rounded-tl-3xl bg-purple1 p-[0.625rem] text-white'>Check out</button>
      </div>
      <p className='text-black'>
        Category:&nbsp;
        <Link className='text-black no-underline' to={'/services/' + params.d?.categoryId}>
          {CATEGORY.find((x) => x.categoryId === params.d?.categoryId)?.categoryName}
        </Link>
      </p>
    </div>
  )
}

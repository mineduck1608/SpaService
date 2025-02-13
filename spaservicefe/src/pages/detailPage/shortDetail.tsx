import { Category } from '@/types/category'
import { Service } from '@/types/services'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { formatNumber } from '../servicesPage/servicesPage.util'
import seperator from '../../images/serviceBg/separator.png'

export default function ShortDetail(params: { d?: Service }) {
  const CATEGORY = JSON.parse(sessionStorage.getItem('CATEGORIES') ?? '{}') as Category[]
  const [val, setVal] = useState(1)

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
        {/* Input */}
        <span className='relative w-[45%]'>
          <button
            onClick={() => {
              setVal((v) => Math.max(v - 1, 1))
            }}
            className='left absolute left-2 top-1/4 rounded-full px-2 text-center'
          >
            -
          </button>
          <input
            type='number'
            className='w-full cursor-default rounded-br-3xl rounded-tl-3xl border-[1px] border-purple1 p-[0.625rem] text-center'
            min={1}
            max={10}
            value={val}
            readOnly
          />
          <button
            onClick={() => {
              setVal((v) => Math.min(v + 1, 10))
            }}
            className='absolute right-2 top-1/4 rounded-full px-[0.375rem] text-center'
          >
            +
          </button>
        </span>
        <button className='w-[45%] rounded-br-3xl rounded-tl-3xl bg-purple1 p-[0.625rem] text-white'>
          Add to cart
        </button>
      </div>
      <p className='text-black'>
        Category:&nbsp;
        <Link className='no-underline text-black' to={'/services/' + params.d?.categoryId}>
          {CATEGORY.find((x) => x.categoryId === params.d?.categoryId)?.categoryName}
        </Link>
      </p>
    </div>
  )
}

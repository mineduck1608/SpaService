import { Category } from '@/types/category'
import { Service } from '@/types/services'
import { Link } from 'react-router-dom'
import React from 'react'
import { formatNumber } from '../servicesPage/servicesPage.util'

export default function ShortDetail(params: { d: Service }) {
  const CATEGORY = JSON.parse(sessionStorage.getItem('CATEGORIES') ?? '{}') as Category[]

  return (
    <>
      <p className='text-2xl font-bold'>
        {params.d.serviceName} ({params.d.duration})
      </p>
      <p className='text-lg font-bold text-purple1'>{formatNumber(params.d.price)} VND</p>
      <p className='font-bold'>Description:</p>
      <p>{params.d.description}</p>
      <p className='text-black'>
        Category:&nbsp;
        <Link
          className='no-underline'
          to={'/services/' + params.d.categoryId}>
          {CATEGORY.find((x) => x.categoryId === params.d.categoryId)?.categoryName}
        </Link>
      </p>
    </>
  )
}

import { Service } from '@/types/services'
import React from 'react'

export default function StockImg(params: { s?: Service }) {
  return (
    <div>
      <img src={params?.s?.serviceImage} alt='Image' className='rounded-lg shadow-md' />
    </div>
  )
}

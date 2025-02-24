import { CosmeticProduct } from '@/types/type'
import React from 'react'

export default function StockImg(params: { s?: CosmeticProduct }) {
  return (
    <div>
      <img src={params?.s?.image} alt='Image' className='rounded-lg shadow-md' />
    </div>
  )
}

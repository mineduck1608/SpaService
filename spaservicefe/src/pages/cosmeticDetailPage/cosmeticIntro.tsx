import React from 'react'
import seperator from '../../images/serviceBg/separator.png'
import { CosmeticCategory, CosmeticProduct } from '@/types/type'

export default function CosmeticIntro(params: { s?: CosmeticProduct }) {
  const CATEGORIES = JSON.parse(sessionStorage.getItem('cosmeticcategories') ?? '{}') as CosmeticCategory[]
  const CATEGORY = CATEGORIES.find((x) => x.categoryId === params.s?.categoryId)
  return (
    <div>
      <p className='p-3 text-center text-2xl font-bold'>Cosmetic introduction</p>
      <div className='mb-4 flex justify-center'>
        <img src={seperator} />
      </div>
      {/* Sample text */}
      <div>{CATEGORY?.categoryDescription}</div>
    </div>
  )
}

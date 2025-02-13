import React from 'react'
import seperator from '../../images/serviceBg/separator.png'
import { Service } from '@/types/services'
import { Category } from '@/types/category'

export default function ServiceIntro(params: { s?: Service }) {
  const CATEGORIES = JSON.parse(sessionStorage.getItem('CATEGORIES') ?? '{}') as Category[]
  const CATEGORY = CATEGORIES.find(x => x.categoryId === params.s?.categoryId)
  return (
    <div>
      <p className='p-3 text-center text-2xl font-bold'>Service introduction</p>
      <div className='mb-4 flex justify-center'>
        <img src={seperator} />
      </div>
      {/* Sample text */}
      <div>
        {
          CATEGORY?.categoryDescription
        }
      </div>
    </div>
  )
}

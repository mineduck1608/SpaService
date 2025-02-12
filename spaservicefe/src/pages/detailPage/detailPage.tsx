import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { formatNumber, imgs } from '../servicesPage/servicesPage.util'
import StockImg from './stockImg'
import { Service } from '@/types/services'
import { sampleService } from './detailPage.util'
import { Category } from '@/types/category'
import ShortDetail from './shortDetail'

export default function DetailPage() {
  const [data, setData] = useState<Service>(sampleService)

  return (
    <div>
      <img src={imgs.headerBg} alt='Header' className='w-full' />
      <div className='mb-20 p-2 md:ml-28 lg:ml-5 xl:ml-72'>
        <span className='font-normal text-gray-400'>
          <Link to={'/'} className='text-gray-400 no-underline'>
            Home
          </Link>
          &nbsp;&gt; AAA
        </span>
      </div>
      <div className='flex w-full justify-center bg-red-200 pt-5'>
        <div className='w-5/6 shadow-lg lg:w-3/4'>
          {/* Short intro and img */}
          <div className='flex justify-between'>
            <div className='w-[49.5%] bg-blue-200'>
              <StockImg />
            </div>
            <div className='w-[49.5%] bg-gray-200'>
              <ShortDetail d={data} />
            </div>
          </div>
          {/* Long description... which is missing :( */}
        </div>
      </div>
    </div>
  )
}

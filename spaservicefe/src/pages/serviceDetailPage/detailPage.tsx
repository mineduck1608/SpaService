import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { formatNumber, getServicesOfCategory, imgs } from '../servicesPage/servicesPage.util'
import StockImg from './stockImg'
import { Service } from '@/types/services'
import { getService } from './detailPage.util'
import { Category } from '@/types/serviceCategory'
import ShortDetail from './shortDetail'
import seperator from '../../images/serviceBg/separator.png'
import DetailPageCarousel from './detailPageCarousel'
import ServiceIntro from './serviceIntro'

export default function DetailPage() {
  const { id } = useParams()
  const [data, setData] = useState<Service>()
  const [related, setRelated] = useState<Service[]>([])
  const CATEGORY = JSON.parse(sessionStorage.getItem('categories') ?? '{}') as Category[]
  useEffect(() => {
    async function fetchData() {
      const x = await getService(id ?? '')
      if (x) {
        setData(x)
        const y = await getServicesOfCategory(x.categoryId)
        setRelated(y)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <img src={imgs.headerBg} alt='Header' className='w-full' />
      <div className='mb-10 p-2 md:ml-28 lg:ml-5 xl:ml-[23rem]'>
        <span className='font-normal text-gray-400'>
          <Link to={'/'} className='text-gray-400 no-underline'>
            Home
          </Link>
          &nbsp;&gt;&nbsp;
          <Link to={'/services/' + data?.categoryId} className='text-gray-400 no-underline'>
            {CATEGORY.find((x) => x.categoryId === data?.categoryId)?.categoryName}
          </Link>
          &nbsp;&gt;&nbsp;
          {data?.serviceName}
        </span>
      </div>
      <div>
        {/* Service detail (img, short intro + long intro) */}
        <div className='mb-10 flex w-full  justify-center'>
          {/* Outer container for img + short intro */}
          <div className='w-11/12 rounded-lg p-4 shadow-lg  shadow-md lg:w-3/5'>
            {/* Short intro and img */}
            <div className='flex justify-between'>
              <div className='w-[49.5%] '>
                <StockImg s={data} />
              </div>
              <div className='w-[49.5%] '>
                <ShortDetail d={data} />
              </div>
            </div>
            {/* Service intro */}
            <div className='w-full  p-2'>
              <ServiceIntro s={data} />
            </div>
          </div>
        </div>
        {/* Related services */}
        <div className='mb-10 w-full '>
          <p className='p-3 text-center text-[3rem] text-purple1'>Related services</p>
          <div className='mb-4 flex justify-center'>
            <img src={seperator} className='mb-3' />
          </div>
          {/* Related service carousel */}
          <div className='flex justify-center '>
            <div className='w-11/12 lg:w-3/5 '>
              <DetailPageCarousel list={related} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

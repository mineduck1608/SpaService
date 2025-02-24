import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import StockImg from './stockImg'
import ShortDetail from './shortDetail'
import seperator from '../../images/serviceBg/separator.png'
import DetailPageCarousel from './detailPageCarousel'
import { CosmeticCategory, CosmeticProduct } from '@/types/type'
import { getCosmetic } from './detailPage.util'
import { getProductOfCosmeticCategory } from '../cosmeticPage/cosmeticPage.util'
import CosmeticIntro from './cosmeticIntro'
import { imgs } from '../cosmeticPage/cosmeticPage.util'

export default function CosmeticDetailPage() {
  const { id } = useParams()
  const [data, setData] = useState<CosmeticProduct>()
  const [related, setRelated] = useState<CosmeticProduct[]>([])
  const CATEGORY = JSON.parse(sessionStorage.getItem('cosmeticcategories') ?? '{}') as CosmeticCategory[]
  useEffect(() => {
    async function fetchData() {
      const x = await getCosmetic(id ?? '')
      if (x) {
        setData(x)
        const y = await getProductOfCosmeticCategory(x.categoryId)
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
          <Link to={'/cosmetics/' + data?.categoryId} className='text-gray-400 no-underline'>
            {CATEGORY.find((x) => x.categoryId === data?.categoryId)?.categoryName}
          </Link>
          &nbsp;&gt;&nbsp;
          {data?.productName}
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
              <CosmeticIntro s={data} />
            </div>
          </div>
        </div>
        {/* Related services */}
        <div className='mb-10 w-full '>
          <p className='p-3 text-center text-[3rem] text-purple1'>Related product</p>
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

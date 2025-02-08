import React, { useEffect, useState } from 'react'
import { getCategory, imgs, sample, service, service2 } from './servicesPage.util'
import { Link, Navigate, useNavigate, useNavigation, useParams } from 'react-router-dom'
import { CategoryMenu } from './categoryMenu'
import ServiceList, { ServiceCard } from './serviceList'
import { Service } from '@/types/services'
import { Category } from '@/types/category'

export default function ServicesPage() {
  const nav = useNavigate()
  const { id } = useParams()
  const [currentCategory, setCurrentCategory] = useState<Category>()
  const [services, setServices] = useState<Service[]>()
  useEffect(() => {
    async function findById() {
      var s = await getCategory(id ?? '')
      if (!s) {
        return;
      }
      setCurrentCategory(s)
    }
    findById()
  }, [])
  return (
    <div>
      <img src={imgs.headerBg} alt='Header' className='w-full' />
      <div className='mb-20 p-2 md:ml-28  lg:ml-5 xl:ml-40'>
        <span className='font-normal text-gray-400'>
          <Link to={'/'}>Home</Link>
          &nbsp;&gt; {currentCategory?.categoryName}
        </span>
      </div>
      {/* Main container */}
      <div className='mb-20 flex md:ml-24 md:mr-24 lg:ml-5 lg:mr-5'>
        <div className='flex w-full justify-center lg:justify-normal'>
          {/* Left menu */}
          <div className='hidden w-[310px] lg:flex 2xl:ml-[17.5vw]'>
            <div id={'left-menu'} className='hidden justify-center lg:flex'>
              <CategoryMenu
                items={sample}
                onClickItem={(v) => {
                  window.location.assign(v)
                }}
              />
            </div>
          </div>
          {/* Services available */}
          <div className='w-5/6 lg:ml-[5vw] 2xl:w-[45%]'>
            <ServiceList service={[service, service2]} />
          </div>
        </div>
      </div>
    </div>
  )
}

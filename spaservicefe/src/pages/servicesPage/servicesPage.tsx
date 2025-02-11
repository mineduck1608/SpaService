import { useEffect, useState } from 'react'
import { findCategories, getServices, imgs, take } from './servicesPage.util'
import { Link, useParams } from 'react-router-dom'
import { CategoryMenu } from './categoryMenu'
import ServiceList from './serviceList'
import { Service } from '@/types/services'
import { Category } from '@/types/category'
import PageNumber from './pageNumber'

export default function ServicesPage() {
  const { id } = useParams()
  const [currentCategory, setCurrentCategory] = useState<Category>()
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<Category[]>()
  const [pageNum, setPageNum] = useState(0)
  const PAGE_SIZE = 6
  useEffect(() => {
    async function fetchData() {
      var c = await findCategories()
      setCategories(c)
      if (c.length === 0) {
        c.push({
          categoryId: '',
          categoryDescription: '',
          categoryImage: '',
          categoryName: 'No categories found...'
        })
        return
      }
      if (!id) {
        window.location.assign('services/' + c[0].categoryId)
        return
      }
      setCurrentCategory(c.find((v) => v.categoryId === id))
      var serviceFetch = await getServices(id)
      if (!serviceFetch) {
        return
      }
      setServices(serviceFetch)
    }
    fetchData()
  }, [])
  return (
    <div>
      <img src={imgs.headerBg} alt='Header' className='w-full' />
      <div className='mb-20 p-2 md:ml-28 lg:ml-5 xl:ml-72'>
        <span className='font-normal text-gray-400'>
          <Link to={'/'} className='text-gray-400 no-underline'>
            Home
          </Link>
          &nbsp;&gt; {currentCategory?.categoryName}
        </span>
      </div>
      {/* Main container */}
      <div className='mb-20 flex md:ml-24 md:mr-24 lg:ml-5 lg:mr-5'>
        <div className='flex w-full justify-center lg:justify-normal'>
          {/* Left menu */}
          <div className='hidden w-[310px] lg:flex 2xl:ml-[14.5vw]'>
            <div id={'left-menu'} className='hidden justify-center lg:flex'>
              <CategoryMenu
                items={categories ?? []}
                onClickItem={(v) => {
                  window.location.assign(v)
                }}
                currentItem={currentCategory?.categoryId}
              />
            </div>
          </div>
          {/* Services available */}
          <div className='w-5/6 lg:ml-[5vw] 2xl:w-[55%]'>
            <ServiceList service={take<Service>(services, pageNum, PAGE_SIZE) ?? []} />
            <div className='translate-y-8'>
              <PageNumber
                n={Math.ceil(services.length / PAGE_SIZE) ?? 0}
                onClick={(n) => {
                  setPageNum(n)
                }}
                cur={pageNum}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

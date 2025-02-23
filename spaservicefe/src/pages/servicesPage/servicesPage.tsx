import { useEffect, useState } from 'react'
import { findCategories, getServicesOfCategory, imgs, take } from './servicesPage.util'
import { Link, useParams, useNavigate } from 'react-router-dom' // Import useNavigate
import { CategoryMenu } from './categoryMenu'
import ServiceList from './serviceList'
import { Service } from '@/types/services'
import { ServiceCategory } from '@/types/serviceCategory'
import PageNumber from './pageNumber'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function ServicesPage() {
  const { id } = useParams()
  const navigate = useNavigate() // Initialize useNavigate
  const [currentCategory, setCurrentCategory] = useState<ServiceCategory>()
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<ServiceCategory[]>()
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
          categoryName: 'No categories found...'
        })
        return
      }
      if (!id) {
        navigate(c[0].categoryId) // Use navigate to go to the first category
        return
      }
      setCurrentCategory(c.find((v) => v.categoryId === id))
      var serviceFetch = await getServicesOfCategory(id)
      if (!serviceFetch) {
        return
      }
      setServices(serviceFetch)
    }
    fetchData()
  }, [id, navigate]) // Add navigate and id to the dependencies

  useEffect(() => {
    AOS.init({
      offset: 0,
      delay: 200,
      duration: 1200,
      once: true
    })
  }, [])

  return (
    <div>
      <img src={imgs.headerBg} alt='Header' className='w-full' />
      <div className='mb-20 p-2 md:ml-28 lg:ml-5 xl:ml-72' data-aos='fade-right' data-aos-delay='400'>
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
            <div id={'left-menu'} className='hidden justify-center lg:flex' data-aos='fade-right' data-aos-delay='400'>
              <CategoryMenu
                items={categories ?? []}
                onClickItem={(v) => {
                  navigate('/services/'+v) // Use navigate for category change
                }}
                currentItem={currentCategory?.categoryId}
              />
            </div>
          </div>
          {/* Services available */}
          <div className='w-5/6 lg:ml-[5vw] 2xl:w-[55%]' data-aos='fade-left' data-aos-delay='400'>
            <ServiceList service={take<Service>(services, pageNum, PAGE_SIZE) ?? []} />
            <div className='translate-y-8'>
              {services.length > PAGE_SIZE && (
                <PageNumber
                  n={Math.ceil(services.length / PAGE_SIZE) ?? 0}
                  onClick={(n) => {
                    setPageNum(n)
                  }}
                  cur={pageNum}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

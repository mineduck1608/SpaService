import { useEffect, useState } from 'react'
import { findCosmeticCategories, getProductOfCosmeticCategory, imgs, take } from './cosmeticPage.util'
import { Link, useParams, useNavigate } from 'react-router-dom' // Import useNavigate
import { CosmeticCategoryMenu } from './cosmeticCategoryMenu'
import PageNumber from './pageNumber'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { CosmeticCategory, CosmeticProduct } from '@/types/type'
import CosmeticList from './cosmeticList'

export default function CosmeticPage() {
  const { id } = useParams()
  const navigate = useNavigate() // Initialize useNavigate
  const [currentCategory, setCurrentCategory] = useState<CosmeticCategory>()
  const [cosmetic, setCosmetic] = useState<CosmeticProduct[]>([])
  const [categories, setCategories] = useState<CosmeticCategory[]>()
  const [pageNum, setPageNum] = useState(0)
  const PAGE_SIZE = 6

  useEffect(() => {
    async function fetchData() {
      var c = await findCosmeticCategories()
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
      var cosmeticFetch = await getProductOfCosmeticCategory(id)
      if (!cosmeticFetch || cosmeticFetch.msg) {
        return
      }
      console.log(cosmeticFetch);
      
      setCosmetic(cosmeticFetch)
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
              <CosmeticCategoryMenu
                items={categories ?? []}
                onClickItem={(v) => {
                  navigate('/cosmetics/' + v) // Use navigate for category change
                }}
                currentItem={currentCategory?.categoryId}
              />
            </div>
          </div>
          <div className='w-5/6 lg:ml-[5vw] 2xl:w-[55%]' data-aos='fade-left' data-aos-delay='400'>
            <CosmeticList cosmetic={take<CosmeticProduct>(cosmetic, pageNum, PAGE_SIZE) ?? []} />
            <div className='translate-y-8'>
              {cosmetic.length > PAGE_SIZE && (
                <PageNumber
                  n={Math.ceil(cosmetic.length / PAGE_SIZE) ?? 0}
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

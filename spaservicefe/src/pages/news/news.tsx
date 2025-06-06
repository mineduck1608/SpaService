import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FaRegNewspaper, FaTags, FaCalendarAlt } from 'react-icons/fa'
import PostGrid from './postGrid'
import IntroHeader from '../../components/introductionHeader'

const NewsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Xác định tab hiện tại dựa vào URL
  let activeTab = 'blog'
  if (location.pathname.includes('promotion')) activeTab = 'promotion'
  if (location.pathname.includes('event')) activeTab = 'event'

  useEffect(() => {
    AOS.init({
      offset: 0,
      delay: 200,
      duration: 1200,
      once: true
    })
  }, [])

  return (
    <>
      {/* Ảnh Header */}
      <img src='https://senspa.com.vn/wp-content/uploads/2020/11/DSC5622.jpg' alt='Header Picture' />

      {/* Đường dẫn điều hướng */}
      <div className='w-full' data-aos='fade-right' data-aos-delay='400'>
        <div className='container mx-auto flex justify-center px-1 py-3 md:justify-start'>
          <div className='text-md text-gray-400'>
            <a className='text-md text-gray-400 no-underline' href='/'>
              Home
            </a>
            <span className='mx-1'>&gt;</span>
            <span>{activeTab === 'blog' ? 'Blog' : activeTab === 'promotion' ? 'Promotion' : 'Event'}</span>
          </div>
        </div>
      </div>

      {/* Tiêu đề & Tabs */}
      <section className='section gallery_category_page'>
        <div className='grid-container'>
          <IntroHeader title='News' position='middle' size='big' />
          {/* Tabs */}
          <div className='w-full' data-aos='zoom-in' data-aos-delay='1000' data-aos-offset='-500'>
            <div className='my-2 flex justify-center gap-4'>
              <button
                className={`flex items-center gap-2 rounded-bl-[23px] rounded-tr-[23px] border border-gray-300 px-8 py-2 transition-all duration-1000 ${
                  activeTab === 'blog' ? 'bg-[#8D388A] text-white' : 'bg-white text-gray-700'
                }`}
                onClick={() => navigate('/news/blog')}
              >
                <FaRegNewspaper size={18} />
                Blogs
              </button>

              <button
                className={`flex items-center gap-2 rounded-bl-[23px] rounded-tr-[23px] border border-gray-300 px-8 py-2 transition-all duration-1000 ${
                  activeTab === 'promotion' ? 'bg-[#8D388A] text-white' : 'bg-white text-gray-700'
                }`}
                onClick={() => navigate('/news/promotion')}
              >
                <FaTags size={18} />
                Promotions
              </button>

              <button
                className={`flex items-center gap-2 rounded-bl-[23px] rounded-tr-[23px] border border-gray-300 px-8 py-2 transition-all duration-1000 ${
                  activeTab === 'event' ? 'bg-[#8D388A] text-white' : 'bg-white text-gray-700'
                }`}
                onClick={() => navigate('/news/event')}
              >
                <FaCalendarAlt size={18} />
                Events
              </button>
            </div>
          </div>
          <div className='mt-3' data-aos='zoom-in' data-aos-delay='1000' data-aos-offset='-500'>
            <PostGrid activeTab={activeTab} />
          </div>
        </div>
      </section>
    </>
  )
}

export default NewsPage

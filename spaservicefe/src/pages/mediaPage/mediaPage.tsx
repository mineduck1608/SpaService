import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Import các component
import Picture from './picture'
import Video from './video'
import EBrochure from './eBrochure'

const MediaPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Xác định tab hiện tại dựa vào URL
  let activeTab = 'picture'
  if (location.pathname.includes('video')) activeTab = 'video'
  if (location.pathname.includes('e-brochure')) activeTab = 'e-brochure'

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
            <span>{activeTab === 'picture' ? 'Picture' : activeTab === 'video' ? 'Video' : 'E-Brochure'}</span>
          </div>
        </div>
      </div>

      {/* Tiêu đề & Tabs */}
      <section className='section gallery_category_page'>
        <div className='grid-container'>
          <h2 className='heading_h2 heading_line heading_h2_line_center text_center'>Media</h2>

          {/* Tabs */}
          <div className='my-6 flex justify-center gap-4'>
            <button
              className={`rounded-bl-[23px] rounded-tr-[23px] border border-gray-300 px-8 py-2 transition-all duration-1000 ${
                activeTab === 'picture' ? 'bg-[#8D388A] text-white' : 'bg-white text-gray-700'
              }`}
              onClick={() => navigate('/media/picture')}
            >
              Picture
            </button>

            <button
              className={`rounded-bl-[23px] rounded-tr-[23px] border border-gray-300 px-8 py-2 transition-all duration-1000 ${
                activeTab === 'video' ? 'bg-[#8D388A] text-white' : 'bg-white text-gray-700'
              }`}
              onClick={() => navigate('/media/video')}
            >
              Video
            </button>

            <button
              className={`rounded-bl-[23px] rounded-tr-[23px] border border-gray-300 px-8 py-2 transition-all duration-1000 ${
                activeTab === 'e-brochure' ? 'bg-[#8D388A] text-white' : 'bg-white text-gray-700'
              }`}
              onClick={() => navigate('/media/e-brochure')}
            >
              E-Brochure
            </button>
          </div>

          {/* Hiển thị nội dung theo tab */}
          <div>
            {activeTab === 'picture' && <Picture />}
            {activeTab === 'video' && <Video />}
            {activeTab === 'e-brochure' && <EBrochure />}
          </div>
        </div>
      </section>
    </>
  )
}

export default MediaPage

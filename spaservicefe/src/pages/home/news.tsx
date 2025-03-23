import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { apiUrl } from '../../types/constants'

const News = () => {
  interface NewsItem {
    newsId: number
    header: string
    content: string
    type: string
    image: string
    createdAt: Date
  }

  const [news, setNews] = useState<NewsItem[]>([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    // Fetch dữ liệu từ API
    const fetchNews = async () => {
      try {
        const response = await fetch(`${apiUrl}/news/GetAll`)
        const data = await response.json()
        console.log(data)

        setNews(data) // Lưu toàn bộ dữ liệu
      } catch (error) {
        console.error('Error fetching news:', error)
      }
    }

    fetchNews()
  }, [])

  useEffect(() => {
    // Set interval để chuyển đổi 3 tin tức tiếp theo mỗi 5 giây
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 3) % news.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [news])

  return (
    <section className='news'>
      <div className='relative w-full bg-white py-20'>
        {/* Background Pattern */}
        <div
          className='absolute inset-0 mt-[180px]'
          style={{
            backgroundImage: `url(https://senspa.com.vn/wp-content/themes/thuythu/images/bf_service.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
          }}
        ></div>

        <div className='relative mx-auto max-w-7xl px-4'>
          {/* Section Header */}
          <div className='mb-16 text-center'>
            <h2 className='mb-4 text-5xl font-bold text-[#8B3A8B]' data-aos='fade-down' data-aos-delay='300'>
              News
            </h2>
            <div className='flex items-center justify-center'>
              <img
                src='https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png'
                alt='lotus'
                className='h-5'
                data-aos='fade-down'
                data-aos-delay='300'
              />
            </div>
          </div>

          {/* News Grid */}
          <div
            className='relative flex h-[500px] items-center justify-center px-8'
            data-aos='fade-up'
            data-aos-delay='300'
          >
            <AnimatePresence mode='wait'>
              {news.length > 0 && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8 }}
                  className='container mx-auto grid w-full grid-cols-3 gap-12'
                >
                  {news.slice(index, index + 3).map((item) => (
                    <div key={item.newsId} className='overflow-hidden rounded-lg bg-white shadow-lg'>
                      <a href={`/news/detail/${item.newsId}`}>
                        <div className='overflow-hidden'>
                          <img
                            src={item.image}
                            alt={item.header}
                            className='h-[250px] w-full object-cover transition-transform duration-500 hover:scale-110'
                          />
                        </div>
                      </a>
                      <div className='p-6'>
                        <p className='mb-2 text-sm text-gray-500'>{new Date(item.createdAt).toLocaleDateString()}</p>
                        <h3 className='mb-4 text-xl font-semibold text-gray-800'>{item.header}</h3>
                        <a
                          href={`/news/detail/${item.newsId}`}
                          className='text-[#8B3A8B] transition-colors duration-300 hover:text-[#a040a0]'
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default News

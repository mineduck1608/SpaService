import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiUrl } from '../../types/constants'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Products = () => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/cosmeticproducts/GetAll`)
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className='products'>
      <div className='relative w-full bg-[#fff5ff] py-20'>
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
              Products
            </h2>
            <div className='flex items-center justify-center' data-aos='fade-down' data-aos-delay='300'>
              <img
                src='https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png'
                alt='lotus'
                className='h-5'
              />
            </div>
            <p className='mt-4 text-gray-600' data-aos='fade-down' data-aos-delay='300'>
              Enjoy the refined and tranquil space at the luxury serviced apartment.
              <br />
              at Sen Spa
            </p>
          </div>

          {/* Swiper Container */}
          <div className='relative'>
            {/* Nút điều hướng */}
            <button className='prev-button absolute top-1/2 left-[-60px] transform -translate-y-1/2 z-10 text-4xl text-purple1 hover:text-purple-800 transition'>
              ❮
            </button>
            <button className='next-button absolute top-1/2 right-[-60px] transform -translate-y-1/2 z-10 text-4xl text-purple1 hover:text-purple-800 transition'>
              ❯
            </button>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={5}
              spaceBetween={20}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={{
                prevEl: '.prev-button',
                nextEl: '.next-button'
              }}
              className='overflow-hidden'
            >
              {products.map((product) => (
                <SwiperSlide
                  key={product.productId}
                  onClick={() => {
                    navigate(`/cosmetics-detail/${product.productId}`)
                    window.scrollTo(0, 0) // Cuộn lên đầu trang khi chuyển hướng
                  }}
                >
                  <div className='group cursor-pointer'>
                    <div className='relative overflow-hidden bg-white shadow-lg rounded-lg'>
                      <img
                        src={product.image}
                        alt={product.productName}
                        className='h-[300px] w-full object-cover group-hover:scale-105 transition-transform duration-500'
                      />
                      <div className='absolute bottom-0 w-full bg-[#8B3A8B] px-6 py-2 text-white'>
                        <h3 className='text-center text-lg'>{product.productName}</h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products

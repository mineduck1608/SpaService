import React, { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Main1 from '../../images/home/Main1.png'
import Main2 from '../../images/home/Main2.png'
import Main3 from '../../images/home/Main3.png'
import Carousel1 from '../../images/carousel/Carousel1.png'
import Carousel2 from '../../images/carousel/Carousel2.png'
import Carousel3 from '../../images/carousel/Carouse3.png'
import bgAbout from '../../images/background/bg_about.jpg'

const images = [Main1, Main2, Main3]

const serviceSlides = [
  {
    image: Carousel1,
    heading: 'Why Choosing SenSpa?',
    description: 'The pioneering unit in spa services.The pioneering unit in spa services.',
    subtext:
      'Recognized as one of the pioneers in introducing authentic spa services to Vietnam, Sen Spa, with its elegantly minimalist design, takes customers into a tranquil space for deep and complete relaxation.'
  },

  {
    image: Carousel2,
    heading: 'Relax & Rejuvenate',
    description: 'Creating a trend of healthy living',
    subtext:
      'Established in 2004, Sen Spa has been shaping a trend of healthy living in harmony with nature, aiming to maintain a life full of energy and mental clarity.'
  },

  {
    image: Carousel3,
    heading: 'Experience Serenity',
    description: 'Dedicated specialists',
    subtext:
      'Sen Spa takes pride in being a "health spa" that has maintained its quality for 17 years, with a team of highly skilled specialists trained to international standards, many of whom have been with us for over a decade. The outstanding strength of our specialists lies in their ability to detect tension points that cause pain in the body and effectively relieve them, easing muscle stiffness and releasing energy blockages. Their dedication has yielded well-deserved "sweet rewards": helping 100% of our customers feel revitalized and full of life after just one therapy session.'
  }
]

const serviceItems = [
  {
    title: 'ALL INCLUSIVE SERVICE',
    image: 'https://senspa.com.vn/wp-content/uploads/2020/10/VIP_room_3.7.jpg',
    description:
      'Providing natural mineral resources, natural hot springs, or seawater within the premises, which are used in hydrotherapy treatments. This is considered the original method that gave birth to early spa practices.'
  },
  {
    title: 'VIP SERVICE',
    image: 'https://senspa.com.vn/wp-content/uploads/2021/01/couple-1.png',
    description: 'Premium service for exclusive guests, ensuring an exceptional and private experience.'
  },
  {
    title: 'FULL BODY CARE',
    image: 'https://senspa.com.vn/wp-content/uploads/2021/01/Massage-da-4.jpg',
    description: 'A full-body care service designed to provide comfort and harmony with nature.'
  },
  {
    title: 'FACIAL CARE',
    image: 'https://senspa.com.vn/wp-content/uploads/2020/10/DSC5827.jpg',
    description: 'A facial care service designed to keep the skin healthy and youthful.'
  }
]

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0)
  const [isTextVisible, setIsTextVisible] = useState(true)

  useEffect(() => {
    AOS.init({
      offset: 0,
      delay: 100,
      duration: 1500,
      once: true,
      easing: 'ease-in-out-cubic'
    })

    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % serviceSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextImage = () => {
    setIsTextVisible(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      setIsTextVisible(true)
    }, 500)
  }

  const prevImage = () => {
    setIsTextVisible(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
      setIsTextVisible(true)
    }, 500)
  }

  return (
    <main className='overflow-x-hidden font-montserrat'>
      {/* Slider Section */}
      <div className='relative h-[100vh] w-full overflow-hidden'>
        <div
          className='h-full w-full bg-cover bg-center transition-all duration-500 ease-in-out'
          style={{
            backgroundImage: `url(${images[currentIndex]})`
          }}
        ></div>

        {/* Text Overlay với animation fade up/down */}
        <div
          className={`absolute left-64 top-[58%] z-10 -translate-y-1/2 transform text-white transition-all duration-500 ease-in-out
                    ${isTextVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
        >
          <h1 className='mb-4 text-7xl font-light'>Sen Spa</h1>
          <p className='mb-2 text-2xl'>Luxurious space, </p>
          <p className='mb-8 text-2xl'>blending modernity and classic elegance.</p>
          <button className='rounded-br-[1rem] rounded-tl-[1rem] bg-[#a040a0] px-8 py-3 text-white transition-colors duration-1000 hover:bg-[#8a3b8a]'>
            Explore <span className='ml-2'>›</span>
          </button>
        </div>

        {/* Navigation buttons */}
        <div className='absolute top-1/2 z-10 flex w-full -translate-y-1/2 transform justify-between px-24'>
          <button
            onClick={prevImage}
            className='mx-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-br-[1rem] rounded-tl-[1rem] border-none bg-[#a040a0] text-lg text-white transition-colors duration-700 hover:bg-[#8a3b8a]'
          >
            <span>←</span>
          </button>
          <button
            onClick={nextImage}
            className='mx-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-br-[1rem] rounded-tl-[1rem] border-none bg-[#a040a0] text-lg text-white transition-colors duration-700 hover:bg-[#8a3b8a]'
          >
            <span>→</span>
          </button>
        </div>
        <div className='absolute bottom-5 flex w-full justify-center gap-2.5'>
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-2.5 w-2.5 cursor-pointer rounded-full border-none
                            ${index === currentIndex ? 'bg-light' : 'bg-white/50'}`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>
      </div>

      {/* About Us Section */}
      <div
        className='absolute right-0 h-full w-1/2'
        style={{
          backgroundImage: `url(https://senspa.com.vn/wp-content/themes/thuythu/images/bg_spa.png)`,
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
          opacity: 0.7
        }}
      ></div>
      <div
        className='h-250px w-full px-60 pb-32'
        style={{
          backgroundImage: `url(${bgAbout})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className='grid grid-cols-1 gap-20 lg:grid-cols-2'>
          <div className='absolute inset-0 -z-10 h-full w-full bg-custom-bg3 bg-contain bg-left-top bg-no-repeat' />
          <div className='mt-52 flex flex-col items-start text-left'>
            <div className='mb-8'>
              <h2 className='text-5xl font-bold text-[#8B3A8B]' data-aos='fade-down' data-aos-delay='300'>
                About Sen Spa
              </h2>
              <div className='flex items-center'>
                <img
                  data-aos='fade-down'
                  data-aos-delay='300'
                  src='https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png'
                  alt='lotus'
                />
              </div>
            </div>
            <div className='max-w-lg text-lg text-gray-900'>
              <p className='' data-aos='fade-down' data-aos-delay='300'>
                Associated with the beauty of a simple, sincere, and romantic flower, but with a strong will to live,
                Sen Spa is designed and arranged in a rustic, simple style that embodies the traditional characteristics
                of Vietnam.
              </p>
              <p className='mt-6' data-aos='fade-down' data-aos-delay='200'>
                Located in the heart of Ho Chi Minh City, Sen Spa is separated from the noisy, bustling atmosphere,
                offering a peaceful and serene space."
              </p>
              <button
                className='mt-1 rounded-br-[1rem] rounded-tl-[1rem] border-2 border-[#a040a0] px-6 py-2 text-[#a040a0] transition-colors duration-700 hover:bg-[#a040a0] hover:text-white'
                data-aos='fade-down'
              >
                More <span className='ml-1'>›</span>
              </button>
            </div>
          </div>

          <div className='mx-auto mt-32 grid max-w-lg grid-cols-2 gap-2'>
            <img
              src='https://senspa.com.vn/wp-content/uploads/2021/01/2.png'
              alt=''
              className='h-64 rounded-bl-[5rem] rounded-tr-[5rem] object-cover'
              data-aos='fade-up'
              data-aos-delay='400'
            />
            <img
              src='https://senspa.com.vn/wp-content/uploads/2021/01/ve-sen-spa.png'
              alt=''
              className='mt-12 h-52 w-52 rounded-br-[5rem] rounded-tl-[5rem] object-cover'
              data-aos='fade-up'
              data-aos-delay='500'
            />
            <div className='relative' data-aos='fade-up' data-aos-delay='600'>
              <div className='text-l absolute inset-0 flex h-72 -translate-x-2 translate-y-3 flex-col items-start justify-center rounded-br-[5rem] rounded-tl-[5rem] bg-purple-900 p-6 text-white'>
                <div className='pl-8 text-5xl font-bold'>21</div>
                <div className='pl-8 text-5xl font-bold'>years</div>
                <div className='mt-4 pl-8 text-2xl'>dedication to customers</div>
              </div>
              <div className='h-72 rounded-br-[5rem] rounded-tl-[5rem] bg-pink-800 object-cover p-6 text-white'></div>
            </div>
            <img
              src='https://senspa.com.vn/wp-content/uploads/2021/01/1.png'
              alt=''
              className='h-56 rounded-bl-[5rem] rounded-tr-[5rem] object-cover'
              data-aos='fade-up'
              data-aos-delay='700'
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className='relative h-[70vh] w-full overflow-hidden'>
        {serviceSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentServiceIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div
              className='absolute inset-0 w-1/2 bg-cover bg-center'
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>

            {/* Dark Overlay */}
            <div className='absolute inset-0 bg-black/40'></div>

            {/* Background Pattern */}
            <div
              className='absolute right-0 top-0 h-full w-1/2'
              style={{
                backgroundImage: `url(https://senspa.com.vn/wp-content/themes/thuythu/images/bg_spa.png)`,
                backgroundPosition: 'right 80px top',
                backgroundRepeat: 'no-repeat',
                zIndex: 1,
                filter: 'brightness(0) invert(1)',
                opacity: 0.3
              }}
            ></div>

            {/* Content */}
            <div className='absolute right-0 top-0 flex h-full w-1/2 flex-col items-start justify-center bg-[#a040a0] px-12 text-white'>
              <h1 className='mb-2 text-5xl'>{slide.heading}</h1>

              {/* Decorative image */}
              <img
                src={'https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png'}
                alt='decorative line'
                className='mb-4 mt-2 h-5 brightness-0 invert'
              />

              <p className='mb-8 text-2xl'>{slide.description}</p>
              <p className='mb-12 text-base'>{slide.subtext}</p>

              {/* Indicators */}
              <div className='z-20 mb-8 flex justify-center gap-2.5'>
                {serviceSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2.5 w-2.5 cursor-pointer rounded-full border-none
                                        ${index === currentServiceIndex ? 'bg-light' : 'bg-white/50'}`}
                    onClick={() => setCurrentServiceIndex(index)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Our Services Grid Section */}
      <div className='relative w-full bg-white py-20'>
        {/* Background Pattern */}
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `url(https://senspa.com.vn/wp-content/themes/thuythu/images/bf_service.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
          }}
        ></div>

        <div className='relative mx-auto max-w-7xl px-4'>
          {/* Section Header */}
          <div className='mb-16 text-center'>
            <h2 className='mb-4 text-5xl font-bold text-[#8B3A8B]'>Services</h2>
            <div className='flex items-center justify-center'>
              <img
                src='https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png'
                alt='lotus'
                className='h-5'
              />
            </div>
            <p className='mt-4 text-gray-600'>
              Experience the refined and relaxing ambiance
              <br />
              with premium services at Sen Spa.
            </p>
          </div>

          {/* Services Grid */}
          <div className='grid grid-cols-2 gap-4'>
            {serviceItems.map((item, index) => (
              <div
                key={index}
                className='group relative cursor-pointer overflow-hidden rounded-lg'
                data-aos='fade-up'
                data-aos-delay={index * 100}
              >
                <div className='aspect-w-16 aspect-h-9'>
                  <img
                    src={item.image}
                    alt={item.title}
                    className='h-[350px] w-full object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                  {/* Overlay with content */}
                  <div className='absolute inset-0 flex flex-col items-center justify-center bg-[#a040a0]/90 p-8 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                    <h3 className='mb-4 text-2xl font-semibold text-white'>{item.title}</h3>
                    <img
                      src='https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png'
                      alt='decorative'
                      className='mb-4 h-5 brightness-0 invert'
                    />
                    <p className='text-base text-white'>{item.description}</p>
                    <button className='mt-6 rounded-br-[1rem] rounded-tl-[1rem] border-2 border-white px-6 py-2 text-white transition-colors duration-300 hover:bg-white hover:text-[#a040a0]'>
                      View all <span className='ml-1'>›</span>
                    </button>
                  </div>
                  {/* Default gradient overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 group-hover:opacity-0'>
                    <div className='absolute bottom-6 left-6 text-white'>
                      <h3 className='text-2xl font-semibold'>{item.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
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
            <h2 className='mb-4 text-5xl font-bold text-[#8B3A8B]'>Products</h2>
            <div className='flex items-center justify-center'>
              <img
                src='https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png'
                alt='lotus'
                className='h-5'
              />
            </div>
            <p className='mt-4 text-gray-600'>
              Enjoy the refined and tranquil space at the luxury serviced apartment.
              <br />
              at Sen Spa
            </p>
          </div>

          {/* Products Grid */}
          <div className='grid grid-cols-3 gap-8'>
            <div className='group cursor-pointer'>
              <div className='relative overflow-hidden'>
                <img
                  src='https://senspa.com.vn/wp-content/uploads/2021/01/can-ho-dich-vu-dai-dien.jpg'
                  alt='Daily rental'
                  className='h-[300px] w-full object-cover'
                />
                <div className='absolute bottom-0 w-full bg-[#8B3A8B] px-6 py-2 text-white'>
                  <h3 className='text-center text-xl'>Serviced apartment for daily rental.</h3>
                </div>
              </div>
            </div>

            <div className='group -mt-6 cursor-pointer'>
              <div className='relative overflow-hidden'>
                <img
                  src='https://senspa.com.vn/wp-content/uploads/2021/01/can-ho-dich-vu-dai-dien-2.jpg'
                  alt='Monthly rental'
                  className='h-[350px] w-full object-cover'
                />
                <div className='absolute bottom-0 w-full bg-[#8B3A8B] px-6 py-2 text-white'>
                  <h3 className='text-center text-xl'>Serviced apartment for monthly rental.</h3>
                </div>
              </div>
            </div>

            <div className='group cursor-pointer'>
              <div className='relative overflow-hidden'>
                <img
                  src='https://senspa.com.vn/wp-content/uploads/2021/01/can-ho-dich-vu-dai-dien-1.jpg'
                  alt='6-month rental'
                  className='h-[300px] w-full object-cover'
                />
                <div className='absolute bottom-0 w-full bg-[#8B3A8B] px-6 py-2 text-white'>
                  <h3 className='text-center text-xl'>Serviced apartment for rent over 6 months.</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Section */}
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
            <h2 className='mb-4 text-5xl font-bold text-[#8B3A8B]'>News</h2>
            <div className='flex items-center justify-center'>
              <img
                src='https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png'
                alt='lotus'
                className='h-5'
              />
            </div>
          </div>

          {/* News Grid */}
          <div className='grid grid-cols-3 gap-8'>
            {/* News Item 1 */}
            <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
              <div className='overflow-hidden'>
                <img
                  src='https://senspa.com.vn/wp-content/uploads/2020/11/620552810-H-1024x700-1.jpg'
                  alt='Skin care'
                  className='h-[250px] w-full object-cover transition-transform duration-500 hover:scale-110'
                />
              </div>
              <div className='p-6'>
                <p className='mb-2 text-sm text-gray-500'>17.11.2020</p>
                <h3 className='mb-4 text-xl font-semibold text-gray-800'>Facial care for smooth and radiant skin.</h3>
                <a
                  href='/news/detail/:id'
                  className='text-[#8B3A8B] transition-colors duration-300 hover:text-[#a040a0]'
                >
                  Details
                </a>
              </div>
            </div>

            {/* News Item 2 */}
            <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
              <div className='overflow-hidden'>
                <img
                  src='https://senspa.com.vn/wp-content/uploads/2020/11/shutterstock_458768797.jpg'
                  alt='Himalaya salt'
                  className='h-[250px] w-full object-cover transition-transform duration-500 hover:scale-110'
                />
              </div>
              <div className='p-6'>
                <p className='mb-2 text-sm text-gray-500'>17.11.2020</p>
                <h3 className='mb-4 text-xl font-semibold text-gray-800'>
                  The unexpected benefits of Himalayan pink salt.
                </h3>
                <a
                  href='/news/detail/:id'
                  className='text-[#8B3A8B] transition-colors duration-300 hover:text-[#a040a0]'
                >
                  Details
                </a>
              </div>
            </div>

            {/* News Item 3 */}
            <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
              <div className='overflow-hidden'>
                <img
                  src='https://senspa.com.vn/wp-content/uploads/2020/11/DSC5072.jpg'
                  alt='Foot massage'
                  className='h-[250px] w-full object-cover transition-transform duration-500 hover:scale-110'
                />
              </div>
              <div className='p-6'>
                <p className='mb-2 text-sm text-gray-500'>17.11.2020</p>
                <h3 className='mb-4 text-xl font-semibold text-gray-800'>
                  The benefits of foot massage you should know.
                </h3>
                <a
                  href='/news/detail/:id'
                  className='text-[#8B3A8B] transition-colors duration-300 hover:text-[#a040a0]'
                >
                  Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home

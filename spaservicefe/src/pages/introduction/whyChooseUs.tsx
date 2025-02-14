import React, { useState, useEffect } from 'react'
import ArrowButton from '../../components/ui/arrowButton'
import IntroHeader from '../../components/introductionHeader'

const ChooseUs = () => {
  const slides = [
    {
      image: 'https://cdn-wechotel.pressidium.com/wp-content/uploads/2021/06/reservations.jpg',
      title: 'One of the first pioneers that brought true Spa services into Vietnam',
      description:
        'SenSpa with its sophisticated minimalist design takes customers to a serene dimension to provide the most comfortable and relaxing experience.'
    },
    {
      image: 'https://i.pinimg.com/originals/db/2d/31/db2d3151f50986589815054faed9c855.jpg',
      title: 'Beauty without surgery',
      description:
        'Our team of specialists are dedicated to help 100% of our customers feel their bodies full of vitality after just one treatment.'
    },
    {
      image: 'https://i.pinimg.com/originals/07/05/e7/0705e7566c7921e0e95a95c2d0821223.jpg',
      title: 'Dedicated specialist',
      description:
        'With more than 30 technicians being professionally trained and certified following international standards.'
    },
    {
      image: 'https://senspa.com.vn/wp-content/uploads/2021/01/1.1.png',
      title: 'Healthy living and nature loving trend',
      description:
        'Born in 2004, SenSpa has been leading the trend of healthy living and nature loving to maintain a fulfilling life and unclouded spirit.'
    }
  ]
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isChanging, setIsChanging] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentSlide])
  const nextSlide = () => {
    setIsChanging(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setIsChanging(false)
    }, 600)
  }
  const prevSlide = () => {
    setIsChanging(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      setIsChanging(false)
    }, 600)
  }

  return (
    <div className='mx-auto my-20 space-y-4' data-aos='zoom-in' data-aos-delay='600'>
      <div className='flex items-center justify-center gap-8 px-4'>
        <div className='hidden lg:block'>
          <ArrowButton direction='right' onClick={prevSlide} />
        </div>
        <div
          className='flex flex-col items-center gap-6 overflow-hidden rounded-2xl bg-white 
                        bg-custom-bg1 bg-right-bottom bg-no-repeat px-5 py-8 shadow-lg shadow-purple-200 lg:flex-row'
        >
          <div className='lg:hidden'>
            <IntroHeader title={'Why choose us?'} position='middle' size='big' />
          </div>
          <div className='relative'>
            <img
              src={slides[currentSlide].image}
              alt=''
              className={`h-96 w-full max-w-[580px] rounded-lg object-cover transition-opacity duration-300 ${
                isChanging ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </div>
          <div
            className={`max-w-[350px] flex-1 space-y-4 text-left transition-opacity duration-300 sm:text-center${
              isChanging ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className='hidden lg:block'>
              <IntroHeader title={'Why choose us?'} position='left' size='big' />
            </div>
            <h3 className='text-xl font-semibold text-gray-600'>{slides[currentSlide].title}</h3>
            <p className='text-sm text-gray-900'>{slides[currentSlide].description}</p>
          </div>
        </div>
        <div className='hidden lg:block'>
          <ArrowButton direction='left' onClick={nextSlide} />
        </div>
      </div>
      <div className='flex justify-center gap-2'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsChanging(true)
              setTimeout(() => {
                setCurrentSlide(index)
                setIsChanging(false)
              }, 300)
            }}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'w-4 bg-purple-900' : 'bg-purple-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default ChooseUs

import React, { useState, useEffect } from 'react'
import Main1 from '../../images/home/Main1.png'
import Main2 from '../../images/home/Main2.png'
import Main3 from '../../images/home/Main3.png'

const images = [Main1, Main2, Main3]

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTextVisible, setIsTextVisible] = useState(true)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState(false) // Thêm trạng thái để theo dõi quá trình tải hình ảnh

  // Thêm useEffect để preload hình ảnh
  useEffect(() => {
    const loadImages = () => {
      let loadedCount = 0
      images.forEach((imageUrl) => {
        const img = new Image()
        img.src = imageUrl
        img.onload = () => {
          loadedCount += 1
          if (loadedCount === images.length) {
            setImagesLoaded(true) // Khi tất cả hình ảnh đã tải xong, cập nhật trạng thái
          }
        }
        img.onerror = () => {
          console.error(`Không thể tải hình ảnh: ${imageUrl}`)
        }
      })
    }
    loadImages()
  }, [])

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (isAutoPlaying && imagesLoaded) {
      intervalId = setInterval(() => {
        setIsTextVisible(false)
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
          setIsTextVisible(true)
        }, 500)
      }, 3000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isAutoPlaying, imagesLoaded])

  const nextImage = () => {
    setIsAutoPlaying(false)
    setIsTextVisible(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      setIsTextVisible(true)
    }, 500)
  }

  const prevImage = () => {
    setIsAutoPlaying(false)
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
        {imagesLoaded && ( // Chỉ hiển thị slider khi tất cả hình ảnh đã được tải
          <div
            className='h-full w-full bg-cover bg-center transition-all duration-500 ease-in-out'
            style={{
              backgroundImage: `url(${images[currentIndex]})`
            }}
          ></div>
        )}

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
    </main>
  )
}

export default Home

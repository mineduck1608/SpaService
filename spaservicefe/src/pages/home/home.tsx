import React, { useState } from 'react'
import './Carousel.css'

const images = [
  'image1.jpg', // Thay bằng đường dẫn đến ảnh thực tế
  'image2.jpg',
  'image3.jpg'
]

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className='carousel'>
      <div
        className='carousel-image'
        style={{
          backgroundImage: `url(${images[currentIndex]})`
        }}
      ></div>
      <div className='carousel-buttons'>
        <button onClick={prevImage} className='prev-button'>
          ←
        </button>
        <button onClick={nextImage} className='next-button'>
          →
        </button>
      </div>
      <div className='carousel-indicators'>
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default Carousel

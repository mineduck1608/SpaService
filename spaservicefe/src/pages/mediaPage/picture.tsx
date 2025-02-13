import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import React, { useState } from 'react'
import ArrowButton from '../../components/ui/arrowButton'
import { X } from 'lucide-react'

const Picture = () => {
  const images = [
    {
      id: 2,
      title: '1st floor',
      description: 'Exclusive area for Foot massages',
      image: 'https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-1-1.jpg',
      additionalImages: [
        'https://senspa.com.vn/wp-content/uploads/2021/01/foot-1.jpg',
        'https://senspa.com.vn/wp-content/uploads/2021/01/foot-2.jpg',
        'https://senspa.com.vn/wp-content/uploads/2021/01/foot-3.jpg',
        'https://senspa.com.vn/wp-content/uploads/2021/01/foot-4.jpg'
      ]
    },
    {
      id: 3,
      title: '2nd floor',
      description: 'Spa area (steam bath, sauna, soaking in spa pools) and facial for female customers',
      image: 'https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-2.jpg',
      additionalImages: [
        'https://senspa.com.vn/wp-content/uploads/2021/01/xonghoinuoc.jpg',
        'https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-2-2.jpg',
        'https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-2-1.jpg',
        'https://senspa.com.vn/wp-content/uploads/2021/01/xonghoikhoc.jpg'
      ]
    },
    {
      id: 4,
      title: '3rd floor',
      description: 'Massage area for female customers',
      image: 'https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-3.jpg',
      additionalImages: [
        'https://senspa.com.vn/wp-content/uploads/2021/01/MS-2.jpg',
        'https://senspa.com.vn/wp-content/uploads/2021/01/MS-3.jpg',
        'https://senspa.com.vn/wp-content/uploads/2021/01/MS-4.jpg',
        'https://senspa.com.vn/wp-content/uploads/2021/01/MS-5.jpg'
      ]
    },
    {
      id: 5,
      title: '4th floor',
      description: 'Spa area (steam bath, sauna, soaking in spa pools) and facial for male customers',
      image: 'https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-4.jpg',
      additionalImages: [
        'https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-4-3.jpg',
        'https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-4-1.jpg',
        'https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-4-2.jpg'
      ]
    },
    {
      id: 6,
      title: '5th floor',
      description: 'Massage area for male customers',
      image: 'https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-5.jpg',
      additionalImages: [
        'https://senspa.com.vn/wp-content/uploads/2021/01/nam-1.jpg',
        'https://senspa.com.vn/wp-content/uploads/2021/01/nam-2.jpg',
        'https://senspa.com.vn/wp-content/uploads/2021/01/nam-3.jpg'
      ]
    },
    {
      id: 7,
      title: '6th floor',
      description: 'VIP rooms provide an intimate and private spaces for couples',
      image: 'https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-6.jpg',
      additionalImages: [
        'https://senspa.com.vn/wp-content/uploads/2021/01/couple-1.jpg',
        'https://senspa.com.vn/wp-content/uploads/2021/01/couple-2.jpg',
        'https://senspa.com.vn/wp-content/uploads/2021/01/couple-3.jpg'
      ]
    },
    {
      id: 8,
      title: '7th floor',
      description:
        'Serviced apartment for long-term stay guests with easy access to all the convenient places in central HCMC',
      image: 'https://senspa.com.vn/wp-content/uploads/2020/11/DSC01715_1.jpg',
      additionalImages: [
        'https://senspa.com.vn/wp-content/uploads/2020/10/DSC01689.jpg',
        'https://senspa.com.vn/wp-content/uploads/2020/10/sec2.png',
        'https://senspa.com.vn/wp-content/uploads/2020/10/sec4.png'
      ]
    },
    {
      id: 9,
      title: '8th floor',
      description: 'Rooftop pool offering a luxurious escape with city views and a serene ambiance.',
      image: 'https://goop-img.com/wp-content/uploads/2023/07/image-2.png',
      additionalImages: [
        'https://www.whitepoint.com/content/uploads/2020/11/spa-6-1920x898.jpg',
        'https://acihome.vn/uploads/1/tuvan/spa-resort-la-gi-cac1670558199.jpg',
        'https://info.ehl.edu/hubfs/Blog-EHL-Insights/Blog-Header-EHL-Insights/spa-trends.jpg'
      ]
    }
  ]

  const [selectedImage, setSelectedImage] = useState<{
    id: number
    title: string
    description: string
    image: string
    additionalImages: string[]
  } | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isChanging, setIsChanging] = useState(false)
  const handleImageChange = (index: number) => {
    setIsChanging(true)
    setTimeout(() => {
      setCurrentImageIndex(index)
      setIsChanging(false)
    }, 800)
  }

  return (
    <div className='py-4 text-center'>
      {/* Grid hiển thị danh sách các cơ sở */}
      <div className='grid grid-cols-1 gap-2 md:grid-cols-4'>
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className='group relative cursor-pointer'
            data-aos='zoom-in'
            data-aos-delay='1000'
            data-aos-offset='-500'
          >
            <div className='absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            <img src={image.image} alt='' className='h-full w-full object-cover' />
            <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
              <div className='p-4 text-center text-white'>
                <h3 className='mb-2 text-xl font-bold'>{image.title}</h3>
                <p className='text-sm'>{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hiển thị chi tiết cơ sở được chọn */}
      {selectedImage && (
        <div className='modal-bg !important fixed inset-0 z-50 flex items-center justify-center'>
          <div className='mx-4 w-full max-w-2xl rounded-lg bg-white'>
            <div className='flex items-end justify-end border-b p-4'>
              <button onClick={() => setSelectedImage(null)} className='rounded-full hover:bg-gray-100'>
                <X className='h-6 w-6' />
              </button>
            </div>
            <div className='relative p-4'>
              <div className='relative h-80 w-full'>
                <img
                  src={selectedImage.additionalImages[currentImageIndex]}
                  alt=''
                  className={`h-full w-full rounded object-cover transition-opacity ${isChanging ? 'opacity-0' : 'opacity-100'}`}
                />
              </div>
              <div className='relative mt-4'>
                <div className='absolute left-0 top-1/2 z-10 -translate-y-1/2'>
                  <ArrowButton
                    direction='right'
                    onClick={() =>
                      handleImageChange(
                        currentImageIndex === 0 ? selectedImage.additionalImages.length - 1 : currentImageIndex - 1
                      )
                    }
                  />
                </div>
                <div className='flex justify-center gap-2 px-16'>
                  {selectedImage.additionalImages.map((image, index) => (
                    <button key={index} onClick={() => setCurrentImageIndex(index)} className='h-16 w-16 flex-shrink-0'>
                      <img
                        src={image}
                        alt=''
                        className={`h-full w-72 rounded object-cover ${
                          currentImageIndex === index ? 'ring-2 ring-purple-600' : 'opacity-50 hover:opacity-80'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className='absolute right-0 top-1/2 z-10 -translate-y-1/2'>
                  <ArrowButton
                    direction='left'
                    onClick={() =>
                      handleImageChange(
                        currentImageIndex === selectedImage.additionalImages.length - 1 ? 0 : currentImageIndex + 1
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Picture

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import React, { useState } from 'react'


const images = [
  'https://img5.thuthuatphanmem.vn/uploads/2021/11/20/hinh-anh-spa-thien-nhien-tuyet-dep_104538239.jpg',
  'https://senspa.com.vn/wp-content/uploads/2020/11/DSC2549-1.png',
  'https://senspa.com.vn/wp-content/uploads/2020/11/DSC5881-2.jpg',
  'https://senspa.com.vn/wp-content/uploads/2020/11/G-sảnh-17.jpg',
  'https://img1.kienthucvui.vn/uploads/2021/01/13/anh-dep-ve-spa_022205055.jpg',
  'https://senspa.com.vn/wp-content/uploads/2020/11/DSC5837.jpg',
  
]

const facilities = [
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
  }
]



const Picture = () => {
  
  const [selectedFacility, setSelectedFacility] = useState<{
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
    <div className='d-flex justify-content-center align-items-center min-vh-100'>
      <div className='container py-4 text-center'>
        <div className='w-100'>
          <div className='row g-4 justify-content-center'>
            {/* Ảnh lớn bên trái */}
            <div className='col-md-7'>
              <img
                src={images[0]}
                alt='Spa Image'
                className='img-fluid w-100-lg'
                style={{ height: '500px', objectFit: 'cover' }}
              />
            </div>

            {/* 2 ảnh nhỏ bên phải */}
            <div className='col-md-4'>
              <div className='row mb-4'>
                <div className='col-12'>
                  <img
                    src={images[1]}
                    alt='Spa Image'
                    className='img-fluid w-100'
                    style={{ height: '238px', objectFit: 'cover' }}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <img
                    src={images[2]}
                    alt='Spa Image'
                    className='img-fluid w-100'
                    style={{ height: '238px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row g-4 justify-content-center mt-1'>
            {/* 2 ảnh nhỏ bên trái */}
            <div className='col-md-4'>
              <div className='row mb-4'>
                <div className='col-12'>
                  <img
                    src={images[3]}
                    alt='Spa Image'
                    className='img-fluid w-100'
                    style={{ height: '238px', objectFit: 'cover' }}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <img
                    src={images[5]}
                    alt='Spa Image'
                    className='img-fluid w-100'
                    style={{ height: '238px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>

            {/* Ảnh lớn bên phải */}
            <div className='col-md-7'>
              <img
                src={images[4]}
                alt='Spa Image'
                className='img-fluid w-100-lg'
                style={{ height: '500px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Picture

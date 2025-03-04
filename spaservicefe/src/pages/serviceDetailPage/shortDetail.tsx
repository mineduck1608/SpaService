import { ServiceCategory } from '@/types/type'
import { Service } from '@/types/services'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { formatNumber } from '../servicesPage/servicesPage.util'
import seperator from '../../images/serviceBg/separator.png'
import { toast } from 'react-toastify' // Import thư viện toast

export default function ShortDetail(params: { d?: Service }) {
  const CATEGORY = JSON.parse(sessionStorage.getItem('categories') ?? '[]') as ServiceCategory[]
  const navigate = useNavigate() // Initialize useNavigate

  // Hàm kiểm tra và chuyển hướng
  const handleCheckout = () => {
    const token = sessionStorage.getItem('token') // Kiểm tra token trong sessionStorage

    if (!token) {
      // Nếu không có token, hiển thị thông báo yêu cầu đăng nhập
      toast.error('Please login to continue!')
    } else {
      // Nếu có token, lưu thông tin và chuyển hướng tới trang checkout
      sessionStorage.setItem('booked', JSON.stringify(params.d) ?? '')
      navigate('/check-out') // Dùng navigate để không reload trang
    }
  }

  return (
    <div className='p-2'>
      <p className='text-3xl font-bold'>
        {params.d?.serviceName} ({params.d?.duration})
      </p>
      <img src={seperator} className='mb-3' />
      <p className='text-2xl font-bold text-purple1'>{formatNumber(params.d?.price ?? 0)} VND</p>
      <p className='font-bold'>Description:</p>
      <p className='mb-5'>{params.d?.description}</p>
      {/* Add cart */}
      <div className='mb-3 flex w-3/5 justify-between '>
        <button
          onClick={handleCheckout} // Sử dụng hàm handleCheckout để kiểm tra token
          className='w-[45%] rounded-br-3xl rounded-tl-3xl bg-purple1 p-[0.625rem] text-white'
        >
          Check out
        </button>
      </div>
      <p className='text-black'>
        Category:&nbsp;
        <Link className='text-black no-underline' to={'/services/' + params.d?.categoryId}>
          {CATEGORY.find((x) => x.categoryId === params.d?.categoryId)?.categoryName}
        </Link>
      </p>
    </div>
  )
}

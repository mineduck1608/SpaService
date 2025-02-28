import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { formatNumber } from '../servicesPage/servicesPage.util'
import seperator from '../../images/serviceBg/separator.png'
import { toast, ToastContainer } from 'react-toastify' // Import thư viện toast
import { CosmeticCategory, CosmeticProduct } from '@/types/type'
import { SessionItem } from '@/types/sessionItem'
import { getCartItem, setCartItem } from './detailPage.util'

export default function ShortDetail(params: { d?: CosmeticProduct }) {
  const CATEGORY = JSON.parse(sessionStorage.getItem('cosmeticcategories') ?? '[]') as CosmeticCategory[]
  const navigate = useNavigate() // Initialize useNavigate
  const [amount, setAmount] = useState(1)

  // Hàm kiểm tra và chuyển hướng
  const addToCart = () => {
    const token = sessionStorage.getItem('token') // Kiểm tra token trong sessionStorage
    if (!params.d || amount <= 0) {
      return
    }
    if (!token) {
      // Nếu không có token, hiển thị thông báo yêu cầu đăng nhập
      toast.error('Please login to continue!')
      return
    }
    const item = getCartItem(params.d.productId)
    if(item){
      setCartItem(params.d.productId, item.amount + amount, true)
      toast.success(`Added ${amount} x ${params.d.productName} to cart`)
      return;
    }
    setCartItem(params.d.productId, amount, true, params.d)
    toast.success(`Added ${amount} x ${params.d.productName} to cart`)
  }

  return (
    <div className='p-2'>
      <p className='text-3xl font-bold'>{params.d?.productName}</p>
      <img src={seperator} className='mb-3' />
      <p className='text-2xl font-bold text-purple1'>{formatNumber(params.d?.price ?? 0)} VND</p>
      <p className='font-bold'>Description:</p>
      <p className='mb-2'>{params.d?.description}</p>
      <input
        placeholder='Amount'
        type='number'
        className='mb-2 border-2 p-1'
        value={amount}
        min={1}
        onChange={(e) => {
          var s = e.currentTarget.value
          if (s.length === 0) {
            return
          }
          setAmount(parseInt(s))
        }}
      />
      {/* Add cart */}
      <div className='mb-3 flex w-3/5 justify-between '>
        <button
          onClick={addToCart} // Sử dụng hàm handleCheckout để kiểm tra token
          className='lg:w-[50%] rounded-br-3xl rounded-tl-3xl bg-purple1 p-[0.625rem] text-white'
        >
          Add to cart
        </button>
      </div>
      <p className='text-black'>
        Category:&nbsp;
        <Link className='text-black no-underline' to={'/services/' + params.d?.categoryId}>
          {CATEGORY.find((x) => x.categoryId === params.d?.categoryId)?.categoryName}
        </Link>
      </p>
      <ToastContainer />
    </div>
  )
}

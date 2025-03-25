import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { formatNumber } from '../servicesPage/servicesPage.util'
import seperator from '../../images/serviceBg/separator.png'
import { toast, ToastContainer } from 'react-toastify' // Import thư viện toast
import { CosmeticCategory, CosmeticProduct } from '@/types/type'
import { getCartItem, setCartItem } from './detailPage.util'

export default function ShortDetail(params: { d?: CosmeticProduct }) {
  const CATEGORY = JSON.parse(sessionStorage.getItem('cosmeticcategories') ?? '[]') as CosmeticCategory[]
  const [amount, setAmount] = useState(1)
  const cus = sessionStorage.getItem('customerId') ?? ''
  // Hàm kiểm tra và chuyển hướng
  const addToCart = async () => {
    if (amount <= 0) {
      toast.error('Invalid amount', {
        containerId: 'toast'
      })
      return
    }
    const token = sessionStorage.getItem('token') // Kiểm tra token trong sessionStorage
    if (!params.d || amount <= 0) {
      return
    }
    if (!token) {
      // Nếu không có token, hiển thị thông báo yêu cầu đăng nhập
      toast.error('Please login to continue!', {
        containerId: 'toast'
      })
      return
    }
    const item = await getCartItem(cus, params.d.productId)
    var newAmount = (item?.amount ?? 0) + amount
    if (newAmount > params.d.quantity) {
      toast.error(`Your cart cannot have more than ${params.d.quantity} items of this product`, {
        containerId: 'toast'
      })
      return
    }
    setCartItem(cus, params.d.productId, amount)
    toast.success(`Added ${amount} item(s)`, {
      containerId: 'toast'
    })
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
        max={params.d?.quantity}
        onChange={(e) => {
          var s = e.currentTarget.value
          if (s.length === 0) {
            return
          }
          setAmount(parseInt(s))
        }}
      />
      <p>Max: {params.d?.quantity}</p>
      <div className=''>
        {/* Add cart */}
        <div className='mb-3 flex w-3/5 justify-between'>
          <button
            type='submit'
            onClick={(e) => {
              addToCart()
            }} // Sử dụng hàm handleCheckout để kiểm tra token
            className='rounded-br-3xl rounded-tl-3xl bg-purple1 p-[0.625rem] text-white lg:w-[40%]'
          >
            Add to cart
          </button>
          <button
            type='submit'
            onClick={(e) => {
              if (amount > (params.d?.quantity ?? 0)) {
                toast.error(`Your cart cannot have more than ${params.d?.quantity} items of this product`, {
                  containerId: 'toast'
                })
                return
              }
              window.location.assign(
                `/cosmetics-check-out?singular=True&productId=${params.d?.productId}&&quantity=${amount}`
              )
            }} // Sử dụng hàm handleCheckout để kiểm tra token
            className='rounded-br-3xl rounded-tl-3xl bg-purple1 p-[0.625rem] text-white lg:w-[40%]'
          >
            Check out
          </button>
        </div>
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

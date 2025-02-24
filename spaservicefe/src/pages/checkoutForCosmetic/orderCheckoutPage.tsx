import { Service } from '../../types/services.ts'
import { FormEvent, useEffect, useState } from 'react'
import ProductList from './productList.tsx'
import { SpaRequest } from '@/types/request.ts'
import { Input, DatePicker } from 'antd'
import { Employee } from '@/types/type.ts'
import logoColor from '../../images/logos/logoColor.png'
import { getToken } from '../../types/constants.ts'
import { jwtDecode } from 'jwt-decode'
import { toast, ToastContainer } from 'react-toastify'
import { SessionItem } from '@/types/sessionItem.ts'
import { getCusByAcc } from '../checkout/checkoutPage.util.ts'

export default function CosmeticCheckoutPage() {
  const cart = JSON.parse(sessionStorage.getItem('cart') ?? '[]') as SessionItem[]
  if (cart.length === 0) {
    window.location.assign('/services')
  }
  useEffect(() => {
    async function fetchData() {
      var t = getToken()
      if (!t) {
        return
      }
      var x = jwtDecode(t ?? '')
      var c = await getCusByAcc(x.UserId)
    }
    try {
      fetchData()
    } catch (e) {}
  }, [])
  async function onSubmitBase(method: string) {
    toast.error('Not yet')
  }
  async function payInCash(e: FormEvent) {
    e.preventDefault()
    onSubmitBase('')
    // try {
    //   var r = await onSubmitBase('Cash')
    //   if (r) {
    //     toast.success('Request created successfully')
    //   }
    // } catch (e) {
    //   toast.error(e as string)
    // }
  }
  async function submitWithVnPay(e: FormEvent) {
    e.preventDefault()
    onSubmitBase('')
    // try {
    //   var r = await onSubmitBase('VnPay')

    //   if (!r) {
    //     return
    //   }
    //   var transId = sessionStorage.getItem('trId') ?? ''
    //   sessionStorage.removeItem('trId')

    //   var url = await getPaymentUrl(cart.price, jwtDecode(getToken() ?? '').UserId, transId)
    //   if (url.startsWith('http')) {
    //     toast.success('We will redirect you to VnPay page')
    //     window.location.replace(url)
    //     return
    //   }

    //   toast.error(url)
    // } catch (e) {
    //   toast.error(e as string)
    // }
  }

  return (
    <div className='relative h-[100vh] w-full overflow-hidden'>
      <ToastContainer />
      {/* Hình ảnh nền */}
      <div
        className='h-full w-full bg-cover bg-center transition-all'
        style={{
          backgroundImage: `url(https://senspa.com.vn/wp-content/uploads/2020/11/banner-2.png)`
        }}
      ></div>

      {/* Khung form */}
      <div className='absolute left-0 right-0 top-20 z-10 mt-32 flex justify-center'>
        <form className='flex w-3/5 justify-center' onSubmit={payInCash}>
          <div className='relative w-2/3 rounded-bl-lg rounded-tl-lg bg-white p-20 shadow-lg'>
            <ProductList s={cart} />
          </div>

          {/* Sidebar with buttons */}
          <div className='flex w-1/3 flex-col items-center rounded-br-lg rounded-tr-lg bg-purple1 bg-[url(https://senspa.com.vn/wp-content/themes/thuythu/images/background1.png)] bg-[bottom_50px_right] bg-no-repeat px-5 py-4'>
            <p className='text-white'>You can pay via cash or VnPay</p>
            <div className='my-3 w-1/2'>
              <button
                type='submit'
                onClick={payInCash}
                className='w-full transform rounded-br-2xl rounded-tl-2xl border-2 border-transparent bg-white p-1 text-purple1 transition-all duration-300 hover:scale-105 hover:border-purple3 hover:bg-purple2 hover:text-white disabled:bg-gray-300'
              >
                Submit request
              </button>
            </div>
            <div className='my-3 w-1/2'>
              <button
                type='submit'
                onClick={submitWithVnPay}
                className='w-full transform rounded-br-2xl rounded-tl-2xl border-2 border-transparent bg-white p-1 text-purple1 transition-all duration-300 hover:scale-105 hover:border-purple3 hover:bg-purple2 hover:text-white disabled:bg-gray-300'
              >
                Pay by VnPay
              </button>
            </div>
            <div className='logo mt-20'>
              <img src={logoColor} alt='Sen Spa Logo' className={`logo-image w-90 brightness-0 invert`} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

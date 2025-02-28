import { Service } from '../../types/services.ts'
import { FormEvent, useEffect, useState } from 'react'
import ProductList from './productList.tsx'
import logoColor from '../../images/logos/logoColor.png'
import { getToken } from '../../types/constants.ts'
import { jwtDecode } from 'jwt-decode'
import { toast, ToastContainer } from 'react-toastify'
import { getCusByAcc, getCustomerIdByAcc, getPaymentUrl } from '../checkout/checkoutPage.util.ts'
import { getCart } from '../cosmeticDetailPage/detailPage.util.ts'
import { createOrder } from './checkoutPage.util.ts'

export default function CosmeticCheckoutPage() {
  const cart = getCart().filter((x) => x.included)
  const [addr, setAddr] = useState('')
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
    try {
      const customerId = await getCustomerIdByAcc()
      const result = await createOrder({
        address: addr,
        customerId: customerId ?? '',
        orderDate: new Date(),
        paymentType: method,
        details: cart.map((v) => {
          return {
            productId: v.product.productId,
            quantity: v.amount
          }
        })
      })
      console.log(result);
      
      return result
    } catch (e) {
      toast.error(e as string)
      return null
    }
  }
  async function payInCash(e: FormEvent) {
    e.preventDefault()
    try {
      var s = await onSubmitBase('Cash')
      if (s) {
        if (s.success) {
          toast.success('Order submitted')
          return
        }
        toast.error(s.rs)
      }
    } catch (e) {}
  }
  async function submitWithVnPay(e: FormEvent) {
    e.preventDefault()
    try {
      var s = await onSubmitBase('VnPay')
      if (s?.total) {
        var url = await getPaymentUrl(s.total, s.rs) //Rs is transactionId
        window.location.replace(url)
        return;
      }
      toast.error(s?.rs)
    } catch (e) {
      toast.error(e as string)
    }
  }
  const disabled = cart.length === 0 || addr.length === 0
  return (
    <div
      className='w-full overflow-hidden'
      style={{
        backgroundImage: `url(https://senspa.com.vn/wp-content/uploads/2020/11/banner-2.png)`,
        backgroundSize: 'cover'
      }}
    >
      <ToastContainer />
      {/* Khung form */}
      <div className='mb-48 mt-48 flex justify-center'>
        <form className='flex w-3/5 justify-center' onSubmit={payInCash}>
          <div className='relative w-2/3 rounded-bl-lg rounded-tl-lg bg-white p-20 shadow-lg'>
            <ProductList s={cart} />
            <div>
              <p>Address</p>
              <input
                type='text'
                className='w-full border-[1px] p-2'
                value={addr}
                required
                onChange={(e) => setAddr(e.target.value)}
              />
            </div>
          </div>
          {/* Sidebar with buttons */}
          <div className='flex w-1/3 flex-col items-center rounded-br-lg rounded-tr-lg bg-purple1 bg-[url(https://senspa.com.vn/wp-content/themes/thuythu/images/background1.png)] bg-[bottom_50px_right] bg-no-repeat px-5 py-4'>
            <p className='text-white'>You can pay via cash or VnPay</p>
            <div className='my-3 w-1/2'>
              <button
                type='submit'
                onClick={payInCash}
                disabled={disabled}
                className='w-full transform rounded-br-2xl rounded-tl-2xl border-2 border-transparent bg-white p-1 text-purple1 transition-all duration-300 hover:scale-105 hover:border-purple3 hover:bg-purple2 hover:text-white disabled:bg-gray-400 disabled:text-white'
              >
                Submit order
              </button>
            </div>
            <div className='my-3 w-1/2'>
              <button
                type='submit'
                disabled={disabled}
                onClick={submitWithVnPay}
                className='w-full transform rounded-br-2xl rounded-tl-2xl border-2 border-transparent bg-white p-1 text-purple1 transition-all duration-300 hover:scale-105 hover:border-purple3 hover:bg-purple2 hover:text-white disabled:bg-gray-400 disabled:text-white'
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

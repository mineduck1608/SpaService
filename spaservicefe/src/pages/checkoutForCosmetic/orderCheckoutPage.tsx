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
  const [data, setData] = useState({
    fullName: '',
    phone: '',
    address: '',
    orderOnBehalf: false,
    name: '',
    tel: '',
    promoCode: '',
    value: 0
  })
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
    } catch (e) { }
  }, [])
  async function onSubmitBase(method: string) {
    try {
      const customerId = await getCustomerIdByAcc()
      const result = await createOrder({
        address: data.address,
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
    } catch (e) { }
  }
  async function submitWithVnPay(e: FormEvent) {
    e.preventDefault()
    try {
      var s = await onSubmitBase('VnPay')
      if (s?.total) {
        var url = await getPaymentUrl(s.total, s.rs) //Rs is transactionId
        window.location.replace(url)
        return
      }
      toast.error(s?.rs)
    } catch (e) {
      toast.error(e as string)
    }
  }
  const verifyRequiredData = cart.length !== 0 && data.address.length !== 0
  const verifyOptionalData = !data.orderOnBehalf || (data.fullName.length !== 0 && data.tel.length !== 0)
  const valid = verifyOptionalData && verifyRequiredData

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
            <div className='mb-4'>
              <label className='grid'>
                Address:
                <input
                  className='border-[1px] p-2'
                  value={data.address}
                  onChange={(e) => {
                    setData({ ...data, address: e.currentTarget.value })
                  }}
                />
              </label>
              <label className='mt-3 flex items-center justify-between'>
                Promotion Code:
                <input
                  className='mt-2 border-[1px] p-2'
                  // value={req.promotionCode}
                  // onChange={(e) => {
                  //   setReq({ ...req, promotionCode: e.currentTarget.value })
                  // }}
                  placeholder='Promotion code'
                />
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    className='size-5'
                  // checked={checked}
                  disabled={data.promoCode.length === 0}
                  // onChange={async (e) => {
                  //   var arg = !checked
                  //   setChecked(arg)
                  //   //Only execute this block if req.isActive is true
                  //   if (arg) {
                  //     await applyPromo()
                  //     return
                  //   }
                  //   setReq({ ...req, active: 0 })
                  // }}
                  />
                  <span>&nbsp;Apply promotion</span>
                </div>
              </label>
              <p className='mt-4'>
                Order on behalf of a person? &nbsp;
                <input
                  type='checkbox'
                  className='size-5'
                  checked={data.orderOnBehalf}
                  onChange={(e) => {
                    setData({ ...data, orderOnBehalf: !data.orderOnBehalf })
                  }}
                />
              </p>
              <div className='flex justify-between gap-6'
              >
                <label className='grid 2xl:w-[50%]'>
                  Full Name:
                  <input className='border-[1px] p-2 ' disabled={!data.orderOnBehalf} />
                </label>
                <label className='grid 2xl:w-[50%]'>
                  Telephone:
                  <input className='border-[1px] p-2' type='tel' disabled={!data.orderOnBehalf} />
                </label>
              </div>
            </div>
            <ProductList s={cart} />
          </div>
          {/* Sidebar with buttons */}
          <div className='flex w-1/3 flex-col items-center rounded-br-lg rounded-tr-lg bg-purple1 bg-[url(https://senspa.com.vn/wp-content/themes/thuythu/images/background1.png)] bg-[bottom_50px_right] bg-no-repeat px-5 py-4'>
            <p className='text-white'>You can pay via cash or VnPay</p>
            <div className='my-3 w-1/2'>
              <button
                type='submit'
                onClick={payInCash}
                disabled={!valid}
                className='w-full transform rounded-br-2xl rounded-tl-2xl border-2 border-transparent bg-white p-1 text-purple1 transition-all duration-300 hover:scale-105 hover:border-purple3 hover:bg-purple2 hover:text-white disabled:bg-gray-400 disabled:text-white'
              >
                Submit order
              </button>
            </div>
            <div className='my-3 w-1/2'>
              <button
                type='submit'
                disabled={!valid}
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

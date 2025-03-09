import { FormEvent, useEffect, useState } from 'react'
import ProductList from './productList.tsx'
import logoColor from '../../images/logos/logoColor.png'
import { getToken } from '../../types/constants.ts'
import { toast, ToastContainer } from 'react-toastify'
import { getPromoByCode, getPaymentUrl } from '../checkout/checkoutPage.util.ts'
import { getCart } from '../cosmeticDetailPage/detailPage.util.ts'
import { createOrder } from './checkoutPage.util.ts'
import { Promotion } from '@/types/type.ts'
import { SessionItem } from '@/types/sessionItem.ts'

export default function CosmeticCheckoutPage() {
  const [checked, setChecked] = useState(false)
  const [codes, setCodes] = useState<Map<string, string | Promotion>>(new Map<string, string | Promotion>())
  const [data, setData] = useState({
    fullName: '',
    phone: '',
    address: '',
    orderOnBehalf: false,
    name: '',
    promotionCode: '',
    active: 0
  })
  const [cart, setCart] = useState<SessionItem[]>([])
  const cus = sessionStorage.getItem('customerId')
  console.log(cus);
  
  useEffect(() => {
    async function fetchData() {
      var t = getToken()
      if (!t) {
        return
      }
      var cart = await getCart(cus ?? '')
      if (cart) {
        setCart(cart.filter(x => x.included))
      }
    }
    try {
      fetchData()
    } catch (e) {
      console.log(e);
      
    }
  }, [])
  async function onSubmitBase(method: string) {
    try {
      const result = await createOrder({
        address: data.address,
        customerId: cus ?? '',
        orderDate: new Date(),
        paymentType: method,
        promotionCode: data.promotionCode,
        details: cart.map((v) => {
          return {
            productId: v.product.productId,
            quantity: v.amount
          }
        }),
        phone: data.orderOnBehalf ? data.phone : undefined,
        recepientName: data.orderOnBehalf ? data.fullName : undefined
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
    } catch (e) {}
  }
  async function submitWithVnPay(e: FormEvent) {
    e.preventDefault()
    try {
      var s = await onSubmitBase('VnPay')
      if (s?.total) {
        var url = await getPaymentUrl(s.rs) //Rs is transactionId
        window.location.replace(url)
        return
      }
      toast.error(s?.rs)
    } catch (e) {
      toast.error(e as string)
    }
  }
  const verifyRequiredData = cart.length !== 0 && data.address.length !== 0
  const verifyOptionalData = !data.orderOnBehalf || (data.fullName.length !== 0 && data.phone.length !== 0)
  const valid = verifyOptionalData && verifyRequiredData

  async function applyPromo() {
    try {
      var code = data.promotionCode
      var entry = codes.get(code)
      if (entry) {
        if (typeof entry === 'string') {
          toast.error(entry, {
            toastId: new Date().getTime()
          })
          return
        }
        setData({ ...data, active: entry.discountValue })
        return
      }
      const s = await getPromoByCode(code)
      setCodes((v) => {
        v.set(code, s)
        return v
      })
      if (typeof s === 'string') {
        toast.error(s, {
          toastId: new Date().getTime()
        })
        return
      }
      setData({ ...data, active: s.discountValue })
    } catch (e) {
      console.log(e as string)
    }
  }

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
                  value={data.promotionCode}
                  onChange={(e) => {
                    setData({ ...data, promotionCode: e.currentTarget.value })
                  }}
                  placeholder='Promotion code'
                />
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    className='size-5'
                    checked={checked}
                    disabled={data.promotionCode.length === 0}
                    onChange={async (e) => {
                      var arg = !checked
                      setChecked(arg)
                      if (arg) {
                        await applyPromo()
                        return
                      }
                      setData({ ...data, active: 0 })
                    }}
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
              <div className='flex justify-between gap-6'>
                <label className='grid 2xl:w-[50%]'>
                  Full Name:
                  <input
                    className='border-[1px] p-2 '
                    disabled={!data.orderOnBehalf}
                    onChange={(e) => {
                      setData({ ...data, fullName: e.target.value })
                    }}
                  />
                </label>
                <label className='grid 2xl:w-[50%]'>
                  Telephone:
                  <input
                    className='border-[1px] p-2'
                    type='tel'
                    disabled={!data.orderOnBehalf}
                    onChange={(e) => {
                      setData({ ...data, phone: e.target.value })
                    }}
                  />
                </label>
              </div>
            </div>
            <ProductList s={cart} discountAmount={data.active} />
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

import { Service } from '../../types/services.ts'
import { FormEvent, useEffect, useState } from 'react'
import ServiceOverview from './serviceOverview.tsx'
import { SpaRequest } from '@/types/request.ts'
import { Input, DatePicker } from 'antd'
import {
  createTransaction,
  getCode,
  getCusByAcc,
  getCustomerIdByAcc,
  getEmployees,
  getPaymentUrl,
  submitRequest
} from './checkoutPage.util.ts'
import { Employee, Promotion } from '@/types/type.ts'
import logoColor from '../../images/logos/logoColor.png'
import { getToken } from '../../types/constants.ts'
import { jwtDecode } from 'jwt-decode'
import { toast, ToastContainer } from 'react-toastify'
import { ServiceCheckoutContext, SpaRequestModel } from './checkoutContext.tsx'
import MainForm from './mainForm.tsx'

export default function CheckoutPage() {
  const booked = JSON.parse(sessionStorage.getItem('booked') ?? '{}') as Service
  const [emp, setEmp] = useState<Employee[]>([])
  const [codes, setCodes] = useState<Map<string, string | Promotion>>(new Map<string, string | Promotion>())
  const [req, setReq] = useState<SpaRequestModel>({
    active: 0,
    customerId: '',
    customerNote: '',
    promotionCode: '',
    serviceId: booked.serviceId,
    startTime: new Date()
  })
  const [checked, setChecked] = useState(false)
  const { TextArea } = Input
  if (!booked.serviceId) {
    window.location.assign('/services')
  }
  useEffect(() => {
    async function fetchData() {
      var s = await getEmployees(booked.categoryId)
      setEmp(s)
      const cus = await getCustomerIdByAcc()
      if (cus) {
        setReq({ ...req, customerId: cus })
      }
    }
    try {
      fetchData()
    } catch (e) { }
  }, [])
  async function onSubmitBase(method: string) {
    try {
      var req2 = { ...req }
      req2.startTime.setTime(req2.startTime.getTime() + 7 * 3600 * 1000) //Account for JS stupid date API
      var s = await submitRequest(req2)
      if (s.msg) {
        toast.error(s.msg)
        return false
      }
      if (s.requestId) {
        var y = await createTransaction(method, booked.price, s.requestId)
        if (y.transactionId) {
          //State is stupid
          sessionStorage.setItem('trId', y.transactionId)
          return true
        }
        toast.error(req2.msg)
        return false
      }
      toast.error(s)
    } catch (e) {
      toast.error(e as string)
    }
    return false
  }
  async function payInCash(e: FormEvent) {
    e.preventDefault()
    try {
      var r = await onSubmitBase('Cash')
      if (r) {
        toast.success('Request created successfully')
      }
    } catch (e) {
      toast.error(e as string)
    }
  }
  async function submitWithVnPay(e: FormEvent) {
    e.preventDefault()
    try {
      var r = await onSubmitBase('VnPay')

      if (!r) {
        return
      }
      var transId = sessionStorage.getItem('trId') ?? ''
      sessionStorage.removeItem('trId')

      var url = await getPaymentUrl(booked.price, transId)
      if (url.startsWith('http')) {
        toast.success('We will redirect you to VnPay page')
        window.location.replace(url)
        return
      }

      toast.error(url)
    } catch (e) {
      toast.error(e as string)
    }
  }
  async function applyPromo() {
    try {
      var code = req.promotionCode
      var entry = codes.get(code)
      if (entry) {
        if (typeof entry === 'string') {
          toast.error(entry, {
            toastId: new Date().getTime()
          })
          return;
        }
        setReq({ ...req, active: entry.discountValue })
        return;
      }
      const s = await getCode(code)
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
      setReq({ ...req, active: s.discountValue })
    } catch (e) {
      console.log(e as string)
    }
  }
  const disable = (req.startTime ?? new Date()).getTime() < new Date().getTime() + 3600 * 1000
  return (
    <div className='relative h-[100vh] w-full overflow-hidden'>
      <ToastContainer containerId={'checkout-page'} />
      {/* Hình ảnh nền */}
      <ServiceCheckoutContext.Provider value={{ req, setReq, emp }}>
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
              <ServiceOverview s={booked} />
              <MainForm />
              <div className=''>
                <label className='flex items-center justify-between'>
                  Promotion Code:
                  <input
                    className='mt-2 border-[1px] p-2'
                    value={req.promotionCode}
                    onChange={(e) => {
                      setReq({ ...req, promotionCode: e.currentTarget.value })
                    }}
                    placeholder='Promotion code'
                  />
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      className='size-5'
                      checked={checked}
                      disabled={req.promotionCode.length === 0}
                      onChange={async (e) => {
                        var arg = !checked
                        setChecked(arg)
                        //Only execute this block if req.isActive is true
                        if (arg) {
                          await applyPromo()
                          return
                        }
                        setReq({ ...req, active: 0 })
                      }}
                    />
                    <span>&nbsp;Apply promotion</span>
                  </div>
                </label>
                <label className='mb-10 grid h-[150%]'>
                  <div className='flex justify-between'>
                    <p>Notes:</p>
                    <p>{req.customerNote.length}/255</p>
                  </div>
                  <TextArea
                    placeholder='Further inputs goes here'
                    maxLength={255}
                    onChange={(e) => {
                      setReq({ ...req, customerNote: e.currentTarget.value })
                    }}
                    className='h-[200%] pb-3 '
                  />
                </label>
              </div>
            </div>

            {/* Sidebar with buttons */}
            <div className='flex w-1/3 flex-col items-center rounded-br-lg rounded-tr-lg bg-purple1 bg-[url(https://senspa.com.vn/wp-content/themes/thuythu/images/background1.png)] bg-[bottom_50px_right] bg-no-repeat px-5 py-4'>
              <p className='text-white'>
                You can pay immediately or at 10B1 Le Thanh Ton, Ben Nghe Ward, District 1, HCMC
              </p>
              <div className='my-3 w-1/2'>
                <button
                  type='submit'
                  onClick={payInCash}
                  disabled={disable}
                  className='w-full transform rounded-br-2xl rounded-tl-2xl border-2 border-transparent bg-white p-1 text-purple1 transition-all duration-300 hover:scale-105 hover:border-purple3 hover:bg-purple2 hover:text-white disabled:bg-gray-300'
                >
                  Submit request
                </button>
              </div>
              <div className='my-3 w-1/2'>
                <button
                  type='submit'
                  onClick={submitWithVnPay}
                  disabled={disable}
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
      </ServiceCheckoutContext.Provider>
    </div>
  )
}

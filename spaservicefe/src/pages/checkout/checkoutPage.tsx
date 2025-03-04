import { Service } from '../../types/services.ts'
import { FormEvent, useEffect, useState } from 'react'
import ServiceOverview from './serviceOverview.tsx'
import dayjs from 'dayjs'
import { SpaRequest } from '@/types/request.ts'
import { Input, DatePicker } from 'antd'
import { createTransaction, getCusByAcc, getEmployees, getPaymentUrl, submitRequest } from './checkoutPage.util.ts'
import { Employee } from '@/types/type.ts'
import logoColor from '../../images/logos/logoColor.png'
import { getToken } from '../../types/constants.ts'
import { jwtDecode } from 'jwt-decode'
import { toast, ToastContainer } from 'react-toastify'

export default function CheckoutPage() {
  const booked = JSON.parse(sessionStorage.getItem('booked') ?? '{}') as Service
  const [emp, setEmp] = useState<Employee[]>([])
  const { TextArea } = Input
  const [req, setReq] = useState<SpaRequest>({
    customerId: '',
    customerNote: '',
    serviceId: booked.serviceId,
    startTime: dayjs(),
    employeeId: null
  })
  if (!booked.serviceId) {
    window.location.assign('/services')
  }
  const now = dayjs()
  const disable = req.startTime ? req.startTime.isBefore(now.add(1, 'hour')) : true
  useEffect(() => {
    async function fetchData() {
      var t = getToken()
      if (!t) {
        return
      }
      var x = jwtDecode(t ?? '')
      var s = await getEmployees(booked.categoryId)
      setEmp(s)
      var c = await getCusByAcc(x.UserId)
      if (c.customerId) {
        setReq({ ...req, customerId: c.customerId })
      }
    }
    try {
      fetchData()
    } catch (e) {}
  }, [])
  async function onSubmitBase(method: string) {
    try {
      var req2 = { ...req }
      req2.startTime = req2.startTime.add(7, 'h')
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

      var url = await getPaymentUrl(booked.price, jwtDecode(getToken() ?? '').UserId, transId)
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
            <ServiceOverview s={booked} />
            <div className='mb-4 gap-6 pt-4 2xl:flex 2xl:justify-between'>
              <label className='grid 2xl:w-[45%]'>
                Date:
                <DatePicker
                  step={1800}
                  showTime
                  showHour
                  showMinute
                  showSecond={false}
                  minuteStep={30}
                  className='mt-2 border-[1px] p-2'
                  onChange={(date) => {
                    setReq({ ...req, startTime: date })
                  }}
                  required
                  minDate={now}
                />
              </label>
              <label className='grid 2xl:w-[45%]'>
                Request employee:
                <select
                  onChange={(e) => {
                    var v = e.currentTarget.value

                    setReq({ ...req, employeeId: v === 'None' ? null : v })
                  }}
                  className='mt-2 w-full border-[1px] p-2'
                >
                  <option key={'Default'} hidden defaultChecked>
                    Select an employee you want
                  </option>
                  <option key={'null'}>None</option>
                  {emp.map((v, i) => (
                    <option key={v.employeeId} value={v.employeeId}>
                      {v.fullName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className='mb-5 mt-5'>
              <label className='grid h-[150%]'>
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
    </div>
  )
}

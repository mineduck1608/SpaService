import { Service } from '../../types/services.ts'
import { FormEvent, useEffect, useState } from 'react'
import ServiceOverview from './serviceOverview.tsx'
import { Input } from 'antd'
import {
  createTransaction,
  getPromoByCode,
  getEmployees,
  getPaymentUrl,
  submitRequest,
  getMembership,
  setItems,
  deleteInvalidRequests
} from './checkoutPage.util.ts'
import { Employee, Membership, Promotion } from '@/types/type.ts'
import logoColor from '../../images/logos/logoColor.png'
import { toast } from 'react-toastify'
import { ServiceCheckoutContext, SpaRequestModel } from './checkoutContext.tsx'
import MainForm from './mainForm.tsx'
import dayjs from 'dayjs'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { apiUrl, getToken } from '../../types/constants.ts'

export default function CheckoutPage() {
  const booked = JSON.parse(sessionStorage.getItem('booked') ?? '{}') as Service
  const cus = sessionStorage.getItem('customerId') ?? ''
  const now = dayjs()
  const [emp, setEmp] = useState<Employee[]>([])
  const [codes, setCodes] = useState<Map<string, string | Promotion>>(new Map<string, string | Promotion>())
  const [req, setReq] = useState<SpaRequestModel>({
    active: 0,
    customerId: cus,
    customerNote: '',
    promotionCode: '',
    serviceId: booked.serviceId,
    startTime: dayjs(),
    employeeId: null
  })
  const [checked, setChecked] = useState(false)
  const [membership, setMembership] = useState<Membership>()
  const [modalMailOpen, setModalMailOpen] = useState(false)
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [loadingText, setLoadingText] = useState('Processing')

  const { TextArea } = Input
  const disable = (req.startTime ? req.startTime.isBefore(now.add(1, 'h')) : true) || emp.length === 0
  if (!booked.serviceId) {
    window.location.assign('/services')
  }
  useEffect(() => {
    async function fetchData() {
      var s = await getEmployees(booked.categoryId)
      if (typeof s === 'string') {
        toast.error('No employees found for this category', { containerId: 'toast' })
        return
      }
      setEmp(s)
      const membership = await getMembership(cus)
      if (typeof membership === 'string') {
        toast.error(membership, { containerId: 'toast' })
        return
      }
      if (membership?.membershipId) {
        setMembership(membership ?? { discount: 0, membershipId: '', totalPayment: 0, type: '' })
      }
    }
    try {
      fetchData()
    } catch (e) {}
  }, [])
  async function onSubmitBase(method: string) {
    if (method !== 'Cash') {
      toast('Please wait while we submit your request', {
        containerId: 'toast'
      })
    }
    try {
        setModalMailOpen(true)
        setStatus('loading')
        setMessage('Processing...')

      var req2 = { ...req }
      req2.startTime = req2.startTime.add(7, 'h')
      var s = await submitRequest(req2)

      if (s.msg) {
        setStatus('error')
        setMessage(s.msg)
        if (method === 'VnPay') {
          toast.error(s.msg, { containerId: 'toast' })
        }
        return false
      }

      if (s.requestId) {
        var y = await createTransaction(
          method,
          booked.price,
          s.requestId ?? '',
          req.promotionCode,
          membership?.membershipId
        )

        if (y.transactionId) {
          sessionStorage.setItem('trId', y.transactionId)
          
          await fetch(`${apiUrl}/requests/CreateMail/${s.requestId}`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${getToken()}`,
              'Content-Type': 'application/json'
            }
          })
          return true
        } else {
          setStatus('error')
          setMessage(y.msg || 'Create request failed!')
          await deleteInvalidRequests(s.requestId)
          return false
        }
      }

      setStatus('error')
      setMessage('Error happen!')
      return false
    } catch (e) {
      setStatus('error')
      setMessage(e as string)
      return false
    }
  }
  async function payInCash(e: FormEvent) {
    e.preventDefault()
    try {
      var r = await onSubmitBase('Cash')
      if (r) {
        return
      }
    } catch (e) {
      toast.error(e as string, { containerId: 'toast' })
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
      setItems()
      var url = await getPaymentUrl(transId)
      if (url.startsWith('http')) {
        toast.success('We will redirect you to VnPay page', { containerId: 'toast' })
        window.location.replace(url)
        return
      }

      toast.error(url, { containerId: 'toast' })
    } catch (e) {
      toast.error(e as string, { containerId: 'toast' })
    }
  }
  async function applyPromo() {
    try {
      var code = req.promotionCode
      var entry = codes.get(code)
      if (entry) {
        if (typeof entry === 'string') {
          toast.error(entry, { containerId: 'toast' })
          return
        }
        setReq({ ...req, active: entry.discountValue })
        return
      }
      const s = await getPromoByCode(code, cus)
      setCodes((v) => {
        v.set(code, s)
        return v
      })
      if (typeof s === 'string') {
        toast.error(s, { containerId: 'toast' })
        return
      }
      setReq({ ...req, active: s.discountValue })
    } catch (e) {
      console.log(e as string)
    }
  }

  useEffect(() => {
    if (status !== 'loading') return

    const dots = ['Processing', 'Processing.', 'Processing..', 'Processing...']
    let index = 0

    const interval = setInterval(() => {
      setLoadingText(dots[index])
      index = (index + 1) % dots.length
    }, 500)

    return () => clearInterval(interval)
  }, [status])

  return (
    <div className='relative h-[130vh] w-full overflow-hidden font-montserrat'>
      {modalMailOpen && (
        <div className='fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-80 rounded-lg bg-white p-6 text-center shadow-lg'>
            {status === 'loading' && (
              <>
                <Loader2 className='mx-auto h-12 w-12 animate-spin text-blue-500' />
                <p className='mt-4 text-gray-500'>{loadingText}</p>
              </>
            )}

            {status === 'error' && (
              <>
                <XCircle className='mx-auto h-12 w-12 text-red-500' />
                <p className='mt-4 text-red-600'>{message}</p>
                <button
                  onClick={() => setModalMailOpen(false)}
                  className='mr-4 mt-4 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300'
                >
                  Close
                </button>
              </>
            )}
            {status === 'success' && (
              <>
                <p className='mt-4 text-green-600'>{message}</p>
                <div className='flex justify-evenly'>
                  <button
                    onClick={() => setModalMailOpen(false)}
                    className='mr-4 mt-4 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300'
                  >
                    Confirm
                  </button>
                  <button
                    className='mt-4 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300'
                    onClick={() => {
                      window.location.assign('requests')
                    }}
                  >
                    View requests
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

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
              <ServiceOverview s={booked} membershipValue={membership?.discount} />
              <MainForm />
              <div className='mt-3'>
                <label className='flex flex-col'>
                  Promotion Code:
                  <div className='mt-2 flex items-center'>
                    <input
                      className='border-[1px] p-2 px-4'
                      value={req.promotionCode}
                      onChange={(e) => {
                        setReq({ ...req, promotionCode: e.currentTarget.value })
                      }}
                      placeholder='Promotion code'
                    />
                    <div className='ml-5 flex items-center'>
                      <input
                        type='checkbox'
                        className='size-5'
                        checked={checked}
                        disabled={req.promotionCode.length === 0}
                        onChange={async (e) => {
                          var arg = !checked
                          setChecked(arg)
                          if (arg) {
                            await applyPromo()
                            return
                          }
                          setReq({ ...req, active: 0 })
                        }}
                      />
                      <span className='ml-1'>&nbsp;Apply promotion</span>
                    </div>
                  </div>
                </label>
                <label className='mb-10 mt-3 grid h-[150%]'>
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
                    className='h-[200%] pb-3 font-montserrat'
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

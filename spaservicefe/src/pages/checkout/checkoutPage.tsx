import { Service } from '../../types/services.ts'
import React, { useEffect, useState } from 'react'
import ServiceOverview from './serviceOverview.tsx'
import { SpaRequest } from '@/types/request.ts'
import { Input, DatePicker } from 'antd'
import { getEmployees } from './checkoutPage.util.ts'
import { Employee } from '@/types/type.ts'

export default function CheckoutPage() {
  const booked = JSON.parse(sessionStorage.getItem('booked') ?? '{}') as Service
  const [emp, setEmp] = useState<Employee[]>([])
  if (!booked.serviceId) {
    window.location.assign('/services')
  }
  useEffect(()=>{
    async function fetchData() {
      var s = await getEmployees(booked.categoryId)
      setEmp(s)
    }
    fetchData()
  }, [])
  const { TextArea } = Input
  const [req, setReq] = useState<SpaRequest>({
    customerId: '',
    customerNote: '',
    serviceId: booked.serviceId,
    startTime: new Date()
  })
  return (
    <div className='mb-32 mt-32 flex justify-center'>
      <form className='mt-32 flex w-3/5 justify-center'>
        <div className='relative w-2/3 rounded-bl-lg rounded-tl-lg p-20 shadow-lg'>
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
                  setReq({ ...req, startTime: date?.toDate() })
                }}
                required
              />
            </label>
            <label className='grid 2xl:w-[45%]'>
              Request employee:
              <select className='mt-2 w-full border-[1px] p-2'>
                <option hidden defaultChecked>
                  Select an employee you want
                </option>
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
        <div className='flex w-1/3 flex-col items-center rounded-br-lg rounded-tr-lg bg-purple1 px-5 py-4'>
          <p className='text-white'>You can pay immediately or at 10B1 Le Thanh Ton, Ben Nghe Ward, District 1, HCMC</p>
          <div className='my-3 w-1/2'>
            <button type='submit' className='w-full rounded-br-2xl rounded-tl-2xl bg-white p-1 text-purple1'>
              Submit request
            </button>
          </div>
          <div className='my-3 w-1/2'>
            <button type='button' className='w-full rounded-br-2xl rounded-tl-2xl bg-white p-1 text-purple1'>
              Pay now
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

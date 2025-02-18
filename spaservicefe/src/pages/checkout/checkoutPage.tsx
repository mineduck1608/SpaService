import { Service } from '../../types/services.ts'
import React, { useEffect, useState } from 'react'
import ServiceOverview from './serviceOverview.tsx'
import { SpaRequest } from '@/types/request.ts'
import { Input, DatePicker } from 'antd'
import { getEmployees } from './checkoutPage.util.ts'
import { Employee } from '@/types/type.ts'
import main from '../../images/stockImage/5.jpg'
export default function CheckoutPage() {
  const booked = JSON.parse(sessionStorage.getItem('booked') ?? '{}') as Service
  const [emp, setEmp] = useState<Employee[]>([])
  if (!booked.serviceId) {
    window.location.assign('/services')
  }
  useEffect(() => {
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
    <div className=' flex justify-center items-center '>
      <img src={main} className='absolute -z-10  w-full h-[110%] '/>
      <form className='rounded-lg bg-white mt-64 flex w-3/5 justify-center mb-48 z-10'>
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
              <select
                onChange={(e) => {
                  setReq({ ...req, employeeId: e.currentTarget.value })
                }}
                className='mt-2 w-full border-[1px] p-2'
              >
                <option key={'Default'} hidden defaultChecked>
                  Select an employee you want
                </option>
                <option key={'None'}>None</option>
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
        <div className='w-1/3 items-center rounded-br-lg rounded-tr-lg bg-purple1 px-5 py-4'>
          <p className='text-white'>You can pay immediately or at 10B1 Le Thanh Ton, Ben Nghe Ward, District 1, HCMC</p>
          <div className='flex justify-between'>
            <div className='my-3 w-2/5'>
              <button type='submit' className='w-full rounded-br-2xl rounded-tl-2xl bg-white p-1 text-purple1'>
                Submit request
              </button>
            </div>
            <div className='my-3 w-2/5 min-h-full'>
              <button type='button' className='w-full rounded-br-2xl rounded-tl-2xl bg-white p-1 text-purple1 h-full'>
                Pay now
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

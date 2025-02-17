import { Service } from '../../types/services.ts'
import React, { useState } from 'react'
import ServiceOverview from './serviceOverview.tsx'
import { SpaRequest } from '@/types/request.ts'
import { Input, DatePicker } from 'antd'

export default function CheckoutPage() {
  const booked = JSON.parse(sessionStorage.getItem('BOOKED') ?? '{}') as Service
  const { TextArea } = Input
  const [req, setReq] = useState<SpaRequest>({
    customerId: '',
    customerNote: '',
    serviceId: booked.serviceId,
    startTime: new Date()
  })
  return (
    <div className='mb-32 mt-32 flex justify-center'>
      <div className='mt-32 flex w-3/5 justify-center'>
        <div className='relative w-2/3 rounded-bl-lg rounded-tl-lg p-20 shadow-lg'>
          <ServiceOverview s={booked} />
          <div className='mb-4 flex justify-between pt-4'>
            <label className='grid w-2/5'>
              Date:
              <DatePicker showTime className='mt-2 border-[1px] p-2' required />
            </label>
            <label className='grid w-2/5'>
              Request employee:
              <select className='mt-2 border-[1px] p-2'>
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
        <div className='w-1/3 rounded-br-lg rounded-tr-lg bg-purple1 px-3 py-4'>
          <p className='text-white'>You can pay immediately or at 10B1 Le Thanh Ton, Ben Nghe Ward, District 1, HCMC</p>
          <div className='flex justify-around'>
            <button className='w-1/3 rounded-br-lg rounded-tl-lg bg-white p-1 text-purple1'>Submit request</button>
            <button className='w-1/3 rounded-br-lg rounded-tl-lg bg-white p-1 text-purple1'>Pay now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

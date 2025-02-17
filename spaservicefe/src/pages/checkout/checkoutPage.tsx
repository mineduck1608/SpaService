import { Service } from '../../types/services.ts'
import React, { useState } from 'react'
import ServiceOverview from './serviceOverview.tsx'
import { SpaRequest } from '@/types/request.ts'

export default function CheckoutPage() {
  const booked = JSON.parse(sessionStorage.getItem('BOOKED') ?? '{}') as Service
  const [req, setReq] = useState<SpaRequest>({
    customerId: '',
    customerNote: '',
    serviceId: booked.serviceId,
    startTime: new Date()
  })
  return (
    <div className='mb-40 mt-40 flex justify-center'>
      <div className='mt-32 flex w-3/4 justify-center'>
        <div className='p-20 shadow-lg w-2/3'>
          <ServiceOverview s={booked} />
          <div className='flex justify-between pt-5 mb-5'>
            <label className='grid w-2/5'>
              Start time:
              <input
                type='datetime-local'
                value={req.startTime.toString()}
                className='mt-4 border-[1px] p-2'
                onChange={(e) => {
                  var t = e.currentTarget.valueAsDate
                  if (t) {
                    setReq({ ...req, startTime: t })
                  }
                }}
              />
            </label>
            <label className='grid w-2/5'>
              Requested employee:
              <select className='mt-4 border-[1px] p-2'>
                <option hidden defaultChecked>
                  Select an employee you want
                </option>
              </select>
            </label>
          </div>
          <label className='grid'>
            Notes:
          </label>
        </div>
        <div className='w-1/3 bg-black'>A</div>
      </div>
    </div>
  )
}

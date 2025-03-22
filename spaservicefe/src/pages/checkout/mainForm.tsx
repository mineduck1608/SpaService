import { DatePicker } from 'antd'
import React, { useContext } from 'react'
import { ServiceCheckoutContext } from './checkoutContext'
import dayjs from 'dayjs'

export default function MainForm() {
  const context = useContext(ServiceCheckoutContext)
  return (
    <div className='mb-2 gap-6 pt-4 2xl:flex 2xl:justify-between'>
      <label className='grid 2xl:w-[45%]'>
        Date:
        <DatePicker
          step={1800}
          showTime
          showHour
          showMinute
          showSecond={false}
          minuteStep={30}
          className='mt-2 border-[1px] p-2 font-montserrat'
          onChange={(date) => {
            context.setReq({ ...context.req, startTime: date })
          }}
          minDate={dayjs()}
          required
        />
      </label>
      <label className='grid 2xl:w-[65%]'>
        Request employee:
        <select
          onChange={(e) => {
            var v = e.currentTarget.value
            context.setReq({ ...context.req, employeeId: v === 'None' ? null : v })
          }}
          className='mt-2 w-full border-[1px] p-2'
        >
          <option key={'Default'} hidden defaultChecked>
            Select an employee you want
          </option>
          <option key={'null'}>None</option>
          {context.emp.map((v, i) => (
            <option key={v.employeeId} value={v.employeeId}>
              {v.fullName}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

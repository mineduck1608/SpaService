import { formatNumber } from '../../../pages/servicesPage/servicesPage.util'
import { ServiceStat } from '@/types/statistic'
import React from 'react'

export default function ServiceTable(params: { data: ServiceStat[] }) {
  return (
    <table className='w-full'>
      <thead>
        <tr className='*:border-[1px] *:border-purple1 *:bg-purple1 *:p-2 *:pt-0 *:text-center *:text-white'>
          <th>Category</th>
          <th>Service</th>
          <th>Request count</th>
          <th>Appointment count</th>
          <th>Ratings</th>
          <th>Gender distribution</th>
          <th>Revenue</th>
        </tr>
      </thead>
      <tbody>
        {params.data.map((v, i) => (
          <tr className='*:border-[1px] *:border-purple1 *:p-2 *:pt-0'>
            <td className='w-[15%] '>{v.serviceCategory}</td>
            <td className='w-[15%] '>{v.serviceName}</td>
            <td className='w-[10%] '>{v.statistic.requestCount}</td>
            <td className='w-[10%] '>{v.statistic.appointmentCount}</td>
            <td className='w-[25%] '>
              <div className='flex justify-between'>
                {v.statistic.rating.map((v, i) => (
                  <p>
                    {i + 1} stars: {v}
                  </p>
                ))}
              </div>
            </td>
            <td className='w-[15%] '>
              <div>Female: {v.statistic.genderCount[0]}</div>
              <div>Male: {v.statistic.genderCount[1]}</div>
            </td>
            <td className='w-[10%]'>{formatNumber(v.statistic.revenue)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

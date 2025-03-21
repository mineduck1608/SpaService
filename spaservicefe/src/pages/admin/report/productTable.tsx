import { formatNumber } from '../../../pages/servicesPage/servicesPage.util'
import { ProductStat } from '@/types/statistic'
import React from 'react'

export default function ProductTable(params: { data: ProductStat[] }) {
  return (
    <table className='w-full'>
      <thead>
        <tr className='*:border-[1px] *:border-purple1 *:bg-purple1 *:p-2 *:pt-0 *:text-center *:text-white'>
          <th>Category</th>
          <th>Product</th>
          <th>Order count</th>
          <th>Revenue</th>
          <th>Gender distribution</th>
          <th>Current in stock</th>
        </tr>
      </thead>
      <tbody>
        {params.data.map((v) => (
          <tr className='*:border-[1px] *:border-purple1 *:p-2 *:pt-0'>
            <td className='w-[15%] '>{v.productCategory}</td>
            <td className='w-[15%] '>{v.productName}</td>
            <td className='w-[10%] '>{v.statistic.orderCount}</td>
            <td className='w-[15%] '>{formatNumber(v.statistic.revenue)}</td>
            <td className='w-[15%] '>
              <div>Female: {v.statistic.genderDistribution[0]}</div>
              <div>Male: {v.statistic.genderDistribution[1]}</div>
            </td>
            <td className='w-[15%] '>{v.statistic.currentInStock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

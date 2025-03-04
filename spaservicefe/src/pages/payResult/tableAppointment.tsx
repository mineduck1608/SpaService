import React from 'react'
import { getCart } from '../cosmeticDetailPage/detailPage.util'
import { formatNumber } from '../servicesPage/servicesPage.util'

export default function TableAppointment(params: { map: Map<string, string> }) {
  return (
    <table className='w-4/5 border-[1px]'>
      <tbody>
        <tr>
          <td className='border-[1px black solid] p-2'>Service</td>
          <td>{params.map.get('serviceName')}</td>
        </tr>
        <tr>
          <td className='p-2'>Requested Employee</td>
          <td>{params.map.get('empName')}</td>
        </tr>
        <tr>
          <td className='p-2'>Start Time</td>
          <td>{params.map.get('startTime')}</td>
        </tr>
        <tr>
          <td className='p-2'>End Time</td>
          <td>{params.map.get('endTime')}</td>
        </tr>
      </tbody>
    </table>
  )
}

export function TableSessionItem() {
  const items = getCart().filter(x => x.included)
  return (
    <table>
      <thead className='bg-purple1 text-white *:border-[1px] *:border-purple1 *:p-3'>
        <td>Product name</td>
        <td>Price per item</td>
        <td>Amount</td>
        <td>Sub Total</td>
      </thead>
      <tbody>
        {items.map((v, i) => (
          <tr className='border-purple1 *:border-[1px] *:p-3'>
            <td>{v.product.productName}</td>
            <td>{v.product.price}</td>
            <td>{formatNumber(v.amount)}</td>
            <td>{formatNumber(v.product.price * v.amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
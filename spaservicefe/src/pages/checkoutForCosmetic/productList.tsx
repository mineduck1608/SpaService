import { SessionItem } from '../../types/sessionItem'
import React from 'react'
import { formatNumber } from '../servicesPage/servicesPage.util'

export default function ProductList(params: { s: SessionItem[] }) {
  const items = params.s
  items.forEach((v) => {
    v.product.price = parseFloat(v.product.price.toFixed(1))
  })
  var total = 0
  items
    .map((x) => {
      return {
        count: x.amount,
        price: x.product.price
      }
    })
    .forEach((v) => {
      total += v.count * v.price
    })

  return (
    <div className='flex flex-col rounded-lg'>
      <table>
        <thead className='bg-purple1 text-white *:border-[1px] *:border-purple1 *:p-3'>
          <td>Index</td>
          <td>Product name</td>
          <td>Price per item</td>
          <td>Amount</td>
          <td>Sub Total</td>
        </thead>
        <tbody>
          {items.map((v, i) => (
            <tr className='border-purple1 *:border-[1px] *:p-3'>
              <td>{i + 1}</td>
              <td>{v.product.productName}</td>
              <td>{v.product.price}</td>
              <td>{v.amount}</td>
              <td>{v.product.price * v.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='mt-2 flex flex-row justify-end'>
        <p>
          The total amount is:&nbsp;
          <span className='font-bold text-red-600'>{total.toFixed(1)}</span>
        </p>
      </div>
    </div>
  )
}

import { SessionItem } from '../../types/sessionItem'
import React from 'react'
import { formatNumber } from '../servicesPage/servicesPage.util'
import { getCart } from '../cosmeticDetailPage/detailPage.util'

export default function ProductList(params: { s: SessionItem[]; discountAmount?: number }) {
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
  const discount = params.discountAmount ?? 0
  function applyPromo(x: number) {
    return x * ((100 - discount) / 100)
  }
  return (
    <div className='flex w-full flex-col rounded-lg'>
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
              <td>{formatNumber(v.product.price)}</td>
              <td>{formatNumber(v.amount)}</td>
              <td className={`${discount ? 'text-[#00dd00]' : ''}`}>
                {formatNumber(applyPromo(v.product.price * v.amount))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='mt-2 flex flex-row justify-end'>
        <p className='text-xl'>
          The total amount is:&nbsp;
          <span className={`font-bold  ${params.discountAmount ? 'text-[#00dd00]' : 'text-red-600'}`}>
            {formatNumber(applyPromo(total))} {discount > 0 ? `(-${discount}%)` : ''}
          </span>
        </p>
      </div>
    </div>
  )
}

import { SessionItem } from '../../types/sessionItem'
import React from 'react'
import { formatNumber } from '../servicesPage/servicesPage.util'

export default function ProductList(params: { s: SessionItem[]; discountAmount?: number }) {
  const items = params.s.map((v) => ({
    ...v,
    product: { ...v.product, price: parseFloat(v.product.price.toFixed(1)) }
  }))

  const discount = params.discountAmount ?? 0
  const applyPromo = (x: number) => x * ((100 - discount) / 100)

  const total = items.reduce((sum, item) => sum + item.amount * item.product.price, 0)
  const discountedTotal = applyPromo(total)

  return (
    <div className='flex w-full flex-col rounded-lg'>
      <table>
        <thead className='bg-purple1 text-white *:border-[1px] *:border-purple1 *:p-3 text-sm text-center'>
          <tr>
            <th>Product</th>
            <th>Product name</th>
            <th>Price per item</th>
            <th>Amount</th>
            <th>Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((v, i) => {
            const subTotal = v.product.price * v.amount
            const discountedSubTotal = applyPromo(subTotal)
            return (
              <tr key={i} className='border-purple1 *:border-[1px] *:p-3'>
                <td>
                  <img src={v.product.image} alt='product' className='w-16 h-16 object-cover rounded' />
                </td>

                <td>{v.product.productName}</td>
                <td>
                  {discount ? (
                    <>
                      <span className='line-through text-gray-500'>{formatNumber(v.product.price)}</span>{' '}
                      <span className='text-green-600'>{formatNumber(applyPromo(v.product.price))}</span>
                    </>
                  ) : (
                    formatNumber(v.product.price)
                  )}
                </td>
                <td>{formatNumber(v.amount)}</td>
                <td className={`${discount ? 'text-green-600' : ''}`}>
                  {discount ? (
                    <>
                      <span className='line-through text-gray-500'>{formatNumber(subTotal)}</span>{' '}
                      <span>{formatNumber(discountedSubTotal)}</span>
                    </>
                  ) : (
                    formatNumber(subTotal)
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='mt-2 flex flex-row justify-end'>
        <p className='text-xl'>
          The total amount is:&nbsp;
          {discount ? (
            <>
              <span className='line-through text-red-500'>{formatNumber(total)}</span>{' '}
              <span className='font-bold text-green-600'>
                {formatNumber(discountedTotal)} (-{discount}%)
              </span>
            </>
          ) : (
            <span className='font-bold text-red-600'>{formatNumber(total)}</span>
          )}
        </p>
      </div>
    </div>
  )
}

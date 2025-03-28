import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TableAppointment from './tableAppointment'
import { getCart } from '../cosmeticDetailPage/detailPage.util'
import { SessionItem } from '@/types/sessionItem'
import ProductList from '../checkoutForCosmetic/productList'
import { apiUrl, getToken } from '../../types/constants'
import { Promotion } from '@/types/type'
import { getCookie } from '../checkoutForCosmetic/checkoutPage.util'
import { getQueryParamsMap } from './productPayResult'

export default function PayResultPage() {
  const [r, setR] = useState<boolean | null>(null)
  const [cart, setCart] = useState<SessionItem[]>([])
  const [promo, setPromo] = useState(0)
  // Data in query string
  //success: True or False
  //empName: employee Name
  //startTime: start time of the appointment
  //endTime:
  //service: service name
  async function getPromoById(code: string) {
    try {
      var c = await fetch(`${apiUrl}/promotions/GetById/${code}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      if (c.ok) {
        return (await c.json()) as Promotion
      }
      return await c.text()
    } catch (e) {
      return "Couldn't connect to server"
    }
  }
  const map = getQueryParamsMap(window.location.search.substring(1))
  useEffect(() => {
    async function loadData() {
      var s = JSON.parse(map.get('detail') ?? '[]')
      var items = s.map(x => {
        var t:SessionItem = {
          amount: x.qty,
          product: {
            productName: x.name,
            price: x.subTotal / x.qty,
            image: x.img
          }
        }
        return t
      })
      var p = await getPromoById(map.get('promotionId') ?? '')
      if (typeof p === 'object') {
        setPromo(p.discountValue)
      }
      if (items) {
        setCart(items)
      }
    }
    var token = getCookie('token')
    sessionStorage.setItem('token', token)
    setR(map.get('success') === 'True')
    if (map.get('type') === 'Product') {
      sessionStorage.setItem('customerId', map.get('customerId') ?? '')
      loadData()
    }
  }, [])
  var bg = r ? 'bg-green-600' : 'bg-red-500'
  return (
    <div className='relative h-[100vh] w-full overflow-hidden'>
      <div
        className={` 
          ${Object.is(r, null) ? '' : bg}
          h-full w-full bg-cover bg-center transition-all`}
      ></div>
      <div className='absolute left-0 right-0 top-36 z-10 mt-32 flex justify-center'>
        <div className='flex w-3/5 justify-center'>
          {!Object.is(r, null) && (
            <div className='flex w-2/3 items-center justify-center rounded-lg bg-white p-20 shadow-lg'>
              {r && (
                <div className=''>
                  <p className='text-center text-3xl font-bold text-green-400'>Payment successful!</p>
                  <p className='text-xl'>Thank you for your consideration. Here are your order information:</p>
                  <div className='flex justify-center py-4'>
                    {map.get('type') === 'Service' && <TableAppointment map={map} />}
                    {map.get('type') === 'Product' && <ProductList s={cart} discountAmount={promo} />}
                  </div>
                  <div className='flex justify-center'>
                    <Link
                      className='rounded-xl bg-green-600 p-3 font-bold text-white no-underline'
                      to={map.get('type') === 'Service' ? `/requests` : '/transactions'}
                      onClick={(e) => {
                        sessionStorage.setItem('autoProduct', map.get('type') === 'Service' ? '0' : '1')
                      }}
                    >
                      {map.get('type') === 'Service' ? 'View your new request!' : 'View your transactions'}
                    </Link>
                  </div>
                </div>
              )}
              {!r && (
                <div>
                  <p className='text-center text-3xl font-bold text-red-600'>Payment unsuccessful!</p>
                  <p className='text-xl'>Due to an unexpected error, your payment could not be finished</p>
                  <p className='text-xl'>
                    Please try again, and if the errors keep happening, please contact us as soon as possible.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

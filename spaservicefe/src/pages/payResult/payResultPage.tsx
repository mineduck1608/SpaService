import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TableAppointment from './tableAppointment'
import { getCart } from '../cosmeticDetailPage/detailPage.util'
import { SessionItem } from '@/types/sessionItem'
import ProductList from '../checkoutForCosmetic/productList'
import { getPromoByCode } from '../checkout/checkoutPage.util'
import { apiUrl, getToken } from '../../types/constants'
import { Promotion } from '@/types/type'
import { getCookie } from '../checkoutForCosmetic/checkoutPage.util'

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

  function getQueryParamsMap(queryString: string): Map<string, string> {
    const paramsMap = new Map<string, string>()

    // Remove the leading "?" if present
    const query = queryString.startsWith('?') ? queryString.substring(1) : queryString

    query.split('&').forEach((param) => {
      const [key, value] = param.split('=')
      if (key) {
        paramsMap.set(decodeURIComponent(key), decodeURIComponent(value || ''))
      }
    })
    return paramsMap
  }
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
    async function fetchCart(customerId: string) {
      var s = await getCart(customerId)
      var p = await getPromoById(map.get('promotionId') ?? '')
      if (typeof p === 'object') {
        setPromo(p.discountValue)
      }
      if (s) {
        setCart(s)
      }
    }
    var token = getCookie('token')
    sessionStorage.setItem('token', token)
    setR(map.get('success') === 'True')
    if (map.get('type') === 'Product') {
      sessionStorage.setItem('customerId', map.get('customerId') ?? '')
      fetchCart(map.get('customerId') ?? '')
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
                    {map.get('type') === 'Product' && <ProductList s={cart} discountAmount={promo}/>}
                  </div>
                  <div className='flex justify-center'>
                    <Link
                      className='rounded-xl bg-green-600 p-3 font-bold text-white no-underline'
                      to={map.get('type') === 'Service' ? `/requests` : '/'}
                    >
                      View your new request!
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

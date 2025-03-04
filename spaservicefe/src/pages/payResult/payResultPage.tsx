import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TableAppointment from './tableAppointment'

export default function PayResultPage() {
  const [r, setR] = useState<boolean | null>(null)

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
  const map = getQueryParamsMap(window.location.search.substring(1))
  useEffect(() => {
    setR(map.get('success') === 'True')
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
                    {map.get('type') === 'Product' && <TableAppointment map={map} />}
                  </div>
                  <div className='flex justify-center'>
                    <Link className='rounded-xl bg-green-600 p-3 font-bold text-white no-underline' to='/requests'>
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

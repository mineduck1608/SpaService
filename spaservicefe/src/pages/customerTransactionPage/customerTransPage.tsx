import React, { useState } from 'react'
import CustomerTransTable from './customerTransTable'
import bg from '../../images/customerHistory/bg.jpg'
import { SmallProduct, TransTypeContext } from './context/transTypeContext'

export default function CustomerTransPage() {
  const [showServiceTrans, setShowServiceTrans] = useState(true)
  const [products, setProducts] = useState<SmallProduct[]>([])
  return (
    <div
      className='flex justify-center bg-slate-400 bg-cover bg-no-repeat'
      style={{
        background: 'url(https://senspa.com.vn/wp-content/uploads/2021/01/2-3.png)'
      }}
    >
      <div className='mb-40 mt-60 w-full p-5 '>
        <TransTypeContext.Provider value={{ showServiceTrans, setShowServiceTrans, products, setProducts }}>
          <CustomerTransTable />
        </TransTypeContext.Provider>
      </div>
    </div>
  )
}

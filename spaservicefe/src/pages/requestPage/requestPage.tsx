import React from 'react'
import RequestTable from './requestTable'
import bg from '../../images/customerHistory/bg.jpg'

export default function RequestPage() {
  return (
    <div
      className='flex justify-center bg-slate-400 bg-cover bg-no-repeat'
      style={{
        background: 'url(https://senspa.com.vn/wp-content/uploads/2021/01/2-3.png)'
      }}
    >
      <div className='mb-40 mt-60 w-full p-5 '>
        <RequestTable />
      </div>
    </div>
  )
}

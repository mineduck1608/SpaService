import React from 'react'
import RequestTable from './requestTable'

export default function RequestPage() {
  return (
    <div className='flex justify-center'
      style={{
        backgroundImage: `url(https://siamelegancehotels.com/wp-content/uploads/2022/06/dsc9419.jpg)`
      }}>
      <div className='w-full mt-60 mb-40 p-5 z-10'
      >
        <RequestTable />
      </div>
    </div>
  )
}

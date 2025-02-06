import React, { useState } from 'react'
import { imgs, sample } from './servicesPage.util'
import { Link } from 'react-router-dom'

export default function ServicesPage() {
  const [currentService, setCurrentService] = useState('')
  return (
    <div>
      <img src={imgs.headerBg} alt='Header' />
      <div className='mb-5 p-2 md:ml-28 xl:ml-60'>
        <span className='font-normal text-gray-400'>
          <Link to={'/'}>Home</Link>
          &nbsp;&gt; 'XXX'
        </span>
      </div>
      {/* Main container */}
      <div className='flex md:ml-28 xl:ml-60'>
        {/* Left menu */}
        <div className='hidden w-1/3 bg-slate-200 lg:flex'>
          <LeftMenu
            items={sample}
            onClickItem={(v) => {
              setCurrentService(v)
            }}
          />
        </div>
        <div className='mr-28 w-full bg-slate-400 lg:w-2/3 xl:mr-60'>
          <LeftMenu
            items={sample}
            onClickItem={(v) => {
              setCurrentService(v)
            }}
          />
        </div>
      </div>
    </div>
  )
}
function LeftMenu(params: { items: { name: string; val: string }[]; onClickItem: (value: string) => void }) {
  return (
    <div>

    </div>
  )
}

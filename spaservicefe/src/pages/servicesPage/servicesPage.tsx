import React, { useState } from 'react'
import { imgs, sample } from './servicesPage.util'
import { Link } from 'react-router-dom'

export default function ServicesPage() {
  const [currentService, setCurrentService] = useState('')
  return (
    <div>
      <img src={imgs.headerBg} alt='Header' />
      <div className='mb-5 p-2 md:ml-28 xl:ml-50'>
        <span className='font-normal text-gray-400'>
          <Link to={'/'}>Home</Link>
          &nbsp;&gt; 'XXX'
        </span>
      </div>
      {/* Main container */}
      <div className='flex md:ml-28 xl:ml-50'>
        {/* Left menu */}
        <div id={'left-menu'} className='hidden w-2/5 justify-center lg:flex bg-red-100'>
          <LeftMenu
            items={sample}
            onClickItem={(v) => {
              setCurrentService(v)
            }}
          />
        </div>
        {/* Services available */}
        <div className='mr-28 w-full lg:w-3/5 xl:mr-60'>
          <LeftMenu
            items={sample}
            onClickItem={(v) => {
              setCurrentService(v)
            }}
          />
          A
        </div>
      </div>
    </div>
  )
}
function LeftMenu(params: { items: { name: string; val: string }[]; onClickItem: (value: string) => void }) {
  return (
    <div className='w-5/6'>
      {/* Header */}
      <div className='flex justify-center rounded-tl-[40px] bg-[#8D388A] p-5 text-2xl font-bold text-white'>
        <img src={imgs.logo} className='inline' />
        &nbsp;Services
      </div>
      <div className='flex flex-col shadow-lg rounded-br-[40px]'>
        {params.items.map((v, i) => (
          <div
            className={`flex flex-col
            ${i === params.items.length - 1 ? 'rounded-br-[40px]' : ''}
          `}
          >
            {/* Item container */}
            <div className={`flex justify-center`}>
              <button
                className={`p-3 pl-6 pr-6`}
                onClick={() => {
                  params.onClickItem(v.val)
                }}
              >
                {v.name}
              </button>
            </div>
            {/* Line */}
            <div
              className={`w-11/12 self-center 
              ${i !== params.items.length - 1 ? ' border-b-2 ' : ''}
              `}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}

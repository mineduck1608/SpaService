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
        <div className='hidden w-1/3 lg:flex'>
          <LeftMenu
            items={sample}
            onClickItem={(v) => {
              setCurrentService(v)
            }}
          />
        </div>
        <div className='mr-28 w-full lg:w-2/3 xl:mr-60'>
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
      {/* Header */}
      <div className='rounded-tl-[40px] bg-[#8D388A] p-5 text-2xl font-bold text-white flex justify-center'>
        <img src={imgs.logo} className='inline' />
        &nbsp;Services
      </div>
      <div className='flex flex-col rounded-br-[20%]'>
        {params.items.map((v, i) => (
          <div className='flex flex-col'>
            {/* Item container */}
            <div
              className={`flex justify-center 
            `}
            >
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
              ${i !== params.items.length ? 'border-b-2 rounded-br-[40px]' : ''}
              `}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}

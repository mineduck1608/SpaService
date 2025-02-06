import React, { useState } from 'react'
import { imgs, sample } from './servicesPage.util'
import { Link } from 'react-router-dom'

export default function ServicesPage() {
  const [currentService, setCurrentService] = useState('XXX')
  return (
    <div>
      <img src={imgs.headerBg} alt='Header' className='w-full' />
      <div className='mb-20 mb-5 p-2 md:ml-28  lg:ml-5 xl:ml-40'>
        <span className='font-normal text-gray-400'>
          <Link to={'/'}>Home</Link>
          &nbsp;&gt; {currentService}
        </span>
      </div>
      {/* Main container */}
      <div className='flex md:ml-24 md:mr-24 lg:ml-5 lg:mr-5 '>
        <div className='flex w-full bg-purple-200 sm:justify-center lg:justify-normal'>
          {/* Left menu */}
          <div className='w-[310px] hidden lg:flex xl:ml-[17.5vw]'>
            <div id={'left-menu'} className='hidden justify-center lg:flex'>
              <LeftMenu
                items={sample}
                onClickItem={(v) => {
                  setCurrentService(v)
                }}
              />
            </div>
          </div>
          {/* Services available */}
          <div className='w-5/6 bg-red-100 lg:ml-[5vw] xl:w-2/5'>Body</div>
        </div>
      </div>
    </div>
  )
}
function LeftMenu(params: { items: { name: string; val: string }[]; onClickItem: (value: string) => void }) {
  return (
    <div className='w-[310px]'>
      {/* Header */}
      <div className='flex justify-center rounded-tl-[40px] bg-[#8D388A] p-5 text-2xl font-bold text-white'>
        <img src={imgs.logo} className='inline' />
        &nbsp;Services
      </div>
      <div className='flex flex-col rounded-br-[40px] shadow-lg'>
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

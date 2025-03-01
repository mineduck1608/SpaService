import React from 'react'
import { formatNumber } from './cosmeticPage.util'
import sep from '../../images/serviceBg/separator.png'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import { CosmeticProduct } from '@/types/type'

export default function CosmeticList(params?: { cosmetic: CosmeticProduct[] }) {
  return (
    <div className='p-1'>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
        {params?.cosmetic.map((v) => <CosmeticCard s={v} key={v.productId} />)}
      </div>
    </div>
  )
}

export function CosmeticCard(params?: { s: CosmeticProduct }) {

  const handleNavigate = () => {
    window.location.assign(`/cosmetics-detail/${params?.s?.productId}`) // Use navigate() for routing
  }

  return (
    <div className='w-full min-w-[300px] '>
      {/* Container */}
      <div className='flex flex-col rounded-md shadow'>
        <img src={params?.s?.image} alt={params?.s?.productName} className='aspect-[1/0.65] w-full rounded-t-md ' />
        <div className='flex items-center justify-center pt-4'>
          <button onClick={handleNavigate}>
            <p className='text-center text-lg font-bold'>{params?.s?.productName}</p>
          </button>
        </div>

        <img src={sep} className='mb-2 mt-2 w-1/4 self-center' />
        <div className='m-1'>
          <p className='text-center text-lg font-bold text-[#8D388A]'>{formatNumber(params?.s?.price ?? 0)} VND</p>
        </div>
        <div className='mb-4 flex justify-center'>
          <button
            onClick={handleNavigate}
            className={`w-1/2 rounded-br-2xl rounded-tl-2xl border-2 border-[#8D388A] bg-white p-2 text-[#8D388A] 
            duration-300 hover:-translate-x-1 hover:shadow-[1px_1px_#8D388A,2px_2px_#8D388A]`}
          >
            Detail &gt;
          </button>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'

interface Props {
  direction: string
  onClick: () => void
}

const ArrowButton: React.FC<Props> = ({ direction, onClick }) => {
  const isRight = direction == 'right'

  return (
    <div>
      {isRight ? (
        <div className='group relative'>
          <div className='absolute inset-0 translate-x-1 translate-y-1 rounded-br-2xl rounded-tl-2xl bg-purple-900 opacity-0 group-hover:opacity-100'></div>
          <div className='relative rounded-br-2xl rounded-tl-2xl border border-purple-900 bg-white p-3'>
            <button className='text-purple-500 md:block' onClick={onClick}>
              <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeWidth='2' strokeLinecap='round' d='M15 19l-7-7 7-7' />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className='group relative'>
          <div className='absolute inset-0 -translate-x-1 translate-y-1 rounded-bl-2xl rounded-tr-2xl bg-purple-900 opacity-0 group-hover:opacity-100'></div>
          <div className='relative rounded-bl-2xl rounded-tr-2xl border border-purple-900 bg-white p-3'>
            <button className='text-purple-500 md:block' onClick={onClick}>
              <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeWidth='2' strokeLinecap='round' d='M9 5l7 7-7 7' />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default ArrowButton

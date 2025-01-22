import React, {useState} from 'react'

interface Props {
  direction: string;
  onClick: () => void;
}

const ArrowButton : React.FC<Props> = ({direction, onClick}) => {
  const isRight = direction == "right";

  return (
      <div>
          {isRight ? (
              <div className='relative group'>
                  <div className='bg-purple-900 absolute inset-0 translate-x-1 translate-y-1 rounded-tl-2xl rounded-br-2xl opacity-0 group-hover:opacity-100'></div>
                  <div className='bg-white p-3 rounded-tl-2xl rounded-br-2xl relative border border-purple-900'>
                      <button className='hidden md:block text-purple-500' onClick={onClick}>
                          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeWidth='2' strokeLinecap='round' d='M15 19l-7-7 7-7' />
                          </svg>
                      </button>
                  </div>
              </div>
          ) : (
              <div className='relative group'>
                  <div className='bg-purple-900 absolute inset-0 -translate-x-1 translate-y-1 rounded-tr-2xl rounded-bl-2xl opacity-0 group-hover:opacity-100'></div>
                  <div className='bg-white p-3 rounded-tr-2xl rounded-bl-2xl relative border border-purple-900'>
                      <button className='hidden md:block text-purple-500' onClick={onClick}>
                          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeWidth='2' strokeLinecap='round' d='M9 5l7 7-7 7' />
                          </svg>
                      </button>
                  </div>
              </div>
          )}
      </div>
)}
export default ArrowButton

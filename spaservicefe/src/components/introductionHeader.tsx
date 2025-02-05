import React from 'react'
import { FaSpa } from 'react-icons/fa6'

interface HeaderProps {
  title: string
}

const IntroHeader: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className='mx-auto max-w-2xl py-6 text-center'>
      <h1 className='mb-3 font-serif text-4xl text-pink-700'>{title}</h1>
      <div className='flex items-center justify-center space-x-2'>
        <div className='h-px w-10 bg-purple-600'></div>
        <FaSpa className='h-6 w-6 text-purple-600' />
        <div className='h-px w-10 bg-purple-600'></div>
      </div>
    </div>
  )
}

export default IntroHeader

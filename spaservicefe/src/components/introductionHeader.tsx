import React from 'react'
import { FaSpa } from 'react-icons/fa6'

interface HeaderProps {
    title: string;
}

const IntroHeader : React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className='text-center max-w-2xl mx-auto py-6'>
        <h1 className='text-5xl font-serif text-pink-700 mb-3'>{title}</h1>
        <div className='flex items-center justify-center space-x-2'>
            <div className='h-px w-10 bg-purple-600'></div>
                <FaSpa className='text-purple-600 h-6 w-6'/>
            <div className='h-px w-10 bg-purple-600'></div>
        </div>
    </div>
  )
}

export default IntroHeader

import React, { useState, useEffect } from 'react'
import { CheckCircle, Truck, Star, FileText } from 'lucide-react'

type Step = {
  id: number
  label: string
  subLabel?: string
  icon: React.ReactNode
  completed: boolean
  active: boolean
}

const OrderStatus = () => {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      label: 'Order Created',
      subLabel: '23:56 06-03-2025',
      icon: <FileText size={24} />,
      completed: true,
      active: false
    },
    {
      id: 2,
      label: 'Order Confirmed',
      subLabel: '08:50 07-03-2025',
      icon: <CheckCircle size={24} />,
      completed: true,
      active: false
    },
    {
      id: 3,
      label: 'On Delivery',
      icon: <Truck size={24} />,
      completed: false,
      active: false
    },
    {
      id: 4,
      label: 'Feedback',
      icon: <Star size={24} />,
      completed: false,
      active: false
    }
  ])

  const [progress, setProgress] = useState(40)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 40) setProgress(prev => Math.min(prev + 1, 40))
    }, 50)
    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className='w-full mx-auto px-4 py-4'>
      <div className='relative'>
        <div className='absolute top-6 left-0 right-0 h-1 bg-gray-200 ml-6 mr-6'></div>

        <div className='absolute top-6 left-0 h-1 bg-blue-400 transition-all duration-1000 ease-out ml-6' style={{ width: `${progress}%` }}></div>
        
        <div className='flex justify-between relative'>
          {steps.map((step, index) => (
            <div key={step.id} className='flex flex-col items-center w-24'>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-500
                ${step.completed || step.active ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-400'}`}
              >
                {step.icon}
              </div>
              
              <div className='mt-2 text-center'>
                <p className={`text-sm font-medium ${step.completed || step.active ? 'text-blue-400' : 'text-gray-400'}`}>
                  {step.label}
                </p>
                {step.subLabel && (
                  <p className='text-xs text-gray-500 mt-1'>{step.subLabel}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderStatus
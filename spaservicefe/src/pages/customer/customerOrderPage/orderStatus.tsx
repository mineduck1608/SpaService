import React, { useState } from 'react'
import { CheckCircle, Truck, FileText } from 'lucide-react'

type Step = {
  id: number
  label: string
  subLabel?: string
  icon: React.ReactNode
  completed: boolean
  active: boolean
}

interface OrderStatusProps {
  order: any
}

export default function OrderStatus({ order }: OrderStatusProps) {
  const step2Completed = order.status === true
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      label: 'Order Created',
      subLabel: order.orderDate,
      icon: <FileText size={24} />,
      completed: true,
      active: true
    },
    {
      id: 2,
      label: 'Order Confirmed',
      subLabel: '',
      icon: <CheckCircle size={24} />,
      completed: step2Completed,
      active: !step2Completed
    },
    {
      id: 3,
      label: 'On Delivery',
      subLabel: '',
      icon: <Truck size={24} />,
      completed: false,
      active: step2Completed ? true : false
    },
  ])

  return (
    <div className='w-[550px] mx-auto px-4 bg-transparent'>
      <div className='relative'>
        {steps.map((step, index) => {
          if (index === steps.length - 1) return null
          const nextStep = steps[index + 1]
          const isLineBlue = step.completed
          return (
            <div 
              key={`line-${index}`} 
              className={`absolute top-6 h-1 transition-all duration-300 ease-out ${isLineBlue ? 'bg-green-500' : 'bg-gray-200'}`} 
              style={{ 
                left: `calc(${(index * 100) / (steps.length - 1)}% + 24px)`,
                right: `calc(${100 - ((index + 1) * 100) / (steps.length - 1)}% + 24px)`,
                width: `calc(${100 / (steps.length - 1)}% - 48px)`
              }}
            ></div>
          )
        })}
        
        <div className='flex justify-between relative'>
          {steps.map((step, index) => {
            return (
              <div key={step.id} className='flex flex-col items-center w-24'>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-500 relative
                  ${step.completed ? 'bg-green-500 text-white' : step.active ? 'bg-white text-green-500 border-2 border-green-500' : 'bg-gray-200 text-gray-400'}`}
                >
                  {step.icon}
                  {!step.completed && step.active && (
                    <div className="absolute inset-0 rounded-full border-4 border-green-200 border-t-green-500 animate-spin"></div>
                  )}
                </div>
                <div className='mt-2 text-center'>
                  <p className={`text-sm font-medium ${step.completed ? 'text-green-500' : step.active ? 'text-green-500' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                  {step.subLabel && (
                    <p className='text-xs text-gray-500 mt-1'>{step.subLabel}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
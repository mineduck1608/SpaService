import React, { useState } from 'react'
import { CheckCircle, Truck, FileText, PackageCheck } from 'lucide-react'

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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date
      .toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      .replace(/,/g, '')
  }

  const step1Active = order.status === 'Unprocessed'
  const step2Active = order.status === 'Processed'
  const step3Active = order.status === 'On Delivery'
  const allCompleted = order.status === 'Received'

  const [steps] = useState<Step[]>([
    {
      id: 1,
      label: 'Order Created',
      subLabel: formatDate(order.orderDate),
      icon: <FileText size={24} />,
      completed: true,
      active: false
    },
    {
      id: 2,
      label: 'Order Confirmed',
      icon: <CheckCircle size={24} />,
      completed: allCompleted || step2Active || step3Active,
      active: step1Active
    },
    {
      id: 3,
      label: 'On Delivery',
      icon: <Truck size={24} />,
      completed: allCompleted || step3Active,
      active: step2Active
    },
    {
      id: 4,
      label: 'Order Received',
      icon: <PackageCheck size={24} />,
      completed: allCompleted,
      active: step3Active
    }
  ])

  return (
    <div className='mx-auto w-[650px] bg-transparent px-4'>
      <div className='relative'>
        {steps.map((step, index) => {
          if (index === steps.length - 1) return null
          return (
            <div
              key={`line-${index}`}
              className={`absolute top-6 h-1 transition-all duration-300 ease-out ${step.completed ? 'bg-green-500' : 'bg-gray-200'}`}
              style={{
                left: `calc(${(index * 100) / (steps.length - 1)}% + 24px)`,
                right: `calc(${100 - ((index + 1) * 100) / (steps.length - 1)}% + 24px)`,
                width: `calc(${100 / (steps.length - 1)}% - 48px)`
              }}
            ></div>
          )
        })}

        <div className='relative flex justify-between'>
          {steps.map((step) => (
            <div key={step.id} className='flex w-24 flex-col items-center'>
              <div
                className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500
                ${step.completed ? 'bg-green-500 text-white' : step.active ? 'border-2 border-green-500 bg-white text-green-500' : 'bg-gray-200 text-gray-400'}`}
              >
                {step.icon}
                {step.active && !step.completed && (
                  <div className='absolute inset-0 animate-spin rounded-full border-4 border-green-200 border-t-green-500'></div>
                )}
              </div>
              <div className='mt-2 text-center'>
                <p
                  className={`text-sm font-medium ${step.completed ? 'text-green-500' : step.active ? 'text-green-500' : 'text-gray-400'}`}
                >
                  {step.label}
                </p>
                {step.subLabel && <p className='mt-1 text-xs text-gray-500'>{step.subLabel}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

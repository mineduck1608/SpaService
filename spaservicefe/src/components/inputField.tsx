import React, { HTMLInputTypeAttribute } from 'react'

export default function InputField(params: {
  id: string,
  label: string
  placeholder?: string,
  type: HTMLInputTypeAttribute,
  onChange: (x: string) => void
  required?: boolean
}) {
  return (
    <div className='mb-4'>
      <label htmlFor={params.id} className='mb-1 block text-left text-sm font-medium text-gray-700'>
        {params.label}
      </label>
      <input
        type={params.type}
        id={params.id}
        className='w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500'
        placeholder={params.placeholder}
        required
        onChange={(e) => {
          params.onChange(e.currentTarget.value)
        }}
      />
    </div>
  )
}

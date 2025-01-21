import React, { HTMLInputTypeAttribute, useState } from 'react'

export default function PasswordField(params: {
  id: string
  label: string
  placeholder?: string
  onChange: (x: string) => void
  canShow: boolean
  required?: boolean
}) {
  const [show, setShow] = useState(false)
  return (
    <div className='mb-4'>
      <label htmlFor={params.id} className='mb-1 block text-left text-sm font-medium text-gray-700'>
        {params.label}
      </label>
      <input
        type={show ? 'text' : 'password'}
        id={params.id}
        className='w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500'
        placeholder={params.placeholder}
        required
        onChange={(e) => {
          params.onChange(e.currentTarget.value)
        }}
      />
      {params.canShow && (
        <button
          type='button'
          className='absolute -translate-x-16 translate-y-2 px-3 text-gray-600 hover:text-gray-800 focus:outline-none'
          onClick={() => setShow(!show)}
        >
          {show ? 'Hide' : 'Show'}
        </button>
      )}
    </div>
  )
}

import React, { FormEvent, useState } from 'react'
import InputField from '../../components/inputField.tsx'
import PasswordField from '../../components/passwordField.tsx'

export default function RegisterPage() {
  const [data, setData] = useState({
    username: '',
    password: '',
    confirm: '',
    email: '',
    fullname: '',
    gender: false,
    phone: '',
    dob: ''
  })
  const [isFetching, setIsFetching] = useState(false)

  const btnEnabled = () =>
    !isFetching &&
    data.username.length * data.password.length * data.confirm.length * data.email.length !== 0 &&
    data.confirm === data.password
  const btnStyle = (enabled: boolean) =>
    'rounded-lg px-4 py-2 text-white focus:ring-blue-300 ' +
    (enabled ? 'bg-blue-600 hover:bg-blue-700 hover:cursor-pointer' : 'bg-gray-400')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setIsFetching(true)
    setIsFetching(false)
  }

  return (
    <div className='flex min-h-80 justify-center bg-slate-600 p-12'>
      <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-md'>
        <h2 className='mb-4 text-2xl font-bold text-gray-800'>Register</h2>
        <form onSubmit={submit}>
          <InputField
            id='username'
            label='Username'
            onChange={(txt) => setData({ ...data, username: txt })}
            required
            type='text'
          />
          <InputField
            id='fullname'
            label='Display name'
            onChange={(txt) => setData({ ...data, fullname: txt })}
            required
            type='text'
          />
          <PasswordField
            id='password'
            canShow
            label='Password'
            onChange={(txt) => setData({ ...data, password: txt })}
            required
          />
          <PasswordField
            id='confirm-password'
            canShow
            label='Confirm Password'
            onChange={(txt) => setData({ ...data, confirm: txt })}
            required
          />
          <div className='mb-4'>
            <label htmlFor={'phone-number'} className='mb-1 block text-left text-sm font-medium text-gray-700'>
              Phone number
            </label>
            <input
              type={'text'}
              id={'phone-number'}
              className='w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500'
              required
              value={data.phone}
              onChange={(e) => {
                const filtered = e.currentTarget.value?.replace(/[^0-9]/g, '')
                setData({ ...data, phone: filtered })
              }}
            />
          </div>
          <InputField
            id='email'
            label='Email'
            onChange={(txt) => setData({ ...data, email: txt })}
            required
            type='email'
          />
          <InputField
            id='dob'
            label='Date of birth'
            onChange={(txt) => setData({ ...data, dob: txt })}
            required
            type='date'
          />
          <div className='mb-4 flex items-center'>
            <label htmlFor='gender' className='mb-1 mr-2 text-left text-sm font-medium text-gray-700'>
              Gender
            </label>
            <input type='radio' name='gender' defaultChecked onChange={(e) => setData({ ...data, gender: false })} />
            <label className='ml-2 mr-2'>Female</label>
            <input type='radio' name='gender' onChange={(e) => setData({ ...data, gender: true })} />
            <label className='ml-2'>Male</label>
          </div>
          <div className='mb-4 flex justify-evenly'>
            <input type='submit' className={btnStyle(btnEnabled())} value='Register' disabled={!btnEnabled()} />
            <a href='/login' className={btnStyle(true)}>
              Login
            </a>
          </div>
        </form>
        <button className='flex items-center justify-center bg-slate-300'>
          <div className='mr-2 mt-6 flex w-1/12 -translate-y-3 items-center justify-center'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-full w-full'>
              <path
                d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                fill='currentColor'
              />
            </svg>
          </div>
          Login with Google
        </button>
      </div>
    </div>
  )
}

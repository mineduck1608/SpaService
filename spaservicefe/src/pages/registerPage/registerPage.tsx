import React, { FormEvent, useState } from 'react'
import InputField from '../../components/inputField.tsx'
import PasswordField from '../../components/passwordField.tsx'

export default function RegisterPage() {
  const [data, setData] = useState({
    username: '',
    password: '',
    confirm: '',
    email: ''
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
    <div className='flex min-h-80 justify-center bg-slate-600 p-32'>
      <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-md'>
        <h2 className='mb-4 text-2xl font-bold text-gray-800'>Register</h2>
        <form onSubmit={submit}>
          <InputField
            id='username'
            label='Username'
            placeholder='Enter your username'
            onChange={(txt) => setData({ ...data, username: txt })}
            required
            type='text'
          />
          <PasswordField
            id='password'
            canShow
            label='Password'
            onChange={(txt) => setData({ ...data, password: txt })}
            placeholder='Enter your password'
            required
          />
          <PasswordField
            id='confirm-password'
            canShow
            label='Confirm Password'
            onChange={(txt) => setData({ ...data, confirm: txt })}
            placeholder='Enter your password'
            required
          />
          <InputField
            id='email'
            label='Email'
            placeholder='Enter your email'
            onChange={(txt) => setData({ ...data, email: txt })}
            required
            type='email'
          />
          <div className='mb-4 flex justify-evenly'>
            <input type='submit' className={btnStyle(btnEnabled())} value='Register' disabled={!btnEnabled()} />
            <a href='/login' className={btnStyle(true)}>
              Login
            </a>
          </div>
          <div className='mt-6 text-center'>
            <button
              type='button'
              className='rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300'
            >
              Register with Email
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

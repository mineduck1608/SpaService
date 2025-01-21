import React, { FormEvent, useState, useEffect } from 'react'
import { authenticate } from './loginPage.util.ts'
import InputField from '../../components/inputField.tsx'
import PasswordField from '../../components/passwordField.tsx'

export default function LoginPage() {
  const [data, setData] = useState({
    username: '',
    password: ''
  })
  const [isFetching, setIsFetching] = useState(false)

  const btnEnabled = () => !isFetching && data.username.length !== 0 && data.password.length !== 0
  const btnStyle = (enabled: boolean) =>
    'rounded-lg px-4 py-2 text-white focus:ring-blue-300 ' +
    (enabled ? 'bg-blue-600 hover:bg-blue-700 hover:cursor-pointer' : 'bg-gray-400')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setIsFetching(true)
    await authenticate(data.username, data.password)
    setIsFetching(false)
  }

  return (
    <div className='flex min-h-80 content-center items-center justify-center bg-slate-600 p-32'>
      <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-md'>
        <h2 className='mb-4 text-center text-2xl font-bold text-gray-800'>Login</h2>
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
          <div className='flex justify-between text-sm text-gray-600'>
            <a href='/reset-password' className='hover:underline'>
              Forgot password?
            </a>
            <a href='/register' className='hover:underline'>
              Create new account
            </a>
          </div>
          <div className='mb-4'>
            <input type='submit' className={btnStyle(btnEnabled())} value='Login' disabled={!btnEnabled()} />
          </div>
          <div className='mt-6 text-center'>
            <button
              type='button'
              className='rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300'
            >
              Login with Email
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

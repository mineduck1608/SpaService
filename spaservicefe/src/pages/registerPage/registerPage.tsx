import React, { FormEvent, useState } from 'react'
import InputField from '../../components/inputField.tsx'
import PasswordField from '../../components/passwordField.tsx'
import { register } from './registerPage.util.ts'

export default function RegisterPage() {
  const [data, setData] = useState({
    username: '',
    password: '',
    confirm: '',
    email: '',
    fullName: '',
    gender: 'female',
    phone: '',
    dateOfBirth: new Date()
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
    console.log(data)
    setIsFetching(true)
    const rs = await register(data)
    if (rs.success) {
      alert('Register success. Redirect you to login page :)')
      window.location.assign('/login')
    } else {
      alert(rs.msg)
    }
    setIsFetching(false)
  }

  return (
    <div className='flex min-h-80 justify-center bg-slate-600 p-12'>
      <div className='w-full max-w-3xl rounded-lg bg-white p-6 shadow-md'>
        <h2 className='mb-4 text-2xl font-bold text-gray-800'>Register</h2>
        <form onSubmit={submit} className='w-full'>
          <div className='flex'>
            <div className='mr-3 w-1/2'>
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
                onChange={(txt) => setData({ ...data, fullName: txt })}
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
            </div>
            <div className='ml-3 w-1/2'>
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
              <div className='mb-4 flex items-center'>
                <label htmlFor='gender' className='mb-1 mr-2 text-left text-sm font-medium text-gray-700'>
                  Date of birth
                </label>
                <input
                  type={'date'}
                  id={'dob'}
                  className='rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500'
                  required
                  onChange={(e) => {
                    setData({ ...data, dateOfBirth: new Date(e.currentTarget.value) })
                  }}
                />
              </div>
              <div className='mb-4 flex items-center'>
                <label htmlFor='gender' className='mb-1 mr-2 text-left text-sm font-medium text-gray-700'>
                  Gender
                </label>
                <label className='ml-2 mr-3'>
                  <input
                    type='radio'
                    name='gender'
                    defaultChecked
                    className='mr-1'
                    onChange={() => setData({ ...data, gender: 'female' })}
                  />
                  Female
                </label>

                <label className='ml-2 mr-3'>
                  <input
                    type='radio'
                    name='gender'
                    className='mr-1'
                    onChange={() => setData({ ...data, gender: 'male' })}
                  />
                  Male
                </label>
              </div>
            </div>
          </div>
          <div className='mb-4 flex justify-evenly'>
            <input type='submit' className={btnStyle(btnEnabled())} value='Register' disabled={!btnEnabled()} />
            <div className='flex justify-end text-sm text-gray-600'>
              Have an account?
              <a href='/login' className={'ml-1 hover:underline'}>
                Login
              </a>
            </div>
          </div>
        </form>
        <div className='relative mb-5 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
          <span className='relative z-10 bg-background px-2 text-muted-foreground'>Or</span>
        </div>
        <button className='flex w-full items-center justify-center bg-blue-600 text-white'>
          <div className=' mr-2 mt-6 flex h-8 -translate-y-3 items-center justify-center rounded-full'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-full w-full'>
              <path
                d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                fill='#fff'
              />
            </svg>
          </div>
          Login with Google
        </button>
        <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  '>
          By clicking continue, you agree to our <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
        </div>
      </div>
    </div>
  )
}

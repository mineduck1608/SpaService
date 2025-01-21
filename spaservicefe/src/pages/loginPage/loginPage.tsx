import React, { FormEvent, useState } from 'react'
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
    const rs = await authenticate(data.username, data.password)
    if (rs.success) {
      sessionStorage.setItem('accessToken', rs.token)
      window.location.assign('/')
    } else {
      alert(rs.msg)
    }
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
          <div className='mb-4 mt-4'>
            <input type='submit' className={btnStyle(btnEnabled())} value='Login' disabled={!btnEnabled()} />
          </div>
        </form>
        <div className='after:border-border relative mb-5 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
          <span className='bg-background text-muted-foreground relative z-10 px-2'>Or</span>
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
        <div className='text-muted-foreground [&_a]:hover:text-primary text-balance text-center text-xs [&_a]:underline [&_a]:underline-offset-4  '>
          By clicking continue, you agree to our <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
        </div>
      </div>
    </div>
  )
}

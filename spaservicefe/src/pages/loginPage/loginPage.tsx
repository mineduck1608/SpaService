import React from 'react'
import { LoginForm } from './loginForm.tsx'
import mainBg from '../../images/loginBgs/mainBg.jpg'
export default function LoginPage() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center bg-muted'>
      <img src={mainBg} className='absolute h-full w-full bg-cover' />
      <div className='z-10 w-full max-w-sm md:max-w-4xl'>
        <LoginForm />
      </div>
    </div>
  )
}

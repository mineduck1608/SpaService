import React, { FormEvent, useState } from 'react'
import { LoginForm } from '../../components/login-form.tsx'
import mainBg from '../../images/loginBgs/mainBg.jpg'
export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted">
      <img src={mainBg} className='absolute h-full bg-cover w-full'/>
      <div className="w-full max-w-sm md:max-w-4xl z-10">
        <LoginForm />
      </div>
    </div>
  )
}

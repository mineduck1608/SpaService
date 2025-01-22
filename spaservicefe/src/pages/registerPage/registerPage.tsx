import React from 'react'
import RegisterForm from './registerForm'
import mainBg from '../../images/registerBg/mainBg.jpg'

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-muted">
      {/* Background Image */}
      <img src={mainBg} className="absolute h-full w-full object-cover" />
      
      {/* Form Container */}
      <div className="z-10 w-full">
        <RegisterForm />
      </div>
    </div>
  )
}

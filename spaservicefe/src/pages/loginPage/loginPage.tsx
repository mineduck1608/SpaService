import React, { FormEvent, useState } from 'react'
import { authenticate } from './loginPage.util.ts'
import InputField from '../../components/inputField.tsx'
import PasswordField from '../../components/passwordField.tsx'
import { LoginForm } from '../../components/login-form.tsx'

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
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}

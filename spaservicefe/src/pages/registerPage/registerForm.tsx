import React, { FormEvent, useState } from 'react'
import { cn } from '../../lib/utils.ts'
import { Button } from '../../components/ui/button.tsx'
import { Input } from '../../components/ui/input.tsx'
import { Label } from '../../components/ui/label.tsx'
import logo from '../../images/logos/logoColor.png'
import { toast, ToastContainer } from 'react-toastify'
import { register } from './registerPage.util.ts'
import { Tooltip } from 'react-tooltip'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

export default function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [data, setData] = useState({
    username: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    gender: ''
  })
  const [fetching, setFetching] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setFetching(true)
    const rs = await register(data)
    if (rs.success) {
      toast('Register success. Redirect you to login page')
      setTimeout(() => {
        window.location.assign('/login')
      }, 1000)
    } else {
      toast('An error occured: ' + rs.msg)
    }
    setFetching(false)
  }

  const handleSuccess = (response: any) => {
      console.log('Login Success:', response.credential);
      // Gửi JWT token (response.credential) tới backend để xử lý
      const user = jwtDecode(response.credential);
      console.log('User Info:', user); // { name, email, picture, ... }
    };
  
    const handleError = () => {
      console.log('Login Failed');
    };

  return (
    <div className={cn('items-center justify-center', className)} {...props}>
      <form className='h-full min-w-fit content-center justify-center p-6 md:p-8' onSubmit={submit}>
        <Tooltip id='confirm-password' className='z-10'/>
        <div className='flex flex-col gap-10'>
          <div className='flex w-full justify-center'>
            <img src={logo} className='w-1/2 -translate-y-20' />
          </div>
          <div className='-translate-y-24'>
            <div className='mb-6 flex flex-col items-center text-center'>
              <h1 className='text-2xl font-bold'>Create your Account</h1>
              <p className='text-balance text-muted-foreground'>Sign up to join our platform</p>
            </div>
            <div className='grid gap-6 lg:grid-cols-2 lg:gap-4'>
              {/* Username */}
              <div className='grid gap-2'>
                <Label htmlFor='username'>Username</Label>
                <Input
                  id='username'
                  type='text'
                  required
                  onChange={(e) => setData({ ...data, username: e.currentTarget.value })}
                />
              </div>

              {/* Full Name */}
              <div className='grid gap-2'>
                <Label htmlFor='fullName'>Full Name</Label>
                <Input
                  id='fullName'
                  type='text'
                  required
                  onChange={(e) => setData({ ...data, fullName: e.currentTarget.value })}
                />
              </div>

              {/* Password */}
              <div className='grid gap-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  required
                  onChange={(e) => setData({ ...data, password: e.currentTarget.value })}
                />
              </div>

              <div className='relative grid gap-2'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <Input
                  id='confirmPassword'
                  type='password'
                  required
                  onChange={(e) => setData({ ...data, confirmPassword: e.currentTarget.value })}
                />
                {data.confirmPassword !== data.password && (
                  <>
                    {/* The (!) symbol */}
                    <span
                      className='absolute transform right-2 top-1/2 rounded-full bg-red-500 px-2 text-sm text-white hover:cursor-default'
                      data-tooltip-content={'Confirm password does not match'}
                      data-tooltip-place='right'
                      data-tooltip-id='confirm-password'
                    >
                      !
                    </span>
                  </>
                )}
              </div>

              {/* Email */}
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  required
                  onChange={(e) => setData({ ...data, email: e.currentTarget.value })}
                />
              </div>

              {/* Phone */}
              <div className='grid gap-2'>
                <Label htmlFor='phone'>Phone</Label>
                <Input
                  id='phone'
                  type='tel'
                  required
                  onChange={(e) => setData({ ...data, phone: e.currentTarget.value })}
                />
              </div>

              {/* Date of Birth */}
              <div className='grid gap-2'>
                <Label htmlFor='dateOfBirth'>Date of Birth</Label>
                <Input
                  id='dateOfBirth'
                  type='date'
                  required
                  onChange={(e) => setData({ ...data, dateOfBirth: e.currentTarget.value })}
                />
              </div>

              {/* Gender */}
              <div className='grid gap-2'>
                <Label htmlFor='gender'>Gender</Label>
                <select
                  id='gender'
                  required
                  onChange={(e) => setData({ ...data, gender: e.currentTarget.value })}
                  className='rounded-md border p-2'
                >
                  <option value='' disabled selected>
                    Select Gender
                  </option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                </select>
              </div>
            </div>

            <Button
              type='submit'
              className='mb-4 mt-4 w-full'
              disabled={
                fetching ||
                Object.values(data).some((value) => value.length === 0 || value === '') ||
                data.confirmPassword !== data.password
              }
            >
              Sign Up
            </Button>
            <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
              <span className='relative z-10 bg-background px-2 text-muted-foreground '>Or continue with</span>
            </div>
            <div className='mt-4 grid'>
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
            </div>
          </div>
        </div>
      </form>
      <div className=' -translate-y-24 text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
      </div>
      <ToastContainer />
    </div>
  )
}

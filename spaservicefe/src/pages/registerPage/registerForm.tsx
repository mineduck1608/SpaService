import React, { FormEvent, useState } from 'react'
import { cn } from '../../lib/utils.ts'
import { Button } from '../../components/ui/button.tsx'
import { Card, CardContent } from '../../components/ui/card.tsx'
import { Input } from '../../components/ui/input.tsx'
import { Label } from '../../components/ui/label.tsx'
import bg1 from '../../images/registerBg/bg1.jpg'

import bg2 from '../../images/registerBg/bg2.jpg'

import bg3 from '../../images/registerBg/bg3.jpg'

import { toast, ToastContainer } from 'react-toastify'
import { register } from './registerPage.util.ts'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../../components/ui/carousel.tsx'
import Autoplay from 'embla-carousel-autoplay'

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

  const images = [bg1, bg2, bg3]
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

  return (
    <div className={cn('flex items-center justify-center min-h-screen', className)} {...props}>
      <div className='w-3/4'>
        <Card className='flex overflow-hidden'>
          {/* Carousel */}
          <div className='flex w-1/2 items-center justify-center lg:h-4/6'>
            <Carousel
              className='flex '
              opts={{
                align: 'start',
                loop: true
              }}
              plugins={[
                Autoplay({
                  delay: 5000
                })
              ]}
            >
              <CarouselContent className='min-h-full'>
                {images.map((v, i) => (
                  <CarouselItem key={i} className='min-h-full lg:max-h-[600px]'>
                    <img src={v} className='lg:max-h-[600px] w-full' />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='translate-x-14' />
              <CarouselNext className='-translate-x-14' />
            </Carousel>
          </div>

          {/* Form */}
          <CardContent className='flex w-1/2 items-center justify-center'>
            <form className='md:p-1 w-4/5' onSubmit={submit}>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col items-center text-center'>
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

                  {/* Confirm Password */}
                  <div className='grid gap-2'>
                    <Label htmlFor='confirmPassword'>Confirm Password</Label>
                    <Input
                      id='confirmPassword'
                      type='password'
                      required
                      onChange={(e) => setData({ ...data, confirmPassword: e.currentTarget.value })}
                    />
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
                  className='w-full'
                  disabled={fetching || Object.values(data).some((value) => value.length === 0 || value === '')}
                >
                  Sign Up
                </Button>
                <div className='grid'>
                  <Button variant='outline' className='w-full'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                      <path
                        d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                        fill='currentColor'
                      />
                    </svg>
                    <span>Login with Google</span>
                  </Button>
                </div>
                <div className='mt-4 text-center'>
                  <p className='text-sm'>
                    Already have an account?{' '}
                    <a href='/login' className='text-primary hover:underline'>
                      Login here
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className='mt-2 text-white text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary'>
          By clicking continue, you agree to our <a href='#'>Terms of Service</a> and{' '}
          <a href='#'>Privacy Policy</a>.
        </div>
      </div>
      <ToastContainer />
    </div>
  )

}

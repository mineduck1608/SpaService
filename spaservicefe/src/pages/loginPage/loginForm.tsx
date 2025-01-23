import React, { FormEvent, useState } from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import loginBg from '../../images/loginBgs/loginBg.jpg'
import loginBg2 from '../../images/loginBgs/loginBg2.jpg'
import loginBg3 from '../../images/loginBgs/loginBg3.jpg'
import loginBg4 from '../../images/loginBgs/loginBg4.jpg'
import logo from '../../images/logos/logoColor.png'
import { authenticate } from './loginPage.util'
import { toast, ToastContainer } from 'react-toastify'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [data, setData] = useState({
    username: '',
    password: ''
  })
  const [fetching, setFetching] = useState(false)
  const images = [loginBg, loginBg2, loginBg3, loginBg4]
  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setFetching(true)
    const rs = await authenticate(data.username, data.password)
    if (rs.success) {
      sessionStorage.setItem('token', rs.token)
      window.location.assign('/')
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
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='overflow-hidden'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form className='p-6 md:p-8' onSubmit={submit}>
            <div className='flex w-full justify-center'>
              <img src={logo} className='w-1/4 translate-y-2' />
            </div>
            <div className='mt-2 flex flex-col gap-6'>
              <div className='flex flex-col items-center text-center'>
                <h1 className='text-2xl font-bold'>Welcome back</h1>
                <p className='text-balance text-muted-foreground'>Login to use our service</p>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Username</Label>
                <Input
                  id='username'
                  type='username'
                  required
                  onChange={(e) => setData({ ...data, username: e.currentTarget.value })}
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                  <a href='/reset-password' className='ml-auto text-sm underline-offset-2 hover:underline'>
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id='password'
                  type='password'
                  required
                  onChange={(e) => setData({ ...data, password: e.currentTarget.value })}
                />
              </div>
              <Button
                type='submit'
                className='w-full'
                disabled={fetching || data.username.length === 0 || data.password.length === 0}
              >
                Login
              </Button>
              <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                <span className='relative z-10 bg-background px-2 text-muted-foreground'>Or continue with</span>
              </div>
              <div className='grid '>
               
            
                  <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
       
              </div>
              <div className='text-center text-sm'>
                Don&apos;t have an account?{' '}
                <a href='/register' className='underline underline-offset-4'>
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className='relative hidden bg-muted md:block'>
            <Carousel
              className='flex min-h-full'
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
                  <CarouselItem key={i} className='min-h-full'>
                    <img src={v} className='min-h-full w-full md:max-h-[600px]' />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='translate-x-14' />
              <CarouselNext className='-translate-x-14' />
            </Carousel>
          </div>
        </CardContent>
      </Card>
      <div className='text-balance text-center text-xs text-muted-foreground text-white [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
      </div>
      <ToastContainer />
    </div>
  )
}

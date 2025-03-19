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
import { authenticate, routeByRole } from './loginPage.util'
import { toast } from 'react-toastify'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { apiUrl, roleJWT } from '../../types/constants'
import { RoleName } from '../../types/role'
import { getCusByAcc } from '../checkout/checkoutPage.util'
import { Customer } from '@/types/type'
import { useNavigate } from 'react-router-dom';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [data, setData] = useState({ username: '', password: '' })
  const [fetching, setFetching] = useState(false)
  const images = [loginBg, loginBg2, loginBg3, loginBg4]

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setFetching(true)
    try {
      const rs = await authenticate(data.username, data.password)
      if (rs.success) {
        const token = rs.token
        sessionStorage.setItem('token', token)
        var jwtData = jwtDecode(token)
        const role = jwtData[roleJWT] as string
        toast.success('Login success.')
        if (role === RoleName.CUSTOMER) {
          const getCusId = await getCusByAcc(jwtData['UserId'] as string)
          const asCustomer = getCusId as Customer
          if (asCustomer.customerId) {
            sessionStorage.setItem('customerId', asCustomer.customerId)
          }
        }
        window.location.assign(routeByRole(role))
      } else {
        toast.error('Login failed!')
        console.log('error' + rs.msg)
      }
    } catch (error) {
      toast('An unexpected error occurred.')
    } finally {
      setFetching(false)
    }
  }

  const handleGoogleSuccess = async (response: any) => {
    console.log('Login Success:', response.credential)
    const token = response.credential
    setFetching(true)
    try {
      const res = await fetch(`${apiUrl}/GoogleAuth/decode-and-check-or-create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })
      if (res.ok) {
        const data = await res.json()
        const token = data.accessToken as string
        sessionStorage.setItem('token', token)
        var jwtData = jwtDecode(token)
        const role = jwtData[roleJWT] as string
        toast.success('Login success.')
        if (role === RoleName.CUSTOMER) {
          const getCusId = await getCusByAcc(jwtData['UserId'] as string)
          const asCustomer = getCusId as Customer
          if (asCustomer.customerId) {
            sessionStorage.setItem('customerId', asCustomer.customerId)
          }
        }
        window.location.assign(routeByRole(role))
      } else {
        toast.error('Google login failed!')
      }
    } catch (error) {
      console.error('Google login error:', error)
    } finally {
      setFetching(false)
    }
  }

  const handleGoogleError = () => {
    console.log('Login Failed')
  }

  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate('/');
  };

  return (
    <GoogleOAuthProvider clientId='397904889849-udf1t7mvf7vmr1bvvdbmv2amj0nea404.apps.googleusercontent.com'>
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card className='overflow-hidden'>
          <CardContent className='grid p-0 md:grid-cols-2'>
            <form className='p-6 md:p-8' onSubmit={submit}>
              <div className='flex w-full justify-center'>
                <img src={logo} className='w-1/4 translate-y-2' onClick={handleImageClick}/>
              </div>
              <div className='mt-2 flex flex-col gap-6'>
                <div className='text-center'>
                  <h1 className='text-2xl font-bold'>Welcome back</h1>
                  <p className='text-muted-foreground'>Login to use our service</p>
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>Username</Label>
                  <Input id='username' required onChange={(e) => setData({ ...data, username: e.target.value })} />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    type='password'
                    required
                    onChange={(e) => setData({ ...data, password: e.currentTarget.value })}
                  />
                </div>
                <Button type='submit' className='w-full' disabled={fetching || !data.username || !data.password}>
                  Login
                </Button>
                <div className='relative text-center text-sm after:border-t after:border-border'>
                  <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
                </div>
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
                <div className='text-center text-sm'>
                  Don&apos;t have an account?{' '}
                  <a href='/register' className='underline'>
                    Sign up
                  </a>
                </div>
              </div>
            </form>
            <div className='hidden bg-muted md:block'>
              <Carousel opts={{ align: 'start', loop: true }} plugins={[Autoplay({ delay: 5000 })]}>
                <CarouselContent>
                  {images.map((v, i) => (
                    <CarouselItem key={i}>
                      <img src={v} className='w-full md:max-h-[600px]' />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className='translate-x-14' />
                <CarouselNext className='-translate-x-14' />
              </Carousel>
            </div>
          </CardContent>
        </Card>
      </div>
    </GoogleOAuthProvider>
  )
}

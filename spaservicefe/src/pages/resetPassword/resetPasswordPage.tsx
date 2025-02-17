import React, { FormEvent, PropsWithChildren, useEffect, useState } from 'react'
import { imgs } from '../servicesPage/servicesPage.util'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import IntroHeader from '../../components/introductionHeader'
import ReCAPTCHA from 'react-google-recaptcha'

const ReCAPTCHAFixed = ReCAPTCHA as unknown as React.FC<
  PropsWithChildren<{
    sitekey: string
    onChange: (token: string | null) => void
  }>
>
export type CPData = {
  email: string
  token: string | null
  error?: string | null
}
export default function ResetPasswordPage() {
  const [data, setData] = useState<CPData>({
    email: '',
    token: null
  })
  useEffect(() => {
    AOS.init({
      offset: 0,
      delay: 200,
      duration: 1200,
      once: true
    })
  }, [])
  async function onSubmit(e: FormEvent) {}

  return (
    <div>
      <img src={imgs.headerBg} alt='Header' className='w-full' />
      <div data-aos={'fade-right'} data-aos-delay='400' className='mb-10 p-2 md:ml-28 lg:ml-5 xl:ml-[23rem]'>
        <span className='font-normal text-gray-400'>
          <Link to={'/'} className='text-gray-400 no-underline'>
            Home
          </Link>
          &nbsp;&gt;&nbsp; Reset Password
        </span>
      </div>
      <IntroHeader position='middle' size='big' title='Reset password' />
      <div className='flex justify-center' data-aos={'fade-left'} data-aos-delay='400'>
        <form
          onSubmit={(e) => {
            onSubmit(e)
          }}
          className='relative mb-10 w-3/5 p-3 shadow-md xl:w-1/4'
        >
          <input
            type='email'
            name='email'
            required
            placeholder='Input your email to get reset password mail'
            className='mb-4 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-purple1'
            onChange={(e) => {
              setData({ ...data, email: e.currentTarget.value })
            }}
          />
          <div className='mb-4 flex flex-col items-center justify-center'>
            <ReCAPTCHAFixed
              sitekey='6LeUZdIqAAAAAPlUPWL-M5n_aaSahKjHd8rfsoB_'
              onChange={(e) => {
                setData({ ...data, token: e })
              }}
            />
          </div>
          <div className='flex justify-center'>
            <input
              type='submit'
              className={`w-1/3 rounded-br-2xl rounded-tl-2xl border-2 border-[#8D388A] bg-white p-2 text-[#8D388A] 
              duration-300 hover:-translate-x-1 hover:shadow-[1px_1px_#8D388A,2px_2px_#8D388A] disabled:text-gray-400`}
              disabled={!data.token || data.email === ''}
              value='Submit'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

import React, { useState, PropsWithChildren } from 'react'
import { MdOutlineEmail, MdPhone, MdMap, MdAddLink } from 'react-icons/md'
import { FaFacebookSquare, FaYoutubeSquare, FaTwitterSquare } from 'react-icons/fa'
import ReCAPTCHA from 'react-google-recaptcha'
import { toast, ToastContainer } from 'react-toastify'

interface Form {
  fullName: string
  phoneNumber: string
  email: string
  contactContent: string
}
const ReCAPTCHAFixed = ReCAPTCHA as unknown as React.FC<
  PropsWithChildren<{
    sitekey: string
    onChange: (token: string | null) => void
  }>
>

const ContactForm = () => {
  const [formData, setFormData] = useState<Form>({
    fullName: '',
    phoneNumber: '',
    email: '',
    contactContent: ''
  })
  const [errors, setErrors] = useState<Partial<Form>>({})
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [captchaError, setCaptchaError] = useState<string | null>(null)

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token)
    setCaptchaError(null)
  }
  const validateForm = () => {
    const tempErrors: Partial<Form> = {}
    let isValid = true

    if (!formData.fullName.trim()) {
      tempErrors.fullName = 'Full name is required'
      isValid = false
    }
    const phoneRegex = /^[0-9]{10}$/
    if (!formData.phoneNumber.trim() || !phoneRegex.test(formData.phoneNumber)) {
      tempErrors.phoneNumber = 'Valid phone number is required'
      isValid = false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      tempErrors.email = 'Valid email is required'
      isValid = false
    }
    if (!captchaToken) {
      setCaptchaError('reCAPTCHA verification is required')
      isValid = false
    }

    setErrors(tempErrors)
    return isValid
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const response = await fetch('https://localhost:7205/api/contacts/Create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        if (response.ok) {
          toast.success('Thank you for your message.')
          setFormData({
            fullName: '',
            phoneNumber: '',
            email: '',
            contactContent: ''
          })
          setCaptchaToken(null)
        } else {
          toast.error('Failed! Please try again.')
        }
      } catch (error) {
        console.error('Form submitted error: ', error)
      }
    }
  }

  return (
    <div
      className='mx-auto mt-4 flex w-full max-w-6xl flex-col border border-gray-200 bg-custom-bg6 font-montserrat shadow-xl lg:flex-row'
      data-aos='fade-left'
      data-aos-delay='500'
    >
      <div className='p-8 text-white lg:w-1/2'>
        <div className='mb-10 ml-7 max-w-full'>
          <div className='mb-8 mt-16 font-bold'>
            <h2 className='mb-3 text-3xl font-bold'>Sen Spa</h2>
            <h3 className='text-2xl font-bold'>Service Company Limited</h3>
          </div>
          <div className='space-y-6 opacity-80'>
            <div className='flex items-start gap-2'>
              <MdMap className='text-2xl' />
              <div className='flex gap-2'>
                <span>Address:</span>
                <p>10B1 Le Thanh Ton, Ben Nghe Ward, District 1, HCMC</p>
              </div>
            </div>
            <div className='flex items-start gap-2'>
              <MdPhone className='mt-0.5 text-xl' />
              <div className='flex flex-col gap-2'>
                <span className=''>Phone: +84 28 38 251 250</span>
                <p className='ml-16'>+84 28 3910 2174</p>
              </div>
            </div>
            <div className='flex items-start gap-2'>
              <MdOutlineEmail className='mt-0.5 text-xl' />
              <div className='flex gap-2'>
                <span className=''>Email: </span>
                <p>rsv@senspa.com.vn</p>
              </div>
            </div>
            <div className='flex items-start gap-2'>
              <MdAddLink className='text-2xl' />
              <div className='flex gap-2'>
                <span className=''>Website: </span>
                <a className='text-white' href='/'>
                  senspa.com.vn
                </a>
              </div>
            </div>
          </div>
          <div className='mt-10 flex gap-12 text-3xl'>
            <a className='text-white' href='https://www.facebook.com/senspa.vietnam/'>
              <FaFacebookSquare />
            </a>
            <a className='text-white' href=''>
              <FaTwitterSquare />
            </a>
            <a className='text-white' href=''>
              <FaYoutubeSquare />
            </a>
          </div>
        </div>
      </div>
      <div className='flex items-center bg-white p-8 lg:w-1/2'>
        <div className='mx-auto w-[500px]'>
          <h2 className='mb-2 text-2xl font-bold'>Contact Form</h2>
          <p className='mb-8 text-gray-600'>Contact us so we can best support you</p>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <input
                type='text'
                name='fullName'
                placeholder='Full name'
                className='w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-purple1'
                value={formData.fullName}
                onChange={handleInputChange}
              />
              {errors.fullName && <p className='ml-2 mt-1 text-sm text-red-500'>{errors.fullName}</p>}
            </div>
            <div>
              <input
                type='tel'
                name='phoneNumber'
                placeholder='Phone'
                className='w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-purple1'
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              {errors.phoneNumber && <p className='ml-2 mt-1 text-sm text-red-500'>{errors.phoneNumber}</p>}
            </div>
            <div>
              <input
                type='email'
                name='email'
                placeholder='Email'
                className='w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-purple1'
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className='ml-2 mt-1 text-sm text-red-500'>{errors.email}</p>}
            </div>
            <div>
              <textarea
                name='contactContent'
                placeholder='Content'
                rows={3}
                className='w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-purple1'
                value={formData.contactContent}
                onChange={handleInputChange}
              />
              {errors.contactContent && <p className='ml-2 text-sm text-red-500'>{errors.contactContent}</p>}
            </div>
            <div className='flex flex-col items-center justify-center'>
              <ReCAPTCHAFixed sitekey='6LeUZdIqAAAAAPlUPWL-M5n_aaSahKjHd8rfsoB_' onChange={handleCaptchaChange} />
              {captchaError && <p className='ml-2 mt-2 text-sm text-red-500'>{captchaError}</p>}
            </div>
            <div className='flex items-center justify-center'>
              <button
                type='submit'
                className='mt-3 rounded-full bg-purple1 px-6 py-3 text-sm text-white transition-colors duration-700 hover:bg-purple-800'
              >
                SEND
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default ContactForm

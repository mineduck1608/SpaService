import React, { useState, PropsWithChildren } from 'react'
import { MdOutlineEmail, MdPhone, MdMap, MdAddLink } from 'react-icons/md'
import { FaFacebookSquare, FaYoutubeSquare, FaTwitterSquare } from 'react-icons/fa'
import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from 'react-toastify'
import { getToken } from '../../types/constants'
import { jwtDecode } from 'jwt-decode'

interface Form {
  content: string
}
const ReCAPTCHAFixed = ReCAPTCHA as unknown as React.FC<
  PropsWithChildren<{
    sitekey: string
    onChange: (token: string | null) => void
  }>
>

const CustomerApplication = () => {
  const token = getToken() ?? ''
  const accId = jwtDecode(token).UserId as string
  const [formData, setFormData] = useState<Form>({
    content: ''
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
    if (formData.content.length === 0) {
      tempErrors.content = 'Content is empty'
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
        console.log(formData)
        const response = await fetch('https://localhost:7205/api/applications/Create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          body: JSON.stringify({ ...formData, accountId: accId })
        })
        if (response.ok) {
          toast.success('Application created successfully')
          setFormData({
            content: ''
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
      className='mx-auto mb-10 mt-4 flex w-full max-w-6xl flex-col border border-gray-200 bg-custom-bg6 font-montserrat shadow-xl lg:flex-row'
      data-aos='fade-left'
      data-aos-delay='500'
    >
      <div className='flex w-full items-center bg-white p-8'>
        <div className='mx-auto w-[500px]'>
          <h2 className='text-center text-2xl font-bold'>Send application</h2>
          <p className='mb-8 text-center text-gray-600'>Have a question? Send an application so we can help you.</p>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <textarea
                name='content'
                placeholder='Content'
                rows={3}
                className='w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-purple1'
                value={formData.content}
                onChange={handleInputChange}
              />
              {errors.content && <p className='ml-2 text-sm text-red-500'>{errors.content}</p>}
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
      </div>
    </div>
  )
}

export default CustomerApplication

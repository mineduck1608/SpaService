import React, { useState, PropsWithChildren } from 'react'
import { MdOutlineEmail, MdPhone, MdMap, MdAddLink } from "react-icons/md"
import { FaFacebookSquare, FaYoutubeSquare, FaTwitterSquare } from "react-icons/fa"
import ReCAPTCHA from "react-google-recaptcha";
import { toast, ToastContainer } from 'react-toastify'

interface Form {
    fullName: string,
    phoneNumber: string,
    email: string,
    contactContent: string
}
const ReCAPTCHAFixed = ReCAPTCHA as unknown as React.FC<PropsWithChildren<{
    sitekey: string,
    onChange: (token: string | null) => void
}>>

const ContactForm = () => {
    const [formData, setFormData] = useState<Form>({
        fullName: '',
        phoneNumber: '',
        email: '',
        contactContent: ''
    });
    const [errors, setErrors] = useState<Partial<Form>>({});
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [captchaError, setCaptchaError] = useState<string | null>(null);

    const handleCaptchaChange = (token: string | null) => { 
        setCaptchaToken(token) 
        setCaptchaError(null)
    }
    const validateForm = () => {
        const tempErrors : Partial<Form> = {}
        let isValid = true

        if (!formData.fullName.trim()) {
            tempErrors.fullName = 'Full name is required'
            isValid = false
        }
        const phoneRegex = /^[0-9]+$/;
        if (!formData.phoneNumber.trim() || !phoneRegex.test(formData.phoneNumber)) {
            tempErrors.phoneNumber = 'Valid phone number is required'
            isValid = false
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            tempErrors.email = 'Valid email is required'
            isValid = false
        }
        if (!formData.contactContent.trim()) {
            tempErrors.contactContent = 'Content is required'
            isValid = false
        }
        if (!captchaToken) {
            setCaptchaError('reCAPTCHA verification is required')
            isValid = false
        }

        setErrors(tempErrors)
        return isValid
    }
    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('https://localhost:7205/api/contacts/Create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                })

                if (response.ok) {
                    const data = await response.json()
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
            className='flex flex-col lg:flex-row font-montserrat mt-4 bg-custom-bg6 w-full max-w-6xl mx-auto shadow-xl border border-gray-200' 
            data-aos='fade-left' 
            data-aos-delay='500'
        >
            <div className='p-8 text-white lg:w-1/2'>
                <div className='max-w-full ml-7 mb-10'>
                    <div className='mb-8 mt-16 font-bold'>
                        <h2 className='text-3xl mb-3'>Sen Spa</h2>
                        <h3 className='text-2xl'>Service Company Limited</h3>
                    </div>
                    <div className='space-y-8 opacity-80'>
                        <div className='flex items-start gap-2'>
                            <MdMap className='text-2xl'/>
                            <div className='flex gap-2'>
                                <span>Address:</span>
                                <p>10B1 Le Thanh Ton, Ben Nghe Ward, District 1, HCMC</p>
                            </div>
                        </div>
                        <div className='flex items-start gap-2'>
                            <MdPhone className='mt-0.5 text-xl'/>
                            <div className='flex flex-col gap-2'>
                                <span className=''>Phone: +84 28 38 251 250</span>
                                <p className='ml-16'>+84 28 3910 2174</p>
                            </div>
                        </div>
                        <div className='flex items-start gap-2'>
                            <MdOutlineEmail className='mt-0.5 text-xl'/>
                            <div className='flex gap-2'>
                                <span className=''>Email: </span>
                                <p>rsv@senspa.com.vn</p>
                            </div>
                        </div>
                        <div className='flex items-start gap-2'>
                            <MdAddLink className='text-2xl'/>
                            <div className='flex gap-2'>
                                <span className=''>Website: </span>
                                <a href='/'>senspa.com.vn</a>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-12 mt-10 text-3xl'>
                        <a href='https://www.facebook.com/senspa.vietnam/'><FaFacebookSquare/></a>
                        <a href=''><FaTwitterSquare/></a>
                        <a href=''><FaYoutubeSquare/></a>
                    </div>
                </div>
            </div>
            <div className='bg-white lg:w-1/2 p-8 flex items-center'>
                <div className='w-[500px] mx-auto'>
                    <h2 className='text-2xl mb-2 font-bold'>Contact Form</h2>
                    <p className='text-gray-600 mb-8'>Contact us so we can best support you</p>
                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <div>
                            <input
                                type='text'
                                name='fullName'
                                placeholder='Full name'
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple1'
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                            {errors.fullName && <p className='text-red-500 text-sm mt-1 ml-2'>{errors.fullName}</p>}
                        </div>
                        <div>
                            <input
                                type='tel'
                                name='phoneNumber'
                                placeholder='Phone'
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple1'
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                            {errors.phoneNumber && <p className='text-red-500 text-sm mt-1 ml-2'>{errors.phoneNumber}</p>}
                        </div>
                        <div>
                            <input
                                type='email'
                                name='email'
                                placeholder='Email'
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple1'
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <p className='text-red-500 text-sm mt-1 ml-2'>{errors.email}</p>}
                        </div>
                        <div>
                            <textarea
                                name='contactContent'
                                placeholder='Content'
                                rows={3}
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple1'
                                value={formData.contactContent}
                                onChange={handleInputChange}
                            />
                            {errors.contactContent && <p className='text-red-500 text-sm ml-2'>{errors.contactContent}</p>}
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <ReCAPTCHAFixed 
                                sitekey='6LeUZdIqAAAAAPlUPWL-M5n_aaSahKjHd8rfsoB_'
                                onChange={handleCaptchaChange}
                            />
                            {captchaError && <p className='text-red-500 text-sm mt-2 ml-2'>{captchaError}</p>}
                        </div>
                        <div className='flex justify-center items-center'> 
                            <button type='submit' className='px-6 py-3 text-sm text-white bg-purple1 rounded-full'>
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

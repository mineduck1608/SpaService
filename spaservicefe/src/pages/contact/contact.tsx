import React, { useState, useEffect} from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Address from './address'
import ContactForm from './contactForm'
import IntroHeader from '../../components/introductionHeader'

const ContactPage = () => {
    useEffect(() => {
        AOS.init({
            offset: 0,
            delay: 200,
            duration: 1200,
            once: true
        })
    }, [])

    return (
        <main className='overflow-x-hidden font-montserrat'>
            {/* Top Page */}
            <div className='relative'>
                <img
                    src='https://senspa.com.vn/wp-content/uploads/2020/11/DSC5622.jpg'
                    alt=''
                    className='w-full h-[50vh] object-cover'
                />
                <div className='w-full' data-aos='fade-right' data-aos-delay='400'>
                    <div className='container mx-auto px-32 py-5 flex justify-center md:justify-start'>
                        <div className='text-lg text-black'>
                            <a href='/'>Home</a>
                            <span className='mx-2'>&gt;</span>
                            <span>Contact</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <IntroHeader title='Contact' position='middle' size='big'/>
            <ContactForm />

            {/* Address */}
            <Address />

            {/* Infor */}
            <div className='flex justify-center items-center'>
                <div>
                    <IntroHeader title='SENVIET SPA QUỐC TẾ INTERNATIONAL TERMINAL' position='middle' size='medium'/>
                    <div className='text-center pb-24'>
                        <p data-aos='fade-right' data-aos-delay='200'>Tầng 1, Ga đi Quốc tế</p>
                        <p data-aos='fade-right' data-aos-delay='400'>3st floor, International Departure Terminal</p>
                        <p data-aos='fade-right' data-aos-delay='600'>Tel : <span className='font-semibold'>(+84) 35 470 658</span></p>
                        <p data-aos='fade-right' data-aos-delay='800'>Website: <a className='transition-transform hover:text-purple1' href='/'>senvietspa.com</a></p>
                    </div>
                </div>
            </div>
        </main>
  )
}

export default ContactPage

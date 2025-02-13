import React, { useEffect } from 'react'
import bgAbout from '../../images/background/bg_about.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true
        });
    }, []);

    return (
        <section className='about-section'>
            <div
                className="absolute right-0 w-1/2 h-full"
                style={{
                    backgroundImage: `url(https://senspa.com.vn/wp-content/themes/thuythu/images/bg_spa.png)`,
                    backgroundRepeat: 'no-repeat',
                    zIndex: 1,
                    opacity: 0.7
                }}
            ></div>
            <div className='w-full h-250px px-60 pb-32'
                style={{
                    backgroundImage: `url(${bgAbout})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className='grid grid-cols-1 gap-20 lg:grid-cols-2'>
                    <div className='absolute inset-0 -z-10 h-full w-full bg-custom-bg3 bg-contain bg-left-top bg-no-repeat' />
                    <div className='flex flex-col items-start text-left mt-52'>
                        <div className="mb-8">
                            <h2 className="text-5xl font-bold text-[#8B3A8B]" data-aos='fade-down' data-aos-delay='300'>About Sen Spa</h2>
                            <div className="flex items-center">
                                <img
                                    data-aos='fade-down' data-aos-delay='300'
                                    src="https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png"
                                    alt="lotus"
                                />
                            </div>
                        </div>
                        <div className='max-w-lg text-lg text-gray-900' data-aos='fade-down' data-aos-delay='300'>
                            <p className='' data-aos='fade-down' data-aos-delay='300'>
                                Associated with the beauty of a simple, sincere, and romantic flower, but with a strong will to live, Sen Spa is designed and arranged in a rustic, simple style that embodies the traditional characteristics of Vietnam.
                            </p>
                            <p className='mt-6' data-aos='fade-down' data-aos-delay='200'>
                                Located in the heart of Ho Chi Minh City, Sen Spa is separated from the noisy, bustling atmosphere, offering a peaceful and serene space."
                            </p>
                            <button
                                className="mt-8 px-6 py-2 text-[#a040a0] border-2 border-[#a040a0] rounded-tl-[1rem] rounded-br-[1rem] hover:bg-[#a040a0] hover:text-white transition-colors duration-700"
                            >
                                More <span className="ml-1">›</span>
                            </button>
                        </div>

                    </div>

                    <div className='mx-auto mt-32 grid max-w-lg grid-cols-2 gap-2'>
                        <img
                            src='https://senspa.com.vn/wp-content/uploads/2021/01/2.png'
                            alt=''
                            className='h-64 rounded-bl-[5rem] rounded-tr-[5rem] object-cover'
                            data-aos='fade-up'
                            data-aos-delay='400'
                        />
                        <img
                            src='https://senspa.com.vn/wp-content/uploads/2021/01/ve-sen-spa.png'
                            alt=''
                            className='mt-12 h-52 w-52 rounded-br-[5rem] rounded-tl-[5rem] object-cover'
                            data-aos='fade-up'
                            data-aos-delay='500'
                        />
                        <div className='relative' data-aos='fade-up' data-aos-delay='600'>
                            <div className='text-l absolute inset-0 flex h-72 -translate-x-2 translate-y-3 flex-col items-start justify-center rounded-br-[5rem] rounded-tl-[5rem] bg-purple-900 p-6 text-white'>
                                <div className='text-5xl font-bold pl-8'>21</div>
                                <div className='text-5xl font-bold pl-8'>years</div>
                                <div className='text-2xl mt-4 pl-8'>dedication to customers</div>
                            </div>
                            <div className='h-72 rounded-br-[5rem] rounded-tl-[5rem] bg-pink-800 object-cover p-6 text-white'></div>
                        </div>
                        <img
                            src='https://senspa.com.vn/wp-content/uploads/2021/01/1.png'
                            alt=''
                            className='h-56 rounded-bl-[5rem] rounded-tr-[5rem] object-cover'
                            data-aos='fade-up'
                            data-aos-delay='700'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection;

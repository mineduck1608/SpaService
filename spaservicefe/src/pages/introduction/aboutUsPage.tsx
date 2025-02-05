import React, {useState, useEffect} from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import IntroHeader from '../../components/introductionHeader'
import EmbedVideo from './embedVideo'
import History from './history'
import Facilities from './facilities'
import ChooseUs from './whyChooseUs'

const AboutUsPage = () => {
    const SpaData = [
        { id: 1, image: "https://senspa.com.vn/wp-content/uploads/2020/12/icon-5.png", title: "Hearing",  description: "Calming melodies help relieve stress and depression so you can slowly drift into deep sleep."},
        { id: 2, image: "https://senspa.com.vn/wp-content/uploads/2020/12/icon-1.png", title: "Smell", description: "The nose is welcomed by the pleasant aroma of plants and natural essential oil covering the entire floors.", aosDelay: "300" },
        { id: 3, image: "https://senspa.com.vn/wp-content/uploads/2020/12/icon-4.png", title: "Touch", description: "Your bright smooth skin will be well cared for with gentle strokes to remove all muscle knots.", aosDelay: "400" },
        { id: 4, image: "https://senspa.com.vn/wp-content/uploads/2020/12/icon-2.png", title: "Visual", description: "Minimalistic decoration and gentle lighting help transcend your spirit to another realm and drown your body in deep relaxing moments.", aosDelay: "500" },
        { id: 5, image: "https://senspa.com.vn/wp-content/uploads/2020/12/icon-3.png", title: "Taste", description: "Not only is our special drink delicious, but it is also rejuvenating for your health and skin.", aosDelay: "500" },
    ]
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, [])

    return (
        <main className='overflow-x-hidden font-montserrat'>
            {/* Top Page */}
            <div className='relative'>
                <img
                    src='https://senspa.com.vn/wp-content/uploads/2020/11/banner_gioithieu.jpg'
                    alt=''
                    className='w-full h-[40vh] object-cover'
                />
            </div>
            <div className='w-full'>
            <div className='container mx-auto px-4 py-3 flex justify-center md:justify-start'>
                <div className='text-lg whitespace-nowrap'>
                    <a href='/' className='text-gray-500'>Home</a>
                    <span className='mx-2 text-gray-400'>&gt;</span>
                    <span className='text-gray-500'>About Us</span>
                </div>
            </div>
            </div>

            {/* About Us */}
            <div className='container mx-auto my-10 px-4'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <div className='flex flex-col items-center text-center'>
                        <IntroHeader title={"About Us"}/>
                        <div className='max-w-lg' data-aos='fade-down' data-aos-delay='600'>
                            <p className='text-gray-600 text-lg opacity-80'>
                                Associated with the beauty of a sincere, romantic, yet very resilient flower, SenSpa is designed and decorated in a rustic and simple style, featuring bold traditional characteristics of Vietnam.
                            </p>
                            <p className='text-gray-600 text-lg opacity-80 mt-6'>
                                Located in the center of HCM City via an alley entrance, SenSpa is separated from the noisy atmosphere to open into a gentle and serene space.
                            </p>
                            <p className='text-gray-600 text-lg opacity-80 mt-6'>
                                With almost 30 therapists being professionally trained and certified following international standards, SenSpa is proud to be a perfect wellness destination that meets the needs of the most fastidious guests from all around the world.
                            </p>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4 max-w-lg mx-auto mt-5'>
                        <img 
                            src='http://4.bp.blogspot.com/-OsmPR1OeXjM/UgwAo1EgmEI/AAAAAAAAABQ/SFHlnU1583c/s1600/Small-treatment-room.jpg' 
                            alt='' 
                            className='rounded-tr-[5rem] rounded-bl-[5rem] h-60 object-cover'
                            data-aos='fade-up' 
                            data-aos-delay='200' 
                        />
                        <img 
                            src='https://wallpapercave.com/wp/wp4085230.jpg' 
                            alt='' 
                            className='mt-12 rounded-tl-[5rem] rounded-br-[5rem] h-48 w-52 object-cover'
                            data-aos='fade-up' 
                            data-aos-delay='300' 
                        />
                        <div className='relative' data-aos='fade-up' data-aos-delay='400'>
                            <div className='bg-purple-900 absolute inset-0 -translate-x-2 translate-y-3 p-6 text-white rounded-tl-[5rem] rounded-br-[5rem] h-44 flex flex-col justify-center items-center text-l'>
                                <div className='text-4xl font-bold'>21</div>
                                    <div className='text-3xl'>years</div>
                                <div className='mt-2'>dedication to customers</div></div>   
                            <div className='bg-pink-800 p-6 text-white rounded-tl-[5rem] rounded-br-[5rem] h-44 object-cover'></div>
                        </div>
                        <img 
                            src='https://2.bp.blogspot.com/-lSnHcuHJJWM/WD9pG-bIVeI/AAAAAAAAAOg/pxlMGhQi10gXxG0qKBNuU8vw5_jRIKteACLcB/s1600/first.jpg' 
                            alt='' 
                            className='rounded-tr-[5rem] rounded-bl-[5rem] h-56 object-cover'
                            data-aos='fade-up' 
                            data-aos-delay='500'
                        />
                    </div>
                </div>
            </div>
            
            {/* History */}
            <History />

            {/* Video */}
            <EmbedVideo />

            {/* What is spa */}
            <div className='container mx-auto my-16 space-y-4'>
                <div className='text-center max-w-[100vh] mx-auto space-y-1'>
                    <IntroHeader title={"What is SPA?"}/>
                    <p className='text-gray-600 text-lg opacity-80' data-aos='fade-right' data-aos-delay='500'>
                        Today, SPA is defined as health and beauty treatments that helps balance the body and spirit. 
                        A true spa must be able to influence these senses and help re-energize the customers so they can become healthier and younger.
                    </p>
                </div>
                <div className='gap-10 flex flex-row justify-center flex-wrap'>
                    {SpaData.map(({ id, image, title, description, aosDelay }) => (
                        <div key={id} 
                            data-aos='fade-up' 
                            data-aos-delay={aosDelay} 
                            className='max-w-[200px] space-y-7 flex flex-col items-center transition-all duration-300 hover:-translate-y-7 mt-8'>
                            <div className='relative transition-all duration-300 hover:-translate-y-3'>
                                {/* <div className='text-5xl'>{icon}</div> */}
                                <img
                                    src={image}
                                    alt=''
                                />
                            </div>
                            <div className='text-center'>
                                <h3 className='text-xl font-bold text-gray-800 mb-2'>{title}</h3>
                                <p className='text-gray-600 text-sm opacity-80'>{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Why choose us */}
            <ChooseUs />

            {/* Gallery */}
            <Facilities />
        </main>
    )
}

export default AboutUsPage

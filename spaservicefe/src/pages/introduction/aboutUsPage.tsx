import React from 'react'
// import AOS from 'aos'
// import 'aos/dist/aos.css'
import IntroHeader from '../../components/introductionHeader'
import { GiNoseSide } from 'react-icons/gi'
import { MdHearing, MdOutlineTouchApp } from 'react-icons/md'
import { IoSparklesSharp } from 'react-icons/io5'
import { FaCheese } from 'react-icons/fa6'

const SpaData = [
    { id: 1, icon: <MdHearing/>, title: "Hearing",  description: "Calming melodies help relieve stress and depression so you can slowly drift into deep sleep.", aosDelay: "200" },
    { id: 2, icon: <GiNoseSide/>, title: "Smell", description: "The nose is welcomed by the pleasant aroma of plants and natural essential oil covering the entire floors.", aosDelay: "300" },
    { id: 3, icon: <MdOutlineTouchApp/>, title: "Touch", description: "Your bright smooth skin will be well cared for with gentle strokes to remove all muscle knots.", aosDelay: "400" },
    { id: 4, icon: <IoSparklesSharp/>, title: "Visual", description: "Minimalistic decoration and gentle lighting help transcend your spirit to another realm and drown your body in deep relaxing moments.", aosDelay: "500" },
    { id: 5, icon: <FaCheese/>, title: "Taste", description: "Not only is our special drink delicious, but it is also rejuvenating for your health and skin.", aosDelay: "500" },
]

const AboutUsPage = () => {
  return (
    <main className='overflow-x-hidden'>
        {/* Top Page */}
        <div className='relative'>
            <img
                src='https://i.pinimg.com/originals/53/bf/fc/53bffc774772840dc0992d589e3e6e60.jpg'
                alt='Spa'
                className='w-full h-[350px] object-cover'
            />
        </div>
        <div className='container mx-auto px-4 py-4'>
            <div className='ml-52 mt-6 text-lg'>
                <a href='/' className='text-gray-500 hover:text-purple-600'>Home</a>
                <span className='mx-2 text-gray-400'>&gt;</span>
                <span className='text-gray-500'>About Us</span>
            </div>
        </div>

        {/* About Us */}
        <div className='container my-16 space-y-6'>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
                <div className='flex flex-col items-center text-center ml-28'>
                    <IntroHeader title={"About Us"}/>
                    <div className='max-w-lg text-left ml-12'>
                        <p className='text-gray-600 text-lg opacity-80'>
                            Associated with the beauty of a sincere, romantic, yet very resilient flower, Bamboo Spa is designed and decorated in a rustic and simple style, featuring bold traditional characteristics of Vietnam.
                        </p>
                        <p className='text-gray-600 text-lg opacity-80 mt-6'>
                        Located in the center of HCM City via an alley entrance, Bamboo Spa is separated from the noisy atmosphere to open into a gentle and serene space. Arriving to Bamboo Spa, customers will enter a luxurious and tranquil world, interwoven between modern and classic to accentuate the image of the elegant lotus flowers.
                        </p>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4 max-w-lg mx-auto ml-12'>
                    <img 
                        src='http://4.bp.blogspot.com/-OsmPR1OeXjM/UgwAo1EgmEI/AAAAAAAAABQ/SFHlnU1583c/s1600/Small-treatment-room.jpg' 
                        alt='' 
                        className='rounded-tr-[5rem] rounded-bl-[5rem] h-60 object-cover' />
                    <img 
                        src='https://wallpapercave.com/wp/wp4085230.jpg' 
                        alt='' 
                        className='mt-12 rounded-tl-[5rem] rounded-br-[5rem] h-48 w-52 object-cover' />
                    <div className='relative'>
                        <div className='bg-purple-900 absolute inset-0 -translate-x-2 translate-y-3 p-6 text-white rounded-tl-[5rem] rounded-br-[5rem] h-44 flex flex-col justify-center items-center'>
                            <div className='text-4xl font-bold'>7749</div>
                                <div className='text-3xl'>years</div>
                            <div className='mt-2'>dedication to customers</div></div>   
                        <div className='bg-pink-800 p-6 text-white rounded-tl-[5rem] rounded-br-[5rem] h-44 object-cover'>
                        </div>
                    </div>
                    <img 
                        src='https://2.bp.blogspot.com/-lSnHcuHJJWM/WD9pG-bIVeI/AAAAAAAAAOg/pxlMGhQi10gXxG0qKBNuU8vw5_jRIKteACLcB/s1600/first.jpg' 
                        alt='' 
                        className='rounded-tr-[5rem] rounded-bl-[5rem] h-56 object-cover' />
                </div>
            </div>
        </div>

        {/* What is spa */}
        <div className='container my-16 space-y-4'>
            <div className='text-center max-w-[800px] mx-auto space-y-1'>
                <IntroHeader title={"What is SPA?"}/>
                <p className='text-gray-600 text-lg opacity-80'>
                    Today SPA is defined as health and beauty treatments that helps balance the body and spirit. 
                    A true spa must be able to influence these senses and help re-energize the customers so they can become healthier and younger.
                </p>
            </div>
            <div className='gap-10 flex flex-row justify-center flex-wrap'>
                {SpaData.map(({ id, icon, title, description, aosDelay }) => (
                    <div 
                        key={id} 
                        data-aos='fade-up' 
                        data-aos-delay={aosDelay} 
                        className='space-y-7 flex flex-col items-center transition-all duration-300 hover:-translate-y-7' 
                        style={{ maxWidth: '200px', marginTop: '2rem' }}>
                            
                        <div className='relative'>
                            <div className='bg-purple-900 absolute inset-0 -translate-x-2 translate-y-3 rounded-tl-3xl rounded-br-3xl'></div>
                            <div className='bg-pink-800 text-white p-5 rounded-tl-3xl rounded-br-3xl relative transition-all duration-300 hover:-translate-y-3 hover:bg-pink-950'>
                                <div className='text-5xl'>{icon}</div>
                            </div>
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
        <div className='container my-20 space-y-4'>
            <div className='max-w-6xl mx-auto px-4 py-8 flex gap-6 items-center bg-gray-50 shadow-lg rounded-2xl'>
                <div className='relative'>
                    <div className='bg-purple-900 absolute inset-0 -translate-x-1 translate-y-1 rounded-tr-2xl rounded-bl-2xl '></div>
                    <div className='bg-white p-3 rounded-tr-2xl rounded-bl-2xl relative border border-purple-900'>
                        <button className='hidden md:block text-purple-500'>
                            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeWidth='2' strokeLinecap='round' d='M15 19l-7-7 7-7' />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className='relative flex-1'>
                    <img 
                        src='https://cdn-wechotel.pressidium.com/wp-content/uploads/2021/06/reservations.jpg' 
                        alt=''
                        className='rounded-lg w-full'
                    />
                </div>
                <div className='flex-1 space-y-0 max-w-[300px]'>
                    <div className='text-center'>
                        <IntroHeader title={"Why choose us?"}/>
                    </div>
                    <div className='ml-5'>
                        <p className='text-xl font-normal'>
                            Being recognized as one of the first pioneers that brought true Spa services into Vietnam
                        </p>
                        
                        <p className='text-gray-600 text-sm opacity-80 mt-4'>
                            Bamboo Spa with its sophisticated minimalist design takes customers to a serene dimension to provide the most comfortable and relaxing experience.
                        </p>
                    </div>
                </div>
                <div className='relative'>
                    <div className='bg-purple-900 absolute inset-0 -translate-x-1 translate-y-1 rounded-tl-2xl rounded-br-2xl'></div>
                    <div className='bg-white p-3 rounded-tl-2xl rounded-br-2xl relative border border-purple-900'>
                        <button className='hidden md:block text-purple-500'>
                            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeWidth='2' strokeLinecap='round' d='M9 5l7 7-7 7' />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default AboutUsPage

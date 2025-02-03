import React, {useState, useEffect} from 'react'
// import AOS from 'aos'
// import 'aos/dist/aos.css'
import IntroHeader from '../../components/introductionHeader'
import { GiNoseSide } from 'react-icons/gi'
import { MdHearing, MdOutlineTouchApp } from 'react-icons/md'
import { IoSparklesSharp } from 'react-icons/io5'
import { FaCheese } from 'react-icons/fa6'
import EmbedVideo from './embedVideo'
import ArrowButton from '../../components/ui/arrowButton'
import History from './history'
import Facilities from './facilities'

const SpaData = [
    { id: 1, icon: <MdHearing/>, title: "Hearing",  description: "Calming melodies help relieve stress and depression so you can slowly drift into deep sleep."},
    { id: 2, icon: <GiNoseSide/>, title: "Smell", description: "The nose is welcomed by the pleasant aroma of plants and natural essential oil covering the entire floors.", aosDelay: "300" },
    { id: 3, icon: <MdOutlineTouchApp/>, title: "Touch", description: "Your bright smooth skin will be well cared for with gentle strokes to remove all muscle knots.", aosDelay: "400" },
    { id: 4, icon: <IoSparklesSharp/>, title: "Visual", description: "Minimalistic decoration and gentle lighting help transcend your spirit to another realm and drown your body in deep relaxing moments.", aosDelay: "500" },
    { id: 5, icon: <FaCheese/>, title: "Taste", description: "Not only is our special drink delicious, but it is also rejuvenating for your health and skin.", aosDelay: "500" },
]

const slides = [
    { image: "https://cdn-wechotel.pressidium.com/wp-content/uploads/2021/06/reservations.jpg", title: "Being recognized as one of the first pioneers that brought true Spa services into Vietnam",  description: "SenSpa with its sophisticated minimalist design takes customers to a serene dimension to provide the most comfortable and relaxing experience."},
    { image: "https://i.pinimg.com/originals/db/2d/31/db2d3151f50986589815054faed9c855.jpg", title: "Beauty without surgery",  description: "Our team of specialists are dedicated to help 100% of our customers feel their bodies full of vitality after just one treatment."},
    { image: "https://i.pinimg.com/originals/07/05/e7/0705e7566c7921e0e95a95c2d0821223.jpg", title: "Dedicated specialist",  description: "With more than 30 technicians being professionally trained and certified following international standards."},
    { image: "https://cdn.marriottnetwork.com/uploads/sites/23/2021/01/the-phoenician-luxury-collection-resort-spa-treatment-room-1440x900.jpg", title: "SenSpa has been leading the trend of healthy living and nature loving",  description: "Born in 2004, SenSpa has been leading the trend of healthy living and nature loving to maintain a fulfilling life and unclouded spirit."},
]
const AboutUsPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isChanging, setIsChanging] = useState(false);

    useEffect (() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentSlide])

    const nextSlide = () => {
        setIsChanging(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setIsChanging(false);
        }, 600);
    }

    const prevSlide = () => {
        setIsChanging(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
            setIsChanging(false);
        }, 600);
    }

    return (
        <main className='overflow-x-hidden'>
            {/* Top Page */}
            <div className='relative'>
                <img
                    src='https://i.pinimg.com/originals/53/bf/fc/53bffc774772840dc0992d589e3e6e60.jpg'
                    alt='Spa'
                    className='w-full h-[40vh] object-cover'
                />
            </div>
            <div className='container mx-auto px-4 py-4'>
                <div className='ml-32 mt-6 text-lg'>
                    <a href='/' className='text-gray-500 hover:text-purple-600'>Home</a>
                    <span className='mx-2 text-gray-400'>&gt;</span>
                    <span className='text-gray-500'>About Us</span>
                </div>
            </div>

            {/* About Us */}
            <div className='container mx-auto my-16'>
                <div className='grid grid-cols-1 lg:grid-cols-2'>
                    <div className='flex flex-col items-center text-center'>
                        <IntroHeader title={"About Us"}/>
                        <div className='max-w-lg text-left ml-14'>
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
                            className='rounded-tr-[5rem] rounded-bl-[5rem] h-60 object-cover' />
                        <img 
                            src='https://wallpapercave.com/wp/wp4085230.jpg' 
                            alt='' 
                            className='mt-12 rounded-tl-[5rem] rounded-br-[5rem] h-48 w-52 object-cover' />
                        <div className='relative'>
                            <div className='bg-purple-900 absolute inset-0 -translate-x-2 translate-y-3 p-6 text-white rounded-tl-[5rem] rounded-br-[5rem] h-44 flex flex-col justify-center items-center text-l'>
                                <div className='text-4xl font-bold'>21</div>
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
            
            {/* History */}
            <History />

            {/* Video */}
            <EmbedVideo />

            {/* What is spa */}
            <div className='container mx-auto my-16 space-y-4'>
                <div className='text-center max-w-[100vh] mx-auto space-y-1'>
                    <IntroHeader title={"What is SPA?"}/>
                    <p className='text-gray-600 text-lg opacity-80'>
                        Today, SPA is defined as health and beauty treatments that helps balance the body and spirit. 
                        A true spa must be able to influence these senses and help re-energize the customers so they can become healthier and younger.
                    </p>
                </div>
                <div className='gap-10 flex flex-row justify-center flex-wrap'>
                    {SpaData.map(({ id, icon, title, description }) => (
                        <div 
                            key={id} 
                            data-aos='fade-up' 
                            // data-aos-delay={aosDelay} 
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
            <div className='container mx-auto my-20 space-y-4'>
                <div className='max-w-6xl mx-auto px-4 py-8 flex gap-6 items-center 
                        bg-white rounded-2xl overflow-hidden bg-custom-bg1 bg-no-repeat bg-right-bottom shadow-purple-200 shadow-lg'>
                    <ArrowButton direction='right' onClick={prevSlide}/>
                    <div className='relative md:block hidden'>
                        <img 
                            src={slides[currentSlide].image}
                            alt=''
                            className={`rounded-lg w-full h-96 max-w-[580px] object-cover transition-opacity duration-300 ${
                                isChanging ? 'opacity-0' : 'opacity-100'
                            }`}
                        />
                    </div>
                    <div className={`flex-1 space-y-0 max-w-[350px] transition-opacity duration-300 ${
                        isChanging ? 'opacity-0' : 'opacity-100'
                    }`}>
                        <div className='text-center md:block hidden'>
                            <IntroHeader title={'Why choose us?'}/>
                        </div>
                        <div className='ml-3'>
                            <p className='text-xl font-normal'>
                                {slides[currentSlide].title}
                            </p>
                            <p className='text-gray-600 text-sm opacity-80 mt-4'>
                                {slides[currentSlide].description}
                            </p>
                        </div>
                    </div>
                    <ArrowButton direction='left' onClick={nextSlide}/>
                </div>
                
                <div className='flex justify-center gap-2'>
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setIsChanging(true);
                                setTimeout(() => {
                                    setCurrentSlide(index);
                                    setIsChanging(false);
                                }, 300);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                currentSlide === index ? 'bg-purple-900 w-4' : 'bg-purple-300'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Gallery */}
            <Facilities />
        </main>
    )
}

export default AboutUsPage

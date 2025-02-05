import React, { useState, useEffect} from 'react'
import ArrowButton from '../../components/ui/arrowButton'
import IntroHeader from '../../components/introductionHeader'

const ChooseUs = () => {
    const slides = [
        { image: "https://cdn-wechotel.pressidium.com/wp-content/uploads/2021/06/reservations.jpg", title: "Being recognized as one of the first pioneers that brought true Spa services into Vietnam",  description: "SenSpa with its sophisticated minimalist design takes customers to a serene dimension to provide the most comfortable and relaxing experience."},
        { image: "https://i.pinimg.com/originals/db/2d/31/db2d3151f50986589815054faed9c855.jpg", title: "Beauty without surgery",  description: "Our team of specialists are dedicated to help 100% of our customers feel their bodies full of vitality after just one treatment."},
        { image: "https://i.pinimg.com/originals/07/05/e7/0705e7566c7921e0e95a95c2d0821223.jpg", title: "Dedicated specialist",  description: "With more than 30 technicians being professionally trained and certified following international standards."},
        { image: "https://senspa.com.vn/wp-content/uploads/2021/01/1.1.png", title: "SenSpa has been leading the trend of healthy living and nature loving",  description: "Born in 2004, SenSpa has been leading the trend of healthy living and nature loving to maintain a fulfilling life and unclouded spirit."},
    ]
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isChanging, setIsChanging] = useState(false);

    useEffect (() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000)
        return () => clearInterval(interval);
    }, [currentSlide])

    const nextSlide = () => {
        setIsChanging(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setIsChanging(false);
        }, 600)
    }

    const prevSlide = () => {
        setIsChanging(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
            setIsChanging(false);
        }, 600)
    }
        
    return (
        <div className='mx-auto my-20 space-y-4' data-aos='zoom-in'>
            <div className='flex justify-center items-center gap-8 px-4'>
                <div className='hidden lg:block'>
                    <ArrowButton direction='right' onClick={prevSlide}/>
                </div>
                <div className='px-5 py-8 flex flex-col lg:flex-row gap-6 items-center 
                        bg-white rounded-2xl overflow-hidden bg-custom-bg1 bg-no-repeat bg-right-bottom shadow-purple-200 shadow-lg'>
                    <div className='lg:hidden'>
                        <IntroHeader title={'Why choose us?'} position='middle'/>
                    </div>
                    <div className='relative'>
                        <img src={slides[currentSlide].image} alt=''
                            className={`rounded-lg w-full h-96 max-w-[580px] object-cover transition-opacity duration-300 ${
                                isChanging ? 'opacity-0' : 'opacity-100'}`}
                        />
                    </div>
                    <div className={`flex-1 space-y-4 max-w-[350px] transition-opacity duration-300 text-center lg:text-left ${
                        isChanging ? 'opacity-0' : 'opacity-100'}`}>
                        <div className='hidden lg:block'>
                            <IntroHeader title={'Why choose us?'} position='left'/>
                        </div>
                        <h3 className='text-xl font-semibold'>{slides[currentSlide].title}</h3>
                        <p className='text-gray-600 text-sm opacity-80'>{slides[currentSlide].description}</p>
                    </div>
                </div>
                <div className='hidden lg:block'>
                    <ArrowButton direction='left' onClick={nextSlide}/>
                </div>
            </div>
            <div className='flex justify-center gap-2'>
                {slides.map((_, index) => (
                    <button key={index} onClick={() => {
                            setIsChanging(true);
                            setTimeout(() => {
                                setCurrentSlide(index);
                                setIsChanging(false);
                            }, 300);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentSlide === index ? 'bg-purple-900 w-4' : 'bg-purple-300' }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default ChooseUs

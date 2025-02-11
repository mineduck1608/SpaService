import React, { useState, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Main1 from "../../images/home/Main1.png";
import Main2 from '../../images/home/Main2.png';
import Main3 from '../../images/home/Main3.png';
import Carousel1 from '../../images/carousel/Carousel1.png';
import Carousel2 from '../../images/carousel/Carousel2.png';
import Carousel3 from '../../images/carousel/Carouse3.png';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import bgAbout from '../../images/background/bg_about.jpg';

const images = [Main1, Main2, Main3];

const serviceSlides = [
    {
        image: Carousel1,
        heading: "Why Choosing SenSpa?",
        description:
            "The pioneering unit in spa services.The pioneering unit in spa services.",
        subtext:
            "Recognized as one of the pioneers in introducing authentic spa services to Vietnam, Sen Spa, with its elegantly minimalist design, takes customers into a tranquil space for deep and complete relaxation.",
    },

    {
        image: Carousel2,
        heading: "Relax & Rejuvenate",
        description: "Creating a trend of healthy living",
        subtext: "Established in 2004, Sen Spa has been shaping a trend of healthy living in harmony with nature, aiming to maintain a life full of energy and mental clarity.",
    },

    {
        image: Carousel3,
        heading: "Experience Serenity",
        description: "Dedicated specialists",
        subtext: 'Sen Spa takes pride in being a "health spa" that has maintained its quality for 17 years, with a team of highly skilled specialists trained to international standards, many of whom have been with us for over a decade. The outstanding strength of our specialists lies in their ability to detect tension points that cause pain in the body and effectively relieve them, easing muscle stiffness and releasing energy blockages. Their dedication has yielded well-deserved "sweet rewards": helping 100% of our customers feel revitalized and full of life after just one therapy session.',
    },

];

const serviceItems = [
    {
        title: "ALL INCLUSIVE SERVICE",
        image: "https://senspa.com.vn/wp-content/uploads/2020/10/VIP_room_3.7.jpg",
        description: "Providing natural mineral resources, natural hot springs, or seawater within the premises, which are used in hydrotherapy treatments. This is considered the original method that gave birth to early spa practices."
    },
    {
        title: "VIP SERVICE",
        image: "https://senspa.com.vn/wp-content/uploads/2021/01/couple-1.png",
        description: "Premium service for exclusive guests, ensuring an exceptional and private experience."
    },
    {
        title: "FULL BODY CARE",
        image: "https://senspa.com.vn/wp-content/uploads/2021/01/Massage-da-4.jpg",
        description: "A full-body care service designed to provide comfort and harmony with nature."
    },
    {
        title: "FACIAL CARE",
        image: "https://senspa.com.vn/wp-content/uploads/2020/10/DSC5827.jpg",
        description: "A facial care service designed to keep the skin healthy and youthful."
    }
];

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
    const [isTextVisible, setIsTextVisible] = useState(true);

    useEffect(() => {
        AOS.init({
            offset: 0,
            delay: 100,
            duration: 1500,
            once: true,
            easing: 'ease-in-out-cubic'
        });

        const interval = setInterval(() => {
            setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % serviceSlides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextImage = () => {
        setIsTextVisible(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setIsTextVisible(true);
        }, 500);
    };

    const prevImage = () => {
        setIsTextVisible(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
            setIsTextVisible(true);
        }, 500);
    };

    return (
        <main className='overflow-x-hidden font-montserrat'>
            {/* Slider Section */}
            <div className="relative w-full h-[100vh] overflow-hidden">
                <div
                    className="w-full h-full bg-cover bg-center transition-all duration-500 ease-in-out"
                    style={{
                        backgroundImage: `url(${images[currentIndex]})`,
                    }}
                ></div>
                
                {/* Text Overlay với animation fade up/down */}
                <div 
                    className={`absolute top-[58%] left-64 transform -translate-y-1/2 text-white z-10 transition-all duration-500 ease-in-out
                    ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
                    <h1 className="text-7xl font-light mb-4">Sen Spa</h1>
                    <p className="text-2xl mb-2">Luxurious space, </p>
                    <p className="text-2xl mb-8">blending modernity and classic elegance.</p>
                    <button className="px-8 py-3 bg-[#a040a0] text-white rounded-tl-[1rem] rounded-br-[1rem] hover:bg-[#8a3b8a] transition-colors duration-1000">
                        Khám phá <span className="ml-2">›</span>
                    </button>
                </div>

                {/* Navigation buttons */}
                <div className="absolute top-1/2 w-full flex justify-between transform -translate-y-1/2 z-10 px-24">
                    <button
                        onClick={prevImage}
                        className="bg-[#a040a0] text-white text-lg cursor-pointer hover:bg-[#8a3b8a] border-none rounded-tl-[1rem] rounded-br-[1rem] mx-4 flex items-center justify-center w-10 h-10"
                    >
                        <span>←</span>
                    </button>
                    <button
                        onClick={nextImage}
                        className="bg-[#a040a0] text-white text-lg cursor-pointer hover:bg-[#8a3b8a] border-none rounded-tl-[1rem] rounded-br-[1rem] mx-4 flex items-center justify-center w-10 h-10"
                    >
                        <span>→</span>
                    </button>
                </div>
                <div className="absolute bottom-5 w-full flex justify-center gap-2.5">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2.5 h-2.5 rounded-full border-none cursor-pointer
                            ${index === currentIndex ? 'bg-light' : 'bg-white/50'}`}
                            onClick={() => setCurrentIndex(index)}
                        ></button>
                    ))}
                </div>
            </div>

            {/* About Us Section */}
            <div
                className="absolute right-0 translate-x-1/2 w-1/2 h-full"
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
                        <div className='max-w-lg text-lg text-gray-900'>
                            <p className='' data-aos='fade-down' data-aos-delay='300'>
                                Associated with the beauty of a simple, sincere, and romantic flower, but with a strong will to live, Sen Spa is designed and arranged in a rustic, simple style that embodies the traditional characteristics of Vietnam.
                            </p>
                            <p className='mt-6' data-aos='fade-down' data-aos-delay='200'>
                                Located in the heart of Ho Chi Minh City, Sen Spa is separated from the noisy, bustling atmosphere, offering a peaceful and serene space."
                            </p>
                            <button className="mt-1 px-6 py-2 text-[#a040a0] border-2 border-[#a040a0] rounded-tl-[1rem] rounded-br-[1rem] hover:bg-[#a040a0] hover:text-white transition-colors duration-100" data-aos='fade-down'>
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

            {/* Services Section */}
            <div className="relative w-full h-[70vh] overflow-hidden">
                {serviceSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentServiceIndex ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center w-1/2"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        ></div>

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/40"></div>

                        {/* Background Pattern */}
                        <div
                            className="absolute right-0 top-0 w-1/2 h-full"
                            style={{
                                backgroundImage: `url(https://senspa.com.vn/wp-content/themes/thuythu/images/bg_spa.png)`,
                                backgroundPosition: 'right 80px top',
                                backgroundRepeat: 'no-repeat',
                                zIndex: 1,
                                filter: 'brightness(0) invert(1)',
                                opacity: 0.3
                            }}
                        ></div>

                        {/* Content */}
                        <div className="absolute right-0 top-0 w-1/2 h-full flex flex-col justify-center items-start px-12 bg-[#a040a0] text-white">
                            <h1 className="text-5xl mb-2">{slide.heading}</h1>

                            {/* Decorative image */}
                            <img
                                src={"https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png"}
                                alt="decorative line"
                                className="h-5 mb-4 mt-2 brightness-0 invert"
                            />

                            <p className="text-2xl mb-8">{slide.description}</p>
                            <p className="text-base mb-12">{slide.subtext}</p>

                            {/* Indicators */}
                            <div className="flex justify-center gap-2.5 z-20 mb-8">
                                {serviceSlides.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-2.5 h-2.5 rounded-full border-none cursor-pointer
                                        ${index === currentServiceIndex ? 'bg-pink-400' : 'bg-white/50'}`}
                                        onClick={() => setCurrentServiceIndex(index)}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Our Services Grid Section */}
            <div className="w-full bg-white py-20 relative">
                {/* Background Pattern */}
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(https://senspa.com.vn/wp-content/themes/thuythu/images/bf_service.png)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                    }}
                ></div>
                
                <div className="max-w-7xl mx-auto px-4 relative">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-[#8B3A8B] mb-4">Services</h2>
                        <div className="flex justify-center items-center">
                            <img
                                src="https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png"
                                alt="lotus"
                                className="h-5"
                            />
                        </div>
                        <p className="text-gray-600 mt-4">
                        Experience the refined and relaxing ambiance
                            <br />with premium services at Sen Spa.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {serviceItems.map((item, index) => (
                            <div 
                                key={index}
                                className="relative group overflow-hidden rounded-lg cursor-pointer"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="aspect-w-16 aspect-h-9">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Overlay with content */}
                                    <div className="absolute inset-0 bg-[#a040a0]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-8">
                                        <h3 className="text-2xl font-semibold text-white mb-4">{item.title}</h3>
                                        <img
                                            src="https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png"
                                            alt="decorative"
                                            className="h-5 mb-4 brightness-0 invert"
                                        />
                                        <p className="text-white text-base">{item.description}</p>
                                        <button className="mt-6 px-6 py-2 border-2 border-white text-white rounded-tl-[1rem] rounded-br-[1rem] hover:bg-white hover:text-[#a040a0] transition-colors duration-300">
                                            Xem tất cả <span className="ml-1">›</span>
                                        </button>
                                    </div>
                                    {/* Default gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                                        <div className="absolute bottom-6 left-6 text-white">
                                            <h3 className="text-2xl font-semibold">{item.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div className="w-full bg-[#fff5ff] py-20 relative">
                {/* Background Pattern */}
                <div 
                    className="absolute inset-0 mt-[180px]"
                    style={{
                        backgroundImage: `url(https://senspa.com.vn/wp-content/themes/thuythu/images/bf_service.png)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                    }}
                ></div>
                
                <div className="max-w-7xl mx-auto px-4 relative">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-[#8B3A8B] mb-4">Products</h2>
                        <div className="flex justify-center items-center">
                            <img
                                src="https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png"
                                alt="lotus"
                                className="h-5"
                            />
                        </div>
                        <p className="text-gray-600 mt-4">
                        Enjoy the refined and tranquil space at the luxury serviced apartment.
                            <br />at Sen Spa
                        </p>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-3 gap-8">
                        <div className="group cursor-pointer">
                            <div className="relative overflow-hidden">
                                <img
                                    src="https://senspa.com.vn/wp-content/uploads/2021/01/can-ho-dich-vu-dai-dien.jpg"
                                    alt="Daily rental"
                                    className="w-full h-[300px] object-cover"
                                />
                                <div className="absolute bottom-0 w-full bg-[#8B3A8B] text-white py-2 px-6">
                                    <h3 className="text-xl text-center">Serviced apartment for daily rental.</h3>
                                </div>
                            </div>
                        </div>

                        <div className="group cursor-pointer -mt-6">
                            <div className="relative overflow-hidden">
                                <img
                                    src="https://senspa.com.vn/wp-content/uploads/2021/01/can-ho-dich-vu-dai-dien-2.jpg"
                                    alt="Monthly rental"
                                    className="w-full h-[350px] object-cover"
                                />
                                <div className="absolute bottom-0 w-full bg-[#8B3A8B] text-white py-2 px-6">
                                    <h3 className="text-xl text-center">Serviced apartment for monthly rental.</h3>
                                </div>
                            </div>
                        </div>

                        <div className="group cursor-pointer">
                            <div className="relative overflow-hidden">
                                <img
                                    src="https://senspa.com.vn/wp-content/uploads/2021/01/can-ho-dich-vu-dai-dien-1.jpg"
                                    alt="6-month rental"
                                    className="w-full h-[300px] object-cover"
                                />
                                <div className="absolute bottom-0 w-full bg-[#8B3A8B] text-white py-2 px-6">
                                    <h3 className="text-xl text-center">Serviced apartment for rent over 6 months.</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* News Section */}
            <div className="w-full bg-white py-20 relative">
                {/* Background Pattern */}
                <div 
                    className="absolute inset-0 mt-[180px]"
                    style={{
                        backgroundImage: `url(https://senspa.com.vn/wp-content/themes/thuythu/images/bf_service.png)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                    }}
                ></div>

                <div className="max-w-7xl mx-auto px-4 relative">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-[#8B3A8B] mb-4">News</h2>
                        <div className="flex justify-center items-center">
                            <img
                                src="https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png"
                                alt="lotus"
                                className="h-5"
                            />
                        </div>
                    </div>

                    {/* News Grid */}
                    <div className="grid grid-cols-3 gap-8">
                        {/* News Item 1 */}
                        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                            <div className="overflow-hidden">
                                <img
                                    src="https://senspa.com.vn/wp-content/uploads/2020/11/620552810-H-1024x700-1.jpg"
                                    alt="Skin care"
                                    className="w-full h-[250px] object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <p className="text-gray-500 text-sm mb-2">17.11.2020</p>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Facial care for smooth and radiant skin.
                                </h3>
                                <a 
                                    href="/news/detail/:id" 
                                    className="text-[#8B3A8B] hover:text-[#a040a0] transition-colors duration-300"
                                >
                                    Details
                                </a>
                            </div>
                        </div>

                        {/* News Item 2 */}
                        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                            <div className="overflow-hidden">
                                <img
                                    src="https://senspa.com.vn/wp-content/uploads/2020/11/shutterstock_458768797.jpg"
                                    alt="Himalaya salt"
                                    className="w-full h-[250px] object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <p className="text-gray-500 text-sm mb-2">17.11.2020</p>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                The unexpected benefits of Himalayan pink salt.
                                </h3>
                                <a 
                                    href="/news/detail/:id" 
                                    className="text-[#8B3A8B] hover:text-[#a040a0] transition-colors duration-300"
                                >
                                    Details
                                </a>
                            </div>
                        </div>

                        {/* News Item 3 */}
                        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                            <div className="overflow-hidden">
                                <img
                                    src="https://senspa.com.vn/wp-content/uploads/2020/11/DSC5072.jpg"
                                    alt="Foot massage"
                                    className="w-full h-[250px] object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <p className="text-gray-500 text-sm mb-2">17.11.2020</p>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                The benefits of foot massage you should know.
                                </h3>
                                <a 
                                    href="/news/detail/:id" 
                                    className="text-[#8B3A8B] hover:text-[#a040a0] transition-colors duration-300"
                                >
                                    Details
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
};

export default Home;
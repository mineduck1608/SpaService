import React, { useState, useEffect } from "react";
import Carousel1 from '../../images/carousel/Carousel1.png';
import Carousel2 from '../../images/carousel/Carousel2.png';
import Carousel3 from '../../images/carousel/Carouse3.png';
import AOS from 'aos';

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


const Services = () => {
    const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

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

    return (
        <section className='services-section'>
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
                                        ${index === currentServiceIndex ? 'bg-light' : 'bg-white/50'}`}
                                        onClick={() => setCurrentServiceIndex(index)}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Services;

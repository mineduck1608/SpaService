import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import IntroHeader from '../../components/introductionHeader'
import ArrowButton from '../../components/ui/arrowButton'
// import { motion, AnimatePresence } from 'framer-motion'

const Facilities = () => {
    const facilities = [
        {    
            id: 2,
            title: "1st floor",
            description: "Exclusive area for Foot massages",
            image: "https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-1-1.jpg",
            additionalImages: [ "https://senspa.com.vn/wp-content/uploads/2021/01/foot-1.jpg",
                                "https://senspa.com.vn/wp-content/uploads/2021/01/foot-2.jpg",
                                "https://senspa.com.vn/wp-content/uploads/2021/01/foot-3.jpg",
                                "https://senspa.com.vn/wp-content/uploads/2021/01/foot-4.jpg"
            ]
        },
        {
            id: 3,
            title: "2nd floor",
            description: "Spa area (steam bath, sauna, soaking in spa pools) and facial for female customers",
            image: "https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-2.jpg",
            additionalImages: [ "https://senspa.com.vn/wp-content/uploads/2021/01/xonghoinuoc.jpg",
                                "https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-2-2.jpg",
                                "https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-2-1.jpg",
                                "https://senspa.com.vn/wp-content/uploads/2021/01/xonghoikhoc.jpg"
            ]
        },
        {
            id: 4,
            title: "3rd floor",
            description: "Massage area for female customers",
            image: "https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-3.jpg",
            additionalImages: [ "https://senspa.com.vn/wp-content/uploads/2021/01/MS-2.jpg",
                                "https://senspa.com.vn/wp-content/uploads/2021/01/MS-3.jpg",
                                "https://senspa.com.vn/wp-content/uploads/2021/01/MS-4.jpg",
                                "https://senspa.com.vn/wp-content/uploads/2021/01/MS-5.jpg"
            ]
        },
        {
            id: 5,
            title: "4th floor",
            description: "Spa area (steam bath, sauna, soaking in spa pools) and facial for male customers",
            image: "https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-4.jpg",
            additionalImages: [ "https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-4-3.jpg",
                                "https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-4-1.jpg",
                                "https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-4-2.jpg",

            ]
        },
        {
            id: 6,
            title: "5th floor",
            description: "Massage area for male customers",
            image: "https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-5.jpg",
            additionalImages: [ "https://senspa.com.vn/wp-content/uploads/2021/01/nam-1.jpg",
                                "https://senspa.com.vn/wp-content/uploads/2021/01/nam-2.jpg",
                                "https://senspa.com.vn/wp-content/uploads/2021/01/nam-3.jpg"
            ]
        },
        {
            id: 7,
            title: "6th floor",
            description: "VIP rooms provide an intimate and private spaces for couples",
            image: "https://senspa.com.vn/wp-content/uploads/2021/01/co-so-vat-chat-tang-6.jpg",
            additionalImages: [ "https://senspa.com.vn/wp-content/uploads/2021/01/couple-1.jpg",
                                "https://senspa.com.vn/wp-content/uploads/2021/01/couple-2.jpg",
                                "https://senspa.com.vn/wp-content/uploads/2021/01/couple-3.jpg"
            ]
        },
        {
            id: 8,
            title: "7th floor",
            description: "Serviced apartment for long-term stay guests with easy access to all the convenient places in central HCMC",
            image: "https://senspa.com.vn/wp-content/uploads/2020/11/DSC01715_1.jpg",
            additionalImages: [ "https://senspa.com.vn/wp-content/uploads/2020/10/DSC01689.jpg",
                                "https://senspa.com.vn/wp-content/uploads/2020/10/sec2.png",
                                "https://senspa.com.vn/wp-content/uploads/2020/10/sec4.png"
            ]
        }
    ]
    const [selectedFacility, setSelectedFacility] = useState<{
        id: number,
        title: string,
        description: string,
        image: string,
        additionalImages: string[],
    } | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isChanging, setIsChanging] = useState(false);
    const handleImageChange = (index: number) => {
        setIsChanging(true);
        setTimeout(() => {
            setCurrentImageIndex(index)
            setIsChanging(false)
        }, 800)
    }

    return (
        <div className='mx-auto w-full'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                <div className='relative bg-purple1 flex items-center justify-center' data-aos='zoom-in' data-aos-delay='1000' data-aos-offset='-500'>
                    <div className='absolute inset-0 bg-custom-bg1 bg-white bg-no-repeat bg-right-top opacity-0'></div>
                    <div className='text-left p-5 text-white'>
                        <IntroHeader title={"Facilities"} position='left' size='big'/>
                        <p className='ml-1 px-1' data-aos='fade-down' data-aos-delay='100'>Seven separate floors bring an ultimate sense of complete privacy and comfort.</p>
                    </div>
                </div>
                {facilities.map((facility) => (
                <div key={facility.id} onClick={() => setSelectedFacility(facility)}
                    className='relative cursor-pointer group' data-aos='zoom-in' data-aos-delay='1000' data-aos-offset='-500'>
                    <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300'/>
                    <img src={facility.image} alt='' className='w-full h-full object-cover'/>
                    <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <div className='text-center text-white p-4'>
                            <h3 className='text-xl font-bold mb-2'>{facility.title}</h3>
                            <p className='text-sm'>{facility.description}</p>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            {selectedFacility && (
                <div className='fixed inset-0 bg-black bg-opacity-65 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-lg max-w-2xl w-full mx-4'>
                        <div className='p-4 border-b flex items-end justify-end'>
                            <button onClick={() => setSelectedFacility(null)} className='hover:bg-gray-100 rounded-full'>
                                <X className='w-6 h-6'/>
                            </button>
                        </div>
                        <div className='relative p-4'>
                            <div className='w-full h-80 relative'>
                                <img 
                                    src={selectedFacility.additionalImages[currentImageIndex]} 
                                    alt='' 
                                    className={`w-full h-full object-cover rounded transition-opacity ${isChanging ? 'opacity-0' : 'opacity-100'}`}
                                />
                            </div>
                            <div className='relative mt-4'>
                                <div className='absolute left-0 top-1/2 -translate-y-1/2 z-10'>
                                    <ArrowButton direction="right" 
                                        onClick={() => handleImageChange(currentImageIndex === 0 ? selectedFacility.additionalImages.length - 1 : currentImageIndex - 1)}
                                    />
                                </div>
                                <div className='flex gap-2 justify-center px-16'>
                                    {selectedFacility.additionalImages.map((image, index) => (
                                        <button key={index} onClick={() => setCurrentImageIndex(index)} className='w-16 h-16 flex-shrink-0'>
                                            <img src={image} alt=''
                                                className={`w-72 h-full object-cover rounded ${
                                                currentImageIndex === index ? 'ring-2 ring-purple-600' : 'opacity-50 hover:opacity-80'}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <div className='absolute right-0 top-1/2 -translate-y-1/2 z-10'>
                                    <ArrowButton direction="left" 
                                        onClick={() => handleImageChange(currentImageIndex === selectedFacility.additionalImages.length - 1 ? 0 : currentImageIndex + 1)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Facilities
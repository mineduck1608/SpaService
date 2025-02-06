import React from 'react'
import { FaSpa } from 'react-icons/fa6'

interface HeaderProps {
    title: string;
    position: string;
}

const IntroHeader : React.FC<HeaderProps> = ({ title, position }) => {
    const isFacilities = title === "Facilities";
    const isLeft = position === "left";

    return (
        <div 
            className={`${isFacilities ? 'text-left max-w-2xl mx-auto py-3 px-2' : 
            isLeft ? 'text-left py-6' : 'text-center max-w-2xl mx-auto py-6'}`} 
            data-aos='fade-down' data-aos-delay='1000'
        >
            <h1 className={`text-5xl ${isFacilities ? 'text-white' : 'text-purple1'}`}>{title}</h1>
            {isFacilities ? (
                <div className='flex items-center justify-start space-x-2 ml-3'>
                    <div className='h-px w-10 bg-white'></div>
                    <FaSpa className='h-6 w-6'/>
                    <div className='h-px w-10 bg-white'></div>
                </div>
            ) : (
                <div className={`flex items-center ${isLeft ? 'justify-start ml-2' : 'justify-center'} space-x-4 mt-2`}>
                    <img 
                        src='https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png'
                        alt=''
                        className='h-6 w-auto'
                    />
                </div>
            )}
        </div>
    )
}

export default IntroHeader

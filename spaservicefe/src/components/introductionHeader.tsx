import React from 'react'
import { FaSpa } from 'react-icons/fa6'

interface HeaderProps {
    title: string;
}

const IntroHeader : React.FC<HeaderProps> = ({ title }) => {
    const isFacilities = title === "Facilities";

    return (
        <div className={`text-6xl font-serif mb-3 ${isFacilities ? 'text-left max-w-2xl mx-auto py-3 px-2' : 'text-center max-w-2xl mx-auto py-6'}`}
            data-aos='fade-down' data-aos-delay='200'
        >
            <h1 className={`${isFacilities ? 'text-white' : 'text-pink-700'}`}>{title}</h1>
            {isFacilities ? (
                // <div className='flex items-center justify-center space-x-4 mt-2'>
                //     <img 
                //         src='https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png'
                //         alt=''
                //         className='h-6 w-auto'
                //     />
                // </div>
                <div className='flex items-center justify-start space-x-2 ml-3'>
                    <div className='h-px w-10 bg-white'></div>
                    <FaSpa className='h-6 w-6'/>
                    <div className='h-px w-10 bg-white'></div>
                </div>
            ):(
                <div className='flex items-center justify-center space-x-4 mt-2'>
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

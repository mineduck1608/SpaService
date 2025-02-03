import React from 'react'
import { FaSpa } from 'react-icons/fa6'

interface HeaderProps {
    title: string;
}

const IntroHeader : React.FC<HeaderProps> = ({ title }) => {
    const isFacilities = title === "Facilities";

    return (
        <div className={`text-5xl font-serif mb-3 ${isFacilities ? 'text-left max-w-2xl mx-auto py-3 px-2' : 'text-center max-w-2xl mx-auto py-6'}`}>
            <h1 className={`${isFacilities ? 'text-white' : 'text-pink-700'}`}>{title}</h1>
            <div className={`${isFacilities ? 'flex items-center justify-start space-x-2 ml-3' : 'flex items-center justify-center space-x-2'}`}>
                <div className={`${isFacilities ? 'h-px w-10 bg-white' : 'h-px w-10 bg-purple-600'}`}></div>
                <FaSpa className={`${isFacilities ? 'h-6 w-6' : 'text-purple-600 h-6 w-6'}`}/>
                <div className={`${isFacilities ? 'h-px w-10 bg-white' : 'h-px w-10 bg-purple-600'}`}></div>
            </div>
        </div>
    )
}

export default IntroHeader

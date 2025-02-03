import React, { useState } from 'react'
import { CiPlay1 } from 'react-icons/ci'
import { X } from 'lucide-react'

export default function EmbedVideo() {
    const [isPlayed, setIsPlayed] = useState(false);
    const showVideo = () => {
        setIsPlayed(true);
    }
    const hideVideo = () => {
        setIsPlayed(false);
    }

    return (
        <div className='relative overflow-hidden mt-32'>
            <div className='group'>
                <img
                    src='https://senspa.com.vn/wp-content/uploads/2021/01/banner8.jpg'
                    alt=''
                    className='w-full h-full object-cover transition-transform duration-1000 group-hover:scale-150 ease-in-out'
                />
                <button
                    onClick={showVideo}
                    className='absolute bg-transparent text-white rounded-full w-[10vw] h-[20vh] border border-spacing-5 
                                duration-300 bg-black bg-opacity-30 group-hover:bg-opacity-40
                                flex items-center justify-center'
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}>
                    <CiPlay1 className='text-[4vw]'/>
                </button>
            </div>
            {!isPlayed ? (
                <div></div>
            ) : (
                <div className='fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50'>
                    <div className='relative max-w-7xl w-full aspect-video'>
                        <button onClick={hideVideo} className='absolute top-2 -right-10 text-white text-3xl font-bold'>
                            <X />
                        </button>
                        <iframe
                            className='w-full h-full bg-transparent'
                            src='https://www.youtube.com/embed/U0kpKmENnLA?autoplay=1'
                            title='Spa Video'
                            frameBorder='0'
                            allow='autoplay'
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

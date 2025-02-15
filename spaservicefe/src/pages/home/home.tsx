import React, { useState, useEffect } from "react";
import Main1 from "../../images/home/Main1.png";
import Main2 from '../../images/home/Main2.png';
import Main3 from '../../images/home/Main3.png';

const images = [Main1, Main2, Main3]

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTextVisible, setIsTextVisible] = useState(true);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Thêm useEffect để preload hình ảnh
    useEffect(() => {
        images.forEach((imageUrl) => {
            const img = new Image();
            img.src = imageUrl;
        });
    }, []);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        
        if (isAutoPlaying) {
            intervalId = setInterval(() => {
                setIsTextVisible(false);
                setTimeout(() => {
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                    setIsTextVisible(true);
                }, 500);
            }, 3000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isAutoPlaying]);

    const nextImage = () => {
        setIsAutoPlaying(false);
        setIsTextVisible(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setIsTextVisible(true);
        }, 500);
    };

    const prevImage = () => {
        setIsAutoPlaying(false);
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
                        Explore <span className="ml-2">›</span>
                    </button>
                </div>

                {/* Navigation buttons */}
                <div className="absolute top-1/2 w-full flex justify-between transform -translate-y-1/2 z-10 px-24">
                    <button
                        onClick={prevImage}
                        className="bg-[#a040a0] text-white text-lg cursor-pointer hover:bg-[#8a3b8a] transition-colors duration-700 border-none rounded-tl-[1rem] rounded-br-[1rem] mx-4 flex items-center justify-center w-10 h-10"
                    >
                        <span>←</span>
                    </button>
                    <button
                        onClick={nextImage}
                        className="bg-[#a040a0] text-white text-lg cursor-pointer hover:bg-[#8a3b8a] transition-colors duration-700 border-none rounded-tl-[1rem] rounded-br-[1rem] mx-4 flex items-center justify-center w-10 h-10"
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
        </main>
    );
};

export default Home

import React, { useState, useEffect } from "react";
import "./Main.css";

const slides = [
    {
        image: "./Carousel/Carousel1.jpg",
        heading: "Why choose us",
        description:
            "Being recognized as one of the first pioneers that brought true Spa services into Vietnam",
        subtext:
            "Sen Spa with its sophisticated minimalist design takes customers to a serene dimesion to provide the most comfortable and relaxing experience."
    },
    {
        image: "./Carousel/Carousel2.jpg",
        heading: "Relax & Rejuvenate",
        description:
            "Experience the best spa treatments tailored to your needds.",
        subtext:
            "Indulge in luxury and rejuvenate your body and mind.",
    },
    {
        image: "./Carousel/Carousel3.jpg",
        heading: "Experience Serenity",
        description:
            "Find your inner peace with our tranquil spa environment.",
        subtext:
            "Escape the chaos and immerse yourself in serenity.",
    },
];

const Main = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="main">
            <div className="main-slide">
                <div className="main-content-container">
                    <div className="main-image" style={{ backgroundImage: `url(${slides[currentIndex].image})` }}></div>
                    <div className="main-content">
                        <h1>{slides[currentIndex].heading}</h1>
                        <p className="description">{slides[currentIndex].description}</p>
                        <p className="subtext">{slides[currentIndex].subtext}</p>
                    </div>
                </div>
            </div>
            <div className="main-indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentIndex ? "active" : ""}`}
                        onClick={() => setCurrentIndex(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Main;
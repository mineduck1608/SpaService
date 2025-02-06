import React, { useState } from 'react'
import IntroHeader from '../../components/introductionHeader'

const History = () => {
    const timeline = [
        {
            year: 2004,
            image: 'https://geheimtipphamburg.de/content/uploads/2022/06/geheimtipp-hamburg-sport-erholung-glinde-vabali-spa-lilli-sprung-33.jpg',
            description: 'Established SenSpa at Block E2a-7, D1 Street Saigon Hi-tech Park, District 9 as a 9-floor building of full spa services'
        },
        {
            year: 2006,
            image: 'https://media.architecturaldigest.com/photos/568c51bbb313ecbd18115fca/master/pass/high-design-hotel-spas-05.jpg',
            description: 'Expanded our services to include luxury treatments'
        },
        {
            year: 2014,
            image: 'https://www.rawcorporatehealth.com/wp-content/uploads/2015/12/Joule-Dallas.jpg',
            description: 'Introduced new wellness programs'
        },
        {
            year: 2015,
            image: 'https://capturetheatlas.com/wp-content/uploads/2021/05/espa-spa-best-hotel-spa-in-las-vegas.jpg',
            description: 'Renovated facilities with modern amenities'
        },
        {
            year: 2019,
            image: 'https://i2-prod.mirror.co.uk/incoming/article11790939.ece/ALTERNATES/s1227b/Aqua-Domes-hotel-spa.jpg',
            description: 'Achieved luxury spa status certification'
        }
    ]
    const [selectedYear, setSelectedYear] = useState(2004);
    const [isChanging, setIsChanging] = useState(false);
    const getCurrentYear = () => {
        return timeline.find(i => i.year === selectedYear);
    }
    const handleYearChange = (year: number) => {
        setIsChanging(true);
        setTimeout(() => {
            setSelectedYear(year);
            setIsChanging(false);
        }, 600)
    }
    
    return (
        <div className='relative min-w-full mb-10'>
            <IntroHeader title='History' position='middle'/>
            <div className='absolute inset-0 w-full h-full bg-custom-bg2 bg-repeat-x bg-bottom -z-10'/>
            <div className='relative mb-10 mt-10 max-w-3xl mx-auto' data-aos='fade-right' data-aos-delay='600'>
                <div className='absolute top-14 left-0 right-0 h-px bg-purple1'/>
                <div className='relative flex flex-col md:flex-row justify-between items-center max-w-3xl mx-auto'>
                    {timeline.map((i) => (
                        <div key={i.year} className='text-center -mt-1 px-8'>
                            <button 
                                onClick={() => handleYearChange(i.year)}
                                className={`relative mb-2 px-6 py-2 rounded-full rounded-tr-3xl rounded-bl-3xl text-lg font-semibold transition-all duration-300 hover:-translate-y-3 ${
                                    selectedYear == i.year ? 'bg-purple1 text-white': 'bg-white text-purple1 border border-purple1'}`}>
                                {i.year}
                            </button>
                            <div className={`w-4 h-4 rounded-full mx-auto border-2 transition-all duration-300 border-purple1 ${
                                selectedYear == i.year? 'bg-purple1': 'bg-white'}`}>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='max-w-5xl mx-auto mt-11 px-2' data-aos='zoom-in' data-aos-delay='800'>
                <div className='flex flex-col md:flex-row gap-8 items-center transition-all duration-300
                             bg-white rounded-3xl bg-custom-bg4 bg-no-repeat z-10 bg-right-bottom
                             shadow-pink-200 shadow-lg p-6'>
                    <div className={`w-full transition-opacity ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
                        <img src={getCurrentYear()?.image} className='w-full h-96 object-cover rounded-lg shadow-md'/>
                    </div>
                    <div className={`w-full md:w-1/2 space-y-4 pb-20 transition-opacity duration-300 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
                        <h2 className='text-6xl font-bold text-purple1'>
                            {selectedYear}
                        </h2>
                        <p className='text-gray-900 text-lg'>
                            {getCurrentYear()?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History
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
    ];

    const [selectedYear, setSelectedYear] = useState(2004);

    const getCurrentData = () => {
        return timeline.find(i => i.year == selectedYear);
    };

    return (
        <div className='container mx-auto px-4 py-16 bg-custom-bg2 bg-no-repeat bg-bottom'>
            <IntroHeader title={"History"}/>
            <div className='relative mb-10 mt-10'>
                <div className='absolute top-14 left-0 right-0 h-px bg-purple-200'></div>
                    <div className='relative flex flex-col md:flex-row justify-between items-center max-w-[50vw] mx-auto'>
                        {timeline.map((i) => (
                            <div key={i.year} className='text-center'>
                                <button
                                    onClick={() => setSelectedYear(i.year)}
                                    className={`relative mb-2 px-6 py-2 rounded-full rounded-tr-3xl rounded-bl-3xl text-lg font-semibold transition-all duration-300 hover:-translate-y-3 ${
                                        selectedYear == i.year
                                            ? 'bg-pink-600 text-white'
                                            : 'bg-white text-pink-600 border border-pink-600'
                                    }`}
                                >
                                    {i.year}
                                </button>
                                <div className={`w-4 h-4 rounded-full mx-auto border-4 transition-all duration-300 ${
                                    selectedYear == i.year
                                        ? 'bg-purple-400 border-pink-600 '
                                        : 'bg-white border-pink-600'
                                }`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            <div className='max-w-5xl mx-auto'>
                <div className='flex flex-col md:flex-row gap-8 items-center p-8  transition-all duration-300
                                bg-white rounded-2xl overflow-hidden bg-custom-bg1 bg-no-repeat bg-right-bottom shadow-pink-200 shadow-md'>
                    <div className='w-full'>
                        <img
                            src={getCurrentData()?.image}
                            alt=''
                            className='w-full h-96 object-cover rounded-lg shadow-md'
                        />
                    </div>
                    <div className='w-full md:w-1/2 space-y-4'>
                        <h2 className='text-6xl font-bold text-pink-700'>
                            {selectedYear}
                        </h2>
                        <p className='text-gray-600 text-lg max-w-[10vw]'>
                            {getCurrentData()?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History
import React, { useState } from 'react'
import IntroHeader from '../../components/introductionHeader'

const History = () => {
  const timeline = [
    {
      year: 2004,
      image:
        'https://geheimtipphamburg.de/content/uploads/2022/06/geheimtipp-hamburg-sport-erholung-glinde-vabali-spa-lilli-sprung-33.jpg',
      description:
        'Established SenSpa at Block E2a-7, D1 Street Saigon Hi-tech Park, District 9 as a 9-floor building of full spa services'
    },
    {
      year: 2006,
      image:
        'https://media.architecturaldigest.com/photos/568c51bbb313ecbd18115fca/master/pass/high-design-hotel-spas-05.jpg',
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
  const [selectedYear, setSelectedYear] = useState(2004)
  const [isChanging, setIsChanging] = useState(false)
  const getCurrentYear = () => {
    return timeline.find((i) => i.year === selectedYear)
  }
  const handleYearChange = (year: number) => {
    setIsChanging(true)
    setTimeout(() => {
      setSelectedYear(year)
      setIsChanging(false)
    }, 600)
  }

  return (
    <div className='relative mb-10 min-w-full'>
      <IntroHeader title='History' position='middle' />
      <div className='absolute inset-0 -z-10 h-full w-full bg-custom-bg2 bg-bottom bg-repeat-x' />
      <div className='relative mx-auto mb-10 mt-10 max-w-3xl' data-aos='fade-right' data-aos-delay='600'>
        <div className='absolute left-0 right-0 top-14 h-px bg-purple1' />
        <div className='relative mx-auto flex max-w-3xl flex-col items-center justify-between md:flex-row'>
          {timeline.map((i) => (
            <div key={i.year} className='-mt-1 px-8 text-center'>
              <button
                onClick={() => handleYearChange(i.year)}
                className={`relative mb-2 rounded-full rounded-bl-3xl rounded-tr-3xl px-6 py-2 text-lg font-semibold transition-all duration-300 hover:-translate-y-3 ${
                  selectedYear == i.year ? 'bg-purple1 text-white' : 'border border-purple1 bg-white text-purple1'
                }`}
              >
                {i.year}
              </button>
              <div
                className={`mx-auto h-4 w-4 rounded-full border-2 border-purple1 transition-all duration-300 ${
                  selectedYear == i.year ? 'bg-purple1' : 'bg-white'
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className='mx-auto mt-11 max-w-5xl px-2' data-aos='zoom-in' data-aos-delay='800'>
        <div
          className='z-10 flex flex-col items-center gap-8 rounded-3xl bg-white
                             bg-custom-bg4 bg-right-bottom bg-no-repeat p-6 shadow-lg shadow-pink-200
                             transition-all duration-300 md:flex-row'
        >
          <div className={`w-full transition-opacity ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
            <img src={getCurrentYear()?.image} className='h-96 w-full rounded-lg object-cover shadow-md' />
          </div>
          <div
            className={`w-full space-y-4 pb-20 transition-opacity duration-300 md:w-1/2 ${isChanging ? 'opacity-0' : 'opacity-100'}`}
          >
            <h2 className='text-6xl font-bold text-purple1'>{selectedYear}</h2>
            <p className='text-lg text-gray-900'>{getCurrentYear()?.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default History

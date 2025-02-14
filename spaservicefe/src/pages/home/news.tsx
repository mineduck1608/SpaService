import React from 'react'

const News = () => {
  return (
    <section className='news'>
      <div className='relative w-full bg-white py-20'>
        {/* Background Pattern */}
        <div
          className='absolute inset-0 mt-[180px]'
          style={{
            backgroundImage: `url(https://senspa.com.vn/wp-content/themes/thuythu/images/bf_service.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
          }}
        ></div>

        <div className='relative mx-auto max-w-7xl px-4'>
          {/* Section Header */}
          <div className='mb-16 text-center'>
            <h2 className='mb-4 text-5xl font-bold text-[#8B3A8B]' data-aos='fade-down' data-aos-delay='300'>
              News
            </h2>
            <div className='flex items-center justify-center'>
              <img
                src='https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png'
                alt='lotus'
                className='h-5'
                data-aos='fade-down'
                data-aos-delay='300'
              />
            </div>
          </div>

          {/* News Grid */}
          <div className='grid grid-cols-3 gap-8' data-aos='fade-up' data-aos-delay='300'>
            {/* News Item 1 */}

            <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
              <a href='/news/detail/:id'>
                <div className='overflow-hidden'>
                  <img
                    src='https://senspa.com.vn/wp-content/uploads/2020/11/620552810-H-1024x700-1.jpg'
                    alt='Skin care'
                    className='h-[250px] w-full object-cover transition-transform duration-500 hover:scale-110'
                  />
                </div>
              </a>
              <div className='p-6'>
                <p className='mb-2 text-sm text-gray-500'>17.11.2020</p>
                <h3 className='mb-4 text-xl font-semibold text-gray-800'>Facial care for smooth and radiant skin.</h3>
                <a
                  href='/news/detail/:id'
                  className='text-[#8B3A8B] transition-colors duration-300 hover:text-[#a040a0]'
                >
                  Details
                </a>
              </div>
            </div>

            {/* News Item 2 */}
            <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
              <a href='/news/detail/:id'>
                <div className='overflow-hidden'>
                  <img
                    src='https://senspa.com.vn/wp-content/uploads/2020/11/shutterstock_458768797.jpg'
                    alt='Himalaya salt'
                    className='h-[250px] w-full object-cover transition-transform duration-500 hover:scale-110'
                  />
                </div>
              </a>
              <div className='p-6'>
                <p className='mb-2 text-sm text-gray-500'>17.11.2020</p>
                <h3 className='mb-4 text-xl font-semibold text-gray-800'>
                  The unexpected benefits of Himalayan pink salt.
                </h3>
                <a
                  href='/news/detail/:id'
                  className='text-[#8B3A8B] transition-colors duration-300 hover:text-[#a040a0]'
                >
                  Details
                </a>
              </div>
            </div>

            {/* News Item 3 */}
            <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
              <a href='/news/detail/:id'>
                <div className='overflow-hidden'>
                  <img
                    src='https://senspa.com.vn/wp-content/uploads/2020/11/DSC5072.jpg'
                    alt='Foot massage'
                    className='h-[250px] w-full object-cover transition-transform duration-500 hover:scale-110'
                  />
                </div>
              </a>
              <div className='p-6'>
                <p className='mb-2 text-sm text-gray-500'>17.11.2020</p>
                <h3 className='mb-4 text-xl font-semibold text-gray-800'>
                  The benefits of foot massage you should know.
                </h3>
                <a
                  href='/news/detail/:id'
                  className='text-[#8B3A8B] transition-colors duration-300 hover:text-[#a040a0]'
                >
                  Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default News

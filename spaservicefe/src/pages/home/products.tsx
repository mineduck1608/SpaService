import React from 'react'

const Products = () => {
  return (
    <section className='products'>
      {/* Products Section */}
      <div className='relative w-full bg-[#fff5ff] py-20'>
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
              Products
            </h2>
            <div className='flex items-center justify-center' data-aos='fade-down' data-aos-delay='300'>
              <img
                src='https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png'
                alt='lotus'
                className='h-5'
              />
            </div>
            <p className='mt-4 text-gray-600' data-aos='fade-down' data-aos-delay='300'>
              Enjoy the refined and tranquil space at the luxury serviced apartment.
              <br />
              at Sen Spa
            </p>
          </div>

          {/* Products Grid */}
          <div className='grid grid-cols-3 gap-8' data-aos='fade-up' data-aos-delay='300'>
            <div className='group cursor-pointer'>
              <div className='relative overflow-hidden'>
                <img
                  src='https://senspa.com.vn/wp-content/uploads/2021/01/can-ho-dich-vu-dai-dien.jpg'
                  alt='Daily rental'
                  className='h-[300px] w-full object-cover'
                />
                <div className='absolute bottom-0 w-full bg-[#8B3A8B] px-6 py-2 text-white'>
                  <h3 className='text-center text-xl'>Serviced apartment for daily rental.</h3>
                </div>
              </div>
            </div>

            <div className='group -mt-6 cursor-pointer'>
              <div className='relative overflow-hidden'>
                <img
                  src='https://senspa.com.vn/wp-content/uploads/2021/01/can-ho-dich-vu-dai-dien-2.jpg'
                  alt='Monthly rental'
                  className='h-[350px] w-full object-cover'
                />
                <div className='absolute bottom-0 w-full bg-[#8B3A8B] px-6 py-2 text-white'>
                  <h3 className='text-center text-xl'>Serviced apartment for monthly rental.</h3>
                </div>
              </div>
            </div>

            <div className='group cursor-pointer'>
              <div className='relative overflow-hidden'>
                <img
                  src='https://senspa.com.vn/wp-content/uploads/2021/01/can-ho-dich-vu-dai-dien-1.jpg'
                  alt='6-month rental'
                  className='h-[300px] w-full object-cover'
                />
                <div className='absolute bottom-0 w-full bg-[#8B3A8B] px-6 py-2 text-white'>
                  <h3 className='text-center text-xl'>Serviced apartment for rent over 6 months.</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products

import React from 'react'

const serviceItems = [
    {
        title: 'ALL INCLUSIVE SERVICE',
        image: 'https://senspa.com.vn/wp-content/uploads/2020/10/VIP_room_3.7.jpg',
        description:
            'Providing natural mineral resources, natural hot springs, or seawater within the premises, which are used in hydrotherapy treatments. This is considered the original method that gave birth to early spa practices.'
    },
    {
        title: 'VIP SERVICE',
        image: 'https://senspa.com.vn/wp-content/uploads/2021/01/couple-1.png',
        description: 'Premium service for exclusive guests, ensuring an exceptional and private experience.'
    },
    {
        title: 'FULL BODY CARE',
        image: 'https://senspa.com.vn/wp-content/uploads/2021/01/Massage-da-4.jpg',
        description: 'A full-body care service designed to provide comfort and harmony with nature.'
    },
    {
        title: 'FACIAL CARE',
        image: 'https://senspa.com.vn/wp-content/uploads/2020/10/DSC5827.jpg',
        description: 'A facial care service designed to keep the skin healthy and youthful.'
    }
]

const OurServices = () => {
    return (
    <section className='ourServices'>
        <div className='relative w-full bg-white py-20'>
            <div
                className='absolute inset-0'
                style={{
                    backgroundImage: `url(https://senspa.com.vn/wp-content/themes/thuythu/images/bf_service.png)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center'
                }}
            ></div>

            <div className='relative mx-auto max-w-7xl px-4'>
                <div className='mb-16 text-center'>
                    <h2 className='mb-4 text-5xl font-bold text-[#8B3A8B]' data-aos='fade-down' data-aos-delay='300'>Services</h2>
                    <div className='flex items-center justify-center'>
                        <img
                            src='https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png'
                            alt='lotus'
                            className='h-5'
                            data-aos='fade-down' data-aos-delay='300'
                        />
                    </div>
                    <p className='mt-4 text-gray-600' data-aos='fade-down' data-aos-delay='300'>
                        Experience the refined and relaxing ambiance
                        <br />
                        with premium services at Sen Spa.
                    </p>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    {serviceItems.map((item, index) => (
                        <div
                            key={index}
                            className='group relative cursor-pointer overflow-hidden rounded-lg'
                            data-aos='fade-up'
                            data-aos-delay={index * 100}
                        >
                            <div className='aspect-w-16 aspect-h-9'>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className='h-[350px] w-full object-cover transition-transform duration-500 group-hover:scale-110'
                                />
                                
                                <div className='absolute inset-0 flex flex-col items-center justify-center bg-[#a040a0]/90 p-8 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                                    <h3 className='mb-4 text-2xl font-semibold text-white'>{item.title}</h3>
                                    <img
                                        src='https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png'
                                        alt='decorative'
                                        className='mb-4 h-5 brightness-0 invert'
                                    />
                                    <p className='text-base text-white'>{item.description}</p>
                                    <button className='mt-6 rounded-br-[1rem] rounded-tl-[1rem] border-2 border-white px-6 py-2 text-white transition-colors duration-300 hover:bg-white hover:text-[#a040a0]'>
                                        View all <span className='ml-1'>›</span>
                                    </button>
                                </div>
                                
                                <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 group-hover:opacity-0'>
                                    <div className='absolute bottom-6 left-6 text-white'>
                                        <h3 className='text-2xl font-semibold'>{item.title}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
    )
}

export default OurServices;
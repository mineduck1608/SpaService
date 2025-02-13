import React from 'react';

const News = () => {
    return (
        <section className='news'>
            <div className="w-full bg-white py-20 relative">
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 mt-[180px]"
                    style={{
                        backgroundImage: `url(https://senspa.com.vn/wp-content/themes/thuythu/images/bf_service.png)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                    }}
                ></div>

                <div className="max-w-7xl mx-auto px-4 relative">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-[#8B3A8B] mb-4" data-aos='fade-down' data-aos-delay='300'>News</h2>
                        <div className="flex justify-center items-center">
                            <img
                                src="https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png"
                                alt="lotus"
                                className="h-5"
                                data-aos='fade-down' data-aos-delay='300'
                            />
                        </div>
                    </div>

                    {/* News Grid */}
                    <div className="grid grid-cols-3 gap-8" data-aos='fade-up' data-aos-delay='300'>
                        {/* News Item 1 */}

                        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                            <a href="/news/detail/:id">
                                <div className="overflow-hidden">
                                    <img
                                        src="https://senspa.com.vn/wp-content/uploads/2020/11/620552810-H-1024x700-1.jpg"
                                        alt="Skin care"
                                        className="w-full h-[250px] object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                </div>
                            </a>
                            <div className="p-6">
                                <p className="text-gray-500 text-sm mb-2">17.11.2020</p>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                    Facial care for smooth and radiant skin.
                                </h3>
                                <a
                                    href="/news/detail/:id"
                                    className="text-[#8B3A8B] hover:text-[#a040a0] transition-colors duration-300"
                                >
                                    Details
                                </a>
                            </div>
                        </div>

                        {/* News Item 2 */}
                        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                            <a href="/news/detail/:id">
                                <div className="overflow-hidden">
                                    <img
                                        src="https://senspa.com.vn/wp-content/uploads/2020/11/shutterstock_458768797.jpg"
                                        alt="Himalaya salt"
                                        className="w-full h-[250px] object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                </div>
                            </a>
                            <div className="p-6">
                                <p className="text-gray-500 text-sm mb-2">17.11.2020</p>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                    The unexpected benefits of Himalayan pink salt.
                                </h3>
                                <a
                                    href="/news/detail/:id"
                                    className="text-[#8B3A8B] hover:text-[#a040a0] transition-colors duration-300"
                                >
                                    Details
                                </a>
                            </div>
                        </div>

                        {/* News Item 3 */}
                        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                            <a href="/news/detail/:id">
                                <div className="overflow-hidden">
                                    <img
                                        src="https://senspa.com.vn/wp-content/uploads/2020/11/DSC5072.jpg"
                                        alt="Foot massage"
                                        className="w-full h-[250px] object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                </div>
                            </a>
                            <div className="p-6">
                                <p className="text-gray-500 text-sm mb-2">17.11.2020</p>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                    The benefits of foot massage you should know.
                                </h3>
                                <a
                                    href="/news/detail/:id"
                                    className="text-[#8B3A8B] hover:text-[#a040a0] transition-colors duration-300"
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

export default News;

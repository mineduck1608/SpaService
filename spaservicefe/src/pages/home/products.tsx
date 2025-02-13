import React from 'react';

const Products = () => {
    return (
        <section className='products'>
{/* Products Section */}
<div className="w-full bg-[#fff5ff] py-20 relative">
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
                        <h2 className="text-5xl font-bold text-[#8B3A8B] mb-4">Products</h2>
                        <div className="flex justify-center items-center">
                            <img
                                src="https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png"
                                alt="lotus"
                                className="h-5"
                            />
                        </div>
                        <p className="text-gray-600 mt-4">
                        Enjoy the refined and tranquil space at the luxury serviced apartment.
                            <br />at Sen Spa
                        </p>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-3 gap-8">
                        <div className="group cursor-pointer">
                            <div className="relative overflow-hidden">
                                <img
                                    src="https://senspa.com.vn/wp-content/uploads/2021/01/can-ho-dich-vu-dai-dien.jpg"
                                    alt="Daily rental"
                                    className="w-full h-[300px] object-cover"
                                />
                                <div className="absolute bottom-0 w-full bg-[#8B3A8B] text-white py-2 px-6">
                                    <h3 className="text-xl text-center">Serviced apartment for daily rental.</h3>
                                </div>
                            </div>
                        </div>

                        <div className="group cursor-pointer -mt-6">
                            <div className="relative overflow-hidden">
                                <img
                                    src="https://senspa.com.vn/wp-content/uploads/2021/01/can-ho-dich-vu-dai-dien-2.jpg"
                                    alt="Monthly rental"
                                    className="w-full h-[350px] object-cover"
                                />
                                <div className="absolute bottom-0 w-full bg-[#8B3A8B] text-white py-2 px-6">
                                    <h3 className="text-xl text-center">Serviced apartment for monthly rental.</h3>
                                </div>
                            </div>
                        </div>

                        <div className="group cursor-pointer">
                            <div className="relative overflow-hidden">
                                <img
                                    src="https://senspa.com.vn/wp-content/uploads/2021/01/can-ho-dich-vu-dai-dien-1.jpg"
                                    alt="6-month rental"
                                    className="w-full h-[300px] object-cover"
                                />
                                <div className="absolute bottom-0 w-full bg-[#8B3A8B] text-white py-2 px-6">
                                    <h3 className="text-xl text-center">Serviced apartment for rent over 6 months.</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Products;

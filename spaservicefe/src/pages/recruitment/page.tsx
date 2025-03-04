import React from "react";

export default function RecruitmentPage() {
  return (
    <div
      className='flex justify-center bg-cover bg-no-repeat'
      style={{
        backgroundImage: 'url(https://senspa.com.vn/wp-content/uploads/2021/01/2-3.png)',
        height: '100vh',
        width: '100%',
        position: 'relative'
      }}
    >
      <div className="absolute inset-0 bg-gray-800 bg-opacity-10 flex items-center justify-center">
        <div className="w-full max-w-4xl rounded-lg bg-white bg-opacity-75 p-10 shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gray-800">Join Our Team</h1>
          <p className="mt-4 text-gray-600">
            Currently, we are not hiring for any positions. Please check back later
            for future opportunities.
          </p>
          <div className="mt-6">
           <p>No job available</p>
          </div>
          <p className="mt-4 text-gray-500">Stay connected with us for updates.</p>
        </div>
      </div>
    </div>
  );
}

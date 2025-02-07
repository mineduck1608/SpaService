import React from 'react'
import { FaDownload, FaCloudDownloadAlt } from 'react-icons/fa'

const EBrochure = () => {
  return (
    <div className='d-flex justify-content-center align-items-center mt-10'>
      <div className='container text-center'>
        {/* Hộp tải xuống E-Brochure */}
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='p-4 rounded shadow-sm bg-light text-start brochure-container'>
              <h4 className='fw-bold justify-content-center text-center'>SENSPA E-Brochure</h4>
              <div className='d-flex align-items-center justify-content-center mt-2'>
                <FaDownload className='text-purple2 me-2' size={20} />
                <a
                  href='https://senspa.com.vn/wp-content/uploads/2022/08/SENSPA-E-Brochure.pdf'
                  className='text-purple2 text-decoration-none fw-bold'
                  download
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Tải về
                </a>
                <FaCloudDownloadAlt className='text-gray-500 ms-3' size={20} />
                <span className='text-gray-500 ms-2'>130 Lượt tải</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default EBrochure

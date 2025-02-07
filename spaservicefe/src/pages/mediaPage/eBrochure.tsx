import React from 'react'
import { FaDownload, FaCloudDownloadAlt } from 'react-icons/fa'

const EBrochure = () => {
  return (
    <div className='d-flex justify-content-center align-items-center mt-10'>
      <div className='container text-center'>
        {/* Hộp tải xuống E-Brochure */}
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='bg-light brochure-container rounded p-4 text-start shadow-sm'>
              <h4 className='fw-bold justify-content-center text-center'>SENSPA E-Brochure</h4>
              <div className='d-flex align-items-center justify-content-center mt-2'>
                <FaDownload className='me-2 text-purple2' size={20} />
                <a
                  href='https://senspa.com.vn/wp-content/uploads/2022/08/SENSPA-E-Brochure.pdf'
                  className='text-decoration-none fw-bold text-purple2'
                  download
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Tải về
                </a>
                <FaCloudDownloadAlt className='ms-3 text-gray-500' size={20} />
                <span className='ms-2 text-gray-500'>130 Lượt tải</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EBrochure

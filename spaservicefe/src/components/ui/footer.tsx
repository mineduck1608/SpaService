import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faInstagram, faSquareFacebook } from '@fortawesome/free-brands-svg-icons'
import { faMap, faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons'
import logoBlack from '../../images/logos/logoBlack.png'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-logo'>
          <img src={logoBlack} alt='Sen Spa Logo' className='footer-logo-image' />
          <p className='footer-tagline'>VIETNAM SPA EXPERIENCE</p>
          <img
            src='https://senspa.com.vn/wp-content/themes/thuythu/images/before_heading.png'
            alt='decorative line'
            className='mx-auto mb-5 mt-10 brightness-0 invert'
          />
          <div className='mt-4'>
            <a
              href='https://facebook.com'
              className='mx-2.5 inline-block text-2xl text-white no-underline hover:text-[#ae3da9]'
            >
              <FontAwesomeIcon icon={faSquareFacebook} />
            </a>
            <a
              href='https://youtube.com'
              className='mx-2.5 inline-block text-2xl text-white no-underline hover:text-[#ae3da9]'
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a
              href='https://instagram.com'
              className='mx-2.5 inline-block text-2xl text-white no-underline hover:text-[#ae3da9]'
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
        <div className='footer-info'>
          <h4 className='font-medium'>Sen Spa Service Company Limited</h4>
          <div className='item mb-6 flex w-full'>
            <h5 className='m-0 w-[120px] shrink-0 text-[#b1aeaa]'>
              <FontAwesomeIcon icon={faMap} className='mr-2' /> Address:
            </h5>
            <div className='content text_white ml-10 flex-1 break-words text-[#b1aeaa]'>
              10B1 Le Thanh Ton, Ben Nghe Ward, District 1, HCMC
            </div>
          </div>
          <div className='item mb-6 flex w-full'>
            <h5 className='m-0 w-[120px] shrink-0 text-[#b1aeaa]'>
              <FontAwesomeIcon icon={faPhone} className='mr-2' /> Phone:
            </h5>
            <div className='content text_white ml-10 flex-1 break-words text-[#b1aeaa]'>
              +84 28 38 251 250 <br /> +84 28 3910 2174
            </div>
          </div>
          <div className='item mb-6 flex w-full'>
            <h5 className='m-0 w-[120px] shrink-0 text-[#b1aeaa]'>
              <FontAwesomeIcon icon={faEnvelope} className='mr-2' /> Email:
            </h5>
            <div className='content text_white ml-10 flex-1 break-words text-[#b1aeaa]'>rsv@senspa.com.vn</div>
          </div>
          <div className='item mb-6 flex w-full'>
            <h5 className='m-0 w-[120px] shrink-0 text-[#b1aeaa]'>
              <FontAwesomeIcon icon={faClock} className='mr-2' /> Opening:
            </h5>
            <div className='content text_white ml-10 flex-1 break-words text-[#b1aeaa]'>09:30 AM - 20:00 PM</div>
          </div>
        </div>
        <div className='footer-quick-links'>
          <h4 className='font-medium'>
           Quick Links
          </h4>
          <ul>
            <li>
              <a href='/about-us'>About Us</a>
            </li>
            <li>
              <a href='/service'>Services</a>
            </li>
            <li>
              <a href='/product'>Products</a>
            </li>
            <li>
              <a href='/promotion'>News & Events</a>
            </li>
          </ul>
        </div>
      </div>

      <div className='side-info mb-4 w-full text-center text-[#ae3da9]'>
        All prices exclude 10% VAT and 5% Service Charge.
        <br />
        Only paying more 50% Additional Charge, VIP Room is at your side.
      </div>

      <div className='footer-bottom w-full bg-[#ae3da9] py-1'>
        <p className='mt-3'>© 2020 SEN SPA. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer

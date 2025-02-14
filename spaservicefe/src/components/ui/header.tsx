import React, { useState, useEffect } from 'react'
import '../../styles/main.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faAngleDown } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <header className={`header ${isAtTop ? 'at-top' : ''}`}>
        <div className={`header-container ${isAtTop ? 'large' : 'small'}`}>
          <nav className='navigation'>
            <ul className='nav-list'>
              <li>
                <a href='/home' className='nav-link text-base'>
                  <FontAwesomeIcon icon={faHouse} className='mb-0.5 mr-3' />
                  HOME
                </a>
              </li>
              <li>
                <a href='/about' className='nav-link text-base'>
                  ABOUT US
                </a>
              </li>
              <li className='dropdown'>
                <a href='/services' className='nav-link text-base'>
                  SERVICE <FontAwesomeIcon icon={faAngleDown} className='mb-0.5 ml-2 text-xs' />
                </a>
                <ul className={`dropdown-menu min-w-[220px] rounded-br-lg rounded-tl-lg ${isAtTop ? 'bg-white/20' : 'small'}  backdrop-blur-sm`}>
                  <li>
                    <a
                      href='/services/fullbody'
                      className={`dropdown-link ${isAtTop ? 'text-white' : 'text-black'} group flex items-center text-base transition-transform duration-1000 hover:translate-x-2 hover:bg-transparent`}
                    >
                      <span className='opacity-0 transition-opacity group-hover:opacity-100'>-&nbsp;</span>
                      Chăm sóc toàn thân
                    </a>
                  </li>
                  <li>
                    <a
                      href='/services/facial'
                      className={`dropdown-link ${isAtTop ? 'text-white' : 'text-black'} group flex items-center text-base transition-transform duration-1000 hover:translate-x-2 hover:bg-transparent`}
                    >
                      <span className='opacity-0 transition-opacity group-hover:opacity-100'>-&nbsp;</span>
                      Chăm sóc da mặt
                    </a>
                  </li>
                  <li>
                    <a
                      href='/services/hand&foot'
                      className={`dropdown-link ${isAtTop ? 'text-white' : 'text-black'} group flex items-center text-base transition-transform duration-1000 hover:translate-x-2 hover:bg-transparent`}
                    >
                      <span className='opacity-0 transition-opacity group-hover:opacity-100'>-&nbsp;</span>
                      Hand & Foot Relaxation
                    </a>
                  </li>
                  <li>
                    <a
                      href='/services/package'
                      className={`dropdown-link ${isAtTop ? 'text-white' : 'text-black'} group flex items-center text-base transition-transform duration-1000 hover:translate-x-2 hover:bg-transparent`}
                    >
                      <span className='opacity-0 transition-opacity group-hover:opacity-100'>-&nbsp;</span>
                      Package Service
                    </a>
                  </li>
                  <li>
                    <a
                      href='/services/vip'
                      className={`dropdown-link ${isAtTop ? 'text-white' : 'text-black'} group flex items-center text-base transition-transform duration-1000 hover:translate-x-2 hover:bg-transparent`}
                    >
                      <span className='opacity-0 transition-opacity group-hover:opacity-100'>-&nbsp;</span>
                      VIP service
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href='/products' className='nav-link text-base'>
                  PRODUCT
                </a>
              </li>
              <div className='logo'>
                <img
                  src={isAtTop ? './Logo/SenSpa(White).png' : './Logo/SenSpa(Black).png'}
                  alt='Sen Spa Logo'
                  className={`logo-image ${isAtTop ? 'large-logo' : 'small-logo'}`}
                />
              </div>
              <li>
                <a href='/recruitment' className='nav-link text-base'>
                  RECRUITMENT
                </a>
              </li>
              <li className='dropdown'>
                <a href='/media/pictures' className='nav-link text-base'>
                  MEDIA
                  <FontAwesomeIcon icon={faAngleDown} className='mb-0.5 ml-2 text-xs' />
                </a>
                <ul className='dropdown-menu min-w-[150px] rounded-br-lg rounded-tl-lg bg-white/20 backdrop-blur-sm'>
                  <li>
                    <a
                      href='/media/pictures'
                      className={`dropdown-link ${isAtTop ? 'text-white' : 'text-black'} group flex items-center text-base transition-transform duration-1000 hover:translate-x-2 hover:bg-transparent`}
                    >
                      <span className='opacity-0 transition-opacity group-hover:opacity-100'>-&nbsp;</span>
                      Pictures
                    </a>
                  </li>
                  <li>
                    <a
                      href='/media/videos'
                      className={`dropdown-link ${isAtTop ? 'text-white' : 'text-black'} group flex items-center text-base transition-transform duration-1000 hover:translate-x-2 hover:bg-transparent`}
                    >
                      <span className='opacity-0 transition-opacity group-hover:opacity-100'>-&nbsp;</span>
                      Videos
                    </a>
                  </li>
                  <li>
                    <a
                      href='/media/news'
                      className={`dropdown-link ${isAtTop ? 'text-white' : 'text-black'} group flex items-center text-base transition-transform duration-1000 hover:translate-x-2 hover:bg-transparent`}
                    >
                      <span className='opacity-0 transition-opacity group-hover:opacity-100'>-&nbsp;</span>
                      E-Brochure
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href='/news' className='nav-link text-base'>
                  NEWS
                </a>
              </li>
              <li>
                <a href='/contact' className='nav-link text-base'>
                  CONTACT
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header

import React, { useState, useEffect } from 'react'
import '../../styles/main.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faAngleDown, faBars } from '@fortawesome/free-solid-svg-icons'
import logoColor from '../../images/logos/logoColor.png'
import { ServiceCategory } from '@/types/serviceCategory.ts'
import { findCategories } from '../../pages/servicesPage/servicesPage.util.ts'
import { Dropdown } from '../dropdown.tsx'
import { findCosmeticCategories } from '../../pages/cosmeticPage/cosmeticPage.util.ts'
import { CosmeticCategory } from '../../types/type.ts'

const Header = () => {
  // Giải mã JWT để kiểm tra thời gian hết hạn
  const isTokenValid = (token: string | null) => {
    if (!token) return false
    try {
      const payload = JSON.parse(atob(token.split('.')[1])) // Giải mã phần payload của JWT
      return payload.exp * 1000 > Date.now() // Kiểm tra xem token còn hạn không
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem('token')
      if (!isTokenValid(token)) {
        sessionStorage.removeItem('token') // Xóa token nếu hết hạn
      }
    }

    checkAuth()

    // Lắng nghe thay đổi của sessionStorage (trong trường hợp token bị xóa từ tab khác)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        checkAuth()
      }
    }
    window.addEventListener('storage', handleStorageChange)

    // Kiểm tra token mỗi phút (phòng trường hợp token hết hạn nhưng không reload)
    const interval = setInterval(checkAuth, 60000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const [isAtTop, setIsAtTop] = useState(true)
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory[]>([])
  const [cosmeticCategory, setCosmeticCategory] = useState<CosmeticCategory[]>([])

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0)
    }

    // Hàm async trong useEffect
    const getCategory = async () => {
      try {
        let x = await findCategories()
        let y = await findCosmeticCategories()
        setServiceCategory(x)
        setCosmeticCategory(y)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Gọi hàm lấy category
    getCategory()

    // Cleanup
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
                <a href='/' className='nav-link text-base'>
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
                <ul
                  className={`dropdown-menu min-w-[220px] rounded-br-lg rounded-tl-lg ${isAtTop ? 'bg-white/20' : 'small'}  backdrop-blur-sm`}
                >
                  {serviceCategory.map((x) => (
                    <li key={x.categoryId}>
                      <a
                        href={'/services/' + x.categoryId}
                        className={`dropdown-link ${isAtTop ? 'text-white' : 'text-black'} group flex items-center text-base transition-transform duration-1000 hover:translate-x-2 hover:bg-transparent`}
                      >
                        <span className='opacity-0 transition-opacity group-hover:opacity-100'>-&nbsp;</span>
                        {x.categoryName}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className='dropdown'>
                <a href='/cosmetics' className='nav-link text-base'>
                  COSMETIC <FontAwesomeIcon icon={faAngleDown} className='mb-0.5 ml-2 text-xs' />
                </a>
                <ul
                  className={`dropdown-menu min-w-[220px] rounded-br-lg rounded-tl-lg ${isAtTop ? 'bg-white/20' : 'small'}  backdrop-blur-sm`}
                >
                  {cosmeticCategory.map((y) => (
                    <li key={y.categoryId}>
                      <a
                        href={'/cosmetics/' + y.categoryId}
                        className={`dropdown-link ${isAtTop ? 'text-white' : 'text-black'} group flex items-center text-base transition-transform duration-1000 hover:translate-x-2 hover:bg-transparent`}
                      >
                        <span className='opacity-0 transition-opacity group-hover:opacity-100'>-&nbsp;</span>
                        {y.categoryName}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <div className='logo'>
                <img
                  src={logoColor}
                  alt='Sen Spa Logo'
                  className={`logo-image ${isAtTop ? 'large-logo brightness-0 invert' : 'small-logo'}`}
                />
              </div>
              <li className='dropdown'>
                <a href='/media/pictures' className='nav-link text-base'>
                  MEDIA
                  <FontAwesomeIcon icon={faAngleDown} className='mb-0.5 ml-2 text-xs' />
                </a>
                <ul
                  className={`dropdown-menu min-w-[220px] rounded-br-lg rounded-tl-lg ${isAtTop ? 'bg-white/20' : 'small'}  backdrop-blur-sm`}
                >
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
                      href='/media/e-brochure'
                      className={`dropdown-link ${isAtTop ? 'text-white' : 'text-black'} group flex items-center text-base transition-transform duration-1000 hover:translate-x-2 hover:bg-transparent`}
                    >
                      <span className='opacity-0 transition-opacity group-hover:opacity-100'>-&nbsp;</span>
                      E-Brochure
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href='/news/blog' className='nav-link text-base'>
                  NEWS
                </a>
              </li>
              <li>
                <a href='/contact' className='nav-link text-base'>
                  CONTACT
                </a>
              </li>
              <li>
                <a href='/recruitment' className='nav-link text-base'>
                  RECRUITMENT
                </a>
              </li>
            </ul>
          </nav>
          <div className='absolute right-10 top-1/2 -translate-y-1/2 transform'>
            <Dropdown /> {/* Moved to the right side */}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header

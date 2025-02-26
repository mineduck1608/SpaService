import { Button } from '../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '../components/ui/dropdown-menu'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom' // For navigation
import { jwtDecode } from 'jwt-decode'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export function Dropdown() {
  const token = sessionStorage.getItem('token')
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('') // Initialize fullName as an empty string
  useEffect(() => {
    if (token) {
      try {
        console.log(token)
        // Giải mã token để lấy thông tin
        const decodedToken = jwtDecode(token)
        // Lấy FullName từ decoded token (thường là trong payload của JWT)
        setFullName(decodedToken.FullName)
      } catch (error) {
        console.error('Token không hợp lệ:', error)
      }
    } else {
      console.log(token)
      console.log('Token không tồn tại')
    }
  }) // The effect runs only when token changes

  // Hàm điều hướng đến trang đăng nhập
  const handleLoginClick = () => {
    navigate('/login')
  }

  // Hàm xử lý logout
  const handleLogoutClick = () => {
    sessionStorage.removeItem('token') // Xóa token
    toast.success('Logout success.')
    navigate('/login') // Điều hướng về trang đăng nhập
  }
  const items = [
    {
      k: 'Profile',
      v: '/profile'
    },
    {
      k: 'Requests',
      v: '/requests'
    },
    {
      k: 'Appointments',
      v: '/appointments'
    },
    {
      k: 'Carts',
      v: '/carts'
    }
  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {token ? (
          <Button variant='none' className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faBars} className='text-2xl' />
          </Button>
        ) : (
          // If token doesn't exist, show the Login button
          <Button variant='login' onClick={handleLoginClick} className='flex items-center justify-center text-lg'>
            Login
          </Button>
        )}
      </DropdownMenuTrigger>
      {token && (
        <DropdownMenuContent className='mr-16 w-56'>
          <DropdownMenuLabel>Welcome {fullName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {items.map((x) => (
              <DropdownMenuItem>
                <Link to={x.v} className='text-black no-underline'>
                  {x.k}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogoutClick}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}

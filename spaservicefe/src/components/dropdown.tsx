import { Button } from '../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '../components/ui/dropdown-menu'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom' // For navigation
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
        // Giải mã token để lấy thông tin
        const decodedToken = jwtDecode(token)

        // Lấy FullName từ decoded token (thường là trong payload của JWT)
        setFullName(decodedToken.FullName)
      } catch (error) {
        console.error('Token không hợp lệ:', error)
      }
    } else {
      console.log('Token không tồn tại')
    }
  }, [token]) // The effect runs only when token changes

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {token ? (
          <Button variant='none' className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faBars} className='text-2xl' />
          </Button>
        ) : (
          // If token doesn't exist, show the Login button
          <Button variant='login' onClick={handleLoginClick} className='text-lg flex items-center justify-center'>
            Login
          </Button>
        )}
      </DropdownMenuTrigger>
      {token && (
        <DropdownMenuContent className='w-56 mr-16'>
          <DropdownMenuLabel>Welcome {fullName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Keyboard shortcuts
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Message</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>More...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              New Team
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
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

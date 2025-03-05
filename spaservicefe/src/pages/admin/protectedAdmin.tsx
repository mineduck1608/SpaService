import { roleJWT } from '../../types/constants'
import { useEffect, useState } from 'react'

export function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  // Giải mã JWT để kiểm tra thời gian hết hạn và vai trò
  const decodeToken = (token: string | null) => {
    if (!token) return null
    try {
      const payload = JSON.parse(atob(token.split('.')[1])) // Giải mã phần payload của JWT
      return payload
    } catch (error) {
      return null
    }
  }

  const isTokenValid = (payload: any) => {
    if (!payload) return false
    return payload.exp * 1000 > Date.now() // Kiểm tra xem token còn hạn không
  }

  const hasAdminRole = (payload: any) => {
    if (!payload) return false
    return payload.includes("Admin") // Kiểm tra vai trò Admin
  }

  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem('token')
      const payload = decodeToken(token)

      if (!isTokenValid(payload)) {
        sessionStorage.removeItem('token') // Xóa token nếu hết hạn
        setIsAuthenticated(false)
        setIsAdmin(false)
      } else {
        setIsAuthenticated(true)
        setIsAdmin(hasAdminRole(payload[roleJWT] as string))
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

  if (isAuthenticated === null || isAdmin === null) {
    return null // Không hiển thị gì khi đang kiểm tra token và vai trò
  }

  return isAuthenticated && isAdmin ? <>{children}</> : null
}

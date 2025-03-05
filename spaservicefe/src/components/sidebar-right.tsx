import * as React from 'react'
import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode' // Import jwt-decode
import { Calendars } from 'src/components/calendars'
import { DatePicker } from 'src/components/date-picker'
import { NavUser } from 'src/components/nav-user'
import { Sidebar, SidebarContent, SidebarHeader, SidebarSeparator } from 'src/components/ui/sidebar'
import { getEmployeeByAccountId, getManagerByAccountId } from './utils' // Import hàm getEmployeeById
import { Employee } from '@/types/type' // Import kiểu dữ liệu Employee
import { roleJWT } from '../types/constants'
import { RoleName } from '../types/role'

export function SidebarRight({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<{ name: string; email: string; image: string; role: string } | null>(null) // Lưu trữ thông tin người dùng
  const [loading, setLoading] = useState<boolean>(true) // Quản lý trạng thái tải dữ liệu

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        // Lấy token từ sessionStorage
        const token = sessionStorage.getItem('token')

        if (token) {
          // Giải mã token để lấy UserId
          const decodedToken: any = jwtDecode(token)
          const userId = decodedToken.UserId // Lấy UserId từ token
          const role = decodedToken[roleJWT] as string
          console.log(role)
          if (role == RoleName.ADMIN) {
            setUser({
              name: 'Admin',
              email: 'admin@gmail.com',
              image: '',
              role: 'Admin'
            })
          }
          if (role == RoleName.EMPLOYEE) {
            const employeeData = await getEmployeeByAccountId(userId) // Gọi API với UserId

            if (employeeData) {
              setUser({
                name: employeeData.fullName,
                email: employeeData.email,
                image: employeeData.image,
                role: 'Employee'
              })
            }
          }
          if (role == RoleName.MANAGER) {
            const managerData = await getManagerByAccountId(userId) // Gọi API với UserId

            if (managerData) {
              setUser({
                name: managerData.fullName,
                email: managerData.email,
                image: managerData.image,
                role: 'Manager'
              })
            }
          }

          // Gọi API để lấy thông tin nhân viên sử dụng UserId
        } else {
          console.error('Token not found')
        }
      } catch (error) {
        console.error('Error fetching employee data:', error)
      } finally {
        setLoading(false) // Khi API đã được gọi xong, tắt trạng thái loading
      }
    }

    fetchEmployeeData() // Gọi hàm lấy dữ liệu nhân viên
  }, [])

  return (
    <Sidebar collapsible='none' className='sticky top-0 hidden h-svh border-l lg:flex' {...props}>
      <SidebarHeader className='h-16 border-b border-sidebar-border'>
        {
          loading ? (
            <p>Loading...</p> // Hiển thị "Loading..." khi đang tải dữ liệu
          ) : user ? (
            <NavUser user={user} />
          ) : (
            <p>No user data found</p>
          ) // Hiển thị thông tin người dùng hoặc thông báo nếu không tìm thấy dữ liệu
        }
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className='mx-0' />
        <Calendars calendars={data.calendars} />
      </SidebarContent>
    </Sidebar>
  )
}

const data = {
  calendars: [
    {
      name: 'My Calendars',
      items: ['Personal', 'Work', 'Deadline']
    }
  ]
}

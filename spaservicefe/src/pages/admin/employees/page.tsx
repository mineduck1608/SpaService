import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Employee } from '@/types/type' // Kiểu dữ liệu Employee
import { getAllEmployees } from '../employees/employee.util' // API để lấy tất cả nhân viên
import { format } from 'date-fns' // Dùng thư viện date-fns để format ngày

export default function EmployeePage() {
  const [data, setData] = useState<Employee[]>([]) // Thay đổi từ Customer sang Employee
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await getAllEmployees() // Fetch tất cả nhân viên
        
        const formattedEmployees = employees.map((employee) => ({
          ...employee,
          hireDate: format(new Date(employee.hireDate), 'dd/MM/yyyy'), // Format ngày tuyển dụng
        }))
  
        setData(formattedEmployees) // Set dữ liệu cho bảng
      } catch (err) {
        setError("Can't load the data.") // Xử lý lỗi nếu có
      } finally {
        setLoading(false) // Set loading thành false khi dữ liệu đã được tải
      }
    }
    fetchData()
  }, []) // Chạy khi component mount lần đầu

  if (loading) return <div className='ml-5'>Loading...</div>
  if (error) return <div className='ml-5'>{error}</div>

  return (
    <div className='items-center justify-center h-[96%]'>
      <h2 className='ml-11 my-4'>Employee Management</h2> {/* Đổi thành Employee Management */}
      <div className='container mx-auto rounded-md border w-[96%]'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

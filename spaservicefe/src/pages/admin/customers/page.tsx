import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Customer } from '@/types/type'
import { getAllCustomers } from '../customers/customer.util'
import { getAllMemberships } from '../customers/customer.util' // Giả sử bạn có một API để lấy thông tin thành viên
import { format } from 'date-fns' // Dùng thư viện date-fns để format ngày

export default function CustomerPage() {
  const [data, setData] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customers, members] = await Promise.all([getAllCustomers(), getAllMemberships()])
  
        const memberMap = members.reduce((acc, member) => {
          acc[member.membershipId] = member.type
          return acc
        }, {} as Record<string, string>)
  
        const formattedCustomers = customers.map((customer) => ({
          ...customer,
          dateOfBirth: format(new Date(customer.dateOfBirth), 'dd/MM/yyyy'), // Format ngày tháng sinh
          type: memberMap[customer.membershipId] || "Unknown", // Lấy memberName từ map
        }))
  
        setData(formattedCustomers)
      } catch (err) {
        setError("Can't load the data.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className='ml-5'>Loading...</div>
  if (error) return <div className='ml-5'>{error}</div>

  return (
    <div className='items-center justify-center h-[96%]'>
      <h2 className='ml-11 my-4'>Customer Management</h2>
      <div className='container mx-auto rounded-md border w-[96%]'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

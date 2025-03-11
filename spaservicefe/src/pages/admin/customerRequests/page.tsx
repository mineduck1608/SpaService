import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { SpaRequest } from '../../../types/type' // Updated to CustomerRequest type
import { getAllCustomerRequests, getCustomerById, getServiceById } from '../customerRequests/customerRequest.util' // Assuming the new function to get customer requests
import { format } from 'date-fns' // Dùng thư viện date-fns để format ngày
import { getEmployeeById } from '../employeeCategories/employeeCategory.util'

export default function CustomerRequestPage() {
  const [data, setData] = useState<SpaRequest[]>([]) // Updated to CustomerRequest
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerRequests = await getAllCustomerRequests()

        // Tạo danh sách Promise để lấy thông tin khách hàng & dịch vụ
        const formattedCustomerRequests = await Promise.all(
          customerRequests.map(async (request) => {
            const customer = request.customerId ? await getCustomerById(request.customerId) : { fullName: 'Unknown' }
            const service = request.serviceId ? await getServiceById(request.serviceId) : { serviceName: 'Unknown' }
            const employee = request.employeeId
              ? await getEmployeeById(request.employeeId)
              : { employeeName: 'Unknown' }

            return {
              ...request,
              createdAt: format(new Date(request.createdAt), 'dd/MM/yyyy HH:mm:ss'), // Format ngày
              startTime: format(new Date(request.startTime), 'dd/MM/yyyy HH:mm:ss'),
              customerNote: request.customerNote || 'No notes provided',
              managerNote: request.managerNote || 'No notes provided',
              customerName: customer.fullName,
              serviceName: service.serviceName,
              rawCreatedAt: new Date(request.createdAt), // Dùng để sort
              employeeName: employee.fullName
            }
          })
        )

        // **Sort dữ liệu sau khi tất cả Promise đã resolve**
        formattedCustomerRequests.sort((a, b) => b.rawCreatedAt.getTime() - a.rawCreatedAt.getTime())

        setData(formattedCustomerRequests)
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
    <div className='h-[96%] items-center justify-center'>
      <h2 className='container mx-auto my-4 ml-11'>Customer Requests Management</h2>
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

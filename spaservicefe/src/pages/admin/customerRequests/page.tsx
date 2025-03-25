import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { SpaRequest } from '../../../types/type'
import { getCustomerRequestsPaginated, getCustomerById, getServiceById } from '../customerRequests/customerRequest.util'
import { getEmployeeById } from '../employeeCategories/employeeCategory.util'
import { format } from 'date-fns'
import { toast, ToastContainer } from 'react-toastify'

const customerCache = new Map()
const serviceCache = new Map()
const employeeCache = new Map()

export default function CustomerRequestPage() {
  const [data, setData] = useState<SpaRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10 // Số lượng yêu cầu trên mỗi trang

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await getCustomerRequestsPaginated(currentPage, pageSize) // API trả về { data, totalItems }
        const { data: customerRequests, totalPages } = response

        const getCustomer = async (id) => {
          if (!id) return { fullName: 'Unknown' }
          if (customerCache.has(id)) return customerCache.get(id)
          try {
            const customer = await getCustomerById(id)
            customerCache.set(id, customer)
            return customer
          } catch {
            return { fullName: 'Unknown' }
          }
        }

        const getService = async (id) => {
          if (!id) return { serviceName: 'Unknown' }
          if (serviceCache.has(id)) return serviceCache.get(id)
          try {
            const service = await getServiceById(id)
            serviceCache.set(id, service)
            return service
          } catch {
            return { serviceName: 'Unknown' }
          }
        }

        const getEmployee = async (id) => {
          if (!id) return { fullName: 'Unknown' }
          if (employeeCache.has(id)) return employeeCache.get(id)
          try {
            const employee = await getEmployeeById(id)
            employeeCache.set(id, employee)
            return employee
          } catch {
            return { fullName: 'Unknown' }
          }
        }

        const formattedCustomerRequests = await Promise.all(
          customerRequests.map(async (request) => {
            const customer = await getCustomer(request.customerId)
            const service = await getService(request.serviceId)
            const employee = await getEmployee(request.employeeId)

            return {
              ...request,
              createdAt: format(new Date(request.createdAt), 'dd/MM/yyyy HH:mm:ss'),
              startTime: format(new Date(request.startTime), 'dd/MM/yyyy HH:mm:ss'),
              customerNote: request.customerNote || 'No notes provided',
              managerNote: request.managerNote || 'No notes provided',
              customerName: customer.fullName,
              serviceName: service.serviceName,
              employeeName: employee.fullName
            }
          })
        )

        setData(formattedCustomerRequests)
        setTotalPages(totalPages) // Cập nhật tổng số items
      } catch (err) {
        console.error('Error fetching data:', err)
        setError("Can't load the data.")
        toast.error('Failed to fetch customer requests.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [currentPage]) // Fetch lại dữ liệu khi `currentPage` thay đổi

  if (loading) return <div className='ml-5'>Loading...</div>
  if (error) return <div className='ml-5 text-red-500'>{error}</div>

  return (
    <div className='h-[96%] items-center justify-center'>
      <h2 className='container mx-auto my-4 ml-11'>Customer Requests Management</h2>
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable
          columns={columns}
          data={data}
          totalPages={totalPages} // Tính số trang
          page={currentPage}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      </div>
      <ToastContainer />
    </div>
  )
}

import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { SpaRequest } from '../../../types/type'
import { getCustomerRequestsPaginated, getCustomerById, getServiceById } from '../customerRequests/customerRequest.util'
import { getEmployeeById } from '../employeeCategories/employeeCategory.util'
import { format } from 'date-fns'
import { toast, ToastContainer } from 'react-toastify'

export default function CustomerRequestPage() {
  const [data, setData] = useState<SpaRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10) // Số lượng bản ghi trên mỗi trang
  const [totalPages, setTotalPages] = useState(1) // Tổng số trang

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await getCustomerRequestsPaginated(page, pageSize) // API trả về { data, totalPages }
        const { data: customerRequests, totalPages } = response

        // Caching tránh gọi API trùng lặp
        const customerCache = new Map()
        const serviceCache = new Map()
        const employeeCache = new Map()

        const getCustomer = async (id) => {
          if (!id) return { fullName: 'Unknown' }
          if (customerCache.has(id)) return customerCache.get(id)
          const customer = await getCustomerById(id)
          customerCache.set(id, customer)
          return customer
        }

        const getService = async (id) => {
          if (!id) return { serviceName: 'Unknown' }
          if (serviceCache.has(id)) return serviceCache.get(id)
          const service = await getServiceById(id)
          serviceCache.set(id, service)
          return service
        }

        const getEmployee = async (id) => {
          if (!id) return { employeeName: 'Unknown' }
          if (employeeCache.has(id)) return employeeCache.get(id)
          const employee = await getEmployeeById(id)
          employeeCache.set(id, employee)
          return employee
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
        setTotalPages(totalPages) // Lưu tổng số trang
      } catch (err) {
        console.error('Error fetching data:', err)
        setError("Can't load the data.")
        toast.error('Failed to fetch customer requests.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page]) // Fetch lại dữ liệu khi `page` thay đổi

  if (loading) return <div className='ml-5'>Loading...</div>
  if (error) return <div className='ml-5 text-red-500'>{error}</div>

  return (
    <div className='h-[96%] items-center justify-center'>
      <h2 className='container mx-auto my-4 ml-11'>Customer Requests Management</h2>
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
      <div className='flex justify-end mt-4'>
        <button
          className='px-4 py-2 mx-1 border rounded disabled:opacity-50'
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className='px-4 py-2'>
          {page} / {totalPages}
        </span>
        <button
          className='px-4 py-2 mx-1 border rounded disabled:opacity-50'
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      <ToastContainer />
    </div>
  )
}

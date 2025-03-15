import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Application } from '@/types/type'
import { getAllApplications, getByAccountId } from './application.util'
import { format } from 'date-fns'
import { getAllAccounts, getAllRoles } from '../accounts/account.util'
import { getCustomerByAccountId } from '../customers/customer.util'
import { getEmployeeByAccountId } from '../employees/employee.util'

export default function ApplicationPage() {
  const [data, setData] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [applications, accounts, roles] = await Promise.all([
          getAllApplications(),
          getAllAccounts(),
          getAllRoles()
        ])

        const accountMap = accounts.reduce(
          (application, account) => {
            application[account.accountId] = account.roleId
            return application
          },
          {} as Record<string, string>
        )

        const roleMap = roles.reduce(
          (map, role) => {
            map[role.roleId] = role.roleName
            return map
          },
          {} as Record<string, string>
        )

        const formattedApplications = await Promise.all(
          applications.map(async (application) => {
            const roleId = accountMap[application.accountId]
            const roleName = roleMap[roleId]

            let createBy = 'N/A'

            if (roleName === 'Customer') {
              const customer = await getCustomerByAccountId(application.accountId)
              createBy = customer?.fullName || 'N/A'
            } else if (roleName === 'Employee') {
              const employee = await getEmployeeByAccountId(application.accountId)
              createBy = employee?.fullName || 'N/A'
            }

            // Fetch FullName for resolvedBy field
            const fullNameObj = await getByAccountId(application.resolvedBy)

            // Format function for dates and fallback to 'N/A'
            const formatOrNA = (date: string | null) => (date ? format(new Date(date), 'dd/MM/yyyy HH:mm:ss') : 'N/A')
           console.log(fullNameObj)
            return {
              ...application,
              resolvedBy: fullNameObj?.fullName || 'N/A',
              createdAt: formatOrNA(application.createdAt),
              resolvedAt: formatOrNA(application.resolvedAt),
              createBy: createBy,
            }
          })
        )

        setData(formattedApplications)
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
      <h2 className='container mx-auto my-4 ml-11'>Application Management</h2>
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Application } from '../../../types/type'
import { ApplicationForm } from './form'
import { getEmployeeApplications } from './application.util' // Adjust the path accordingly
import { jwtDecode } from 'jwt-decode'
import { getToken } from '../../../types/constants'
import { getByAccountId } from '../../../pages/admin/applications/application.util'

export default function EmployeeApplicationPage() {
  const [data, setData] = useState<Application[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Decode token to get the employee ID
        const token = getToken() // Assuming `getToken` is already defined
        if (!token) throw new Error('Token is null or undefined.')
        const decodedToken: any = jwtDecode(token) // Replace `any` with your token type
        const id = decodedToken?.UserId // Adjust based on your token structure

        if (!id) throw new Error('Failed to extract ID from token.')

        // Fetch applications for the employee
        const applications = await getEmployeeApplications(id)
        const formattedData = await Promise.all(applications.map(async (application) => {

          // Fetch FullName for resolvedBy field
          const fullNameObj = await getByAccountId(application.resolvedBy)
          console.log(fullNameObj)

          return {
            ...application,
            resolvedBy: fullNameObj?.fullName || 'N/A',
          }
        }))
        setData(formattedData)
      } catch (e: any) {
        setError(e.message || 'Failed to fetch data.')
      }
    }
    fetchData()
  }, [])

  if (error) return <div className='ml-5'>{error}</div>

  return (
    <div className='h-[96%] items-center justify-center'>
      <h2 className='container mx-auto my-4 ml-11'>Create Application</h2>
      <div className='container mx-auto w-[96%] rounded-md border mb-10 p-4'>
        <ApplicationForm />
      </div>
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

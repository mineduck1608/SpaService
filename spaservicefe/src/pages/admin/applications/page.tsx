import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Application } from '@/types/type'
import { getAllApplications } from './application.util'
import { getAllManagers } from '../managers/manager.util'
import { format } from 'date-fns'

export default function ApplicationPage() {
  const [data, setData] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [applications, managers] = await Promise.all([getAllApplications(), getAllManagers()])

        const managerMap = managers.reduce(
          (application, manager) => {
            application[manager.managerId] = manager.fullName
            return application
          },
          {} as Record<string, string>
        )

        const formattedApplications = applications.map((application) => ({
          ...application,
          managerName: managerMap[application.resolvedBy] || 'N/A'
        }))

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

import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { GuestApplication } from '../../../types/type'
import { getAllGuestApplications } from './guestApplication.util'
import { getAllApplications } from '../applications/application.util'

export default function ContactAdminPage() {
  const [data, setData] = useState<GuestApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [guestContacts, applications] = await Promise.all([getAllGuestApplications(), getAllApplications()])

        const applicationMap = applications.reduce(
          (guestContact, application) => {
            guestContact[application.applicationId] = application.content
            return guestContact
          },
          {} as Record<string, string>
        )

        const formattedContacts = guestContacts.map((guestContact) => ({
          ...guestContact,
          content: applicationMap[guestContact.applicationId] || 'N/A'
        }))

        setData(formattedContacts)
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
      <h2 className='container mx-auto my-4 ml-11'>Guest Contact Management</h2>
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

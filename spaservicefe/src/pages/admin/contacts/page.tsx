import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { GuestApplication } from '../../../types/type'
import { getAllGuestApplications } from './guestApplication.util'

export default function ContactAdminPage() {
  const [data, setData] = useState<GuestApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const guestContacts = await getAllGuestApplications()
        const formattedContacts = guestContacts.map((guestContact) => ({
          ...guestContact,
          content: guestContact.application?.content || 'N/A'
        }))

        console.log(guestContacts)

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

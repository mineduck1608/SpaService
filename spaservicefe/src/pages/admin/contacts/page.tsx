import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Contact } from '../../../types/type' // Updated to Contact type
import { getAllContacts } from '../contacts/contact.util' // Assuming a new function to get all contacts
import { format } from 'date-fns' // Dùng thư viện date-fns để format ngày

export default function ContactAdminPage() {
  const [data, setData] = useState<Contact[]>([]) // Updated to Contact type
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contacts = await getAllContacts() // Fetch the contacts

        const formattedContacts = contacts.map((contact) => ({
          ...contact,
          // If you want to format the date or other fields, you can apply here
          // For instance, formatting the `createdAt` date if you have it:
          // createdAt: format(new Date(contact.createdAt), 'dd/MM/yyyy HH:mm:ss'),
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
      <h2 className='my-4 ml-11'>Contact Management</h2>
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

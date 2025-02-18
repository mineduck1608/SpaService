import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Account } from '@/types/type'
import { getAllAccounts } from '../accounts/account.util'
import { getAllRoles } from '../accounts/account.util'
import { format } from 'date-fns' // Dùng thư viện date-fns để format ngày

export default function DemoPage() {
  const [data, setData] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accounts, roles] = await Promise.all([getAllAccounts(), getAllRoles()])

        const roleMap = roles.reduce(
          (acc, role) => {
            acc[role.roleId] = role.roleName
            return acc
          },
          {} as Record<number, string>
        )

        const formattedAccounts = accounts.map((account) => ({
          ...account,
          createdAt: format(new Date(account.createdAt), 'dd/MM/yyyy HH:mm:ss'), // Format ngày tháng
          updatedAt: format(new Date(account.updatedAt), 'dd/MM/yyyy HH:mm:ss'),
          roleName: roleMap[account.roleId] || 'Unknown',
          status: account.status ? 'Active' : 'Locked' // Chuyển status về text
        }))

        setData(formattedAccounts)
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
      <h2 className='my-4 ml-11'>Accounts Management</h2>
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { TransactionBase } from '@/types/type'
import { getAllTransactions } from '../transactions/transaction.util'
import { format } from 'date-fns' // Dùng thư viện date-fns để format ngày

export default function TransactionPage() {
  const [data, setData] = useState<TransactionBase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactions = await getAllTransactions()

        // const memberMap = members.reduce(
        //   (acc, member) => {
        //     acc[member.membershipId] = member.type
        //     return acc
        //   },
        //   {} as Record<string, string>
        // )
        const formattedTransactions = transactions.map((transaction) => ({
          ...transaction,
          completeTime: format(new Date(transaction.completeTime), 'dd/MM/yyyy HH:mm:ss')
        }))
        setData(formattedTransactions)
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
      <h2 className='container mx-auto my-4 ml-11'>Transaction Management</h2>
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

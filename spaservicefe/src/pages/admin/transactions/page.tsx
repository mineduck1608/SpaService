import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { TransactionBase } from '@/types/type'
import { getAllCosmeticTransactions, getAllServiceTransactions, getAllTransactions } from '../transactions/transaction.util'
import { format, parseISO } from 'date-fns'

export default function TransactionPage() {
  const [data, setData] = useState<TransactionBase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactions, cosmeticTransactions, serviceTransactions] = await Promise.all([
          getAllTransactions(),
          getAllCosmeticTransactions(),
          getAllServiceTransactions()
        ])

        const cosmeticMap = cosmeticTransactions.reduce((acc, ct) => {
          acc[ct.transactionId] = {
            fullName: ct.order?.customer?.fullName,
            phone: ct.order?.customer?.phone
          }
          return acc
        }, {} as Record<string, any>)

        const serviceMap = serviceTransactions.reduce((acc, st) => {
          acc[st.transactionId] = {
            fullName: st.request?.customer?.fullName,
            phone: st.request?.customer?.phone
          }
          return acc
        }, {} as Record<string, any>)

        const formattedTransactions = transactions
          .map((transaction) => {
            const isProduct = transaction.transactionType === 'Product'
            const customerData = isProduct
              ? cosmeticMap[transaction.transactionId]
              : serviceMap[transaction.transactionId]

            return {
              ...transaction,
              rawCompleteTime: new Date(transaction.completeTime),
              completeTime: format(new Date(transaction.completeTime), 'dd/MM/yyyy HH:mm:ss'),
              statusText: transaction.status ? 'Done' : 'Unfinished',
              name: customerData?.fullName || 'N/A',
              phone: customerData?.phone || 'N/A'
            }
          })
          .sort((a, b) => b.rawCompleteTime.getTime() - a.rawCompleteTime.getTime()
        )
        console.log(formattedTransactions)
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

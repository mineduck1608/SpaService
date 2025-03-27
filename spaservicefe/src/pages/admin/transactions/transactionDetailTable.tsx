import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '../../../components/ui/table'
import { ServiceTransaction, CosmeticTransaction, SpaRequest, Order } from '@/types/type'
import {
  getSpaRequestById,
  getOrderById,
  getAllServiceTransactions,
  getAllCosmeticTransactions
} from './transaction.util'

interface TransactionDetailTableProps {
  transactionId: string
  transactionType: string
}

export function TransactionDetailTable({ transactionId, transactionType }: TransactionDetailTableProps) {
  const [transactionDetails, setTransactionDetails] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        let fetchedDetails: any[] = []

        if (transactionType === 'Service') {
          const serviceTransactions: ServiceTransaction[] = await getAllServiceTransactions()
          const serviceTransaction = serviceTransactions.find((st) => st.transactionId === transactionId)
          if (serviceTransaction) {
            const spaRequest: SpaRequest[] = await getSpaRequestById(serviceTransaction.requestId)
            fetchedDetails = spaRequest ? [spaRequest] : []
            console.log(spaRequest)
          }
        } else if (transactionType === 'Product') {
          const cosmeticTransactions: CosmeticTransaction[] = await getAllCosmeticTransactions()
          const cosmeticTransaction = cosmeticTransactions.find((ct) => ct.transactionId === transactionId)
          if (cosmeticTransaction) {
            const order: Order[] = await getOrderById(cosmeticTransaction.orderId)
            fetchedDetails = order ? [order] : []
          }
        }

        setTransactionDetails(fetchedDetails)
      } catch (err) {
        setError('Failed to load data.')
      } finally {
        setLoading(false)
      }
    }
    fetchTransactionDetails()
  }, [transactionId, transactionType])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <Table>
      <TableBody>
        {transactionType === 'Service'
          ? transactionDetails.map((request: SpaRequest) => (
              <React.Fragment key={request.requestId}>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableCell>{request.service?.serviceName || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableCell>{request.customer?.fullName || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Start Time</TableHead>
                  <TableCell>{new Date(request.startTime).toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Customer Note</TableHead>
                  <TableCell>{request.customerNote || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Manager Note</TableHead>
                  <TableCell>{request.managerNote || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Request Status</TableHead>
                  <TableCell>{request.status}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableCell>{request.employee?.fullName || 'N/A'}</TableCell>
                </TableRow>
              </React.Fragment>
            ))
          : transactionDetails.map((order: Order) => (
              <React.Fragment key={order.orderId}>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableCell>{order.customer?.fullName || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Order Date</TableHead>
                  <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Total Amount</TableHead>
                  <TableCell>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableCell>{order.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Recepient Name</TableHead>
                  <TableCell>{order.recepientName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Process Status</TableHead>
                  <TableCell>{order.status ? 'Completed' : 'Pending'}</TableCell>
                </TableRow>
              </React.Fragment>
            ))}
      </TableBody>
    </Table>
  )
}

import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import { ServiceTransaction, CosmeticTransaction, SpaRequest, Order } from '@/types/type'
import { getSpaRequestById, getOrderById, getAllServiceTransactions, getAllCosmeticTransactions } from './transaction.util'

const formatPrice = (price: number) => price.toLocaleString('vi-VN')

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
          const serviceTransaction = serviceTransactions.find(st => st.transactionId === transactionId)
          if (serviceTransaction) {
            const spaRequest: SpaRequest[] = await getSpaRequestById(serviceTransaction.requestId)
            fetchedDetails = spaRequest ? [spaRequest] : []
          }
        } else if (transactionType === 'Cosmetic') {
          const cosmeticTransactions: CosmeticTransaction[] = await getAllCosmeticTransactions()
          const cosmeticTransaction = cosmeticTransactions.find(ct => ct.transactionId === transactionId)
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
      {transactionType === 'Service' ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>Customer Note</TableHead>
              <TableHead>Manager Note</TableHead>
              <TableHead>Request Status</TableHead>
              <TableHead>Employee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionDetails.map((request: SpaRequest, index) => (
              <TableRow key={request.requestId}>
                <TableCell>{request.service?.serviceName || 'N/A'}</TableCell>
                <TableCell>{request.customer?.fullName || 'N/A'}</TableCell>
                <TableCell>{new Date(request.startTime).toLocaleString()}</TableCell>
                <TableCell>{request.customerNote || 'N/A'}</TableCell>
                <TableCell>{request.managerNote || 'N/A'}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>{request.employee?.fullName || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Process Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionDetails.map((order: Order, index) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.customer?.fullName || 'N/A'}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Table>
  )
}


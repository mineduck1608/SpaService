import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '../../../components/ui/table'
import { OrderDetail } from '@/types/type'
import { getCosmeticProductById, getOrderDetailByOrderId } from 'src/pages/admin/orders/order.util'

const formatPrice = (price: number) => {
  return price.toLocaleString('vi-VN')
}

interface OrderDetailTableProps {
  orderId: string
}

export function OrderDetailTable({ orderId }: OrderDetailTableProps) {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const fetchedDetails = await getOrderDetailByOrderId(orderId)
        const enrichedDetails = await Promise.all(
          fetchedDetails.map(async (detail: OrderDetail) => {
            const product = await getCosmeticProductById(detail.productId)
            return { ...detail, product }
          })
        )
        setOrderDetails(enrichedDetails)
      } catch (err) {
        setError('Failed to load data.')
      } finally {
        setLoading(false)
      }
    }
    fetchOrderDetails()
  }, [orderId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <Table className='-mt-2 mb-5'>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className='text-right'>Subtotal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderDetails.map((detail, index) => {
          const { product } = detail

          return (
            <TableRow key={detail.orderDetailId}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{detail.quantity}</TableCell>
              <TableCell>{`${formatPrice(product.price)}`}</TableCell>
              <TableCell className='text-right'>{`${formatPrice(product.price * detail.quantity)}`}</TableCell>{' '}
            </TableRow>
          )
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className='text-right'>
            {`${formatPrice(
              orderDetails.reduce((total, detail) => {
                return total + detail.quantity * detail.product.price
              }, 0)
            )}`}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '../../../components/ui/table'
import { OrderDetail } from '@/types/type'
import { GetCosmeticProductById, GetOrderDetailByOrderId } from './order.util'

// Helper function to fetch product details by productId
const GetProductById = async (productId: string) => {
  const response = await fetch(`/api/products/${productId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch product details')
  }
  return response.json()
}

// Function to format the number with commas
const formatPrice = (price: number) => {
  return price.toLocaleString('vi-VN') // Format as VND with comma separators
}

interface OrderDetailTableProps {
  orderId: string // The orderId passed as a prop
}

export function OrderDetailTable({ orderId }: OrderDetailTableProps) {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]) // State to store order details
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const fetchedDetails = await GetOrderDetailByOrderId(orderId) // Fetch order details using orderId
        const enrichedDetails = await Promise.all(
          fetchedDetails.map(async (detail: OrderDetail) => {
            // Fetch product details for each order detail
            const product = await GetCosmeticProductById(detail.productId)
            return { ...detail, product }
          })
        )
        setOrderDetails(enrichedDetails) // Store the enriched order details
      } catch (err) {
        setError('Failed to load data.')
      } finally {
        setLoading(false)
      }
    }
    fetchOrderDetails()
  }, [orderId]) // Fetch data whenever the orderId changes

  // Check if data is still loading or an error occurred
  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <Table>
      <TableCaption>Order Details</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead> {/* New column for No */}
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className='text-right'>Subtotal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderDetails.map((detail, index) => {
          // Using index to generate incremental numbers for "No"
          const { product } = detail // Get the product details

          return (
            <TableRow key={detail.orderDetailId}>
              <TableCell>{index + 1}</TableCell> {/* Displaying the incremented "No" */}
              <TableCell>{product.productName}</TableCell>
              <TableCell>{detail.quantity}</TableCell>
              <TableCell>{`${formatPrice(product.price)}`}</TableCell> {/* Price in VND with commas */}
              <TableCell className='text-right'>{`${formatPrice(product.price * detail.quantity)}`}</TableCell>{' '}
              {/* Subtotal in VND with commas */}
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

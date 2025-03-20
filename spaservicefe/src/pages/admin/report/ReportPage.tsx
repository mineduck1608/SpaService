import { formatDate } from 'date-fns'
import dayjs from 'dayjs'
import React from 'react'

export default function ReportPage() {
  const lower = dayjs().add(-3, 'M').toDate()
  const now = dayjs().toDate()
  return (
    <div>
      <h3>1. General information</h3>
      <div className='flex w-1/2 justify-between gap-5'>
        <p className='grid'>
          Start date: <span>{formatDate(lower, 'dd/MM/yyyy')}</span>
        </p>
        <p className='grid'>
          End date: <span>{formatDate(now, 'dd/MM/yyyy')}</span>
        </p>
      </div>
      <div className='flex justify-between gap-5'>
        <p className='grid'>
          Total revenue: <span>{formatDate(lower, 'dd/MM/yyyy')}</span>
        </p>
        <p className='grid'>
          Revenue from spa services: <span>{formatDate(now, 'dd/MM/yyyy')}</span>
        </p>
        <p className='grid'>
          Revenue from products: <span>{formatDate(now, 'dd/MM/yyyy')}</span>
        </p>
      </div>
      <div className='flex w-1/2 justify-between gap-5'>
        <p className='grid'>
          New customers: <span>{formatDate(lower, 'dd/MM/yyyy')}</span>
        </p>
        <p className='grid'>
          New employees: <span>{formatDate(now, 'dd/MM/yyyy')}</span>
        </p>
      </div>
      <h3>2. Services</h3>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Service</th>
            <th>Requested count</th>
            <th>Appointment count</th>
            <th>Ratings</th>
            <th>Gender distribution (Appointment)</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <h3>3. Products</h3>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Product</th>
            <th>Order count</th>
            <th>Revenue</th>
            <th>Ratings</th>
            <th>Gender distribution</th>
            <th>Current in stock</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  )
}

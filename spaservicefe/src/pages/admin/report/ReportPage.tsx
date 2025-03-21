import { formatDate } from 'date-fns'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { getProductStat, getRevenues, getServiceStat } from './reportPage.util'
import { ProductStat, ServiceStat } from '@/types/statistic'
import { formatNumber } from '../../servicesPage/servicesPage.util'
import ServiceTable from './serviceTable'
import ProductTable from './productTable'
import { Margin, usePDF } from 'react-to-pdf'

export default function ReportPage() {
  const lower = dayjs().add(-3, 'M').toDate()
  const now = dayjs().toDate()
  const [revenue, setRevenue] = useState({
    service: 0,
    product: 0,
    total: 0
  })
  const [products, setProducts] = useState<ProductStat[]>([])
  const [services, setServices] = useState<ServiceStat[]>([])
  const { toPDF, targetRef } = usePDF({
    filename: 'report.pdf',
    page: {
      margin: Margin.NONE
    },
    overrides: {
      pdf: {
        compress: true
      },
      canvas: {
        useCORS: true
      }
    },
    resolution: 1
  })
  const [bounds, setBounds] = useState({
    start: dayjs(),
    end: dayjs()
  })
  async function getData() {
    const response = await getRevenues()
    setRevenue(response)
    const products = await getProductStat()
    setProducts(products)
    const services = await getServiceStat()
    setServices(services)
  }
  useEffect(() => {
    try {
      getData()
    } catch (e) { }
  }, [])
  return (
    <div className='p-1'>
      <button
        onClick={() => {
          toPDF()
        }}
        className='mb-2 rounded-sm bg-purple1 p-1 px-2 text-white'
      >
        Download report
      </button>
      <div ref={targetRef} className='border-1 w-full border-black bg-white p-2'>
        <h3 className='mb-3'>1. General information</h3>
        <div className='flex w-1/2 justify-between gap-5'>
          <p>
            Start date: <span>{formatDate(lower, 'dd/MM/yyyy')}</span>
          </p>
          <p>
            End date: <span>{formatDate(now, 'dd/MM/yyyy')}</span>
          </p>
        </div>
        <div className='flex justify-between gap-5'>
          <p>
            Total revenue: <span>{formatNumber(revenue.total)} VND</span>
          </p>
          <p className='ml-12'>
            Revenue from spa services: <span>{formatNumber(revenue.service)} VND</span>
          </p>
          <p>
            Revenue from products: <span>{formatNumber(revenue.product)} VND</span>
          </p>
        </div>
        <div className='flex w-1/2 justify-between gap-5'>
          <p >
            New customers: <span>{formatDate(lower, 'dd/MM/yyyy')}</span>
          </p>
          <p>
            New employees: <span>{formatDate(now, 'dd/MM/yyyy')}</span>
          </p>
        </div>
        <h3 className='mb-3'>2. Services</h3>
        <ServiceTable data={services} />
        <h3 className='mb-3'>3. Products</h3>
        <ProductTable data={products} />
      </div>
    </div>
  )
}

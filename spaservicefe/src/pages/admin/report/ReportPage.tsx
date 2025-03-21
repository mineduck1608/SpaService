import { formatDate } from 'date-fns'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { getProductStat, getRevenues, getServiceStat } from './reportPage.util'
import { ProductStat, ServiceStat } from '@/types/statistic'
import { formatNumber } from '../../../pages/servicesPage/servicesPage.util'
import ServiceTable from './serviceTable'
import ProductTable from './productTable'

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
  const {} = usePDF({filename: 'report.pdf'})
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
    } catch (e) {}
  }, [])
  return (
    <div className='p-1'>
      <div className='border-1 border-black bg-white p-2'>
        <h3>1. General information</h3>
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
            Total revenue: <span>{formatNumber(revenue.total)}</span>
          </p>
          <p>
            Revenue from spa services: <span>{formatNumber(revenue.service)}</span>
          </p>
          <p>
            Revenue from products: <span>{formatNumber(revenue.product)}</span>
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
        <ServiceTable data={services} />
        <h3>3. Products</h3>
        <ProductTable data={products} />
      </div>
    </div>
  )
}

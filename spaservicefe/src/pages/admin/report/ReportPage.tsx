import { formatDate } from 'date-fns'
import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
import { getProductStat, getRevenues, getServiceStat } from './reportPage.util'
import { ProductStat, ServiceStat } from '@/types/statistic'
import { formatNumber } from '../../servicesPage/servicesPage.util'
import ServiceTable from './serviceTable'
import ProductTable from './productTable'
import { Margin, usePDF } from 'react-to-pdf'
import { DatePicker } from 'antd'

export default function ReportPage() {
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
    start: dayjs().add(-3, 'M'),
    end: dayjs()
  })
  const [reportBounds, setReportBounds] = useState({
    start: dayjs().add(-3, 'M'),
    end: dayjs()
  })
  async function getData(lower: Dayjs, upper: Dayjs, onDone?: () => void) {
    const response = await getRevenues(lower, upper)
    setRevenue(response)
    const products = await getProductStat(lower, upper)
    setProducts(products)
    const services = await getServiceStat(lower, upper)
    setServices(services)
    onDone?.()
  }
  async function exportPDF() {
    setReportBounds(bounds)
    await getData(bounds.start, bounds.end)
    toPDF()
  }
  useEffect(() => {
    try {
      getData(reportBounds.start, reportBounds.end)
    } catch (e) {}
  }, [])
  return (
    <div className='p-1'>
      <div>
        <span>
          From:&nbsp;
          <DatePicker
            maxDate={bounds.end}
            placeholder='Start Date'
            value={bounds.start}
            onChange={(e) => {
              setBounds({ ...bounds, start: e ?? dayjs() })
            }}
            format={{
              format: 'DD/MM/YYYY'
            }}
          />
          &nbsp;to&nbsp;
          <DatePicker
            minDate={bounds.start}
            maxDate={dayjs()}
            placeholder='End Date'
            value={bounds.end}
            onChange={(e) => {
              setBounds({ ...bounds, end: e ?? dayjs() })
            }}
            format={{
              format: 'DD/MM/YYYY'
            }}
          />
          &nbsp;
        </span>
        <button onClick={exportPDF} className='mb-2 rounded-sm bg-purple1 p-1 px-2 text-white'>
          Download report
        </button>
      </div>
      <div ref={targetRef} className='border-1 w-full border-black bg-white p-2'>
        <h3 className='mb-3'>1. General information</h3>
        <div className='flex w-1/2 justify-between gap-5'>
          <p>
            Start date: <span>{formatDate(reportBounds.start.toDate(), 'dd/MM/yyyy')}</span>
          </p>
          <p>
            End date: <span>{formatDate(reportBounds.end.toDate(), 'dd/MM/yyyy')}</span>
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
          <p>
            New customers: <span></span>
          </p>
          <p>
            New employees: <span></span>
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

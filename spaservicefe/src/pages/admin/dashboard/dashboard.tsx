import React, { useEffect, useState } from 'react'
import { PieChartComp } from './pie-chart.tsx'

import {
  CategoryRevenue,
  fetchAppointmentByGender,
  fetchFeedbackOrderByRating,
  fetchNumOfCustomers,
  fetchTransactionsByCosmeticCategory,
  fetchTransactionsByServiceCategory,
  fetchTransactionsOrderByDay,
  fetchTransactionsOrderByMonth,
  GenderData
} from './dashboard.util.ts'
import { LineChartComp } from './line-chart.tsx'
import { RadarChartComp } from './radar-chart.tsx'
import { getAllServiceCategories } from '../servicecategories/servicecategory.util.ts'
import { RadialChartComp } from './radial-chart.tsx'
import { AreaChart2Comp } from './area-chart2.tsx'
import { BarChartComp } from './bar-chart.tsx'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
  const [yearRevenue, setYearRevenue] = useState<{ date: string; revenue: number }[]>([])
  const [serviceCatData, setServiceCatData] = useState<CategoryRevenue[]>([])
  const [productCatData, setProductCatData] = useState<CategoryRevenue[]>([])
  const [radialData, setRadialData] = useState({
    total: 1,
    newCustomers: 1
  })
  const [areaChart, setAreaChart] = useState<{ date: string; service: number; product: number }[]>([])
  const [pieData, setPieData] = useState<{ rating: number; count: number }[]>([])
  const [barData, setBarData] = useState<GenderData[]>([])
  async function findYearRevenues() {
    try {
      var s = await fetchTransactionsOrderByMonth()
      if ((s as { msg: string }).msg) {
        return
      }
      setYearRevenue(s as { date: string; revenue: number }[])
    } catch (e) {}
  }
  async function findRevenueByServiceCat() {
    try {
      var s = await fetchTransactionsByServiceCategory()
      if ((s as { msg: string }).msg) {
        return
      }
      var cat = await getAllServiceCategories()
      var y = s as CategoryRevenue[]
      y.forEach((v) => (v.category = cat.find((x) => x.categoryId === v.category)?.categoryName ?? ''))
      setServiceCatData(y)
    } catch (e) {}
  }
  async function findRevenueByCosmeticCat() {
    try {
      var s = await fetchTransactionsByCosmeticCategory()
      if ((s as { msg: string }).msg) {
        return
      }
      setProductCatData(s as CategoryRevenue[])
    } catch (e) {}
  }
  async function findCustomerNumber() {
    try {
      var s = await fetchNumOfCustomers()
      if ((s as { msg: string }).msg) {
        return
      }
      setRadialData(s as { total: number; newCustomers: number })
    } catch (e) {}
  }
  async function findFeedbacks() {
    try {
      var s = await fetchFeedbackOrderByRating()
      if ((s as { msg: string }).msg) {
        return
      }
      setPieData(s as { rating: number; count: number }[])
    } catch (e) {}
  }
  async function findRevenueByDays() {
    try {
      var s = await fetchTransactionsOrderByDay()
      if ((s as { msg: string }).msg) {
        return
      }
      setAreaChart(
        s as {
          date: string
          service: number
          product: number
        }[]
      )
    } catch (e) {}
  }
  async function findGenderData() {
    try {
      var s = await fetchAppointmentByGender()
      if ((s as { msg: string }).msg) {
        return
      }
      setBarData(s as GenderData[])
    } catch (e) {}
  }
  useEffect(() => {
    findYearRevenues()
    findRevenueByServiceCat()
    findCustomerNumber()
    findRevenueByDays()
    findFeedbacks()
    findRevenueByCosmeticCat()
    findGenderData()
  }, [])
  return (
    <div className='flex flex-1 flex-col gap-10 p-4'>
      <Link to='report' className=' p-1 no-underline'>
        Report
      </Link>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
        <RadarChartComp array={serviceCatData} />
        <LineChartComp array={yearRevenue} />
        <RadarChartComp array={productCatData} isProduct />
      </div>
      <div>
        <AreaChart2Comp data={areaChart} />
      </div>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
        <RadialChartComp {...radialData} />
        <PieChartComp data={pieData} />
        <BarChartComp data={barData} />
      </div>
    </div>
  )
}

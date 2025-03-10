import React, { useEffect, useState } from 'react'
import { AreaChartComp } from 'src/components/chart/area-chart'
import { PieChartComp } from 'src/components/chart/pie-chart'
import { BarChartComp } from 'src/components/chart/bar-chart'
import {
  CategoryRevenue,
  fetchNumOfCustomers,
  fetchTransactionsByServiceCategory,
  fetchTransactionsOrderByDay,
  fetchTransactionsOrderByMonth
} from './dashboard.util.ts'
import { toast } from 'react-toastify'
import { LineChartComp } from './line-chart.tsx'
import { RadarChartComp } from './radar-chart.tsx'
import { getAllServiceCategories } from '../servicecategories/servicecategory.util.ts'
import { RadialChartComp } from './radial-chart.tsx'
import { AreaChart2Comp } from './area-chart2.tsx'

export const Dashboard = () => {
  const [lineChartData, setLineChartData] = useState<number[]>([])
  const [radarChartData, setRadarChartData] = useState<CategoryRevenue[]>([])
  const [radialData, setRadialData] = useState({
    total: 1,
    newCustomers: 1
  })
  const [areaChart, setAreaChart] = useState<{ date: string; service: number; product: number }[]>([])
  async function findYearRevenues() {
    try {
      var s = await fetchTransactionsOrderByMonth()
      if ((s as { msg: string }).msg) {
        return
      }
      setLineChartData(s as number[])
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
      setRadarChartData(y)
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
  useEffect(() => {
    findYearRevenues()
    findRevenueByServiceCat()
    findCustomerNumber()
    findRevenueByDays()
  }, [])
  return (
    <div className='flex flex-1 flex-col gap-10 p-4'>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
        <LineChartComp array={lineChartData} />
        <RadarChartComp array={radarChartData} />
        <RadialChartComp {...radialData} />
      </div>
      <div>
        <AreaChart2Comp data={areaChart}/>
      </div>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
        {/* <AreaChartComp /> */}
        <PieChartComp />
        <BarChartComp />
      </div>
    </div>
  )
}

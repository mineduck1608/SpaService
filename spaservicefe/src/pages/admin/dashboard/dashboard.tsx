import React, { useEffect, useState } from 'react'
import { AreaChartComp } from 'src/components/chart/area-chart'
import { PieChartComp } from 'src/components/chart/pie-chart'
import { BarChartComp } from 'src/components/chart/bar-chart'
import { AreaChart2Comp } from 'src/components/chart/area-chart2'
import { RadialChartComp } from 'src/components/chart/radial-chart'
import { CategoryRevenue, fetchTransactionsByServiceCategory, fetchTransactionsOrderByMonth } from './dashboard.util.ts'
import { toast } from 'react-toastify'
import { LineChartComp } from './line-chart.tsx'
import { RadarChartComp } from './radar-chart.tsx'
import { getAllServiceCategories } from '../servicecategories/servicecategory.util.ts'

export const Dashboard = () => {
  const [lineChartData, setLineChartData] = useState<number[]>([])
  const [radarChartData, setRadarChartData] = useState<CategoryRevenue[]>([])
  async function findYearRevenues() {
    try {
      var s = await fetchTransactionsOrderByMonth()
      if ((s as { msg: string }).msg) {
        toast.error((s as { msg: string }).msg)
        return
      }
      setLineChartData(s as number[])
    } catch (e) {}
  }
  async function findRevenueByServiceCat() {
    try {
      var s = await fetchTransactionsByServiceCategory()
      if ((s as { msg: string }).msg) {
        toast.error((s as { msg: string }).msg)
        return
      }
      var cat = await getAllServiceCategories()
      var y = s as CategoryRevenue[]
      y.forEach((v) => (v.category = cat.find((x) => x.categoryId === v.category)?.categoryName ?? ''))
      setRadarChartData(y)
    } catch (e) {}
  }
  useEffect(() => {
    findYearRevenues()
    findRevenueByServiceCat()
  }, [])
  return (
    <div className='flex flex-1 flex-col gap-10 p-4'>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
        <LineChartComp array={lineChartData} />
        <RadarChartComp array={radarChartData} />
        <RadialChartComp />
      </div>
      <div>
        <AreaChart2Comp />
      </div>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
        <AreaChartComp />
        <PieChartComp />
        <BarChartComp />
      </div>
    </div>
  )
}

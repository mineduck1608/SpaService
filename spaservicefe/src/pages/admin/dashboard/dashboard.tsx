import React, { useEffect, useState } from 'react'
import { AreaChartComp } from 'src/components/chart/area-chart'
import { PieChartComp } from 'src/components/chart/pie-chart'
import { BarChartComp } from 'src/components/chart/bar-chart'
import { AreaChart2Comp } from 'src/components/chart/area-chart2'
import { LineChartComp } from 'src/components/chart/line-chart'
import { RadarChartComp } from 'src/components/chart/radar-chart'
import { RadialChartComp } from 'src/components/chart/radial-chart'
import { fetchTransactionsOrderByMonth } from './dashboard.util.ts'
import { toast } from 'react-toastify'

export const Dashboard = () => {
  const [lineChartData, setLineChartData] = useState<number[]>([])
  async function findRevenues() {
    try {
      var s = await fetchTransactionsOrderByMonth()
      if ((s as { msg: string }).msg) {
        toast.error((s as { msg: string }).msg)
        return
      }
      setLineChartData(s as number[])
    } catch (e) {}
  }
  useEffect(() => {
    findRevenues()
  }, [])
  return (
    <div className='flex flex-1 flex-col gap-10 p-4'>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
        <LineChartComp array={lineChartData} />
        <RadarChartComp />
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

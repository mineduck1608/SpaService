import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'src/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from 'src/components/ui/chart'
import { getMonthlyAppointments } from './employee.util'

interface EmployeeStatisticProps {
  employee: any
  year: number
}

export const barChartConfig = {
  total: {
    label: 'Total Appointments: ',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

export default function StatisticCard({ employee, year }: EmployeeStatisticProps) {
  const [barChartData, setBarChartData] = useState<any[]>([])
  const [change, setChange] = useState<number | null>(null)

  useEffect(() => {
    if (employee && employee.employeeId) {
      const fetchAppointments = async () => {
        const data = await getMonthlyAppointments(employee.employeeId, year)
        const monthlyInYear = Array.from({ length: 12 }, (_, index) => {
          const monthName = new Date(year, index).toLocaleString('en-US', { month: 'long' })
          const monthData = data.find((item: any) => item.month === monthName)
          return {
            month: monthName,
            total: monthData ? monthData.totalAppointments : 0
          }
        })
        setBarChartData(monthlyInYear)

        const monthlyMap = Object.fromEntries(monthlyInYear.map(({ month, total }) => [month, total]))
        const now = new Date()
        const currentTotal = monthlyMap[now.toLocaleString('en-US', { month: 'long' })] || 0
        const lastTotal =
          monthlyMap[new Date(now.setMonth(now.getMonth() - 1)).toLocaleString('en-US', { month: 'long' })] || 0

        setChange(lastTotal ? ((currentTotal - lastTotal) / lastTotal) * 100 : null)
      }
      fetchAppointments()
    }
  }, [employee, year])

  return (
    <Card className='-mt-5 rounded-none border-white bg-transparent shadow-none'>
      <CardHeader className='text-lg'>
        <CardTitle>Employee Performance Overview</CardTitle>
        <CardDescription>January - December {year}</CardDescription>
      </CardHeader>
      <CardContent className='px-32'>
        <ChartContainer config={barChartConfig}>
          <BarChart data={barChartData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey='total' fill='var(--color-total)' radius={8}>
              <LabelList position='top' offset={12} className='fill-foreground' fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-center justify-center gap-2 text-sm'>
        <div className='flex gap-2 font-medium'>
          {change === null ? (
            'No data for last month'
          ) : (
            <>
              {` Trending ${change > 0 ? 'up' : 'down'} by ${Math.abs(change).toFixed(2)}%`}
              {change > 0 ? <TrendingUp color='green' /> : <TrendingDown color='red' />}
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

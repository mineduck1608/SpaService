import { TrendingUp } from 'lucide-react'
import { Line, LineChart, XAxis, CartesianGrid, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from 'src/components/ui/chart'
import { lineChartData, lineChartConfig } from './chart.util'
import { array } from 'zod'
import { lineChartXAxis } from '../../pages/admin/dashboard/dashboard.util'

export function LineChartComp(params: { array: number[] }) {
  const data = lineChartXAxis(params.array)
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Revenue this year</CardTitle>
        <CardDescription>
          <div className='flex items-center gap-2 text-2xl font-semibold'>
            1,194 <TrendingUp className='h-5 w-5' />
          </div>
        </CardDescription>
        <CardDescription className='text-base text-green-500'>+ 20.1% from last month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={lineChartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 6,
              right: 6
            }}
          >
            <XAxis dataKey='month' tickLine={true} axisLine={true} tickMargin={5} />
            <YAxis dataKey={'revenue'} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey='revenue'
              type='linear'
              stroke='var(--color-views)'
              strokeWidth={2}
              dot={{
                fill: 'var(--color-views)'
              }}
              activeDot={{
                r: 6
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

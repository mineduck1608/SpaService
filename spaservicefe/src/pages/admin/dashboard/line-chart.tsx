import { TrendingUp } from 'lucide-react'
import { Line, LineChart, XAxis, CartesianGrid, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from 'src/components/ui/chart'
import { lineChartData, lineChartConfig } from '../../../components/chart/chart.util'
import { array } from 'zod'
import { lineChartXAxis } from './dashboard.util'

export function LineChartComp(params: { array: number[] }) {
  const data = lineChartXAxis(params.array)
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Revenue this year</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={lineChartConfig} className=''>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: -4,
              right: 0
            }}
            className='p-1'
          >
            <XAxis dataKey='month' />
            <YAxis dataKey={'revenue'} tickLine />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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

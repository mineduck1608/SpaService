import { Line, LineChart, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from 'src/components/ui/chart'
import { lineChartConfig } from '../../../components/chart/chart.util'

export function LineChartComp(params: { array: { date: string; revenue: number }[] }) {
  const data = params.array
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
            <XAxis dataKey='date' />
            <YAxis dataKey={'revenue'} tickLine />
            <ChartTooltip cursor={false} content={<ChartTooltipContent unit='đ' />} />
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

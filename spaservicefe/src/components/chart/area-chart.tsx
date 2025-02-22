import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'src/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from 'src/components/ui/chart'
import { areaChartData1, areaChartConfig1 } from './chart.util'

export function AreaChartComp() {
  return (
    <Card>
      <CardHeader className='mt-4 text-lg'>
        <CardTitle>Ad Performance Overview</CardTitle>
        <CardDescription>Showing total visitors via ads for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={areaChartConfig1}>
          <AreaChart
            accessibilityLayer
            data={areaChartData1}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dot' />} />
            <Area
              dataKey='mobile'
              type='natural'
              fill='var(--color-mobile)'
              fillOpacity={0.4}
              stroke='var(--color-mobile)'
              stackId='a'
            />
            <Area
              dataKey='facebook'
              type='natural'
              fill='var(--color-facebook)'
              fillOpacity={0.4}
              stroke='var(--color-facebook)'
              stackId='a'
            />
            <Area
              dataKey='google'
              type='natural'
              fill='var(--color-google)'
              fillOpacity={0.4}
              stroke='var(--color-google)'
              stackId='a'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 font-medium leading-none'>
              Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
            </div>
            <div className='flex items-center gap-2 leading-none text-muted-foreground'>January - June 2024</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

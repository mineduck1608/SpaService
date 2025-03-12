import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'src/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from 'src/components/ui/chart'
import { barChartData, barChartConfig } from '../../../components/chart/chart.util'
import { GenderData } from './dashboard.util'

export function BarChartComp(params: { data: GenderData[] }) {
  return (
    <Card>
      <CardHeader className='flex text-lg'>
        <CardTitle className='pb-0 text-center text-lg'>Customer Trends</CardTitle>
        <CardDescription className='text-center'>Up to 1 year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={barChartConfig} className='aspect-auto h-[250px]'>
          <BarChart accessibilityLayer data={params.data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey='date' tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dashed' />} />
            <Bar dataKey='female' fill='var(--color-female)' radius={4} />
            <Bar dataKey='male' fill='var(--color-male)' radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>Showing total visitors for the last 6 months</div>
      </CardFooter> */}
    </Card>
  )
}

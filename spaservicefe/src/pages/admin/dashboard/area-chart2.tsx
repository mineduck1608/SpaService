import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from 'src/components/ui/chart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
import { areaChartData, areaChartConfig } from '../../../components/chart/chart.util'

export function AreaChart2Comp(params: { data: { date: string; service: number; product: number }[] }) {
  const [timeRange, setTimeRange] = React.useState('90')
  const filteredData = params.data
  .filter((v, i) => {
    return i >= params.data.length - parseInt(timeRange)
  })
  return (
    <Card>
      <CardHeader className='flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row'>
        <div className='flex-1text-center ml-5 grid text-lg sm:text-left'>
          <CardTitle className='mb-1'>Revenue by day</CardTitle>
          <CardDescription>Showing revenue from services and products</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className='w-[160px] rounded-lg sm:ml-auto' aria-label='Select a value'>
            <SelectValue placeholder='Last 3 months' />
          </SelectTrigger>
          <SelectContent className='rounded-xl'>
            <SelectItem value='90' className='rounded-lg'>
              Last 3 months
            </SelectItem>
            <SelectItem value='30' className='rounded-lg'>
              Last 30 days
            </SelectItem>
            <SelectItem value='7' className='rounded-lg'>
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer config={areaChartConfig} className='aspect-auto h-[250px] w-full'>
          <AreaChart data={filteredData}>
            <CartesianGrid vertical={true} />
            <XAxis dataKey='date' tickLine={true} axisLine={true} tickMargin={8} minTickGap={32} />
            <YAxis axisLine />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dot' unit='đ' />} />
            <Area
              dataKey='service'
              type='monotone'
              fill='rgba(42, 157, 144, 0.5)'
              stroke='rgb(42, 157, 144)'
              stackId='service'
            />
            <Area
              dataKey='product'
              type='monotone'
              fill='rgba(231, 110, 80, 0.5)'
              stroke='rgb(231, 110, 80)'
              stackId='product'
            />
            <ChartLegend content={<BoxWithText />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const BoxWithText = () => {
  return (
    <div className='flex items-center justify-center gap-4'>
      {/* Service Box */}
      <div className='flex items-center gap-2'>
        <div className='h-[15px] w-[15px] bg-[rgb(42,157,144)]'></div>
        <span className='text-md'>Service</span>
      </div>

      {/* Product Box */}
      <div className='flex items-center gap-2'>
        <div className='h-[15px] w-[15px] bg-[rgb(231,110,80)]'></div>
        <span className='text-md'>Product</span>
      </div>
    </div>
  )
}

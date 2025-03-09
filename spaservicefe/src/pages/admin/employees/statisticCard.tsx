import React, { useState, useEffect } from 'react'
import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'src/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from 'src/components/ui/chart'

interface EmployeeStatisticProps {
  employee: any
}

export const barChartData = [
  { month: 'January', female: 186, male: 80 },
  { month: 'February', female: 305, male: 200 },
  { month: 'March', female: 237, male: 120 },
  { month: 'April', female: 73, male: 190 },
  { month: 'May', female: 209, male: 130 },
  { month: 'June', female: 214, male: 140 },
  { month: 'July', female: 140, male: 99 },
  { month: 'August', female: 250, male: 80 },
  { month: 'September', female: 214, male: 50 },
  { month: 'October', female: 140, male: 140 },
  { month: 'November', female: 240, male: 140 },
  { month: 'December', female: 214, male: 140 }
]

export const barChartConfig = {
  female: {
    label: 'Female',
    color: 'hsl(var(--chart-1))'
  },
  male: {
    label: 'Male',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig

export default function StatisticCard  ({ employee }: EmployeeStatisticProps) {
  const [efficiency, setEfficiency] = useState<any[]>([])
  
  useEffect(() => {
    
  }, [employee])

  return (
    <Card className='rounded-none border-white bg-transparent shadow-none -mt-5'>
      <CardHeader className='text-lg'>
        <CardTitle>Employee Performance Overview</CardTitle>
        <CardDescription>January - December 2025</CardDescription>
      </CardHeader>
      <CardContent className='px-36'>
        <ChartContainer config={barChartConfig}>
          <BarChart accessibilityLayer data={barChartData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey='month' tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey='female' fill='var(--color-female)' radius={8}>
              <LabelList position='top' offset={12} className='fill-foreground' fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-center justify-center gap-2 text-sm'>
        <div className='flex gap-2 font-medium'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
      </CardFooter>
    </Card>
  )
}

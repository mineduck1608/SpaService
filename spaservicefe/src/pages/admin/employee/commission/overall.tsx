import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from 'src/components/ui/chart'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface EmployeeStatisticProps<TData> {
  year: number
  data: TData[]
}

const chartConfig = {
  service: {
    label: 'Service',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

export default function Overall<TData>({ year, data }: EmployeeStatisticProps<TData>) {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(new Date().getMonth())
  const [totalCommissions, setTotalCommission] = useState<number | null>(null)
  const [chartData, setChartData] = useState<any[]>([])
  
  const handlePreviousMonth = () => {
    setSelectedMonthIndex((prev) => (prev === 0 ? 11 : prev - 1))
  }

  const handleNextMonth = () => {
    setSelectedMonthIndex((prev) => (prev === 11 ? 0 : prev + 1))
  }

  useEffect(() => {
    if (data.length === 0) return
      const fetchCommissions = async () => {
        const commissionByMonth = Array(12).fill(0).map(() => ({ service: 0 }))

      for (const item of data) {
        const month = new Date(item.date).getMonth()
        commissionByMonth[month].service += item.commissionValue
      }

      const formattedChartData = commissionByMonth.map((commissions, index) => ({
        month: index + 1,
        service: commissions.service || 0,
      }))

      setChartData(formattedChartData)
    }
    fetchCommissions()
  }, [data, year])

  useEffect(() => {
    if (chartData.length > 0) {
      const selectedMonthData = chartData[selectedMonthIndex] || { service: 0 }
      setTotalCommission(selectedMonthData.service)
    }
  }, [chartData, selectedMonthIndex])

  const selectedMonthData =
    chartData.length > 0 ? [{ service: chartData[selectedMonthIndex]?.service || 0 }]: []

  const isDataEmpty =
    !selectedMonthData[0] || (selectedMonthData[0].service === 0)

  return (
    <Card className='-z-10 -mt-10 flex flex-col rounded-none border-white bg-transparent font-montserrat shadow-none'>
      <CardHeader className='items-center pb-0'>
        <div className='flex items-center justify-between'>
          <button onClick={handlePreviousMonth} className='mr-5 cursor-pointer hover:outline'>
            <ChevronLeft className='h-5 w-5 text-gray-500' />
          </button>
          <CardTitle className='text-xl'>Total Commission</CardTitle>
          <button onClick={handleNextMonth} className='ml-5 cursor-pointer hover:outline'>
            <ChevronRight className='h-5 w-5 text-gray-500' />
          </button>
        </div>
      </CardHeader>
      <CardDescription className='flex items-center justify-center text-lg'>
        {selectedMonthIndex + 1} - {year}
      </CardDescription>
      <CardContent className='-mt-5 flex flex-1 items-center pb-0'>
        <ChartContainer config={chartConfig} className='mx-auto aspect-square w-full max-w-[280px]'>
          {isDataEmpty ? (
            <p className='mt-20 text-center text-lg'>No data for this month</p>
          ) : (
            <RadialBarChart
              innerRadius={100}
              outerRadius={160}
              barSize={40}
              data={selectedMonthData}
              startAngle={180}
              endAngle={0}
            >
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle'>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className='fill-foreground text-2xl font-bold'
                          >
                            {totalCommissions?.toLocaleString()}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 4} className='fill-muted-foreground'>
                            VND
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey='service'
                stackId='a'
                fill='var(--color-service)'
                cornerRadius={5}
                className='stroke-transparent stroke-2'
              />
            </RadialBarChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

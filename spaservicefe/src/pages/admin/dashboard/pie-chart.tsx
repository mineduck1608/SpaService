import * as React from 'react'
import { TrendingUp } from 'lucide-react'
import { Label, Pie, PieChart } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'src/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from 'src/components/ui/chart'
import { pieChartData, pieChartConfig } from '../../../components/chart/chart.util'

export function PieChartComp(params: { data: { rating: number; count: number }[] }) {
  const colorMap = [
    'rgb(42, 157, 144)',
    'rgb(231, 110, 80)',
    'rgb(39, 71, 84)',
    'rgb(244, 164, 98)',
    'rgb(232, 196, 104)'
  ]
  const s = params.data.map((v) => {
    return {
      rating: v.rating,
      count: v.count,
      fill: colorMap[v.rating - 1]
    }
  })

  const [stats, setStats] = React.useState({
    count: 0,
    sum: 0
  })
  React.useEffect(() => {
    var count = 0, sum = 0
    for (let i = 0; i < s.length; i++) {
      var e = s[i]
      count = count + e.count
      sum = sum + e.count * e.rating
    }
    setStats({
      count: count,
      sum: sum
    })
  }, [params.data])
  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0 text-lg'>
        <CardTitle>Feedback Breakdown</CardTitle>
        <CardDescription>Up to 1 year</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer config={pieChartConfig} className='mx-auto aspect-square max-h-[350px]'>
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie data={s} dataKey='count' innerRadius={80} strokeWidth={4} nameKey='rating'>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                        <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-3xl font-bold'></tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 text-center font-medium leading-none'>
          Average: {(stats.sum / stats.count).toFixed(2)}
        </div>
      </CardFooter>
    </Card>
  )
}

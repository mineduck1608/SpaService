import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from 'src/components/ui/chart'
import { radarChartData, radarChartConfig } from './chart.util'

export function RadarChartComp() {
  return (
    <Card>
      <CardHeader className='items-center'>
        <CardTitle className='text-lg'>Service Trends</CardTitle>
      </CardHeader>
      <CardContent className='-mt-6 pb-0'>
        <ChartContainer config={radarChartConfig} className='mx-auto aspect-square max-h-[250px]'>
          <RadarChart data={radarChartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey='service' />
            <PolarGrid />
            <Radar
              dataKey='sales'
              fill='var(--color-sales)'
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

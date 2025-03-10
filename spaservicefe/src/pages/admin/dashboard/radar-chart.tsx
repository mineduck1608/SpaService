import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from 'src/components/ui/chart'
import { radarChartData, radarChartConfig } from '../../../components/chart/chart.util'
import { CategoryRevenue } from './dashboard.util'
import { useEffect, useState } from 'react'
import { getAllServiceCategories } from '../servicecategories/servicecategory.util'

export function RadarChartComp(params: { array: CategoryRevenue[] }) {
  return (
    <Card>
      <CardHeader className='items-center'>
        <CardTitle className='text-lg'>Service category revenue</CardTitle>
      </CardHeader>
      <CardContent className='-mt-6 pb-0'>
        <ChartContainer config={radarChartConfig} className='p-2 -m-5'>
          <RadarChart data={params.array}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey='category' />
            <PolarGrid />
            <Radar
              dataKey='revenue'
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

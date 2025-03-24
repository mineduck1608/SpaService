import { PolarGrid, RadialBar, RadialBarChart } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card'
import { ChartContainer } from 'src/components/ui/chart'
import { radialChartData, radialChartConfig } from './chart.util'

export function RadialChartComp() {
  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Registered Users</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className='-mt-3 flex-1 pb-0'>
        <ChartContainer config={radialChartConfig} className='mx-auto aspect-square max-h-[250px]'>
          <RadialBarChart data={radialChartData} endAngle={360} innerRadius={80} outerRadius={140}>
            <PolarGrid
              gridType='circle'
              radialLines={true}
              stroke='1'
              className='first:fill-muted last:fill-background'
              polarRadius={[75, 25]}
            />
            <RadialBar dataKey='visitors' additive='sum' />
            {/* <PolarRadiusAxis tick={true} tickLine={true} axisLine={true}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                        <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-4xl font-bold'>
                          {radialChartData[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
                          Users
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis> */}
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

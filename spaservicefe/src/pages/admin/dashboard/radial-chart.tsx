import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'src/components/ui/card'
import { ChartContainer } from 'src/components/ui/chart'
import { radialChartConfig } from '../../../components/chart/chart.util'

export function RadialChartComp(params: { total: number; newCustomers: number }) {
  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Registered Users</CardTitle>
        <CardDescription>Up to 1 year</CardDescription>
      </CardHeader>
      <CardContent className='h-[350px] flex-1 pb-0'>
        <ChartContainer config={radialChartConfig} className='aspect-auto h-full max-h-[250px]'>
          <RadialBarChart
            data={[{ newCustomers: params.newCustomers, fill: 'var(--color-safari)' }]}
            endAngle={360 * (params.newCustomers / params.total)}
            innerRadius={85}
            outerRadius={130}
          >
            <PolarGrid
              gridType='circle'
              radialLines={true}
              stroke='1'
              className='first:fill-muted last:fill-background'
              polarRadius={[90, 75]}
            />
            <RadialBar dataKey='newCustomers' />
            <PolarRadiusAxis>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                        <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-4xl font-bold'>
                          {params.newCustomers}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
                          New customers
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 text-center font-medium leading-none'>Total: {params.total}</div>
      </CardFooter>
    </Card>
  )
}

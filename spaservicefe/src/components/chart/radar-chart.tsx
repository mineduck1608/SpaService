import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "src/components/ui/chart"
const chartData = [
  { service: "Massage", sales: 305 },
  { service: "Removal", sales: 187 },
  { service: "Manicure", sales: 155 },
  { service: "Treatments", sales: 273 },
  { service: "Facial", sales: 209 },
]

const chartConfig = {
    sales: {
    label: "Booked",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function RadarChartComp() {
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle className="text-lg">Service Trends</CardTitle>
      </CardHeader>
      <CardContent className="pb-0 -mt-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="service" />
            <PolarGrid />
            <Radar
              dataKey="sales"
              fill="var(--color-sales)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

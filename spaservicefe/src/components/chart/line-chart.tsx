import { TrendingUp } from "lucide-react"
import { Line, LineChart, XAxis, CartesianGrid } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
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
  { month: "January", views: 186 },
  { month: "February", views: 305 },
  { month: "March", views: 237 },
  { month: "April", views: 72 },
  { month: "May", views: 209 },
  { month: "June", views: 214 },
]

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function LineChartComp() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Website Views</CardTitle>
        <CardDescription>
          <div className="text-2xl font-semibold flex items-center gap-2">
            1,194 <TrendingUp className="h-5 w-5" />
          </div>
        </CardDescription>
        <CardDescription className="text-base text-green-500">+ 20.1% from last month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="views"
              type="linear"
              stroke="var(--color-views)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-views)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

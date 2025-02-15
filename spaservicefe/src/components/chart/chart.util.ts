import { ChartConfig } from 'src/components/ui/chart'

export const lineChartData = [
    { month: "January", views: 186 },
    { month: "February", views: 305 },
    { month: "March", views: 237 },
    { month: "April", views: 72 },
    { month: "May", views: 209 },
    { month: "June", views: 214 },
]
  
export const lineChartConfig = {
    views: {
      label: "Views",
      color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export const radialChartData = [
    { browser: "safari", visitors: 245, fill: "var(--color-safari)" },
]

export const radialChartConfig = {
    visitors: {
      label: "Users",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export const radarChartData = [
    { service: "Massage", sales: 305 },
    { service: "Removal", sales: 187 },
    { service: "Manicure", sales: 155 },
    { service: "Treatments", sales: 273 },
    { service: "Facial", sales: 209 },
]
  
export const radarChartConfig = {
      sales: {
      label: "Booked",
      color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export const areaChartData1 = [
    { month: "January", facebook: 186, google: 80 },
    { month: "February", facebook: 305, google: 200 },
    { month: "March", facebook: 237, google: 120 },
    { month: "April", facebook: 73, google: 190 },
    { month: "May", facebook: 209, google: 130 },
    { month: "June", facebook: 214, google: 140 },
]

export const areaChartConfig1 = {
    facebook: {
      label: "Facebook Ads",
      color: "hsl(var(--chart-1))",
    },
    google: {
      label: "Google Ads",
      color: "hsl(var(--chart-2))",
    }
} satisfies ChartConfig

export const pieChartData = [
    { name: "massage", visitors: 275, fill: "var(--color-massage)" },
    { name: "facial", visitors: 200, fill: "var(--color-facial)" },
    { name: "package", visitors: 200, fill: "var(--color-package)" },
    { name: "removal", visitors: 173, fill: "var(--color-removal)" },
    { name: "other", visitors: 190, fill: "var(--color-other)" }
]

export const pieChartConfig = {
    visitors: {
      label: 'Visitors'
    },
    massage: {
      label: 'Massage',
      color: 'hsl(var(--chart-1))'
    },
    facial: {
      label: 'Facial',
      color: 'hsl(var(--chart-2))'
    },
    package: {
      label: "VIP package",
      color: "hsl(var(--chart-3))",
    },
    removal: {
      label: 'Hair Removal',
      color: 'hsl(var(--chart-4))'
    },
    other: {
      label: 'Other',
      color: 'hsl(var(--chart-5))'
    }
} satisfies ChartConfig

export const barChartData = [
    { month: "January", female: 186, male: 80 },
    { month: "February", female: 305, male: 200 },
    { month: "March", female: 237, male: 120 },
    { month: "April", female: 73, male: 190 },
    { month: "May", female: 209, male: 130 },
    { month: "June", female: 214, male: 140 },
]

export const barChartConfig = {
    female: {
      label: "Female",
      color: "hsl(var(--chart-1))",
    },
    male: {
      label: "Male",
      color: "hsl(var(--chart-2))",
    }
} satisfies ChartConfig

export const areaChartData = [
    { date: "2024-04-01", sales: 222},
    { date: "2024-04-02", sales: 97},
    { date: "2024-04-03", sales: 167},
    { date: "2024-04-04", sales: 242},
    { date: "2024-04-05", sales: 373},
    { date: "2024-04-06", sales: 301},
    { date: "2024-04-07", sales: 245},
    { date: "2024-04-08", sales: 409},
    { date: "2024-04-09", sales: 59},
    { date: "2024-04-10", sales: 261},
    { date: "2024-04-11", sales: 327},
    { date: "2024-04-12", sales: 292},
    { date: "2024-04-13", sales: 342},
    { date: "2024-04-14", sales: 137},
    { date: "2024-04-15", sales: 120},
    { date: "2024-04-16", sales: 138},
    { date: "2024-04-17", sales: 446},
    { date: "2024-04-18", sales: 364},
    { date: "2024-04-19", sales: 243},
    { date: "2024-04-20", sales: 89},
    { date: "2024-04-21", sales: 137},
    { date: "2024-04-22", sales: 224},
    { date: "2024-04-23", sales: 138},
    { date: "2024-04-24", sales: 387},
    { date: "2024-04-25", sales: 215},
    { date: "2024-04-26", sales: 75},
    { date: "2024-04-27", sales: 383},
    { date: "2024-04-28", sales: 122},
    { date: "2024-04-29", sales: 315},
    { date: "2024-04-30", sales: 454},
    { date: "2024-05-01", sales: 165},
    { date: "2024-05-02", sales: 293},
    { date: "2024-05-03", sales: 247},
    { date: "2024-05-04", sales: 385},
    { date: "2024-05-05", sales: 481},
    { date: "2024-05-06", sales: 498},
    { date: "2024-05-07", sales: 388},
    { date: "2024-05-08", sales: 149},
    { date: "2024-05-09", sales: 227},
    { date: "2024-05-10", sales: 293},
    { date: "2024-05-11", sales: 335},
    { date: "2024-05-12", sales: 197},
    { date: "2024-05-13", sales: 197},
    { date: "2024-05-14", sales: 448},
    { date: "2024-05-15", sales: 473},
    { date: "2024-05-16", sales: 338},
    { date: "2024-05-17", sales: 499},
    { date: "2024-05-18", sales: 315},
    { date: "2024-05-19", sales: 235},
    { date: "2024-05-20", sales: 177},
    { date: "2024-05-21", sales: 82},
    { date: "2024-05-22", sales: 81},
    { date: "2024-05-23", sales: 252},
    { date: "2024-05-24", sales: 294},
    { date: "2024-05-25", sales: 201},
    { date: "2024-05-26", sales: 213},
    { date: "2024-05-27", sales: 420},
    { date: "2024-05-28", sales: 233},
    { date: "2024-05-29", sales: 78},
    { date: "2024-05-30", sales: 340},
    { date: "2024-05-31", sales: 178},
    { date: "2024-06-01", sales: 178},
    { date: "2024-06-02", sales: 470},
    { date: "2024-06-03", sales: 103},
    { date: "2024-06-04", sales: 439 },
    { date: "2024-06-05", sales: 88},
    { date: "2024-06-06", sales: 294},
    { date: "2024-06-07", sales: 323},
    { date: "2024-06-08", sales: 385},
    { date: "2024-06-09", sales: 438},
    { date: "2024-06-10", sales: 155},
    { date: "2024-06-11", sales: 92},
    { date: "2024-06-12", sales: 492},
    { date: "2024-06-13", sales: 81},
    { date: "2024-06-14", sales: 426},
    { date: "2024-06-15", sales: 307},
    { date: "2024-06-16", sales: 371},
    { date: "2024-06-17", sales: 475},
    { date: "2024-06-18", sales: 107},
    { date: "2024-06-19", sales: 341},
    { date: "2024-06-20", sales: 408},
    { date: "2024-06-21", sales: 169},
    { date: "2024-06-22", sales: 317},
    { date: "2024-06-23", sales: 480},
    { date: "2024-06-24", sales: 132},
    { date: "2024-06-25", sales: 141},
    { date: "2024-06-26", sales: 434},
    { date: "2024-06-27", sales: 448},
    { date: "2024-06-28", sales: 149},
    { date: "2024-06-29", sales: 103},
    { date: "2024-06-30", sales: 446},
]

export const areaChartConfig = {
    visitors: {
      label: "Visitors",
    },
    sales: {
      label: "Reservations",
      color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig
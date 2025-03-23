export type ServiceStat = {
  serviceName: string
  serviceCategory: string
  statistic: {
    requestCount: number
    appointmentCount: number
    rating: number[]
    genderCount: number[]
    revenue: number
  }
}
export type ProductStat = {
  productName: string
  productCategory: string
  statistic: {
    orderCount: number
    currentInStock: number
    genderDistribution: number[]
    revenue: number
  }
}

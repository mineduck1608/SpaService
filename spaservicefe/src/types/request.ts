export type SpaRequest = {
  requestId?: string
  startTime: Date
  status?: string
  customerNote: string
  managerNote?: string
  serviceId: string
  customerId: string
  employeeId?: string | null
}

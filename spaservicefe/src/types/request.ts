export type SpaRequest = {
  id?: string,
  startTime: Date,
  status?: string
  customerNote: string,
  managerNote?: string,
  serviceId: string,
  customerId: string,
  employeeId?: string
}
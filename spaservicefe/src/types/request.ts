import { Dayjs } from 'dayjs'

export type SpaRequest = {
  requestId?: string
  startTime: Dayjs
  status?: string
  customerNote: string
  managerNote?: string
  serviceId: string
  customerId: string
  employeeId?: string | null
}

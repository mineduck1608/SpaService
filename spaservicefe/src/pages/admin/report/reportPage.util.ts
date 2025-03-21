import { apiUrl } from '../../../types/constants'
import { ProductStat, ServiceStat } from '@/types/statistic'
import dayjs, { Dayjs } from 'dayjs'

export async function getRevenues(lower?: Dayjs, upper?: Dayjs) {
  try {
    var total = await fetch(`${apiUrl}/transactions/GetTotalRevenue?lower=${lower}&upper=${upper}`)
    var s = (await total.json()) as { service: number; product: number; total: number }
    return s
  } catch (e) {
    return { service: -1, product: -1, total: -1 }
  }
}

export async function getServiceStat(lower?: Dayjs, upper?: Dayjs) {
  try {
    var stat = await fetch(`${apiUrl}/spaservices/GetStatistic?lower=${lower}&upper=${upper}`)
    var s = (await stat.json()) as ServiceStat[]
    return s
  } catch (e) {
    return []
  }
}

export async function getProductStat(lower?: Dayjs, upper?: Dayjs) {
  try {
    var stat = await fetch(`${apiUrl}/cosmeticproducts/GetStatistic?lower=${lower}&upper=${upper}`)
    var s = (await stat.json()) as ProductStat[]
    return s
  } catch (e) {
    return []
  }
}

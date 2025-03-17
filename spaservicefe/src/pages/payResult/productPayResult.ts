import { SessionItem } from '@/types/sessionItem'

export type ProductPayResult = {
  orderDate: string
  address: string
  recepientName: string
  phone: string
  cart: SessionItem[]
}

export function getQueryParamsMap(queryString: string): Map<string, string> {
  const paramsMap = new Map<string, string>()

  // Remove the leading "?" if present
  const query = queryString.startsWith('?') ? queryString.substring(1) : queryString

  query.split('&').forEach((param) => {
    const [key, value] = param.split('=')
    if (key) {
      paramsMap.set(decodeURIComponent(key), decodeURIComponent(value || ''))
    }
  })
  return paramsMap
}
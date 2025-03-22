import { Order } from '@/types/type'
import { apiUrl, getToken } from 'src/types/constants'

export async function getOrders(id: string) {
  try {
    var s = await fetch(`${apiUrl}/orders/GetOrderByCustomerId/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var r = (await s.json()) as Order[]
    return r
  } catch (e) {
    return []
  }
}
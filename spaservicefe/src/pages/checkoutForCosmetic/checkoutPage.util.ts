import { apiUrl } from '../../types/constants'

export type OrderRequest = {
  customerId: string
  address: string
  orderDate: Date
  paymentType: string
  promotionId?: string
  details: OrderDetailRequest[]
}
export type OrderDetailRequest = {
  productId: string
  quantity: number
}
export async function createOrder(params: OrderRequest) {
  try {
    const res = await fetch(`${apiUrl}/orders/Create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    const asJson = await res.json()
    if (asJson.id) {
      return asJson.id as string
    }
    return asJson.msg as string
  } catch (e) {
    return "Couldn't connect to server"
  }
}

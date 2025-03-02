import { apiUrl } from '../../types/constants'

export type OrderRequest = {
  customerId: string
  address: string
  orderDate: Date
  paymentType: string
  promotionCode?: string
  details: OrderDetailRequest[],
  recepientName?: string,
  phone?: string
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
      return { rs: asJson.transactionId as string, success: true, total: asJson.total as number }
    }
    return { rs: asJson.msg as string, success: false }
  } catch (e) {
    return { rs: "Couldn't connect to server", success: false }
  }
}

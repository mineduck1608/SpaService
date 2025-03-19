import { apiUrl } from '../../types/constants'

export type OrderRequest = {
  customerId: string
  address: string
  orderDate: Date
  paymentType: string
  promotionCode?: string
  details: OrderDetailRequest[]
  recepientName?: string
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

export function setCookie(cname: string, cvalue: string) {
  document.cookie = cname + '=' + cvalue + ';path=/'
}

export function getCookie(cname: string) {
  let name = cname + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

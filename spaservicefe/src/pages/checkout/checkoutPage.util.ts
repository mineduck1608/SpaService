import { SpaRequest } from '@/types/request'
import { apiUrl, getToken } from '../../types/constants'
import { Customer, Employee, Membership, Promotion } from '@/types/type'
import { setCookie } from '../checkoutForCosmetic/checkoutPage.util'

export async function getEmployees(id: string) {
  try {
    var s = await fetch(`${apiUrl}/employees/GetEmployeeByCategoryId/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    if (s.ok) {
      return (await s.json()) as Employee[]
    }
    return await s.text()
  } catch (e) {
    return []
  }
}

export async function submitRequest(req: SpaRequest) {
  try {
    console.log(req)
    var s = await fetch(`${apiUrl}/requests/Create`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(req)
    })
    if (s.ok) {
      return (await s.json()) as SpaRequest
    }
    return await s.json()
  } catch (e) {
    return "Couldn't connect to server"
  }
}

export async function getPaymentUrl(txnId: string) {
  try {
    var s = await fetch(`${apiUrl}/Payment/service`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(txnId)
    })
    return await s.text()
  } catch (e) {
    return "Couldn't connect to server"
  }
}

export async function createTransaction(
  method: string,
  price: number,
  requestId: string,
  promoCode?: string,
  membershipId?: string
) {
  var tmp = {
    paymentType: method,
    transactionType: 'Service',
    totalPrice: price,
    status: false,
    requestId: requestId,
    promotionCode: promoCode,
    membershipId: membershipId
  }
  try {
    var s = await fetch(`${apiUrl}/transactions/Create`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(tmp)
    })
    if (s.ok) {
      return (await s.json()) as Transaction
    }
    return await s.json()
  } catch (e) {
    return "Couldn't connect to server"
  }
}

export async function getCusByAcc(id: string) {
  try {
    var c = await fetch(`${apiUrl}/customers/GetByAccId/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    if (c.ok) {
      return (await c.json()) as Customer
    }
    return (await c.json()) as { mg: string }
  } catch (e) {
    return "Couldn't connect to server"
  }
}
export async function getPromoByCode(code: string, customerId: string) {
  try {
    var c = await fetch(`${apiUrl}/promotions/GetByCode/${code}/${customerId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    if (c.ok) {
      return (await c.json()) as Promotion
    }
    return await c.text()
  } catch (e) {
    return "Couldn't connect to server"
  }
}

export async function getMembership(cusId: string) {
  try {
    const resp = await fetch(`${apiUrl}/customermemberships/GetByCustomerId/${cusId}`)
    if (resp.status === 200) {
      const data = await resp.json()
      return data.membership as Membership
    }
    return null
  } catch (e) {
    console.log(e)

    return "Couldn't connect to server"
  }
}

export function setItems() {
  setCookie('token', getToken() ?? '')
  setCookie('customerId', sessionStorage.getItem('customerId') ?? '')
}

export type Transaction = {
  transactionId: string
  transactionType: string
  totalPrice: number
  status: boolean
  promotionId: string
  membershipId: string
  requestId: string
}

export async function deleteInvalidRequests(id: string){
  try {
    var s = await fetch(`${apiUrl}/requests/Delete/${id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
    })
  } catch (e) {
  }
}
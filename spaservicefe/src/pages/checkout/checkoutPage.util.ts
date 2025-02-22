import { SpaRequest } from '@/types/request'
import { apiUrl, getToken } from '../../types/constants'
import { Customer, Employee } from '@/types/type'

export async function getEmployees(id: string) {
  try {
    var s = await fetch(`${apiUrl}/employees/GetEmployeeByCategoryId/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    return (await s.json()) as Employee[]
  } catch (e) {
    return []
  }
}

export async function submitRequest(req: SpaRequest) {
  try {
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

export async function getPaymentUrl(price: number, username: string, txnId: string) {
  try {
    var s = await fetch(`${apiUrl}/Payment/service`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        orderType: 'other',
        amount: price,
        orderDescription: txnId,
        name: ''
      })
    })
    return await (s.text())
  } catch (e) {
    return "Couldn't connect to server"
  }
}

export async function createTransaction(method: string, price: number, requestId: string) {
  try {
    var s = await fetch(`${apiUrl}/transactions/Create`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        paymentType: method,
        transactionType: 'Service',
        totalPrice: price,
        status: false,
        requestId: requestId
      })
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
    var c = await fetch(`${apiUrl}/customers/GetByAccId?accId=${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    if (c.ok) {
      return (await c.json()) as Customer
    }
    return await c.json()
  } catch (e) {
    return "Couldn't connect to server"
  }
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

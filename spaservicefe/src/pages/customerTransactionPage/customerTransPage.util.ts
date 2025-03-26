import { TransactionBase } from '@/types/type'
import { apiUrl, getToken } from '../../types/constants'

export async function getTransactionsOfCustomerId(id: string, findInService?: boolean) {
  try {
    var s = await fetch(`${apiUrl}/transactions/TransactionsOfCustomer/${id}?findInService=${findInService ?? false}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var r = (await s.json()) as TransactionBase[]
    return r
  } catch (e) {
    return []
  }
}

export function status(b: boolean) {
  return b ? 'Completed' : 'Not Completed'
}

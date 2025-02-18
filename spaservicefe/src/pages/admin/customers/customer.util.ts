import { apiUrl, getToken } from '../../../types/constants'
import { Customer } from '../../../types/type'

// Fetches all customers
export async function getAllCustomers() {
  try {
    const res = await fetch(`${apiUrl}/customers/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as Customer[]
    return json
  } catch (e) {
    return []
  }
}

export async function getAllMemberships() {
  try {
    var res = await fetch(`${apiUrl}/memberships/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as []
    return json
  } catch (e) {
    return []
  }
}

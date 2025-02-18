import { apiUrl, getToken } from '../../../types/constants'
import { Account, Role } from '../../../types/type'

export async function getAllCustomerRequests() {
  try {
    var res = await fetch(`${apiUrl}/requests/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as Account[]
    return json
  } catch (e) {
    return []
  }
}

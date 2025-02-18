import { apiUrl, getToken } from '../../../types/constants'
import { Account, Role } from '../../../types/type'

export async function getAllContacts() {
  try {
    var res = await fetch(`${apiUrl}/contacts/GetAll`, {
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

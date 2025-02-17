import { apiUrl, getToken } from "../../../types/constants"
import { Account, Role } from "../../../types/type"

export async function getAllAccounts() {
  try {
    var res = await fetch(`${apiUrl}/accounts/GetAll`, {
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

export async function getAllRoles() {
  try {
    var res = await fetch(`${apiUrl}/roles/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as Role[]
    return json
  } catch (e) {
    return []
  }
}
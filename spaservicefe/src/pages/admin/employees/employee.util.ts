import { apiUrl, getToken } from '../../../types/constants'
import { Employee } from '../../../types/type'

export async function getAllEmployees() {
  try {
    const res = await fetch(`${apiUrl}/employees/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as Employee[]
    return json
  } catch (e) {
    return []
  }
}

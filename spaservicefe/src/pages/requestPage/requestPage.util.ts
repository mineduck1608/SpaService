import { SpaRequest } from '@/types/type'
import { apiUrl, getToken } from '../../types/constants'

export async function getRequestsOfAccId(id: string) {
  try {
    var s = await fetch(`${apiUrl}/requests/GetByAccId/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var r = (await s.json()) as SpaRequest[]
    return r
  } catch (e) {
    return []
  }
}

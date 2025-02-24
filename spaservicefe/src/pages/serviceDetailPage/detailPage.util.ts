import { apiUrl, getToken } from '../../types/constants'
import { Service } from '@/types/services'

export async function getService(id: string) {
  try {
    var s = await fetch(`${apiUrl}/spaservices/GetById/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var rs = (await s.json()) as Service
    return rs
  } catch (e) {
    return null
  }
}

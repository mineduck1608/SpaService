import { apiUrl } from '../types/constants'
import { Employee } from '@/types/type'

export async function getEmployeeByAccountId(id: string) {
  try {
    var s = await fetch(`${apiUrl}/employees/GetEmployeeByAccountId/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    return (await s.json()) as Employee[]
  } catch (e) {
    return []
  }
}

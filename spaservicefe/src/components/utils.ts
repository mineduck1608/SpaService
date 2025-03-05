import { apiUrl } from '../types/constants'
import { Employee, Manager } from '@/types/type'

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

export async function getManagerByAccountId(id: string) {
  try {
    var s = await fetch(`${apiUrl}/managers/GetManagerByAccountId/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    return (await s.json()) as Manager[]
  } catch (e) {
    return []
  }
}

import { apiUrl, getToken } from 'src/types/constants'
import {
  TransactionBase,
  Order,
  EmployeeCommission,
} from 'src/types/type'

export async function getAllCommissions() {
  try {
    const res = await fetch(`${apiUrl}/employeecommissions/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as EmployeeCommission[]
    return json
  } catch (e) {
    return []
  }
}

export async function getCommissionByEmployeeId(id: string) {
  try {
    const res = await fetch(`${apiUrl}/employeecommissions/GetEmployeeCommission/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as EmployeeCommission[]
    return json
  } catch (e) {
    return []
  }
}
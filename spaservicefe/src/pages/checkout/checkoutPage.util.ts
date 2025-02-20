import { SpaRequest } from '@/types/request'
import { apiUrl } from '../../types/constants'
import { Employee } from '@/types/type'

export async function getEmployees(id: string) {
  try {
    var s = await fetch(`${apiUrl}/employees/GetEmployeeByCategoryId/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    return (await s.json()) as Employee[]
  } catch (e) {
    return []
  }
}

export async function submitRequest(req: SpaRequest) {
  try {
    var s = await fetch(`${apiUrl}/requests/Create`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(req)
    })
    console.log(s)

    if (s.ok) {
      return (await s.json()) as SpaRequest
    }
    return await s.json()
  } catch (e) {
    return "Couldn't connect to server"
  }
}

export async function getPaymentUrl(){
  
}
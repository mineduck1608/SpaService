import { apiUrl, getToken } from '../../../types/constants'
import { Account, Customer, Employee, SpaService, ServiceCategory } from '../../../types/type'

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

export async function getCustomerById(id: string) {
  try {
    var res = await fetch(`${apiUrl}/customers/GetById/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as Customer[]
    return json
  } catch (e) {
    return []
  }
}

export async function getServiceById(id: string) {
  try {
    var res = await fetch(`${apiUrl}/spaservices/GetById/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as SpaService[]
    return json
  } catch (e) {
    return []
  }
}

export async function GetCategoryByServiceId(id: string) {
  try {
    var res = await fetch(`${apiUrl}/categories/GetCategoryByServiceId/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as ServiceCategory[]
    return json
  } catch (e) {
    return []
  }
}

export async function GetEmployeeByCategoryId(categoryId: string) {
  try {
    var res = await fetch(`${apiUrl}/employees/GetEmployeeByCategoryId/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as Employee[]
    return json
  } catch (e) {
    return []
  }
}

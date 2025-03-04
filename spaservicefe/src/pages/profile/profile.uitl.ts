import { toast } from "react-toastify"
import { apiUrl, getToken } from "../../types/constants"
import { Customer, CustomerMembership, Membership } from "@/types/type"

export async function GetCustomerByAccountId(accId: string) {
  try {
    var res = await fetch(`${apiUrl}/customers/GetByAccId/${accId}`, {
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

export async function FindNewestByCustomerId(id: string) {
  try {
    var res = await fetch(`${apiUrl}/customermemberships/FindNewestByCustomerId/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as CustomerMembership[]
    return json
  } catch (e) {
    return []
  }
}

export async function GetMemberShipId(id: string) {
  try {
    var res = await fetch(`${apiUrl}/memberships/GetById/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as Membership[]
    return json
  } catch (e) {
    return []
  }
}

export async function handleUpdateSubmit(id: string, data: any) {
  try {
    var res = await fetch(`${apiUrl}/customers/Update/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (res.status >= 200 && res.status < 300) {
      toast.success('Successfully update!', {
        autoClose: 2000
      })
      setTimeout(() => window.location.reload(), 2000)
    } else {
      toast.error('Failed. Please try again.')
    }
  } catch (e) {
    return []
  }
}

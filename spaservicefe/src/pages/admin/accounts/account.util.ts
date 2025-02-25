import { apiUrl, getToken } from '../../../types/constants'
import { Account, Role } from '../../../types/type'
import { toast } from 'react-toastify'

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

export async function GetAccountById(accountId: string) {
  try {
    var res = await fetch(`${apiUrl}/accounts/GetById/${accountId}`, {
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

export async function GetRoleById(roleId: string) {
  try {
    var res = await fetch(`${apiUrl}/roles/GetById/${roleId}`, {
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

export async function handleUpdateSubmit(id: string, data: any) {
  try {
    var res = await fetch(`${apiUrl}/accounts/Update/${id}`, {
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

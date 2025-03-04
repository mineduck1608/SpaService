import { apiUrl, getToken } from '../../../types/constants'
import { Customer } from '../../../types/type'
import { toast } from 'react-toastify'

export async function getCustomerByAccountId(id: string) {
  try {
    const res = await fetch(`${apiUrl}/customers/GetCustomerByAccountId/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as Customer[]
    return json
  } catch (e) {
    return []
  }
}

export async function getAllCustomers() {
  try {
    const res = await fetch(`${apiUrl}/customers/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as Customer[]
    return json
  } catch (e) {
    return []
  }
}

export async function getAllMemberships() {
  try {
    var res = await fetch(`${apiUrl}/memberships/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as []
    return json
  } catch (e) {
    return []
  }
}

export async function handleCreateSubmit(data: any) {
  try {
    var res = await fetch(`${apiUrl}/accounts/RegisterCustomer`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (res.status >= 200 && res.status < 300) {
      toast.success('Successfully create!')
      setTimeout(() => window.location.reload(), 2000)
    } else {
      toast.error('Failed. Please try again.', {
        autoClose: 1000,
        closeButton: false,
      })
    }
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
      toast.success('Successfully update!')
      setTimeout(() => window.location.reload(), 2000)
    } else {
      toast.error('Failed. Please try again.', {
        autoClose: 1000,
        closeButton: false,
      })
    }
  } catch (e) {
    return []
  }
}

export async function handleDelete(customerId: string) {
  try {
    var res = await fetch(`${apiUrl}/customers/Delete/${customerId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
    if (res.status >= 200 && res.status < 300) {
      toast.success('Delete successfully')
      setTimeout(() => window.location.reload(), 2000)
    } else {
      toast.error('Failed. Please try again.', {
        autoClose: 1000,
        closeButton: false,
      })
    }
  } catch (error) {
    console.error('Error deleting customer:', error)
  }
}

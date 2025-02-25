import { apiUrl, getToken } from '../../../types/constants'
import { Employee } from '../../../types/type'
import { toast } from 'react-toastify'

export async function getAllEmployees() {
  try {
    const res = await fetch(`${apiUrl}/employees/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as Employee[]
    return json
  } catch (e) {
    return []
  }
}

export async function handleCreateSubmit(data: any) {
  try {
    var res = await fetch(`${apiUrl}/accounts/RegisterEmployee`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (res.status >= 200 && res.status < 300) {
      toast.success('Successfully create!', {
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

export async function handleUpdateSubmit(id: string, accountId: string, data: any) {
  try {
    const updatedData = {
      ...data,
      accountId: accountId
    }
    var res = await fetch(`${apiUrl}/employees/Update/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
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

export async function handleDelete(employeeId: string) {
  try {
    var res = await fetch(`${apiUrl}/employees/Delete/${employeeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
    if (res.status >= 200 && res.status < 300) {
      toast.success('Delete successfully', {
        autoClose: 2000
      })
      setTimeout(() => window.location.reload(), 2000)
    } else {
      toast.error('Delete failed. Try again.')
    }
  } catch (error) {
    console.error('Error deleting employee:', error)
  }
}

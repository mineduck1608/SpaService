import { apiUrl, getToken } from '../../../types/constants'
import { Application } from '../../../types/type'
import { toast } from 'react-toastify'

export async function getAllApplications() {
  try {
    const res = await fetch(`${apiUrl}/applications/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as Application[]
    return json
  } catch (e) {
    return []
  }
}

export async function handleUpdateSubmit(id: string, application: any, data: any) {
  try {
    const updatedData = {
      ...data,
      accountId: application.accountId,
      createdAt: application.createdAt
    }
    var res = await fetch(`${apiUrl}/applications/Update/${id}`, {
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

export async function handleDelete(id: string) {
  try {
    var res = await fetch(`${apiUrl}/applications/Update/${id}`, {
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
    console.error('Error deleting application:', error)
  }
}

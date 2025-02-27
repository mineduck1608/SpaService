import { apiUrl, getToken } from '../../../types/constants'
import { GuestApplication } from '../../../types/type'
import { toast } from 'react-toastify'

export async function getAllGuestApplications() {
  try {
    var res = await fetch(`${apiUrl}/guestapplications/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as GuestApplication[]
    return json
  } catch (e) {
    return []
  }
}

export async function getAllContacts() {
  try {
    var res = await fetch(`${apiUrl}/guestapplications/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as GuestApplication[]
    return json
  } catch (e) {
    return []
  }
}

export async function handleCreateSubmit(data: any) {
  try {
    var res = await fetch(`${apiUrl}/guestapplications/Create`, {
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

export async function handleUpdateSubmit(application: any, data: any) {
  try {
    const updatedData = {
      ...data,
      accountId: application.accountId,
      createdAt: application.createdAt,
      resolvedAt: new Date().toISOString()
    }
    var res = await fetch(`${apiUrl}/guestapplications/Update/${application.applicationId}`, {
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

export async function handleDelete(id: string) {
  try {
    var res = await fetch(`${apiUrl}/guestapplications/Delete/${id}`, {
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

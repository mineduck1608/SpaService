import { apiUrl, getToken } from '../../../types/constants'
import { Floor, ServiceCategory } from '../../../types/type'
import { toast } from 'react-toastify'

export async function getAllFloors() {
  try {
    const res = await fetch(`${apiUrl}/floors/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as Floor[]
    return json
  } catch (e) {
    return []
  }
}

export async function handleCreateSubmit(data: any) {
  try {
    var res = await fetch(`${apiUrl}/floors/Create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (res.status >= 200 && res.status < 300) {
      toast.success('Successfully create!', { containerId: 'toast' })
      setTimeout(() => window.location.reload(), 2000)
    } else {
      const errorData = await res.json()
      toast.error(errorData?.msg || 'Failed. Please try again.', {
        autoClose: 1000,
        closeButton: false,
        containerId: 'toast'
      })
    }
  } catch (e) {
    return []
  }
}

export async function handleUpdateSubmit(id: string, data: any) {
  try {
    var res = await fetch(`${apiUrl}/floors/Update/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (res.status >= 200 && res.status < 300) {
      toast.success('Successfully update!', { containerId: 'toast' })
      setTimeout(() => window.location.reload(), 2000)
    } else {
      const errorData = await res.json()
      toast.error(errorData?.msg || 'Failed. Please try again.', {
        autoClose: 1000,
        closeButton: false,
        containerId: 'toast'
      })
    }
  } catch (e) {
    return []
  }
}

export async function handleDelete(id: string) {
  try {
    var res = await fetch(`${apiUrl}/floors/Delete/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
    if (res.status >= 200 && res.status < 300) {
      toast.success('Delete successfully', { containerId: 'toast' })
      setTimeout(() => window.location.reload(), 2000)
    } else {
      const errorData = await res.json()
      toast.error(errorData?.msg || 'Failed. Please try again.', {
        autoClose: 1000,
        closeButton: false,
        containerId: 'toast'
      })
    }
  } catch (error) {
    console.error('Error deleting floor:', error)
  }
}

export async function getFloorCategoryName(id: string) {
  try {
    var res = await fetch(`${apiUrl}/servicecategories/GetById/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
    const json = (await res.json()) as ServiceCategory[]
    return json
  } catch (error) {
    console.error('Error deleting customer:', error)
  }
}

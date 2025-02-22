import { apiUrl, getToken } from '../../../types/constants'
import { Category } from '../../../types/type'
import { toast } from 'react-toastify'

export async function getAllCategories() {
  try {
    const res = await fetch(`${apiUrl}/categories/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as Category[]
    return json
  } catch (e) {
    return []
  }
}


export async function handleCreateSubmit(data: any) {
  try {
    var res = await fetch(`${apiUrl}/categories/Create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    console.log("Form Data:", data)
    console.log("API Response:", res)
    if (res.status === 200 || res.status === 204) {
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

export async function handleUpdateSubmit(id: string, data: any) {
  try {
    var res = await fetch(`${apiUrl}/categories/Update/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (res.status === 200 || res.status === 204) {
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

export async function handleDelete(id : string) {
  try {
    var response = await fetch(`${apiUrl}/categories/Delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 200 || response.status === 204) {
      toast.success('Delete successfully', {
        autoClose: 2000
      })
      setTimeout(() => window.location.reload(), 2000)
    } else {
      toast.error('Delete failed. Try again.')
    }
  } catch (error) {
    console.error('Error deleting customer:', error)
  } 
}

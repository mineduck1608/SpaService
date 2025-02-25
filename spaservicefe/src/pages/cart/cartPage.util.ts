import { apiUrl, getToken } from '../../types/constants'
import { Account } from '../../types/type'
import { toast } from 'react-toastify'

export async function getAllContacts() {
  try {
    var res = await fetch(`${apiUrl}/contacts/GetAll`, {
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

export async function handleDelete(contactId: string) {
  try {
    var res = await fetch(`${apiUrl}/contacts/Delete/${contactId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
    if (res.status === 200 || res.status === 204) {
      toast.success('Delete successfully', {
        autoClose: 2000
      })
      setTimeout(() => window.location.reload(), 2000)
    } else {
      toast.error('Delete failed. Try again.')
    }
  } catch (error) {
    console.error('Error deleting account:', error)
  }
}

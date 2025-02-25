import { apiUrl, getToken } from '../../../types/constants'
import { Customer, Feedback, Floor, ServiceCategory, SpaService } from '../../../types/type'
import { toast } from 'react-toastify'

export async function  getAllFeedbacks() {
  try {
    const res = await fetch(`${apiUrl}/feedbacks/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as Feedback[]
    return json
  } catch (e) {
    return []
  }
}

export async function getSpaServiceById(id: string) {
  try {
    var res = await fetch(`${apiUrl}/spaservices/GetById/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
    const json = (await res.json()) as SpaService[]
    return json
  } catch (error) {
    console.error('Error deleting customer:', error)
  }
}

export async function getCustomerById(id: string) {
  try {
    var res = await fetch(`${apiUrl}/customers/GetById/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
    const json = (await res.json()) as Customer[]
    return json
  } catch (error) {
    console.error('Error deleting customer:', error)
  }
}

import { apiUrl, getToken } from '../../types/constants'
import { Service } from '@/types/services'
import { toast } from 'react-toastify'
import { getAllCustomerRequests } from '../admin/customerRequests/customerRequest.util'
import { getAllFeedbacks } from '../admin/feedbacks/feedback.util'

export async function getService(id: string) {
  try {
    var s = await fetch(`${apiUrl}/spaservices/GetById/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var rs = (await s.json()) as Service
    return rs
  } catch (e) {
    return null
  }
}

export async function handleCreateSubmit(data: any) {
  try {
    var res = await fetch(`${apiUrl}/feedbacks/Create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (res.status >= 200 && res.status < 300) {
      toast.success('Thank you for your feedback!')
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

export async function hasPurchasedService(serviceId?: string, customerId?: string) {
  try {
    const requests = await getAllCustomerRequests()
    const purchased = requests.some((request: any) => 
      request.serviceId === serviceId &&
      request.customerId === customerId &&
      request.status === 'Done'
    )
    if (purchased) {
      const feedback = await hasSendFeedback(serviceId, customerId)
      return !feedback
    }
    return false
  } catch (e) {
    return false
  }
}

export async function hasSendFeedback(serviceId?: string, customerId?: string) {
  try {
    const feedbacks = await getAllFeedbacks()
    return feedbacks.some((feedback: any) => 
      feedback.serviceId === serviceId &&
      feedback.createdBy === customerId 
    )
  } catch (e) {
    return false
  }
}
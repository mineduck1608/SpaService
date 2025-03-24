import { apiUrl, getToken } from '../../types/constants'
import { Service } from '@/types/services'
import { toast } from 'react-toastify'
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

export async function getFeedbackByServiceAndCus(data: any) {
  try {
    const feedbacks = await getAllFeedbacks()
    const feedback = feedbacks.find(
      (feedback: any) => feedback.service?.serviceId === data.serviceId && feedback.createdBy === data.createdBy
    )
    return feedback ?? null
  } catch (e) {
    console.error(e)
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
        closeButton: false
      })
    }
  } catch (e) {
    return []
  }
}

export async function handleUpdateSubmit(data: any) {
  try {
    var res = await fetch(`${apiUrl}/feedbacks/Update/${data.feedbackId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (res.status >= 200 && res.status < 300) {
      toast.success('Update successfully!')
      setTimeout(() => window.location.reload(), 2000)
    } else {
      toast.error('Failed. Please try again.', {
        autoClose: 1000,
        closeButton: false
      })
    }
  } catch (e) {
    return []
  }
}

export async function hasSendFeedback(appointmentId?: string) {
  try {
    var res = await fetch(`${apiUrl}/feedbacks/GetFeedbackByAppointmentId/${appointmentId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
    if (res.status >= 200 && res.status < 300) {
      return true
    } else {
      return false
    }
  } catch (e) {
    return []
  }
}

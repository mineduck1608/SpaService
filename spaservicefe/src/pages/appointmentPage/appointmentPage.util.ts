import { Appointment, Feedback } from '@/types/type'
import { apiUrl, getToken } from '../../types/constants'

export async function getAppointments(id: string) {
  try {
    var s = await fetch(`${apiUrl}/appointments/GetByAccId/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var r = (await s.json()) as Appointment[]
    return r
  } catch (e) {
    return []
  }
}

export function status(b: boolean) {
  return b ? 'Completed' : 'Not Completed'
}

export async function getFeedBackByAppointmentId(id: string) {
  try {
    var s = await fetch(`${apiUrl}/feedbacks/GetFeedbackByAppointmentId/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var r = (await s.json()) as Feedback[]
    return r
  } catch (e) {
    return []
  }
}

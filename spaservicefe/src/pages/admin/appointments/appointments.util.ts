import { apiUrl, getToken } from '../../../types/constants'
import { Appointment } from '../../../types/type'

export async function getAllAppointments() {
  const res = await fetch(`${apiUrl}/appointments/GetAll`, {
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
  })
  const json = (await res.json()) as Appointment[]
  return json
}



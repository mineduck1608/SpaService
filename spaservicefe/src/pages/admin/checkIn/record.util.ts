import { apiUrl, getToken } from '../../../types/constants'
import {Employee, Record} from '../../../types/type'
import { toast } from 'react-toastify'

export async function getRecords(): Promise<Record[]> {
    try {
        const res = await fetch(`${apiUrl}/attendancerecords/GetAll`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            }
        })

        if (res. status >= 200 && res.status < 300) {
            const data = await res.json()
            return data
        } else {
            console.error('Failed to fetch records:' , res.statusText)
            return []
        }
} catch (error) {
    console.error('Error fetching records: ', error)
    return []
}
}

export async function getAllEmployees() {
  try {
    const res = await fetch(`${apiUrl}/employees/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as Employee[]
    return json
  } catch (e) {
    return []
  }
}

export async function checkInCheckOut(accountId: string): Promise<void> {
  try {
    const res = await fetch(`${apiUrl}/attendancerecords/CheckInCheckOut/${accountId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
  })

  if (res.status >= 200 && res.status < 300) {
    toast.success('Check-in/Check-out successful')
  } else {
    toast.error('Failed to check in/check out')
  }
  } catch (error) {
    toast.error('Error checking in/checking out')
  }
}


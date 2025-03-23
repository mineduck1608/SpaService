import { apiUrl, getToken } from '../../../types/constants'
import { Employee, Record } from '../../../types/type'
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

    if (res.status >= 200 && res.status < 300) {
      const data = await res.json()
      return data
    } else {
      console.error('Failed to fetch records:', res.statusText)
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

export async function checkInCheckOut(
  accountId: string,
  action: string,
  latitude: number,
  longitude: number
): Promise<void> {
  try {
    const res = await fetch(`${apiUrl}/attendancerecords/CheckInCheckOut/${accountId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action, latitude, longitude })
    })

    const json = await res.json()

    if (res.status >= 200 && res.status < 300) {
      toast.success(json.msg)
    } else {
      toast.error(json.msg)
    }
  } catch (error) {
    toast.error('Error checking in/checking out')
  }
}
export const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'))
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      (error) => {
        reject(error)
      }
    )
  })
}

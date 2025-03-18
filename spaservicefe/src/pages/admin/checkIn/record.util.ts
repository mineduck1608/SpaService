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

export async function handleCheckInSubmit(data: any) {
  try {
    var res = await fetch(`${apiUrl}/attendancerecords/Create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (res.status >= 200 && res.status < 300) {
      toast.success('Successfully create!')
      setTimeout(() => window.location.reload(), 2000)
    } else {
      const errorMsg = await res.json()
      toast.error(errorMsg.message || 'Failed. Please try again.', {
        autoClose: 1000,
        closeButton: false
      })
    }
  } catch (e) {
    return []
  }
}


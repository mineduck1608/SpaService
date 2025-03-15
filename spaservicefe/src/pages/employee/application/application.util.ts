import { Application } from '@/types/type'
import { apiUrl, getToken } from '../../../types/constants'
import { toast } from 'react-toastify'

export async function getEmployeeApplications(id: string) {
  try {
    var res = await fetch(`${apiUrl}/applications/GetByAccountId/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as Application[]
    return json
  } catch (e) {
    return []
  }
}


export async function handleCreateSubmit(data: any) {
  try {
    var res = await fetch(`${apiUrl}/applications/Create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (res.status >= 200 && res.status < 300) {
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
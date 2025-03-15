import { apiUrl, getToken } from '../../../types/constants'
import { Application, Employee } from '../../../types/type'
import { toast } from 'react-toastify'

export async function getAllApplications() {
  try {
    const res = await fetch(`${apiUrl}/applications/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as Application[]
    return json
  } catch (e) {
    return []
  }
}

export async function handleUpdateSubmit(application: any, data: any) {
  try {
    const updatedData = {
      ...data,
      accountId: application.accountId,
      createdAt: application.createdAt,
      resolvedAt: new Date().toISOString()
    }
    var res = await fetch(`${apiUrl}/applications/Update/${application.applicationId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })
    if (res.status >= 200 && res.status < 300) {
      toast.success('Successfully update!')
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

export async function handleDelete(id: string) {
  try {
    var res = await fetch(`${apiUrl}/applications/Update/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
    if (res.status >= 200 && res.status < 300) {
      toast.success('Delete successfully')
      setTimeout(() => window.location.reload(), 2000)
    } else {
      toast.error('Failed. Please try again.', {
        autoClose: 1000,
        closeButton: false
      })
    }
  } catch (error) {
    console.error('Error deleting application:', error)
  }
}

export async function getByAccountId(id: string): Promise<{ fullName: string } | null> {
  try {
    const res = await fetch(`${apiUrl}/accounts/GetByAccountId/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    // Check if the response is successful
    if (!res.ok) {
      console.error('Failed to fetch account data:', res.statusText);
      return null;
    }

    // Parse JSON response
    const json: { fullName: string } = await res.json();

    // Return the object
    return json;
  } catch (e) {
    console.error('Error while fetching account data:', e);
    return null; // Return null in case of an error
  }
}


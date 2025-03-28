import { apiUrl, getToken } from '../../../types/constants'
import { Appointment, Employee, EmployeeCommission } from '../../../types/type'
import { toast } from 'react-toastify'

export async function getEmployeeByAccountId(id: string) {
  try {
    const res = await fetch(`${apiUrl}/employees/GetEmployeeByAccountId/${id}`, {
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

export async function getMonthlyAppointments(id: string, year: number) {
  try {
    const res = await fetch(`${apiUrl}/appointments/GetMonthlyAppointments/${id}/${year}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as { month: string; totalAppointments: number }[]
    return json
  } catch (e) {
    return []
  }
}

export async function getAllAppointmentByEmployeeId(id: string) {
  try {
    const res = await fetch(`${apiUrl}/appointments/GetAppointmentByEmployeeId/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as Appointment[]
    return json
  } catch (e) {
    return []
  }
}

export async function getAllCommissionByEmployeeId(id: string) {
  try {
    const res = await fetch(`${apiUrl}/employeecommissions/GetEmployeeCommission/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as EmployeeCommission[]
    return json
  } catch (e) {
    return []
  }
}

export async function handleCreateSubmit(data: any) {
  try {
    var res = await fetch(`${apiUrl}/accounts/RegisterEmployee`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (res.status >= 200 && res.status < 300) {
      toast.success('Successfully created!', { containerId: 'toast' })
      setTimeout(() => window.location.reload(), 1000)
    } else if (res.status === 409) {
      toast.error('Employee already exists. Please try again with different details.', {
        autoClose: 1000,
        closeButton: false
      })
    } else {
      const errorData = await res.json()
      toast.error(errorData?.msg || 'Failed. Please try again.', {
        autoClose: 1000,
        closeButton: false
      })
    }
  } catch (e) {
    console.error('Error creating employee:', e)
    toast.error('An unexpected error occurred. Please try again later.', {
      autoClose: 1000,
      closeButton: false,
      containerId: 'toast'
    })
    return []
  }
}

export async function handleUpdateSubmit(employee: any, data: any) {
  try {
    const updatedData = {
      ...data,
      image: data.image === '' ? 'null' : data.image,
      accountId: employee.accountId,
      phone: employee.phone,
      email: employee.email
    }
    var res = await fetch(`${apiUrl}/employees/Update/${employee.employeeId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })
    if (res.status >= 200 && res.status < 300) {
      toast.success('Successfully update!', { containerId: 'toast' })
      setTimeout(() => window.location.reload(), 2000)
    } else {
      const errorData = await res.json()
      toast.error(errorData?.msg || 'Failed. Please try again.', {
        autoClose: 1000,
        closeButton: false,
        containerId: 'toast'
      })
    }
  } catch (e) {
    return []
  }
}

export async function handleDelete(employeeId: string) {
  try {
    var res = await fetch(`${apiUrl}/employees/Delete/${employeeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
    if (res.status >= 200 && res.status < 300) {
      toast.success('Delete successfully', { containerId: 'toast' })
      setTimeout(() => window.location.reload(), 2000)
    } else {
      const errorData = await res.json()
      toast.error(errorData?.msg || 'Failed. Please try again.', {
        autoClose: 1000,
        closeButton: false,
        containerId: 'toast'
      })
    }
  } catch (error) {
    console.error('Error deleting employee:', error)
  }
}

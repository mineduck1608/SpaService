import { apiUrl, getToken } from '../../../types/constants'
import { CategoryEmployee, Employee, ServiceCategory } from '../../../types/type'
import { toast } from 'react-toastify'

export async function getAllEmployeeCategory() {
  try {
    const res = await fetch(`${apiUrl}/categoryemployees/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as CategoryEmployee[]
    return json
  } catch (e) {
    return []
  }
}

export async function handleCreateSubmit(data: any) {
  try {
    var res = await fetch(`${apiUrl}/categoryemployees/Create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (res.status >= 200 && res.status < 300) {
      toast.success('Successfully create!', { containerId: 'toast' })
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

export async function handleUpdateSubmit(employeeCategory: any, data: any) {
  try {
    var res = await fetch(`${apiUrl}/categoryemployees/Update/${employeeCategory.categoryEmployeeId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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

export async function handleDelete(employeeCategory: any) {
  try {
    var res = await fetch(
      `${apiUrl}/categoryemployees/Delete/${employeeCategory.categoryId}/${employeeCategory.employeeId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        }
      }
    )
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
    console.error('Error deleting employee category:', error)
  }
}

export async function getServiceCategoryById(id: string) {
  try {
    var res = await fetch(`${apiUrl}/servicecategories/GetById/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
    const json = (await res.json()) as ServiceCategory[]
    return json
  } catch (error) {
    console.error('Error deleting customer:', error)
  }
}

export async function getEmployeeById(id: string) {
  try {
    var res = await fetch(`${apiUrl}/employees/GetById/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
    const json = (await res.json()) as Employee[]
    return json
  } catch (error) {
    console.error('Error deleting customer:', error)
  }
}

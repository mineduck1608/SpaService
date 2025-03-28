import { apiUrl, getToken } from '../../../types/constants'
import { TransactionBase, SpaRequest, Order, ServiceTransaction, CosmeticTransaction } from '../../../types/type'
import { toast } from 'react-toastify'

export async function getAllTransactions() {
  try {
    const res = await fetch(`${apiUrl}/transactions/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as TransactionBase[]
    return json
  } catch (e) {
    return []
  }
}

export async function getTransactionsById(id: string) {
  try {
    const res = await fetch(`${apiUrl}/transactions/GetById/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as TransactionBase[]
    return json
  } catch (e) {
    return []
  }
}

export async function getAllServiceTransactions() {
  try {
    const res = await fetch(`${apiUrl}/servicetransactions/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as ServiceTransaction[]
    return json
  } catch (e) {
    return []
  }
}

export async function getAllCosmeticTransactions() {
  try {
    const res = await fetch(`${apiUrl}/cosmetictransactions/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as CosmeticTransaction[]
    return json
  } catch (e) {
    return []
  }
}

export async function getSpaRequestById(id: string) {
  try {
    const res = await fetch(`${apiUrl}/requests/GetById/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as SpaRequest[]
    return json
  } catch (e) {
    return []
  }
}

export async function getOrderById(id: string) {
  try {
    const res = await fetch(`${apiUrl}/orders/GetById/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const json = (await res.json()) as Order[]
    return json
  } catch (e) {
    return []
  }
}

export async function handleCreateSubmit(data: any) {
  try {
    var res = await fetch(`${apiUrl}/transactions/Create`, {
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
      toast.error('Failed. Please try again.', {
        autoClose: 1000,
        closeButton: false,
        containerId: 'toast'
      })
    }
  } catch (e) {
    return []
  }
}

export async function handleUpdateSubmit(id: string, data: any) {
  try {
    const updatedData = {
      ...data,
      completeTime: new Date().toISOString()
    }
    var res = await fetch(`${apiUrl}/transactions/Update/${id}`, {
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

export async function handleDelete(id: string) {
  try {
    var res = await fetch(`${apiUrl}/transactions/Delete/${id}`, {
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
    console.error('Error deleting transaction:', error)
  }
}

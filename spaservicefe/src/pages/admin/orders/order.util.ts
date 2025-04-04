import { apiUrl, getToken } from '../../../types/constants'
import { CosmeticProduct, Order, OrderDetail } from '../../../types/type'
import { toast } from 'react-toastify'

export async function getAllOrders() {
  try {
    const res = await fetch(`${apiUrl}/orders/GetAll`, {
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

export async function getOrderDetailByOrderId(id: string) {
  try {
    var s = await fetch(`${apiUrl}/orderdetails/GetOrderDetailByOrderId/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var rs = (await s.json()) as OrderDetail
    return rs
  } catch (e) {
    return []
  }
}

export async function getCosmeticProductById(id: string) {
  try {
    var res = await fetch(`${apiUrl}/cosmeticproducts/GetById/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as CosmeticProduct[]
    return json
  } catch (e) {
    return []
  }
}

export async function updateOrderStatus(id: string) {
  try {
    var res = await fetch(`${apiUrl}/orders/ConfirmOrder/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = await res.json()
    return json
  } catch (e) {
    return []
  }
}

export async function handleCreateSubmit(data: any) {
  try {
    var res = await fetch(`${apiUrl}/orders/Create`, {
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
      toast.error('Failed. Please try again.', {
        autoClose: 1000,
        closeButton: false
      })
    }
  } catch (e) {
    return []
  }
}

export async function handleUpdateSubmit(id: string, data: any) {
  try {
    var res = await fetch(`${apiUrl}/orders/Update/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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
    var res = await fetch(`${apiUrl}/orders/Delete/${id}`, {
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
    console.error('Error deleting order:', error)
  }
}

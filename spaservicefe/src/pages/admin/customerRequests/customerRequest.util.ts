import { apiUrl, getToken } from '../../../types/constants'
import { Customer, Employee, SpaService, ServiceCategory, SpaRequest, Room } from '../../../types/type'
import { toast } from 'react-toastify'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.extend(customParseFormat) // Kích hoạt plugin để parse custom format

export async function getAllCustomerRequests() {
  try {
    var res = await fetch(`${apiUrl}/requests/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as SpaRequest[]
    return json
  } catch (e) {
    return []
  }
}

export async function getRequestById(id: string) {
  try {
    var res = await fetch(`${apiUrl}/requests/GetById/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as SpaRequest[]
    return json
  } catch (e) {
    return []
  }
}

export const getCustomerRequestsPaginated = async (page: number, limit: number) => {
  try {
    const url = `${apiUrl}/requests/GetCustomerRequest?page=${page}&limit=${limit}`;
    
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json(); // Trả về { data, totalPages }
  } catch (error) {
    console.error('Error fetching paginated customer requests:', error);
    throw error;
  }
};


export async function getCustomerById(id: string) {
  try {
    var res = await fetch(`${apiUrl}/customers/GetById/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as Customer[]
    return json
  } catch (e) {
    return []
  }
}

export async function getServiceById(id: string) {
  try {
    var res = await fetch(`${apiUrl}/spaservices/GetById/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as SpaService[]
    return json
  } catch (e) {
    return []
  }
}

export async function GetCategoryByServiceId(id: string) {
  try {
    var res = await fetch(`${apiUrl}/servicecategories/GetCategoryByServiceId/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as ServiceCategory[]
    return json
  } catch (e) {
    return []
  }
}

export async function GetRoomsOfCategory(id: string) {
  try {
    var res = await fetch(`${apiUrl}/rooms/GetRoomsOfCategory/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as Room[]
    return json
  } catch (e) {
    return []
  }
}

export async function GetEmployeeByCategoryId(categoryId: string) {
  try {
    var res = await fetch(`${apiUrl}/employees/GetEmployeeByCategoryId/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as Employee[]
    return json
  } catch (e) {
    return []
  }
}

export async function DenyRequest(id: string, managerNote: string) {
  try {
    var res = await fetch(`${apiUrl}/requests/DeclineRequest/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ managerNote })
    })
    if (res.status >= 200 && res.status < 300) {
      toast.success('Successfully deny!', { containerId: 'toast' })
      setTimeout(() => window.location.reload(), 1000)
      await fetch(`${apiUrl}/requests/CreateDeclinedMail/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        }
      })
    } else {
      const errorData = await res.json()
      toast.error(errorData?.msg || 'Failed. Please try again.', {
        autoClose: 1000,
        closeButton: false,
        containerId: 'toast'
      })
    }
  } catch (e) {
    console.error('❌ Error in AssignRequest:', e)
    return []
  }
}

export async function AssignRequest(request: SpaRequest, roomId: string) {
  try {
    let parsedStartTime = null

    if (typeof request.startTime === 'string' && request.startTime.trim() !== '') {
      const tempDate = dayjs(request.startTime, 'DD/MM/YYYY HH:mm:ss', true).tz('Asia/Ho_Chi_Minh')

      if (tempDate.isValid()) {
        parsedStartTime = tempDate.format('YYYY-MM-DDTHH:mm:ssZ') // Format chuẩn ISO với VN timezone
      } else {
        console.warn('❌ Invalid date format:', request.startTime)
      }
    }

    const data = {
      roomId: roomId,
      ...request,
      startTime: parsedStartTime // Chỉ gán nếu hợp lệ
    }

    console.log('🚀 ~ Sending data:', data)

    const res = await fetch(`${apiUrl}/requests/AssignRequest/${request.requestId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (res.status >= 200 && res.status < 300) {
      const responseData = await res.json()
      toast.success(responseData?.msg || 'Successfully assigned!', { containerId: 'toast' })
      setTimeout(() => window.location.reload(), 1000)
      await fetch(`${apiUrl}/requests/SendMail/${responseData?.appoinmentId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        }
      })
    } else {
      const errorData = await res.json()
      toast.error(errorData?.msg || 'Failed. Please try again.', {
        autoClose: 1000,
        closeButton: false,
        containerId: 'toast'
      })
    }
  } catch (e) {
    console.error('❌ Error in AssignRequest:', e)
    return []
  }
}

import { Description } from '@radix-ui/react-dialog'
import { apiUrl, getToken } from '../../../types/constants'
import { Appointment } from '@/types/type'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

export const fetchAppointments = async () => {
  try {
    const response = await fetch('https://localhost:7205/api/appointments/GetAll', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch appointments')
    }

    const appointments = await response.json()


    const employees = await fetchEmployees()


    const rooms = await fetchRooms()


    const employeeMap = new Map<string, { fullName: string }>(
      employees.map((emp: any) => [emp.employeeId, { fullName: emp.fullName }])
    )

    const roomMap = new Map<string, { roomNum: number; floorId: string | null }>(
      rooms.map((room: any) => [room.roomId, { roomNum: room.roomNum, floorId: room.floorId }])
    )

    const formattedAppointments = appointments.map(
      (
        event: { 
          status: string; 
          startTime: string; 
          endTime: string; 
          employeeId: string; 
          roomId: string;
          request?: {
            customer?: {
              fullName: string;
            };
            service?: {
              serviceName: string;
            }
          };
        },
        index: number
      ) => {
        const employeeInfo = employeeMap.get(event.employeeId) || { fullName: 'Unknown' }
        const roomInfo = roomMap.get(event.roomId) || { roomNum: null, floorId: null }
        const customerName = event.request?.customer?.fullName || 'Unknown Customer'
        const serviceName = event.request?.service?.serviceName || 'Unknown Service'

        return {
          id: index + 1,
          title: `${customerName} - ${event.status}`,
          start: event.startTime.replace(/T(\d{2}:\d{2}):\d{2}/, ' $1'),
          end: event.endTime.replace(/T(\d{2}:\d{2}):\d{2}/, ' $1'),
          people: [employeeInfo.fullName],
          location: serviceName,
          description: roomInfo.roomNum ? `  Room ${roomInfo.roomNum}` : 'Unknown',
          calendarId: event.status === 'Processing' ? 'personal'
            : event.status === 'Finished' ? 'work'
            : event.status === 'Pending' ? 'leisure'
            : event.status === 'Cancelled' ? 'school'
            : 'personal'
        }
      }
    )

    return formattedAppointments
  } catch (error) {
    console.error('Error fetching appointments: ', error)
    return []
  }
}

export const fetchEmployees = async () => {
  try {
    const response = await fetch('https://localhost:7205/api/employees/GetAll', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch employees')
    }

    const data = await response.json()
    console.log('Fetched employees', data)

    return data
  } catch (error) {
    console.error('Error fetching employees:', error)
    return []
  }
}

export const fetchRequests = async () => {
  try {
    const response = await fetch('https://localhost:7205/api/requests/GetAll', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch requests')
    }

    const data = await response.json()
    console.log('Fetched Requests', data)

    return data
  } catch (error) {
    console.error('Error fetching requests:', error)
    return []
  }
}

export const fetchCustomers = async () => {
  try {
    const response = await fetch('https://localhost:7205/api/customers/GetAll', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Customers')
    }

    const data = await response.json()
    console.log('Fetched Customers', data)

    return data
  } catch (error) {
    console.error('Error fetching customers:', error)
    return []
  }
}

export const fetchRooms = async () => {
  try {
    const response = await fetch('https://localhost:7205/api/rooms/GetAll', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Rooms')
    }

    const data = await response.json()
    console.log('Fetched Rooms', data)

    return data
  } catch (error) {
    console.error('Error fetching rooms:', error)
    return []
  }
}

export async function getAllAppointments() {
  try {
    var res = await fetch(`${apiUrl}/appointments/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const appointments = await res.json()
    return appointments
  } catch (e) {
    console.error('Error fetching data:', e)
    return []
  }
}

export async function getAllAppointmentByEmployee(id: string) {
  try {
    var res = await fetch(`${apiUrl}/appointments/GetAppointmentByEmployeeId/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const appointments = await res.json()
    return appointments
  } catch (e) {
    console.error('Error fetching data:', e)
    return []
  }
}

async function fetchServices() {
  var res = await fetch(`${apiUrl}/services/GetAll`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  return await res.json()
}

export const fetchAppointmentsByEmployee = async (id: string) => {
  try {
    const response = await fetch(`${apiUrl}/appointments/GetAppointmentsFromEmployeeId/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch appointments')
    }

    const appointments = await response.json()
    const employees = await fetchEmployees()
    const rooms = await fetchRooms()
    const employeeMap = new Map<string, { fullName: string }>(
      employees.map((emp: any) => [emp.employeeId, { fullName: emp.fullName }])
    )

    const roomMap = new Map<string, { roomNum: number; floorId: string | null }>(
      rooms.map((room: any) => [room.roomId, { roomNum: room.roomNum, floorId: room.floorId }])
    )

    const formattedAppointments = appointments.map(
      (
        event: { 
          status: string; 
          startTime: string; 
          endTime: string; 
          employeeId: string; 
          roomId: string;
          request?: {
            customer?: {
              fullName: string;
            };
            service?: {
              serviceName: string;
            }
          };
        },
        index: number
      ) => {
        const employeeInfo = employeeMap.get(event.employeeId) || { fullName: 'Unknown' }
        const roomInfo = roomMap.get(event.roomId) || { roomNum: null, floorId: null }
        const customerName = event.request?.customer?.fullName || 'Unknown Customer'
        const serviceName = event.request?.service?.serviceName || 'Unknown Service'

        return {
          id: index + 1,
          title: `${customerName} - ${event.status}`,
          start: event.startTime.replace(/T(\d{2}:\d{2}):\d{2}/, ' $1'),
          end: event.endTime.replace(/T(\d{2}:\d{2}):\d{2}/, ' $1'),
          people: [employeeInfo.fullName],
          location: serviceName,
          description: roomInfo.roomNum ? `  Room ${roomInfo.roomNum}` : 'Unknown',
          calendarId: event.status === 'Processing' ? 'personal'
            : event.status === 'Finished' ? 'work'
            : event.status === 'Pending' ? 'leisure'
            : event.status === 'Cancelled' ? 'school'
            : 'personal'
        }
      }
    )

    return formattedAppointments
  } catch (error) {
    console.error('Error fetching appointments: ', error)
    return []
  }
}

export async function UpdateAppoitment(appointment: Appointment, roomId: string) {
  try {
    let parsedStartTime = null
    if (typeof appointment.startTime === 'string' && appointment.startTime.trim() !== '') {
      const tempDate = dayjs(appointment.startTime, 'DD/MM/YYYY HH:mm:ss', true).tz('Asia/Ho_Chi_Minh')

      if (tempDate.isValid()) {
        parsedStartTime = tempDate.format('YYYY-MM-DDTHH:mm:ssZ') // Format chuẩn ISO với VN timezone
      } else {
        console.warn('❌ Invalid date format:', appointment.startTime)
      }
    }

    const data = {
      ...appointment,
      roomId: roomId,
      serviceId: appointment.request?.serviceId,
      startTime: parsedStartTime // Chỉ gán nếu hợp lệ
    }

    console.log('🚀 ~ Sending data:', data)

    const res = await fetch(`${apiUrl}/appointments/Update/${appointment.appointmentId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (res.status >= 200 && res.status < 300) {
      const responseData = await res.json()
      toast.success(responseData.msg || 'Successfully assigned!')
      setTimeout(() => window.location.reload(), 1000)
    } else {
      const errorData = await res.json()
      toast.error(errorData.msg || 'Failed. Please try again.', {
        autoClose: 1000,
        closeButton: false
      })
    }
  } catch (e) {
    console.error('❌ Error in AssignRequest:', e)
    return []
  }
}

// Function to call CheckIn API
export const handleCheckInAPI = async (appointmentId: string) => {
  try {
    const res = await fetch(`${apiUrl}/appointments/CheckInCheckOut/${appointmentId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify('checkin')
    })

    if (res.status >= 200 && res.status < 300) {
      const responseData = await res.json()
      toast.success(responseData.msg || 'Check-in successful!')
      setTimeout(() => window.location.reload(), 1000)
    } else {
      const errorData = await res.json()
      toast.error(errorData.msg || 'Failed to check-in.', {
        autoClose: 1000,
        closeButton: false
      })
    }
  } catch (error) {
    console.error('Error during check-in:', error)
    toast.error('Internal server error. Please try again later.')
  }
}

// Function to call CheckOut API
export const handleCheckOutAPI = async (appointmentId: string) => {
  try {
    console.log('Checking out:', appointmentId)
    const res = await fetch(`${apiUrl}/appointments/CheckInCheckOut/${appointmentId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify('checkout')
    })

    if (res.status >= 200 && res.status < 300) {
      const responseData = await res.json()
      toast.success(responseData.msg || 'Check-out successful!')
      setTimeout(() => window.location.reload(), 1000)
    } else {
      const errorData = await res.json()
      toast.error(errorData.msg || 'Failed to check-out.', {
        autoClose: 1000,
        closeButton: false
      })
    }
  } catch (error) {
    console.error('Error during check-out:', error)
    toast.error('Internal server error. Please try again later.')
  }
}

import { apiUrl, getToken } from '../../../types/constants'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

export const fetchAppointments = async () => {
  try {
    const response = await fetch(`${apiUrl}/appointments/GetAllScheduleApp`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch appointments')
    }

    const appointments = await response.json()

    if (!Array.isArray(appointments)) {
      console.error('Unexpected data format:', appointments)
      return []
    }

    console.log('Fetched appointments:', appointments.length)

    const formattedAppointments = appointments.map((event, index) => {
      const { customerName, employeeName, roomNum, serviceName, startTime, endTime, status } = event

      return {
        id: index + 1,
        title: `${customerName || 'Unknown'} - ${status || 'Unknown'}`,
        start: startTime ? startTime.replace(/T(\d{2}:\d{2}):\d{2}/, ' $1') : 'Unknown',
        end: endTime ? endTime.replace(/T(\d{2}:\d{2}):\d{2}/, ' $1') : 'Unknown',
        people: employeeName ? [employeeName] : ['Unknown'],
        location: roomNum ? `Room ${roomNum}` : 'Unknown',
        description: serviceName || 'No description',
        calendarId:
          event.status === 'Processing'
            ? 'personal'
            : event.status === 'Finished'
              ? 'work'
              : event.status === 'Pending'
                ? 'leisure'
                : event.status === 'Cancelled'
                  ? 'school'
                  : 'personal'
      }
    })

    return formattedAppointments
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return []
  }
}

export const fetchAppointmentsByEmployee = async (id: string) => {
  try {
    const response = await fetch(`${apiUrl}/appointments/GetAppointmentByEmployeeId/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    if (!response.ok) {
      throw new Error('Failed to fetch appointments')
    }
    const appointments = await response.json()
    const formattedAppointments = appointments.map((event, index) => {
      const { customerName, employeeName, roomNum, serviceName, startTime, endTime, status } = event

      return {
        id: index + 1,
        title: `${customerName || 'Unknown'} - ${status || 'Unknown'}`,
        start: startTime ? startTime.replace(/T(\d{2}:\d{2}):\d{2}/, ' $1') : 'Unknown',
        end: endTime ? endTime.replace(/T(\d{2}:\d{2}):\d{2}/, ' $1') : 'Unknown',
        people: employeeName ? [employeeName] : ['Unknown'],
        location: roomNum ? `Room ${roomNum}` : 'Unknown',
        description: serviceName || 'No description',
        calendarId:
          event.status === 'Processing'
            ? 'personal'
            : event.status === 'Finished'
              ? 'work'
              : event.status === 'Pending'
                ? 'leisure'
                : event.status === 'Cancelled'
                  ? 'school'
                  : 'personal'
      }
    })
    return formattedAppointments
  } catch (error) {
    console.error('Error fetching appointments: ', error)
    return []
  }
}

export const fetchEmployees = async () => {
  try {
    const response = await fetch(`${apiUrl}/employees/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch employees')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching employees:', error)
    return []
  }
}

export const fetchRequests = async () => {
  try {
    const response = await fetch(`${apiUrl}/requests/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch requests')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching requests:', error)
    return []
  }
}

export const fetchCustomers = async () => {
  try {
    const response = await fetch(`${apiUrl}/customers/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Customers')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching customers:', error)
    return []
  }
}

export const fetchRooms = async () => {
  try {
    const response = await fetch(`${apiUrl}/rooms/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Rooms')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching rooms:', error)
    return []
  }
}

export async function getAllAppointments() {
  try {
    var res = await fetch(`${apiUrl}/appointments/GetAllScheduleApp`, {
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

export async function UpdateAppoitment(appointment: any, roomId: string) {
  try {
    let parsedStartTime = null
    if (typeof appointment.startTime === 'string' && appointment.startTime.trim() !== '') {
      const tempDate = dayjs(appointment.startTime, 'DD/MM/YYYY HH:mm:ss', true).tz('Asia/Ho_Chi_Minh')

      if (tempDate.isValid()) {
        parsedStartTime = tempDate.format('YYYY-MM-DDTHH:mm:ssZ')
      } else {
        console.warn('❌ Invalid date format:', appointment.startTime)
      }
    }

    const data = {
      ...appointment,
      roomId: roomId,
      serviceId: appointment.serviceId,
      startTime: parsedStartTime
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
      toast.success(responseData?.msg || 'Successfully assigned!')
      await fetch(`${apiUrl}/appointments/CreateMail/${responseData.appointmentId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        }
      })
      setTimeout(() => window.location.reload(), 1000)
    } else {
      const errorData = await res.json()
      toast.error(errorData?.msg || 'Failed. Please try again.', {
        autoClose: 1000,
        closeButton: false
      })
    }
  } catch (e) {
    console.error('❌ Error in AssignRequest:', e)
    return []
  }
}

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

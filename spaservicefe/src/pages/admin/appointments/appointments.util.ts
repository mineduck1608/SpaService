import { Description } from '@radix-ui/react-dialog'
import { getToken } from '../../../types/constants'

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
    console.log('Fetched appointments:', appointments)

    const employees = await fetchEmployees()
    console.log('Fetched employees:', employees)

    const rooms = await fetchRooms();
    console.log('rooms:', rooms);

    const employeeMap = new Map<string, { fullName: string }>(
      employees.map((emp: any) => [emp.employeeId, { fullName: emp.fullName }])
    )

    const roomMap = new Map<string, { roomNum: number; floorId: string | null }>(
      rooms.map((room: any) => [room.roomId, { roomNum: room.roomNum, floorId: room.floorId }])
    );

    const formattedAppointments = appointments.map(
      (event: { status: string; startTime: string; endTime: string; employeeId: string; roomId: string }, index: number) => {
        const employeeInfo = employeeMap.get(event.employeeId) || { fullName: 'Unknown' };
        const roomInfo = roomMap.get(event.roomId) || { roomNum: null, floorId: null };

        return {
          id: index + 1,
          title: event.status,
          start: event.startTime.replace(/T(\d{2}:\d{2}):\d{2}/, ' $1'),
          end: event.endTime.replace(/T(\d{2}:\d{2}):\d{2}/, ' $1'),
          people: [employeeInfo.fullName],
          location: roomInfo.floorId ? `Floor: ${roomInfo.floorId}` : 'Unknown',
          description: roomInfo.roomNum ? `Room ${roomInfo.roomNum}` : 'Unknown'
          //description
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


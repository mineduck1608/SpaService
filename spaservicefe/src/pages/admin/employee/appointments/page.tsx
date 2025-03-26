import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createViewDay, createViewMonthAgenda, createViewWeek, createViewMonthGrid } from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'
import { fetchAppointmentsByEmployee, fetchEmployees } from '../../appointments/appointments.util'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { getEmployeeByAccountId } from '../../employees/employee.util'
import { jwtDecode } from 'jwt-decode'
import { getToken } from 'src/types/constants'

function CalendarApp() {
  const [events, setEvents] = useState(() => {
    const savedEvents = sessionStorage.getItem('events')
    return savedEvents ? JSON.parse(savedEvents) : []
  })

  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true)
      try {
      const employee = await getEmployeeByAccountId(jwtDecode(getToken() ?? '').UserId)
      const fetchedEvents = await fetchAppointmentsByEmployee(employee.employeeId)
      console.log('Fetched events:', fetchedEvents)
      setEvents(fetchedEvents)
      sessionStorage.setItem('events', JSON.stringify(fetchedEvents))
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
    }

    loadEvents()
  }, [])

  const eventModal = createEventModalPlugin()

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: events,
    plugins: [eventModal],
    calendars: {
      personal: {
        colorName: 'personal',
        lightColors: {
          main: '#4a90e2',
          container: '#cfe5ff',
          onContainer: '#003366'
        }
      },
      work: {
        colorName: 'work',
        lightColors: {
          main: '#28a745',
          container: '#c8f7c5',
          onContainer: '#0b3d20'
        }
      },
      leisure: {
        colorName: 'leisure',
        lightColors: {
          main: '#f9d71c',
          container: '#fff5aa',
          onContainer: '#594800'
        }
      },
      school: {
        colorName: 'school',
        lightColors: {
          main: '#dc3545',
          container: '#ffccd5',
          onContainer: '#60000b'
        }
      }
    }
  })

  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={handleReload}
          style={{
            marginBottom: '20px',
            padding: '10px 20px',
            cursor: 'pointer',
            border: 'none',
            backgroundColor: '#4a90e2',
            color: 'white',
            borderRadius: '5px',
            fontSize: '16px',
            alignItems: 'center'
          }}
        >
          Show appointments
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              border: '5px solid #f3f3f3',
              borderTop: '5px solid #4a90e2',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          ></div>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#4a90e2', marginTop: '10px' }}>Loading events...</p>
        </div>
      ) : (
        <div>
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
      )}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  )
}

export default CalendarApp

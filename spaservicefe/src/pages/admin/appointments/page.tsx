import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createViewDay, createViewMonthAgenda, createViewWeek, createViewMonthGrid } from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'
import { fetchAppointments, fetchEmployees } from './appointments.util'
import { createEventModalPlugin } from '@schedule-x/event-modal'

function CalendarApp() {
  const [events, setEvents] = useState(() => {
    const savedEvents = sessionStorage.getItem('events')
    return savedEvents ? JSON.parse(savedEvents) : []
  })

  useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = await fetchAppointments()
      console.log('Fetched events:', fetchedEvents)
      setEvents(fetchedEvents)
      sessionStorage.setItem('events', JSON.stringify(fetchedEvents))
    }

    const loadEmployees = async () => {
      const fetchedEmployees = await fetchEmployees()
    }

    loadEvents()
    loadEmployees()
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
          onContainer: '#003366',
        },
      },
      work: {
        colorName: 'work',
        lightColors: {
          main: '#28a745',
          container: '#c8f7c5',
          onContainer: '#0b3d20',
        },
      },
      leisure: {
        colorName: 'leisure',
        lightColors: {
          main: '#f9d71c',
          container: '#fff5aa',
          onContainer: '#594800',
        },
      },
      school: {
        colorName: 'school',
        lightColors: {
          main: '#dc3545',
          container: '#ffccd5',
          onContainer: '#60000b',
        },
      },
    },
  })

  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div style={{ minHeight: '500px' }}>
      <button onClick={handleReload} style={{ marginBottom: '10px', padding: '8px 16px', cursor: 'pointer' }}>
        Show appointments
      </button>

      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default CalendarApp

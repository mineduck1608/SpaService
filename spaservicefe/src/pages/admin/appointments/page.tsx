import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createViewDay, createViewMonthAgenda, createViewWeek, createViewMonthGrid } from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'
import { fetchAppointments, fetchEmployees } from './appointments.util'
import { createEventModalPlugin } from '@schedule-x/event-modal'


function CalendarApp() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true)
      const fetchedEvents = await fetchAppointments()
      console.log('Fetched events:', fetchedEvents)
      setEvents(fetchedEvents)
      setLoading(false)
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
  })


  return (
    <div style={{ minHeight: '500px' }}>
      {loading ? (
        <p>Loading schedule...</p>
      ) : events.length > 0 ? (
        <ScheduleXCalendar calendarApp={calendar} />
      ) : (
        <p>No events found</p>
      )}
    </div>
  )
}

export default CalendarApp
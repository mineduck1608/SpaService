import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewWeek,
  createViewMonthGrid
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'
import { fetchAppointments, fetchEmployees } from './appointments.util'

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0]


  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events')
    return savedEvents ? JSON.parse(savedEvents) : []
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = await fetchAppointments()
      setEvents(fetchedEvents)
      localStorage.setItem('events', JSON.stringify(fetchedEvents))
    }

    const loadEmployees = async () => {
      const fetchedEmployees = await fetchEmployees()
      setEmployees(fetchedEmployees)
    };

    loadEvents();
    loadEmployees();
  }, [])

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: events,
    plugins: [eventsService],
  });

  return (
    <div style={{ minHeight: "500px" }}>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}



export default CalendarApp
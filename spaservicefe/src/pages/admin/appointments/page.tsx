import { useState, useEffect } from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
<<<<<<< Updated upstream
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { getAllAppointments } from './appointments.util'
import { Appointment } from '../../../types/type'
=======
import { getToken } from '../../../types/constants'
import { createViewDay, createViewMonthAgenda, createViewMonthGrid, createViewWeek } from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'

import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0]
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events')
    return savedEvents ? JSON.parse(savedEvents) : []
  })
  function formatNoSecond(d: string) {
    var x =d.split('T')
    var t = x[1].substring(0, 5)
    return x[0] + ' ' + t
  }
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://localhost:7205/api/appointments/GetAll', {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        const data = await response.json()
        console.log('Fetched events:', data)

        // Giả sử API trả về danh sách sự kiện có trường start và end dạng ISO
        const formattedEvents = data.map(
          (event: { status: string; startTime: string; endTime: string }, index: number) => ({
            id: index + 1,
            title: event.status,
            start: formatNoSecond(event.startTime), //.replace(/T(\d{2}:\d{2}):\d{2}/, ' $1'), // Định dạng ISO, ví dụ: "2025-02-20T10:00:00"
            end: formatNoSecond(event.endTime) //.replace(/T(\d{2}:\d{2}):\d{2}/, ' $1') // Định dạng ISO
          })
        )
>>>>>>> Stashed changes

import '@schedule-x/theme-default/dist/index.css'

function CalendarApp() {
  const [events, setEvents] = useState<{id: string, title: string, start: string, end: string}[]>([])
  const eventsService = createEventsServicePlugin()

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointments = await getAllAppointments()
        const formattedEvents = appointments.map((appointment: Appointment) => ({
          id: appointment.appointmentId,
          title: appointment.employee.fullName,
          start: appointment.startTime,
          end: appointment.endTime,
        }))
        setEvents(formattedEvents)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      }
    }
<<<<<<< Updated upstream

    fetchAppointments()
=======
    if (events.length === 0) {
      console.log('Run')
      fetchEvents()
    } else {
      console.log(events)
    }
>>>>>>> Stashed changes
  }, [])

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events,
    plugins: [eventsService]
  })

  return (
<<<<<<< Updated upstream
    <div>
=======
    <div style={{ border: '1px solid black', minHeight: '500px' }}>
>>>>>>> Stashed changes
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default CalendarApp

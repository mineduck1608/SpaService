import { useState, useEffect } from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { Appointment } from '../../../types/type' // Đảm bảo đường dẫn import đúng
import '@schedule-x/theme-default/dist/index.css'

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0]

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [], // Bắt đầu với danh sách rỗng
    plugins: [eventsService]
  })

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://localhost:7205/api/appointments/GetAll')
        const data: Appointment[] = await response.json() // Xác định kiểu dữ liệu API trả về

        // Chuyển đổi dữ liệu từ API thành danh sách phù hợp
        const formattedEvents = data.map((event: Appointment) => ({
          id: event.appointmentId,
          title: event.employee?.fullName || "Unknown Employee",
          start: new Date(event.startTime).toISOString(),
          end: new Date(event.endTime).toISOString(),
        }))

        // Cập nhật sự kiện trực tiếp vào lịch
        if (typeof calendar.addEvents === 'function') {
          calendar.addEvents(formattedEvents)
        } else {
          console.error('calendar.addEvents không tồn tại')
        }
      } catch (error) {
        console.error('Lỗi khi fetch dữ liệu:', error)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default CalendarApp

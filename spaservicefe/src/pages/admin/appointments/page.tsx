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
import { Customer } from '../../../types/type'
import { getToken } from '../../../types/constants' // Thêm import này
import '@schedule-x/theme-default/dist/index.css'
import { getAllAppointments } from './appointments.util'
import { getAllCustomers } from '../customers/customer.util'

type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
}

function CalendarApp() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const eventsService = useState(() => createEventsServicePlugin())[0]

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: events,
    plugins: [eventsService]
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointments, customersData] = await Promise.all([
          getAllAppointments(),
          getAllCustomers()
        ]);

        const formattedEvents = appointments.map((appointment: Appointment) => {
          // Tìm customer tương ứng với appointment thông qua requestId
          const customer = customersData.find(
            (c: Customer) => c.customerId === appointment.requestId
          );

          return {
            id: appointment.appointmentId,
            title: appointment.requestId,
            start: appointment.startTime,
            end: appointment.endTime
          };
        });
        
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Lỗi khi fetch dữ liệu:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Events:', events);
  }, [events]);

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default CalendarApp

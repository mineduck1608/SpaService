import React, { createContext } from 'react'

type PastBookingType = {
  pastBooking: boolean
  setPastBooking: React.Dispatch<React.SetStateAction<boolean>>
}

export const PastAppointmentContext = createContext<PastBookingType>(null as unknown as PastBookingType)

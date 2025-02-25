import React, { createContext, useState } from 'react'

type PastAppointmentType = {
  pastBooking: boolean
  setPastBooking: React.Dispatch<React.SetStateAction<boolean>>
}

export const PastAppointmentContext = createContext<PastAppointmentType>(null as unknown as PastAppointmentType)
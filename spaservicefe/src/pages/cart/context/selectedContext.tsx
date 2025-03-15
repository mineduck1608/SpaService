import { SessionItem } from '@/types/sessionItem'
import React, { createContext, useState } from 'react'

type SessionProps = {
  items: SessionItem[]
  setItems: React.Dispatch<React.SetStateAction<SessionItem[]>>
  customerId: string
}

export const SessionContext = createContext<SessionProps>(null as unknown as SessionProps)

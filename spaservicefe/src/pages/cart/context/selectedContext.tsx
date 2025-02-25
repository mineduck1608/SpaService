import { SessionItem } from '@/types/sessionItem'
import React, { createContext, useState } from 'react'

type SelectedType = {
  items: SessionItem[]
  setItems: React.Dispatch<React.SetStateAction<SessionItem[]>>
}

export const SelectedContext = createContext<SelectedType>(null as unknown as SelectedType)
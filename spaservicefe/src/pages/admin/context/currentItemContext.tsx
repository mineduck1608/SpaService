import React, { ReactNode, useContext, useState } from 'react'
import { createContext } from 'react'

export type CurrentItemContextType = {
  currentItem: string
  setCurrentItem: (item: string) => void
}

export const CurrentItemContext = createContext<CurrentItemContextType>({
  currentItem: '',
  setCurrentItem: (i) => { }
})

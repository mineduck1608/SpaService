import React, { createContext, useState } from 'react'

type TransType = {
  showServiceTrans: boolean
  setShowServiceTrans: React.Dispatch<React.SetStateAction<boolean>>
}

export const TransTypeContext = createContext<TransType>(null as unknown as TransType)

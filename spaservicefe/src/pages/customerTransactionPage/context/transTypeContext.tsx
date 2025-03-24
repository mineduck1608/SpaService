import React, { createContext } from 'react'
export type SmallProduct = {
  productId: string
  productName: string
}
type TransType = {
  showServiceTrans: boolean
  setShowServiceTrans: React.Dispatch<React.SetStateAction<boolean>>
  products: SmallProduct[]
  setProducts: React.Dispatch<React.SetStateAction<SmallProduct[]>>
}

export const TransTypeContext = createContext<TransType>(null as unknown as TransType)

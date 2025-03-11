import { SessionItem } from '@/types/sessionItem'

export type ProductPayResult = {
  orderDate: string
  address: string
  recepientName: string
  phone: string
  cart: SessionItem[]
}

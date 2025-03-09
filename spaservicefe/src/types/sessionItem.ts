import { CosmeticProduct } from './type'

export type SessionItem = {
  product: CosmeticProduct
  amount: number
  included?: boolean
  id?: string
}

export type CartCosmeticProduct = {
  id: string
  customerId: string
  productId: string
  product: CosmeticProduct
  quantity: number,
  included: boolean
}

export function toSessionItem(c: CartCosmeticProduct): SessionItem {
  return {
    product: c.product,
    amount: c.quantity,
    included: c.included,
    id: c.id
  }
}

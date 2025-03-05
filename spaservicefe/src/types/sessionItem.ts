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
  cosmeticProduct: CosmeticProduct
  quantity: number
}

export function toSessionItem(c: CartCosmeticProduct): SessionItem {
  return {
    product: c.cosmeticProduct,
    amount: c.quantity,
    included: true,
    id: c.id
  }
}

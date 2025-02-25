import { CosmeticProduct } from '@/types/type'
import { apiUrl, getToken } from '../../types/constants'
import { SessionItem } from '@/types/sessionItem'

export async function getCosmetic(id: string) {
  try {
    var s = await fetch(`${apiUrl}/cosmeticproducts/GetById/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var rs = (await s.json()) as CosmeticProduct
    return rs
  } catch (e) {
    return null
  }
}

export function getCart() {
  return JSON.parse(sessionStorage.getItem('cart') ?? '[]') as SessionItem[]
}
export function setCart(items: SessionItem[]) {
  sessionStorage.setItem('cart', JSON.stringify(items))
}
export function getCartItem(productId: string) {
  var cart = getCart()
  return cart.find((x) => x.product.productId === productId)
}
export function removeCartItem(productId: string) {
  var cart = getCart()
  cart = cart.filter((x) => x.product.productId !== productId)
  setCart(cart)
}
export function setItem(productId: string, amount?: number, included?: boolean, product?: CosmeticProduct) {
  var cart = getCart()
  var item = cart.findIndex((x) => x.product.productId === productId)
  if (item == -1) {
    if (product) {
      cart.push({
        amount: amount ?? 0,
        included: included ?? false,
        product: product
      })
    }
    setCart(cart)
    return
  }
  if (amount) {
    cart[item].amount = amount
  }
  if (included) {
    cart[item].included = included
  }
  setCart(cart)
}

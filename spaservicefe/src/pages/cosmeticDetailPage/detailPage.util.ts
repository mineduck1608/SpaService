import { CosmeticProduct } from '@/types/type'
import { apiUrl, getToken } from '../../types/constants'
import { CartCosmeticProduct, SessionItem, toSessionItem } from '../../types/sessionItem'

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

export async function getCart(customerId: string) {
  //return JSON.parse(sessionStorage.getItem('cart') ?? '[]') as SessionItem[]
  try {
    var resp = await fetch(`${apiUrl}/cartcosmeticproducts/GetByCustomerId/${customerId}`)
    if (resp.ok) {
      var data = (await resp.json())
      return (data as CartCosmeticProduct[]).map(v => toSessionItem(v))
    }
  } catch (e) {
    console.log(e);
    
  }
}
export function setCart(items: SessionItem[]) {
  sessionStorage.setItem('cart', JSON.stringify(items))
}
export async function getCartItem(customerId: string, productId: string) {
  try {
    var resp = await fetch(`${apiUrl}/cartcosmeticproducts/GetCartItem?customerId=${customerId}&productId=${productId}`)
    if (resp.ok) {
      var data = (await resp.json()) as CartCosmeticProduct
      return toSessionItem(data)
    }
  } catch (e) {}
}
export async function removeCartItem(entry: string) {
  try {
    await fetch(`${apiUrl}/cartcosmeticproducts/Delete/${entry}`, {
      method: 'delete'
    })
  } catch (e) {}
}
export async function setCartItem(customerId: string, productId: string, quantity: number) {
  try {
    await fetch(`${apiUrl}/cartcosmeticproducts/Create`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerId,
        productId,
        quantity
      })
    })
  } catch (e) {}
}

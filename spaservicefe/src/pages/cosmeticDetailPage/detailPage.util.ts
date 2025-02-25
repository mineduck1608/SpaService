import { CosmeticProduct } from '@/types/type'
import { apiUrl, getToken } from '../../types/constants'

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

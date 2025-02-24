import headerBg from '../../images/serviceBg/bg1.jpg'
import logo from '../../images/logos/tiny.png'
import selected from '../../images/serviceBg/selected.png'
import { apiUrl, getToken } from '../../types/constants'
import { CosmeticCategory, CosmeticProduct } from '../../types/type'

export const imgs = { headerBg, logo, selected }
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('de-DE').format(num).replace('.', '.')
}
export async function getCosmeticCategory(id: string) {
  try {
    var res = await fetch(`${apiUrl}/cosmeticcategories/GetById/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as CosmeticCategory[]
    return json
  } catch (e) {
    return null
  }
}
export async function getProductOfCosmeticCategory(id: string) {
  try {
    var res = await fetch(`${apiUrl}/cosmeticproducts/ProductOfCosmeticCategory/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as CosmeticProduct[]
    return json
  } catch (e) {
    return []
  }
}

async function getAllCosmeticCategories() {
  try {
    var res = await fetch(`${apiUrl}/cosmeticcategories/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as CosmeticCategory[]
    return json
  } catch (e) {
    return []
  }
}

export async function findCosmeticCategories() {
  const sessionCat = sessionStorage.getItem('cosmeticcategories')
  if (sessionCat) {
    return JSON.parse(sessionCat) as CosmeticCategory[]
  }
  var s = await getAllCosmeticCategories()
  if (s.length !== 0) {
    sessionStorage.setItem('cosmeticcategories', JSON.stringify(s))
  }
  return s
}

export function take<T>(arr: T[], pageNum: number, pageSize: number): T[] {
  let start = pageNum * pageSize
  let end = start + pageSize
  return arr.slice(start, end)
}

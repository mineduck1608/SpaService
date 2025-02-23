import headerBg from '../../images/serviceBg/bg1.jpg'
import logo from '../../images/logos/tiny.png'
import selected from '../../images/serviceBg/selected.png'
import { Service } from '../../types/services'
import { apiUrl, getToken } from '../../types/constants'
import { ServiceCategory } from '@/types/serviceCategory'

export const imgs = { headerBg, logo, selected }
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('de-DE').format(num)
}
export async function getCategory(id: string) {
  try {
    var res = await fetch(`${apiUrl}/servicecategories/GetById/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as ServiceCategory
    return json
  } catch (e) {
    return null
  }
}
export async function getServicesOfCategory(id: string) {
  try {
    var res = await fetch(`${apiUrl}/spaservices/ServiceOfCategory?categoryId=${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as Service[]
    return json
  } catch (e) {
    return []
  }
}

async function getAllCategories() {
  try {
    var res = await fetch(`${apiUrl}/servicecategories/GetAll`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var json = (await res.json()) as ServiceCategory[]
    return json
  } catch (e) {
    return []
  }
}

export async function findCategories() {
  const sessionCat = sessionStorage.getItem('categories')
  if (sessionCat) {
    return JSON.parse(sessionCat) as ServiceCategory[]
  }
  var s = await getAllCategories()
  if (s.length !== 0) {
    sessionStorage.setItem('categories', JSON.stringify(s))
  }
  return s
}
export function take<T>(arr: T[], pageNum: number, pageSize: number): T[] {
  let start = pageNum * pageSize
  let end = start + pageSize
  return arr.slice(start, end)
}

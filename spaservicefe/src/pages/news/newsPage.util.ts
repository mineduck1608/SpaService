import { apiUrl } from '../../types/constants'
import { News } from '@/types/news'

export async function getAllEvent() {
  try {
    var res = await fetch(`${apiUrl}/news/GetAllEvent`)
    var json = (await res.json()) as News[]
    return json
  } catch (e) {
    return []
  }
}

export async function getAllPromotion() {
  try {
    var res = await fetch(`${apiUrl}/news/GetAllPromotion`)
    var json = (await res.json()) as News[]
    return json
  } catch (e) {
    return []
  }
}

export async function getNewsById(id: string) {
  try {
    var res = await fetch(`${apiUrl}/news/GetById/${id}`)
    var json = (await res.json()) as News[]
    return json
  } catch (e) {
    return []
  }
}

export async function getAllBlog() {
  try {
    var res = await fetch(`${apiUrl}/news/GetAllBlog`)
    var json = (await res.json()) as News[]
    return json
  } catch (e) {
    return []
  }
}

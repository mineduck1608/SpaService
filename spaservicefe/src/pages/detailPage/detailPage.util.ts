import { apiUrl, getToken } from '../../types/constants'
import { Service } from '@/types/services'

export const sampleService: Service = {
  serviceId: 'svc_1_AI_GEN',
  serviceName: 'Swedish Massage',
  price: 100000,
  duration: '01:00:00',
  description:
    'A gentle, relaxing massage using smooth, long strokes and kneading to relieve stress, improve circulation, and promote overall well-being.',
  serviceImage: 'https://senspa.com.vn/wp-content/uploads/2020/11/massage-thai.jpg',
  categoryId: 'cat_1_AI_GEN',
  noOfSessions: 1
}
export async function getService(id: string) {
  try {
    var s = await fetch(`${apiUrl}/spaservices/GetById/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    var rs = (await s.json()) as Service
    return rs
  } catch (e) {
    return null
  }
}

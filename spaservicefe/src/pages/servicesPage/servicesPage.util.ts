import headerBg from '../../images/serviceBg/bg1.jpg'
import footer from '../../images/serviceBg/footer.jpg'
import logo from '../../images/logos/tiny.png'
import { Service } from '../../types/services'
import { apiUrl } from '../../types/constants'
import { Category } from '@/types/category'

export const imgs = { headerBg, footer, logo }
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('de-DE').format(num);
}
export const sample = [
  { "name": "Deep Tissue Massage", "val": "XJ29DF" },
  { "name": "Hot Stone Therapy", "val": "LM74QZ" },
  { "name": "Aromatherapy Relaxation Massage", "val": "PT58VK" },
  { "name": "Hydrating Facial Treatment", "val": "WY62BN" },
  { "name": "Revitalizing Body Scrub", "val": "QF83MJ" },
  { "name": "Full Body Detox Wrap", "val": "ZA47XN" },
  { "name": "Luxury Foot Reflexology", "val": "RC91TY" },
  { "name": "Anti-Aging Skin Rejuvenation", "val": "VK36PL" },
  { "name": "Scalp and Hair Treatment", "val": "MD52XQ" },
  { "name": "Rejuvenating Seaweed Wrap", "val": "TY84WC" }
]

export const service: Service = {
  categoryId: '',
  description: 'Sample service',
  duration: new Date(),
  noOfSessions: 1,
  price: 123456,
  serviceId: 'SERVICE',
  serviceImage: 'img',
  serviceName: 'Service Test long ABCDEFGHIJKLMNOPQRSTUV'
}
export const service2: Service = {
  categoryId: '',
  description: 'Sample service',
  duration: new Date(),
  noOfSessions: 1,
  price: 123456,
  serviceId: 'SERVICE',
  serviceImage: 'img',
  serviceName: 'Service Test'
}
export async function getCategory(id: string){
  try{
    var res = await fetch(`${apiUrl}/categories/GetById/${id}`)
    var json = await res.json() as Category
    return json
  }
  catch(e){
    return null
  }
}
import { apiUrl, getToken } from '../../types/constants'
import { Account } from '../../types/type'
import { toast } from 'react-toastify'
import { getCart } from '../cosmeticDetailPage/detailPage.util'

export function getAmount() {
  var cart = getCart()
  var amount = 0
  cart.forEach(v => {
    if (v.included) {
      amount += parseFloat((v.product.price * v.amount).toFixed(1))
    }
  })
  return amount
}
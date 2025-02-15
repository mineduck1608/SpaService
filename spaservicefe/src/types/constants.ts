import { jwtDecode } from "jwt-decode"

export const apiUrl = 'https://localhost:7205/api'
export const getToken = () => {
  return sessionStorage.getItem('token')
}
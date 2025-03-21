export const apiUrl = process.env.REACT_APP_API_URL
export const getToken = () => {
  return sessionStorage.getItem('token')
}
export const roleJWT = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'

export const apiUrl = 'https://localhost:7205/api'
export const getToken = () => {
  console.log(sessionStorage.getItem('token'))
  return sessionStorage.getItem('token')
}
export const roleJWT = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'

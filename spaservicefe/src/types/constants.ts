export const apiUrl = "https://spaservice-b7ezhfa0exeqesaj.canadacentral-01.azurewebsites.net/api"
export const getToken = () => {
  return sessionStorage.getItem('token')
}
export const roleJWT = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'

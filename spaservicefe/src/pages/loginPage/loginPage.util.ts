import { RoleName } from '../../types/role'
import { apiUrl } from '../../types/constants'

const authenticate = async (username: string, password: string) => {
  try {
    const resp = await fetch(`${apiUrl}/accounts/Login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    if (resp.ok) {
      return {
        success: true,
        token: (await resp.json()).accessToken
      }
    } else {
      return {
        success: false,
        msg: (await resp.text()) as string
      }
    }
  } catch (e) {
    return {
      success: false,
      msg: e as string
    }
  }
}
const routeByRole = (id: string) => {
  switch(id){
    case RoleName.ADMIN: return '/admin'
    case RoleName.CUSTOMER: return '/'
    case RoleName.EMPLOYEE: return '/employee'
    case RoleName.MANAGER: return '/manager'
  }
  return '/'
}

export { authenticate, routeByRole }

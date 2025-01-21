import { apiUrl } from "../../types/constants"

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
        msg: await resp.text()
      }
    }
  } catch (e) {
    return {
      success: false,
      msg: await e
    }
  }
}

export { authenticate }

import { apiUrl } from '../../types/constants.ts'

const register = async (params: {
  username: string
  password: string
  fullName: string
  gender: string
  phone: string
  email: string
  dateOfBirth: string
}) => {
  try {
    const resp = await fetch(`${apiUrl}/accounts/RegisterCustomer`, {
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(params),
      method: 'POST'
    })
    const json = await resp.text()
    if (resp.ok) {
      window.location.assign('/login')
      return {
        success: true,
        msg: ''
      }
    }
    return {
      success: false,
      msg: json
    }
  } catch (e) {
    return {
      success: false,
      msg: e
    }
  }
}

export { register }

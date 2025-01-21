import { apiUrl } from "../../types/constants"

const register = async (params:{
  username: string,
  password: string,
  fullName: string,
  gender: string,
  phone: string,
  email: string,
  dateOfBirth: Date
}) => {
  try{
    const resp = await fetch(`${apiUrl}/accounts/Register`, {
      headers: {
      }
    })
  }
  catch(e){

  }
}
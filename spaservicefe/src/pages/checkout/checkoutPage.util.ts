import { apiUrl } from "../../types/constants";
import { Employee } from "@/types/type";

export async function getEmployees(id: string) {
  try {
    var s = await fetch(`${apiUrl}/categories/EmployeesOf/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    return (await s.json()).employees as Employee[]
  }
  catch (e) {
    return []
  }
}
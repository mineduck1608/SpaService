export type Account = {
  accountId: string
  username: string
  password: string
  status: boolean
  createAt: Date
  roleId: string
  updatedAt: Date
}
export type Employee = {
  employeeId: string
  fullName: string
  position: string
  hireDate: Date
  status: string
  image: string
  accountId: string
  phone: string
  email: string
}
export type Role = {
  roleId: string
  roleName: string
}

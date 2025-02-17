export type Account = {
  accountId: string
  username: string
  password: string
  status: boolean
  createAt: Date
  roleId: string
  updatedAt: Date
}

export type Role = {
  roleId: string
  roleName: string
}

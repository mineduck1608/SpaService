export type Account = {
  accountId: string
  username: string
  password: string
  status: boolean
  createdAt: Date
  roleId: string
  updatedAt: Date
}

export type Role = {
  roleId: string
  roleName: string
}

export type Customer = {
  customerId: string
  accountId: string
  fullName: string
  gender: string
  phone: string
  email: string
  dateOfBirth: Date
  membershipId: string
}

export type Member = {
  membershipId: string
  type: string
  discount: number
  totalPayment: number
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

export type Request = {
  requestId: string
  startTime: Date
  status: string
  customerNote: string
  managerNote: string
  serviceId: string
  customerId: string
}

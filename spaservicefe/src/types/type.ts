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
  customer: Customer
}

export type Appointment = {
  appointmentId: string
  status: string
  requestId: string
  employeeId: string
  startTime: Date
  endTime: Date
  replacementEmployee: string
  updatedAt: Date
  employee: Employee
}

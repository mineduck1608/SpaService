export type Account = {
  accountId: string
  username: string
  password: string
  status: boolean
  createdAt: Date | string
  roleId: string
  updatedAt: Date | string
}
export type Employee = {
  employeeId: string
  fullName: string
  position: string
  hireDate: Date | string
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

export type Customer = {
  customerId: string
  accountId: string
  fullName: string
  gender: string
  phone: string
  email: string
  dateOfBirth: Date | string
  membershipId: string
}

export type Member = {
  membershipId: string
  type: string
  discount: number
  totalPayment: number
}

export type Request = {
  requestId: string
  startTime: Date | string
  status: string
  customerNote: string
  managerNote: string
  serviceId: string
  customerId: string
}

export type Contact = {
  contactId: string
  fullName: string
  phoneNumber: string
  email: string
  contactContent: string
  isProcessed: boolean
  customer: Customer
}

export type Appointment = {
  appointmentId: string
  status: string
  requestId: string
  employeeId: string
  startTime: string 
  endTime: string
  replacementEmployee: string
  updatedAt: Date
  employee: Employee
}

export type SpaService = {
  serviceId: string
  serviceName: string
  price: number
  duration: string
  description: string
  serviceImage: string
  categoryId: string
  noOfSessions: number
}

export type News = {
  newsId: string
  header: string
  content: string
  type: string
  image: string
  createdAt: Date | string
}

export type Category = {
  categoryId: string
  categoryName: string
  categoryImage: string
  categoryDescription: string
}

export type Promotion = {
  promotionId: string
  promotionCode: string
  promotionName: string
  discountValue: number
  isActive: boolean
}

export type Transaction = {
  transactionId: string
  transactionType: string
  requestId: string
  totalPrice: number
  status: boolean
  promotionId: string
  membershipId: string
}
import { Transaction } from "@/pages/checkout/checkoutPage.util"

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
}

export type Manager = {
  managerId: string
  fullName: string
  position: string
  hireDate: Date | string
  status: string
  image: string
  accountId: string
  phone: string
  email: string
}

export type Member = {
  membershipId: string
  type: string
  discount: number
  totalPayment: number
}

export type SpaRequest = {
  requestId: string
  startTime: string
  status: string
  customerNote: string
  managerNote: string
  serviceId: string
  customerId: string
  service?: SpaService
  employee?: Employee
  serviceTransactions?: ServiceTransaction[]
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
  updatedAt: Date
  employee?: Employee
  service?: SpaService
  request?: SpaRequest
  room?: Room
  roomId: string
}

export type SpaService = {
  serviceId: string
  serviceName: string
  price: number
  duration: string
  description: string
  serviceImage: string
  categoryId: string
}

export type News = {
  newsId: string
  header: string
  content: string
  type: string
  image: string
  categoryId: string
}

export type Promotion = {
  promotionId: string
  promotionCode: string
  promotionName: string
  discountValue: number
  isActive: boolean
}

export type Application = {
  applicationId: string
  status: string
  content: string
  accountId: string
  createdAt: Date | string
  resolvedAt: Date | string
  resolvedBy: string
}

export type CosmeticCategory = {
  categoryId: string
  categoryName: string
  categoryDescription: string
}

export type ServiceCategory = {
  categoryId: string
  categoryName: string
  categoryImage: string
  categoryDescription: string
}

export type CosmeticProduct = {
  productId: string
  productName: string
  price: number
  quantity: number
  description: string
  status: boolean
  isSelling: boolean
  image: string
  categoryId: string
}

export type Commission = {
  commissionId: string
  percentage: number
}

export type TransactionBase = {
  transactionId: string
  transactionType: string
  totalPrice: number
  status: boolean
  completeTime: string
  promotionId: string
  paymentType: string
}

export type ServiceTransaction = TransactionBase & {
  serviceTransactionId: string
  requestId: string
  membership?: string,
  transaction: TransactionBase
}

export type CosmeticTransaction = TransactionBase & {
  cosmeticTransactionId: string
  requestId: string
  orderId?: string
}

export type Order = {
  orderId: string
  customerId: string
  orderDate: Date
  totalAmount: GLfloat
  status: boolean
  transactionId: string
  address: string
}

export type OrderDetail = {
  orderDetailId: string
  quantity: number
  subTotalAmount: GLfloat
  orderId: string
  productId: string
}

export type Floor = {
  floorId: string
  floorNum: number
  categoryId: string
}

export type Room = {
  roomId: string
  roomNum: number
  floorId: string
  status: boolean
}

export type Feedback = {
  feedbackId: string
  feedbackMessage: string
  rating: number
  createdAt: Date
  createdBy: string
  serviceId: string
}

export type CategoryEmployee = {
  categoryEmployeeId: string
  categoryId: string
  employeeId: string
}

export type CustomerMembership = {
  customerId: string
  membershipId: string
  startDate: string
  enđate: string
}

export type Membership = {
  membershipId: string
  type: string
  totalPayment: GLfloat
  discount: number
}

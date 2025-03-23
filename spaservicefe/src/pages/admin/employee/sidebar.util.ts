import {
  Home,
  ClipboardList,
  LucideIcon,
  ArrowLeftRight,
  MessageCircleQuestion,
  Trash2,
  PaperclipIcon,
  CalendarCheck2,
  Wallet
} from 'lucide-react'

import { jwtDecode } from 'jwt-decode'
import { roleJWT } from '../../../types/constants'

const token = sessionStorage.getItem('token')
let userRole = 'Employee'

try {
  if (token) {
    const jwtData = jwtDecode(token)
    userRole = jwtData[roleJWT] || 'Employee'
    console.log(userRole)
  } else {
    console.error('Token not found')
  }
} catch (error) {
  console.error('Invalid token:', error)
  userRole = 'Employee'
}

const basePath = userRole === 'Admin' ? '/admin' : userRole === 'Manager' ? '/manager' : '/employee'

export const getFullPath = (path: string) =>
  path.startsWith('/admin') || path.startsWith('/manager') || path.startsWith('/employee') ? path : `${basePath}${path}`

const adminNavMain = [{ title: 'Home', url: '/admin', icon: Home }]
const managerNavMain = [{ title: 'Home', url: '/manager', icon: Home }]
const employeeNavMain = [{ title: 'Home', url: '/employee', icon: Home }]

export type SideBarItem = {
  title: string
  url?: string
  icon?: LucideIcon
  isActive?: boolean
  pages?: SideBarItem[]
  id?: string
  isFavorite?: boolean
}
export const sideData = {
  navMain: userRole === 'Admin' ? adminNavMain : userRole === 'Manager' ? managerNavMain : employeeNavMain,
  workspaces: [
    { title: 'Check-In', url: getFullPath('/check-in'), icon: CalendarCheck2 },
    {
      title: 'Appointments',
      icon: ClipboardList,
      pages: [
        { title: 'Schedule', url: getFullPath('/appointments-schedule') },
        { title: 'Manage', url: getFullPath('/appointments-manage') }
      ]
    },
    { title: 'Application', url: getFullPath('/application'), icon: PaperclipIcon },
    { title: 'Commission', url: getFullPath('/commissions'), icon: Wallet }

    // { title: 'Transactions', url: getFullPath('/transactions'), icon: ArrowLeftRight },
    // {
    //   title: 'Requests',
    //   icon: Contact2,
    //   pages: [
    //     { title: 'Customer Requests', url: getFullPath('/customer-requests') },
    //     { title: 'Applications', url: getFullPath('/applications') },
    //     { title: 'Guest Contacts', url: getFullPath('/guest-contacts') }
    //   ]
    // },
    // {
    //   title: 'Facilities',
    //   icon: Warehouse,
    //   pages: [
    //     { title: 'Floors', url: getFullPath('/floors') },
    //     { title: 'Rooms', url: getFullPath('/rooms') }
    //   ]
    // }
    // spaservices: [
    //   { title: 'Services Categories', icon: Sparkle, url: getFullPath('/service-categories') },
    //   { title: 'Spa Services', icon: Sparkles, url: getFullPath('/spa-services') }
    // ],
    // cosmetics: [
    //   { title: 'Cosmetic Categories', icon: Package, url: getFullPath('/cosmetic-categories') },
    //   { title: 'Cosmetic Products', icon: Blocks, url: getFullPath('/cosmetic-product') }
  ],
  navSecondary: [
    { title: 'Trash', url: '#', icon: Trash2 },
    { title: 'Help', url: '#', icon: MessageCircleQuestion }
  ]
}

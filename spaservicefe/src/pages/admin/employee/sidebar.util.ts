import {
    Home,
    Boxes,
    ClipboardList,
    LucideIcon,
    ArrowLeftRight,
    UserCircle,
    LetterText,
    Contact2,
    MessageCircleQuestion,
    LineChart,
    HandHelping,
    Users2Icon,
    Trash2,
    Warehouse,
    Grip,
    UserCog,
    Sparkles,
    Sparkle,
    Package,
    Blocks
  } from 'lucide-react'
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
    navMain: [
      {
        title: 'Home',
        url: '/employee',
        icon: Home
      }
    ],
    workspaces: [
      {
        title: 'Appointments',
        icon: ClipboardList,
        url: '/employee/appointments'
      },
      {
        title: 'Orders',
        icon: Boxes,
        url: '/employee/orders'
      },
      {
        title: 'Transactions',
        url: '/employee/transactions',
        icon: ArrowLeftRight
      },
      {
        title: 'Requests',
        icon: Contact2,
        pages: [
          {
            title: 'Customer Requests',
            url: '/customer-requests'
          },
          {
            title: 'Applications',
            url: '/employee/applications'
          },
          {
            title: 'Guest Contacts',
            url: '/employee/guest-contacts'
          }
        ]
      },
  
      {
        title: 'Facilities',
        icon: Warehouse,
        pages: [
          {
            title: 'Floors',
            url: '/employee/floors'
          },
          {
            title: 'Rooms',
            url: '/employee/rooms'
          }
        ]
      },
  
      {
        title: 'Others',
        icon: Grip,
        pages: [
          {
            title: 'Promotions',
            url: '/employee/promotions'
          },
          {
            title: 'News',
            url: '/employee/news'
          },
          {
            title: 'Feedbacks',
            url: '/employee/feedbacks'
          }
  
        ]
      }
    ],
    users: [
      {
        title: 'Employee Categories',
        icon: UserCog,
        url: '/employee/employee-categories'
      },
      {
        title: 'Users',
        icon: Users2Icon,
        pages: [
          {
            title: 'Customers',
            url: '/employee/customers'
          },
          {
            title: 'Employees',
            url: '/employee/employees'
          }
        ]
      }
    ],
    spaservices: [
      {
        title: 'Services Categories',
        icon: Sparkle,
        url: '/employee/service-categories'
      },
      {
        title: 'Spa Services',
        icon: Sparkles,
        url: '/employee/spa-services'
      }
    ],
    cosmetics: [
      {
        title: 'Cosmetic Categories',
        icon: Package,
        url: '/employee/cosmetic-categories'
      },
      {
        title: 'Cosmetic Products',
        icon: Blocks,
        url: '/employee/cosmetic-product'
      }
    ],
    navSecondary: [
      {
        title: 'Trash',
        url: '#',
        icon: Trash2
      },
      {
        title: 'Help',
        url: '#',
        icon: MessageCircleQuestion
      }
    ],
  }
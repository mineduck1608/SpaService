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
      url: '/manager',
      icon: Home
    }
  ],
  workspaces: [
    {
      title: 'Appointments',
      icon: ClipboardList,
      url: '/manager/appointments'
    },
    {
      title: 'Orders',
      icon: Boxes,
      url: '/manager/orders'
    },
    {
      title: 'Transactions',
      url: '/manager/transactions',
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
          url: '/manager/applications'
        },
        {
          title: 'Guest Contacts',
          url: '/manager/guest-contacts'
        }
      ]
    },

    {
      title: 'Facilities',
      icon: Warehouse,
      pages: [
        {
          title: 'Floors',
          url: '/manager/floors'
        },
        {
          title: 'Rooms',
          url: '/manager/rooms'
        }
      ]
    },

    {
      title: 'Others',
      icon: Grip,
      pages: [
        {
          title: 'Promotions',
          url: '/manager/promotions'
        },
        {
          title: 'News',
          url: '/manager/news'
        },
      ]
    }
  ],
  users: [
    {
      title: 'Employee Categories',
      icon: UserCog,
      url: '/manager/employee-categories'
    },
    {
      title: 'Users',
      icon: Users2Icon,
      pages: [
        {
          title: 'Customers',
          url: '/manager/customers'
        },
        {
          title: 'Employees',
          url: '/manager/employees'
        }
      ]
    }
  ],
  spaservices: [
    {
      title: 'Services Categories',
      icon: Sparkle,
      url: '/manager/service-categories'
    },
    {
      title: 'Spa Services',
      icon: Sparkles,
      url: '/manager/spa-services'
    }
  ],
  cosmetics: [
    {
      title: 'Cosmetic Categories',
      icon: Package,
      url: '/manager/cosmetic-categories'
    },
    {
      title: 'Cosmetic Products',
      icon: Blocks,
      url: '/manager/cosmetic-product'
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
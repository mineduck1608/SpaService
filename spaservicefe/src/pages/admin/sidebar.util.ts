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
      url: '/admin',
      icon: Home
    }
  ],
  workspaces: [
    {
      title: 'Appointments',
      icon: ClipboardList,
      url: '/admin/appointments'
    },
    {
      title: 'Orders',
      icon: Boxes,
      url: '/admin/orders'
    },
    {
      title: 'Transactions',
      url: '/admin/transactions',
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
          url: '/applications'
        },
        {
          title: 'Guest Contacts',
          url: '/guest-contacts'
        }
      ]
    },

    {
      title: 'Facilities',
      icon: Warehouse,
      pages: [
        {
          title: 'Floors',
          url: '/floors'
        },
        {
          title: 'Rooms',
          url: '/rooms'
        }
      ]
    },

    {
      title: 'Others',
      icon: Grip,
      pages: [
        {
          title: 'Promotions',
          url: '/promotions'
        },
        {
          title: 'News',
          url: '/news'
        },
        {
          title: 'Feedbacks',
          url: '/feedbacks'
        }
      ]
    }
  ],
  users: [
    {
      title: 'Accounts',
      icon: UserCircle,
      url: '/admin/accounts'
    },
    {
      title: 'Employee Categories',
      icon: UserCog,
      url: '/admin/employee-categories'
    },
    {
      title: 'Users',
      icon: Users2Icon,
      pages: [
        {
          title: 'Managers',
          url: '/managers'
        },
        {
          title: 'Customers',
          url: '/customers'
        },
        {
          title: 'Employees',
          url: '/employees'
        }
      ]
    }
  ],
  spaservices: [
    {
      title: 'Services Categories',
      icon: Sparkle,
      url: '/admin/service-categories'
    },
    {
      title: 'Spa Services',
      icon: Sparkles,
      url: '/admin/spa-services'
    }
  ],
  cosmetics: [
    {
      title: 'Cosmetic Categories',
      icon: Package,
      url: '/admin/cosmetic-categories'
    },
    {
      title: 'Cosmetic Products',
      icon: Blocks,
      url: '/admin/cosmetic-product'
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
  ]
}

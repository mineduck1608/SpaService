import {
  Home,
  Boxes,
  ClipboardList,
  LineChart,
  LucideIcon,
  CalendarCheck,
  LetterText,
  ArrowLeftRight,
  HandHelping,
  UserCircle,
  Contact2,
  MessageCircleQuestion,
  Trash2
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
      title: 'User List',
      icon: UserCircle,
      pages: [
        {
          title: 'Accounts',
          url: '/accounts'
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
    },
    {
      title: 'Workings',
      icon: ClipboardList,
      pages: [
        {
          title: 'Applications',
          url: '/applications'
        },
        {
          title: 'Appointments',
          url: '/appointments'
        }
      ]
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
          title: 'Contacts',
          url: '/contacts'
        }
      ]
    },
    {
      title: 'Products',
      icon: Boxes,
      pages: [
        {
          title: 'Categories',
          url: '/categories'
        },
        {
          title: 'Services',
          url: '/spa-services'
        },
        {
          title: 'News',
          url: '/news'
        },
        {
          title: 'Cosmetic Products',
          url: '/cosmetic-products'
        }
        
      ]
    },
    {
      title: 'Transactions',
      icon: ArrowLeftRight,
      pages: [
        {
          title: 'Transactions',
          url: '/transactions'
        },
        {
          title: 'Promotions',
          url: '/promotions'
        }
      ]
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
  favorite: [
    {
      title: 'Transactions',
      url: '/transactions',
      icon: LineChart
    },
    {
      title: 'Customer Requests',
      url: '/customer-requests',
      icon: HandHelping
    },
    {
      title: 'Contacts',
      url: '/contacts',
      icon: LetterText
    }
  ]
}

import {
  Home,
  Users,
  Boxes,
  ClipboardList,
  LineChart,
  DollarSign,
  LucideIcon,
  User,
  CalendarCheck,
  ArrowLeftRight,
  CalendarClock,
  HandHelping,
  UserCircle,
  MessageCircleQuestion,
  Trash2
} from 'lucide-react'
export type SideBarItem = {
  title: string
  url?: string
  icon: LucideIcon
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
      title: 'Account',
      icon: UserCircle,
      pages: [
        {
          title: 'Accounts',
          url: '/accounts'
        }
      ]
    },
    {
      title: 'Customers',
      icon: User,
      pages: [
        {
          title: 'Customers',
          url: '/customers'
        },
        {
          title: 'Memberships',
          url: '/memberships'
        }
      ]
    },
    {
      title: 'Employees',
      icon: Users,
      pages: [
        {
          title: 'Employees',
          url: '/employees'
        },
        {
          title: 'Shift',
          url: '/shifts'
        },
        {
          title: 'Schedule',
          url: '/schedules'
        }
      ]
    },
    {
      title: 'Appointments',
      icon: HandHelping,
      pages: [
        {
          title: 'Customer Requests',
          url: '/requests'
        },
        {
          title: 'Appointments',
          url: '/appointments'
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
          title: 'Employees Categories',
          url: '/employees-categories'
        },
        {
          title: 'Services',
          url: '/services'
        }
      ]
    },
    {
      title: 'Applications',
      icon: ClipboardList,
      pages: [
        {
          title: 'Applications',
          url: '/applications'
        },
        {
          title: 'Contacts',
          url: '/contacts'
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
          title: 'Commission Types',
          url: '/commissions'
        },
        {
          title: 'Employees Commissions',
          url: '/employees-commissions'
        }
      ]
    },
    {
      title: 'News & Promotions',
      icon: CalendarClock,
      pages: [
        {
          title: 'News',
          url: '/news'
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
      title: 'Schedule',
      url: '/admin/schedules',
      icon: CalendarCheck
    },
    {
      title: 'Transactions',
      url: '/admin/transactions',
      icon: LineChart
    },
    {
      title: 'Employees Commissions',
      url: '/admin/employees-commissions',
      icon: DollarSign
    }
  ]
}

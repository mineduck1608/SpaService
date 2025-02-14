import {
  Calendar,
  Home,
  MessageCircleQuestion,
  Trash2,
  Users,
  Package,
  Clock,
  BarChart,
  Settings,
  CalendarRange,
  XCircle,
  UserCog,
  MessageSquare,
  History,
  Boxes,
  Tag,
  ClipboardList,
  GanttChart,
  GaugeCircle,
  LineChart,
  DollarSign,
  Lock,
  LucideIcon,
  PaperclipIcon
} from 'lucide-react'
export type SideBarItem = {
  title: string
  url?: string
  icon: LucideIcon
  isActive?: boolean
  pages?: SideBarItem[]
}
export const sideData = {
  navMain: [
    {
      title: 'Home',
      url: '#',
      icon: Home,
      isActive: true
    }
  ],
  favorites: [
    {
      title: 'Appointments',
      url: '/admin/appointment',
      icon: Calendar
    },
    {
      title: 'Customers',
      url: '#',
      icon: Users
    },
    {
      title: 'Analytics',
      url: '#',
      icon: BarChart
    }
  ],
  workspaces: [
    {
      title: 'Account',
      icon: Calendar,
      url: '/account'
    },
    {
      title: 'Customers',
      icon: Calendar,
      pages: [
        {
          title: 'Customers',
          url: '/customers',
          icon: CalendarRange
        },
        {
          title: 'Memberships',
          url: '/memberships',
          icon: XCircle
        }
      ]
    },
    {
      title: 'Employees',
      icon: Users,
      pages: [
        {
          title: 'Employees',
          url: '/employees',
          icon: UserCog
        },
        {
          title: 'Shift',
          url: '/shifts',
          icon: MessageSquare
        },
        {
          title: 'Schedule',
          url: '/schedules',
          icon: MessageSquare
        }
      ]
    },
    {
      title: 'Appointments',
      icon: Package,
      pages: [
        {
          title: 'Customer requests',
          url: '/requests',
          icon: Boxes
        },
        {
          title: 'Appointments',
          url: '/appointments',
          icon: Tag
        }
      ]
    },
    {
      title: 'Products',
      icon: Clock,
      pages: [
        {
          title: 'Categories',
          url: '/categories',
          icon: ClipboardList
        },
        {
          title: 'Employees categories',
          url: '/employees-categories',
          icon: GanttChart
        },
        {
          title: 'Services',
          url: '/services',
          icon: ClipboardList
        }
      ]
    },
    {
      title: 'Applications',
      icon: Settings,
      pages: [
        {
          title: 'Applications',
          url: '/applications',
          icon: Lock
        },
        {
          title: 'Contacts',
          url: '/contacts',
          icon: Lock
        }
      ]
    },
    {
      title: 'Transactions',
      icon: Settings,
      pages: [
        {
          title: 'Transactions',
          url: '/transactions',
          icon: LineChart
        },
        {
          title: 'Commission types',
          url: '/commissions',
          icon: LineChart
        },
        {
          title: 'Employees commissions',
          url: '/employees-commissions',
          icon: DollarSign
        }
      ]
    },
    {
      title: 'News & Promotions',
      icon: Settings,
      pages: [
        {
          title: 'News',
          url: '/news',
          icon: Lock
        },
        {
          title: 'Promotions',
          url: '/promotions',
          icon: Lock
        }
      ]
    },
  ]
}

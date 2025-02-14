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
  LucideIcon
} from 'lucide-react'
export type SideBarItem = {
  title: string
  url?: string
  icon: LucideIcon
  isActive?: boolean,
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
      title: 'Appointments',
      icon: Calendar,
      pages: [
        {
          title: 'Appointment Management',
          url: '/admin/appointment',
          icon: CalendarRange
        },
        {
          title: 'Cancellations/Reschedules',
          url: '#',
          icon: XCircle
        }
      ]
    },
    {
      title: 'Customers',
      icon: Users,
      pages: [
        {
          title: 'Customer Management',
          url: '#',
          icon: UserCog
        },
        {
          title: 'Customer Reviews',
          url: '#',
          icon: MessageSquare
        },
        {
          title: 'Contact History',
          url: '#',
          icon: History
        }
      ]
    },
    {
      title: 'Services',
      icon: Package,
      pages: [
        {
          title: 'Service Management',
          url: '#',
          icon: Boxes
        },
        {
          title: 'Promotions',
          url: '#',
          icon: Tag
        }
      ]
    },
    {
      title: 'Staffs',
      icon: Clock,
      pages: [
        {
          title: "Today's Schedule",
          url: '#',
          icon: ClipboardList
        },
        {
          title: 'Staff Management',
          url: '#',
          icon: GanttChart
        },
        {
          title: 'Performance',
          url: '#',
          icon: GaugeCircle
        }
      ]
    },
    {
      title: 'Reports',
      icon: BarChart,
      pages: [
        {
          title: 'Booking Analytics',
          url: '#',
          icon: LineChart
        },
        {
          title: 'Revenue Reports',
          url: '#',
          icon: DollarSign
        }
      ]
    },
    {
      title: 'Settings',
      icon: Settings,
      pages: [
        {
          title: 'User Access Control',
          url: '#',
          icon: Lock
        }
      ]
    }
  ]
}
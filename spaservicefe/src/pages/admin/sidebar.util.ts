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
  url: string
  icon: any
  isActive?: LucideIcon
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
      name: 'Appointments',
      url: '/admin/appointment',
      icon: Calendar
    },
    {
      name: 'Customers',
      url: '#',
      icon: Users
    },
    {
      name: 'Analytics',
      url: '#',
      icon: BarChart
    }
  ],
  workspaces: [
    {
      name: 'Appointments',
      icon: Calendar,
      pages: [
        {
          name: 'Appointment Management',
          url: '/admin/appointment',
          icon: CalendarRange
        },
        {
          name: 'Cancellations/Reschedules',
          url: '#',
          icon: XCircle
        }
      ]
    },
    {
      name: 'Customers',
      icon: Users,
      pages: [
        {
          name: 'Customer Management',
          url: '#',
          icon: UserCog
        },
        {
          name: 'Customer Reviews',
          url: '#',
          icon: MessageSquare
        },
        {
          name: 'Contact History',
          url: '#',
          icon: History
        }
      ]
    },
    {
      name: 'Services',
      icon: Package,
      pages: [
        {
          name: 'Service Management',
          url: '#',
          icon: Boxes
        },
        {
          name: 'Promotions',
          url: '#',
          icon: Tag
        }
      ]
    },
    {
      name: 'Staffs',
      icon: Clock,
      pages: [
        {
          name: "Today's Schedule",
          url: '#',
          icon: ClipboardList
        },
        {
          name: 'Staff Management',
          url: '#',
          icon: GanttChart
        },
        {
          name: 'Performance',
          url: '#',
          icon: GaugeCircle
        }
      ]
    },
    {
      name: 'Reports',
      icon: BarChart,
      pages: [
        {
          name: 'Booking Analytics',
          url: '#',
          icon: LineChart
        },
        {
          name: 'Revenue Reports',
          url: '#',
          icon: DollarSign
        }
      ]
    },
    {
      name: 'Settings',
      icon: Settings,
      pages: [
        {
          name: 'User Access Control',
          url: '#',
          icon: Lock
        }
      ]
    }
  ]
}
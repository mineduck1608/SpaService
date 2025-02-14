import * as React from 'react'
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
  Lock
} from 'lucide-react'

import { NavFavorites } from 'src/components/nav-favorites'
import { NavMain } from 'src/components/nav-main'
import { NavSecondary } from 'src/components/nav-secondary'
import { NavWorkspaces } from 'src/components/nav-workspaces'
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from 'src/components/ui/sidebar'

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Home',
      url: '#',
      icon: Home,
      isActive: true
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
  favorites: [
    {
      name: 'Appointments',
      url: '#',
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
          url: '#',
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

export function SidebarLeft({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className='border-r-0' {...props}>
      <SidebarHeader>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} />
        <NavWorkspaces workspaces={data.workspaces} />
        <NavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

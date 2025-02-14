import * as React from 'react'
import {
  Calendar,
  Home,
  Inbox,
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
import { SideBarItem } from '@/pages/admin/sidebar.util'


export function SidebarLeft(params: {
  header: SideBarItem[]
  favourite: SideBarItem[]
  main: SideBarItem[]
  props: React.ComponentProps<typeof Sidebar>
}) {
  return (
    <Sidebar className='border-r-0' {...params.props}>
      <SidebarHeader>
        <NavMain items={params.header ?? []} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorite={params.favourite ?? []} />
        <NavWorkspaces items={params.main ?? []} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

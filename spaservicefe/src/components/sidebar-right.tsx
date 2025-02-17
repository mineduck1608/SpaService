import * as React from 'react'
import { Calendars } from 'src/components/calendars'
import { DatePicker } from 'src/components/date-picker'
import { NavUser } from 'src/components/nav-user'
import { Sidebar, SidebarContent, SidebarHeader, SidebarSeparator } from 'src/components/ui/sidebar'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: ''
  },
  calendars: [
    {
      name: 'My Calendars',
      items: ['Personal', 'Work', 'Deadline']
    }
  ]
}

export function SidebarRight({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='none' className='sticky top-0 hidden h-svh border-l lg:flex' {...props}>
      <SidebarHeader className='h-16 border-b border-sidebar-border'>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className='mx-0' />
        <Calendars calendars={data.calendars} />
      </SidebarContent>
    </Sidebar>
  )
}

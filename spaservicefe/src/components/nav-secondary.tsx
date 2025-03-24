import React from 'react'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from 'src/components/ui/sidebar'
import { SideBarItem } from '@/pages/admin/sidebar.util'

export function NavSecondary({
  items,
  ...props
}: {
  items: SideBarItem[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent className='mb-8'>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className='-ml-4'>
              <SidebarMenuButton asChild>
                <a href={item.url} className='text-black no-underline'>
                  <item.icon />
                  <span className='mb-0.5 text-base'>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {/* {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>} */}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

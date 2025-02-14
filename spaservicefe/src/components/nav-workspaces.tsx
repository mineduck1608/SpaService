import { SideBarItem } from '@/pages/admin/sidebar.util'
import { LucideIcon, ChevronRight, MoreHorizontal, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'src/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from 'src/components/ui/sidebar'

export function NavWorkspaces(params: { items: SideBarItem[] }) {
  const [activePage, setActivePage] = useState<string | null>(null)
  return (
    <SidebarGroup>
      <SidebarGroupLabel className='mb-2 text-lg'>Workspaces</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {params.items?.map((workspace) => (
            <Collapsible key={workspace.title} className='-ml-4'>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a className='text-black no-underline'
                  href={workspace.url ? ('/admin' + workspace.url) : '/admin#'}
                  >
                    {workspace.icon && <workspace.icon className='mr-1 h-4 w-4' />}
                    <span className='mb-0.5 text-base'>{workspace.title}</span>
                  </a>
                </SidebarMenuButton>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction
                    className='bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90'
                    showOnHover
                  >
                    <ChevronRight />
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {(workspace.pages ?? []).map((page) => (
                      <SidebarMenuSubItem key={page.title}>
                        <SidebarMenuSubButton asChild>
                          <a
                            href={'/admin' + page.url}
                            onClick={() => setActivePage(page.title)}
                            className={`-ml-3 no-underline ${activePage === page.title ? 'bg-gray-200 text-black' : 'text-black'}`}
                          >
                            {page.icon && <page.icon className='mr-1 h-4 w-4' />}
                            <span className='mb-0.5'>{page.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton className='text-sidebar-foreground/70'>
              <MoreHorizontal />
              <span className='text-base'>More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

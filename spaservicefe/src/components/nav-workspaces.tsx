import { SideBarItem } from '@/pages/admin/sidebar.util'
import { ChevronRight, Heart, MoreHorizontal, Star } from 'lucide-react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  const nav = useNavigate()
  return (
    <SidebarGroup>
      <SidebarGroupLabel className='mb-2 text-lg'>Workspaces</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {params.items?.map((workspace) => (
            <Collapsible key={workspace.title} className='-ml-4'>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a className='cursor-pointer text-black no-underline'>
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
                          <a href={'/admin' + (page.url ?? '')} className='text-black no-underline'
                          >
                            {page.icon && <page.icon className='mr-1 inline h-4 w-4' />}
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
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

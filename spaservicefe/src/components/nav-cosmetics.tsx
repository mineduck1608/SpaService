import { SideBarItem } from '@/pages/admin/sidebar.util'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
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
import { Link } from 'react-router-dom'

export function NavCosmetic(params: { items: SideBarItem[] }) {
  const nav = useNavigate()
  return (
    <SidebarGroup>
      <SidebarGroupLabel className='mb-2 text-lg'>Cosmetics</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {params.items?.map((workspace) => (
            <Collapsible key={workspace.title} className='-ml-4'>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={workspace.url ? workspace.url : '#'} className='cursor-pointer text-black no-underline'>
                    {workspace.icon && <workspace.icon className='mr-1 h-4 w-4' />}
                    <span className='mb-0.5 text-base'>{workspace.title}</span>
                  </Link>
                </SidebarMenuButton>
                {workspace.pages && (
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction
                      className='bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90'
                      showOnHover
                    >
                      <ChevronRight />
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                )}
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {(workspace.pages ?? []).map((page) => (
                      <SidebarMenuSubItem key={page.title}>
                        <SidebarMenuSubButton asChild>
                          <Link to={'/admin' + (page.url ?? '')} className='text-black no-underline'>
                            {page.icon && <page.icon className='mr-1 inline h-4 w-4' />}
                            <span className='mb-0.5'>{page.title}</span>
                          </Link>
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

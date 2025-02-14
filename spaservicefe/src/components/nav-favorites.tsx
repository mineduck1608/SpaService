import { SideBarItem } from '@/pages/admin/sidebar.util'
import { MoreHorizontal, StarOff, Trash2 } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from 'src/components/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from 'src/components/ui/sidebar'

export function NavFavorites(params: { favorite: SideBarItem[] }) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel className='mb-2 text-lg'>Favorites</SidebarGroupLabel>
      <SidebarMenu>
        {params.favorite.map((item) => (
          <SidebarMenuItem key={item.title} className='-ml-4'>
            <SidebarMenuButton asChild>
              <button
                onClick={(e) => {
                  window.location.assign(item.url ?? '/admin')
                }}
                title={item.title}
                className='text-black no-underline'
              >
                {item.icon && <item.icon className='mr-1 h-4 w-4' />}
                <span className='mb-0.5 text-base'>{item.title}</span>
              </button>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className='sr-only'>More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-56 rounded-lg'
                side={isMobile ? 'bottom' : 'right'}
                align={isMobile ? 'end' : 'start'}
              >
                <DropdownMenuItem>
                  <StarOff className='text-muted-foreground' />
                  <span>Remove from Favorites</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className='text-muted-foreground' />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

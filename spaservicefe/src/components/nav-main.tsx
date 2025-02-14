import { type LucideIcon } from 'lucide-react'

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from 'src/components/ui/sidebar'

export function NavMain({
  items
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
  }[]
}) {
  return (
    <SidebarMenu className='mt-6'>
      {items.map((item) => (
        <SidebarMenuItem key={item.title} className='-ml-7'>
          <SidebarMenuButton asChild isActive={item.isActive}>
            <a href={item.url} className='no-underline'>
              <item.icon />
              <span className='mb-0.5 ml-1 text-xl'>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

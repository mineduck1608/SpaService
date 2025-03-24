import { SideBarItem } from '@/pages/admin/sidebar.util'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from 'src/components/ui/sidebar'

export function NavMain(params: { items: SideBarItem[] }) {
  return (
    <SidebarMenu className='mt-6'>
      {params.items.map((item) => (
        <SidebarMenuItem key={item.title} className='-ml-7 '>
          <SidebarMenuButton asChild>
            <a href={item.url} className='text-black no-underline'>
              <item.icon />
              <span className='mb-0.5 ml-1 text-xl'>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

import { SideBarItem } from "@/pages/admin/sidebar.util"
import { type LucideIcon } from "lucide-react"

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from 'src/components/ui/sidebar'

export function NavMain(params: {items: SideBarItem[]}) {
  return (
    <SidebarMenu className="mt-6">
      {params.items.map((item) => (
        <SidebarMenuItem key={item.title} className="-ml-7 ">
          <SidebarMenuButton asChild >
            <a href={item.url} className="no-underline text-black">
              <item.icon/>
              <span className="text-xl mb-0.5 ml-1">{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

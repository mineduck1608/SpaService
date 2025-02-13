import { LucideIcon, ChevronRight, MoreHorizontal, Plus } from "lucide-react"
import React, { useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "src/components/ui/collapsible"
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
  SidebarMenuSubItem,
} from "src/components/ui/sidebar"

export function NavWorkspaces({
  workspaces,
}: {
  workspaces: {
    name: string
    icon: LucideIcon
    pages: {
      name: string
      icon: LucideIcon
    }[]
  }[]
}) {
  const [activePage, setActivePage] = useState<string | null>(null);
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-lg mb-2">Workspaces</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {workspaces.map((workspace) => (
            <Collapsible key={workspace.name} className="-ml-4">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="no-underline text-black">
                    {workspace.icon && <workspace.icon className='w-4 h-4 mr-1'/>}  
                    <span className="mb-0.5 text-base">{workspace.name}</span>
                  </a>
                </SidebarMenuButton>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction
                    className="bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
                    showOnHover
                  >
                    <ChevronRight />
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {workspace.pages.map((page) => (
                      <SidebarMenuSubItem key={page.name}>
                        <SidebarMenuSubButton asChild>
                        <a
                            href="#"
                            onClick={() => setActivePage(page.name)}
                            className={`no-underline -ml-3 ${
                              activePage === page.name
                                ? "bg-gray-200 text-black"
                                : "text-black"
                            }`}
                          >
                            {page.icon && <page.icon className='w-4 h-4 mr-1'/>}
                            <span className="mb-0.5">{page.name}</span>
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
            <SidebarMenuButton className="text-sidebar-foreground/70">
              <MoreHorizontal />
              <span className="text-base">More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

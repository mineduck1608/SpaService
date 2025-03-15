import * as React from 'react'

import { NavMain } from 'src/components/nav-main'
import { NavWorkspaces } from 'src/components/nav-workspaces'
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from 'src/components/ui/sidebar'
import { SideBarItem } from '@/pages/admin/sidebar.util'
import { NavSecondary } from './nav-secondary'
import { NavUsers } from './nav-users'
import { NavCosmetic } from './nav-cosmetics'
import { NavSpaservices } from './nav-spaservices'

export function SidebarLeft(params: {
  header: SideBarItem[]
  favourite?: SideBarItem[]
  workspaces: SideBarItem[]
  users: SideBarItem[]
  cosmetics: SideBarItem[]
  spaservices: SideBarItem[]
  secondary?: SideBarItem[]
  props: React.ComponentProps<typeof Sidebar>
}) {
  return (
    <Sidebar className='border-r-0' {...params.props}>
      <SidebarHeader>
        <NavMain items={params.header ?? []} />
      </SidebarHeader>
      <SidebarContent>
        <NavWorkspaces items={params.workspaces ?? []} />
        {params.users.length > 0 && <NavUsers items={params.users ?? []} />}
        {params.spaservices.length > 0 && <NavSpaservices items={params.spaservices ?? []} />}
        {params.cosmetics.length > 0 && <NavCosmetic items={params.cosmetics ?? []} />}
        <NavSecondary items={params.secondary ?? []} className='mt-auto' />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

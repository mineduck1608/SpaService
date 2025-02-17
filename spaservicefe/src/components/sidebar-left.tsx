import * as React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { NavMain } from 'src/components/nav-main'
import { NavWorkspaces } from 'src/components/nav-workspaces'
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from 'src/components/ui/sidebar'
import { SideBarItem } from '@/pages/admin/sidebar.util'
import { NavSecondary } from './nav-secondary'
import { NavFavorites } from './nav-favorites'

export function SidebarLeft(params: {
  header: SideBarItem[]
  favourite: SideBarItem[]
  main: SideBarItem[]
  secondary: SideBarItem[]
  props: React.ComponentProps<typeof Sidebar>
}) {
  const navigate = useNavigate() // Sử dụng navigate để chuyển hướng

  useEffect(() => {
    const token = sessionStorage.getItem('token') // Lấy token từ sessionStorage
    if (!token) {
      navigate('/login', { replace: true }) // Chuyển hướng về login nếu không có token
    }
  }, [navigate])

  return (
    <Sidebar className='border-r-0' {...params.props}>
      <SidebarHeader>
        <NavMain items={params.header ?? []} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorite={params.favourite ?? []} />
        <NavWorkspaces items={params.main ?? []} />
        <NavSecondary items={params.secondary ?? []} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

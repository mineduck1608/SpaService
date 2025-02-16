import { SidebarLeft } from 'src/components/sidebar-left'
import { SidebarRight } from 'src/components/sidebar-right'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from 'src/components/ui/breadcrumb'
import { Separator } from 'src/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from 'src/components/ui/sidebar'
import { sideData } from './sidebar.util'
import { Outlet } from 'react-router-dom'
import { useContext, useState } from 'react'
import { CurrentItemContext } from './context/currentItemContext'

export default function AdminPage() {
  const [currentItem, setCurrentItem] = useState<string>('')
  return (
    <SidebarProvider>
      <CurrentItemContext.Provider value={{ currentItem, setCurrentItem }}>
        <SidebarLeft
          favourite={sideData.favorite}
          main={sideData.workspaces}
          header={sideData.navMain}
          props={{}}
          secondary={sideData.navSecondary}
        />
      </CurrentItemContext.Provider>
      <SidebarInset>
        <header className='sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background'>
          <div className='flex flex-1 items-center gap-2 px-3'>
            <SidebarTrigger className='mt-0.5' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className='mt-3 line-clamp-1 text-base'>
                    <a className='text-black no-underline' href='#'>
                      Home
                    </a>
                    <span className='mx-2'>&gt;</span>
                    <span>{currentItem}</span>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  )
}

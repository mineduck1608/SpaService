import { SidebarLeft } from 'src/components/sidebar-left'
import { SidebarRight } from 'src/components/sidebar-right'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from 'src/components/ui/breadcrumb'
import { Separator } from 'src/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from 'src/components/ui/sidebar'
import { sideData } from './sidebar.util'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Page() {
  const location = useLocation()
  const currentPath = location.pathname
  const currentWorkspace = sideData.workspaces.find(workspace => workspace.pages.some(page => '/admin' + page.url === currentPath))
  const currentPage = currentWorkspace?.pages.find(page => '/admin' + page.url === currentPath)

  return (
    <SidebarProvider>
      <SidebarLeft
        favourite={sideData.favorite}
        main={sideData.workspaces}
        header={sideData.navMain} props={{}}
        secondary={sideData.navSecondary}
      />
      <SidebarInset>
        <header className='sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background'>
          <div className='flex flex-1 items-center gap-2 px-3'>
            <SidebarTrigger className='mt-0.5' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className='mt-3 line-clamp-1 text-base'>
                    <Link to="/admin" className='text-black no-underline'>
                      Home
                    </Link>
                    {currentWorkspace && (
                      <>
                        <span className='mx-2'>&gt;</span>
                        <span>Manage {currentWorkspace.title}</span>
                      </>
                    )}
                    {currentPage && (
                      <>
                        <span className='mx-2'>&gt;</span>
                        <span>{currentPage.title}</span>
                      </>
                    )}
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

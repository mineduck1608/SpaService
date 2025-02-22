import { SidebarLeft } from 'src/components/sidebar-left'
import { SidebarRight } from 'src/components/sidebar-right'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from 'src/components/ui/breadcrumb'
import { Separator } from 'src/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from 'src/components/ui/sidebar'
import { sideData } from './sidebar.util'
import { Outlet, useLocation } from 'react-router-dom'

export default function AdminPage() {
  // Sử dụng useLocation để lấy thông tin location của trang hiện tại
  const location = useLocation()

  // Lấy path từ location.pathname và chuyển đổi thành dạng title
  const x = location.pathname.substring(7).replace(/-/g, ' ')

  function capitalizeEachWord(sentence: string): string {
    return sentence
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  return (
    <SidebarProvider>
      <SidebarLeft
        favourite={sideData.favorite}
        main={sideData.workspaces}
        header={sideData.navMain}
        props={{}}
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
                    <a className='text-black no-underline' href='#'>
                      Home
                    </a>
                    <span className='mx-2'>&gt;</span>
                    <span>{capitalizeEachWord(x)}</span>
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

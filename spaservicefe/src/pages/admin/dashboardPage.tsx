import { SidebarLeft } from "src/components/sidebar-left"
import { SidebarRight } from "src/components/sidebar-right"
import { AreaChartComp } from 'src/components/area-chart'
import { PieChartComp } from 'src/components/pie-chart'
import { BarChartComp } from 'src/components/bar-chart'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "src/components/ui/breadcrumb"
import { Separator } from "src/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "src/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <SidebarLeft/>
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="mt-0.5"/>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1 mt-3 text-base">
                    <a className='no-underline text-black' href='#'>Home</a>
                    <span className='mx-2'>&gt;</span>
                    <span></span>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50">
              <AreaChartComp />
            </div>
            <div className="aspect-video rounded-xl bg-muted/50">
              <PieChartComp />
            </div>
            <div className="aspect-video rounded-xl bg-muted/50">
              <BarChartComp />
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  )
}

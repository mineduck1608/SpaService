import { SidebarLeft } from 'src/components/sidebar-left'
import { SidebarRight } from 'src/components/sidebar-right'
import { AreaChartComp } from 'src/components/chart/area-chart'
import { PieChartComp } from 'src/components/chart/pie-chart'
import { BarChartComp } from 'src/components/chart/bar-chart'
import { AreaChart2Comp } from 'src/components/chart/area-chart2'
import { LineChartComp  } from 'src/components/chart/line-chart'
import { RadarChartComp } from 'src/components/chart/radar-chart'
import { RadialChartComp } from 'src/components/chart/radial-chart'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from 'src/components/ui/breadcrumb'
import { Separator } from 'src/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from 'src/components/ui/sidebar'
import { sideData } from './sidebar.util'

export default function Page() {
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
                    <a className='text-black no-underline' href='#'>
                      Home
                    </a>
                    <span className='mx-2'>&gt;</span>
                    <span></span>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-10 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <LineChartComp />
            <RadarChartComp />
            <RadialChartComp />
          </div>
          <div>
            <AreaChart2Comp />
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <AreaChartComp />
            <PieChartComp />
            <BarChartComp />
          </div>
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  )
}

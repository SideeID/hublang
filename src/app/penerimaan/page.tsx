import { AppSidebar } from '@/components/app-sidebar';
import { DataTable } from '@/components/data-table';
import { ChartPieLabel } from '@/components/chart-pie-label';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { ChartBarMultiple } from '@/components/chart-bar-multiple';
import { ComparisonDataTables } from '@/components/comparison-data-tables';
import { DateRangeFilter } from '@/components/date-range-filter';
import { LocationFilter } from '@/components/location-filter';

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant='inset' />
      <SidebarInset>
        <SiteHeader />
        <div className='flex flex-1 flex-col'>
          <div className='@container/main flex flex-1 flex-col gap-2'>
            <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
              <div className='px-4 lg:px-6 flex flex-col gap-4 md:flex-row'>
                <div className='flex-1'>
                  <DateRangeFilter />
                </div>
                <div className='flex-1'>
                  <LocationFilter />
                </div>
              </div>
              <div className='flex flex-col gap-4 md:flex-row md:gap-6 px-4 lg:px-6'>
                <div className='flex-1'>
                  <ChartBarMultiple />
                </div>
                <div className='flex-1'>
                  <ChartPieLabel />
                </div>
              </div>
              <div className='px-4 lg:px-6'>
                <ComparisonDataTables />
              </div>
              <DataTable />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

'use client';

import * as React from 'react';
import { DateRange } from 'react-day-picker';
import { usePenerimaan } from '@/hooks/usePenerimaan';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SiteHeader } from '@/components/site-header';
import { DateRangeFilter } from '@/components/date-range-filter';
import { LocationFilter } from '@/components/location-filter';
import {
  ChartBarMultiple,
  WilayahBarDatum,
} from '@/components/chart-bar-multiple';
import { ChartPieLabel, PenerimaanTotals } from '@/components/chart-pie-label';
import {
  ComparisonDataTables,
  ComparisonRow,
} from '@/components/comparison-data-tables';
import { DataTable } from '@/components/data-table';

function formatISO(d?: Date) {
  if (!d) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default function PenerimaanClient() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });
  const [, setLoc] = React.useState<{
    kecamatan?: string;
    kelurahan?: string;
    rayon?: string;
  }>({});

  const params = React.useMemo(
    () => ({
      start_date: formatISO(range?.from) || '',
      end_date: formatISO(range?.to) || '',
      // Future: include location params when backend supports
    }),
    [range],
  );

  const { data, isLoading, isError, error } = usePenerimaan(
    params,
    Boolean(params.start_date && params.end_date),
  );

  // Adapters from API response to UI
  function toNumber(s?: string): number {
    if (!s) return 0;
    // values are numeric strings; ensure parseInt
    const n = Number(s);
    return Number.isFinite(n) ? n : 0;
  }

  const barData: WilayahBarDatum[] = React.useMemo(() => {
    const items = data?.data?.detail ?? [];
    return items.map(
      (it: { wilayah: string; lancar: string; tunggakan: string }) => ({
        wilayah: it.wilayah,
        lancar: toNumber(it.lancar),
        tunggakan: toNumber(it.tunggakan),
      }),
    );
  }, [data]);

  const pieTotals: PenerimaanTotals | undefined = React.useMemo(() => {
    const t = data?.data?.totalpenerimaan;
    if (!t) return undefined;
    return { lancar: toNumber(t.lancar), tunggakan: toNumber(t.tunggakan) };
  }, [data]);

  const currentRows: ComparisonRow[] = React.useMemo(() => {
    const items = data?.data?.detail ?? [];
    return items.map((it: { lancar: string; tunggakan: string }) => ({
      lancar: toNumber(it.lancar),
      tunggakan: toNumber(it.tunggakan),
      // efisiensi not provided yet
    }));
  }, [data]);

  const lastMonthRows: ComparisonRow[] = React.useMemo(() => {
    const items = data?.data?.bulan_lalu ?? [];
    return items.map((it: { lancar: string; tunggakan: string }) => ({
      lancar: toNumber(it.lancar),
      tunggakan: toNumber(it.tunggakan),
    }));
  }, [data]);

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
                  <DateRangeFilter value={range} onChange={setRange} />
                </div>
                <div className='flex-1'>
                  <LocationFilter onChange={setLoc} />
                </div>
              </div>
              {isLoading && <div className='px-4 lg:px-6'>Memuat data…</div>}
              {isError && (
                <div className='px-4 lg:px-6 text-red-600'>
                  {(error as Error).message}
                </div>
              )}
              <div className='flex flex-col gap-4 md:flex-row md:gap-6 px-4 lg:px-6'>
                <div className='flex-1'>
                  <ChartBarMultiple data={barData} />
                </div>
                <div className='flex-1'>
                  <ChartPieLabel totals={pieTotals} />
                </div>
              </div>
              <div className='px-4 lg:px-6'>
                <ComparisonDataTables
                  lastMonthData={lastMonthRows}
                  currentMonthData={currentRows}
                />
              </div>
              <DataTable />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

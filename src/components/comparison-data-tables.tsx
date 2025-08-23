'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

export interface ComparisonRow {
  lancar: number | string;
  tunggakan: number | string;
  efisiensi: number | string; 
}

interface ComparisonDataTablesProps {
  lastMonthLabel?: string;
  currentMonthLabel?: string;
  lastMonthData?: ComparisonRow[];
  currentMonthData?: ComparisonRow[];
}

function formatValue(v: number | string) {
  if (typeof v === 'number') return Intl.NumberFormat('id-ID').format(v);
  return v;
}

export function ComparisonDataTables({
  lastMonthLabel = 'Bulan Lalu',
  currentMonthLabel = 'Bulan Sekarang',
  lastMonthData = [
    { lancar: 1200, tunggakan: 150, efisiensi: '89%' },
    { lancar: 1200, tunggakan: 150, efisiensi: '89%' },
    { lancar: 1200, tunggakan: 150, efisiensi: '89%' },
  ],
  currentMonthData = [
    { lancar: 1350, tunggakan: 120, efisiensi: '92%' },
    { lancar: 1350, tunggakan: 120, efisiensi: '92%' },
    { lancar: 1350, tunggakan: 120, efisiensi: '92%' },
  ],
}: ComparisonDataTablesProps) {
  return (
    <div className='flex flex-col gap-4 md:flex-row'>
      <div className='flex flex-1 flex-col gap-2'>
        <h3 className='text-sm font-medium px-2 md:px-0'>{lastMonthLabel}</h3>
        <div className='overflow-hidden rounded-lg border bg-background'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader className='bg-muted'>
                <TableRow>
                  <TableHead>Lancar</TableHead>
                  <TableHead>Tunggakan</TableHead>
                  <TableHead>Efisiensi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='**:data-[slot=table-cell]:first:w-auto'>
                {lastMonthData.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{formatValue(row.lancar)}</TableCell>
                    <TableCell>{formatValue(row.tunggakan)}</TableCell>
                    <TableCell>{formatValue(row.efisiensi)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <div className='flex flex-1 flex-col gap-2'>
        <h3 className='text-sm font-medium px-2 md:px-0'>
          {currentMonthLabel}
        </h3>
        <div className='overflow-hidden rounded-lg border bg-background'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader className='bg-muted'>
                <TableRow>
                  <TableHead>Lancar</TableHead>
                  <TableHead>Tunggakan</TableHead>
                  <TableHead>Efisiensi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='**:data-[slot=table-cell]:first:w-auto'>
                {currentMonthData.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{formatValue(row.lancar)}</TableCell>
                    <TableCell>{formatValue(row.tunggakan)}</TableCell>
                    <TableCell>{formatValue(row.efisiensi)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

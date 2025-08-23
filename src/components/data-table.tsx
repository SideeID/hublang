'use client';

import * as React from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

export interface DRDCategoryValues {
  lbr: number | string;
  jumlah: number | string;
}

export interface DRDTriple {
  lancar: DRDCategoryValues;
  tunggakan: DRDCategoryValues;
  total: DRDCategoryValues;
}

export interface DRDRow {
  id: number;
  kasir: string;
  jumlahRayon: number | string;
  totalDrdPenagihan: DRDTriple;
  totalLunasDrdPenagihan: DRDTriple;
  sisaDrdPenagihan: DRDTriple;
  efisiensi: {
    lancar: number | string;
    tunggakan: number | string;
    total: number | string;
  };
}

const sampleRows: DRDRow[] = [
  {
    id: 1,
    kasir: 'Kasir A',
    jumlahRayon: 5,
    totalDrdPenagihan: {
      lancar: { lbr: 120, jumlah: 1500000 },
      tunggakan: { lbr: 30, jumlah: 350000 },
      total: { lbr: 150, jumlah: 1850000 },
    },
    totalLunasDrdPenagihan: {
      lancar: { lbr: 115, jumlah: 1400000 },
      tunggakan: { lbr: 10, jumlah: 120000 },
      total: { lbr: 125, jumlah: 1520000 },
    },
    sisaDrdPenagihan: {
      lancar: { lbr: 5, jumlah: 100000 },
      tunggakan: { lbr: 20, jumlah: 230000 },
      total: { lbr: 25, jumlah: 330000 },
    },
    efisiensi: { lancar: '92%', tunggakan: '65%', total: '88%' },
  },
  {
    id: 2,
    kasir: 'Kasir B',
    jumlahRayon: 7,
    totalDrdPenagihan: {
      lancar: { lbr: 200, jumlah: 2600000 },
      tunggakan: { lbr: 40, jumlah: 480000 },
      total: { lbr: 240, jumlah: 3080000 },
    },
    totalLunasDrdPenagihan: {
      lancar: { lbr: 180, jumlah: 2300000 },
      tunggakan: { lbr: 25, jumlah: 300000 },
      total: { lbr: 205, jumlah: 2600000 },
    },
    sisaDrdPenagihan: {
      lancar: { lbr: 20, jumlah: 300000 },
      tunggakan: { lbr: 15, jumlah: 180000 },
      total: { lbr: 35, jumlah: 480000 },
    },
    efisiensi: { lancar: '89%', tunggakan: '58%', total: '83%' },
  },
  {
    id: 3,
    kasir: 'Kasir C',
    jumlahRayon: 4,
    totalDrdPenagihan: {
      lancar: { lbr: 100, jumlah: 1300000 },
      tunggakan: { lbr: 20, jumlah: 240000 },
      total: { lbr: 120, jumlah: 1540000 },
    },
    totalLunasDrdPenagihan: {
      lancar: { lbr: 90, jumlah: 1100000 },
      tunggakan: { lbr: 15, jumlah: 180000 },
      total: { lbr: 105, jumlah: 1280000 },
    },
    sisaDrdPenagihan: {
      lancar: { lbr: 10, jumlah: 200000 },
      tunggakan: { lbr: 5, jumlah: 60000 },
      total: { lbr: 15, jumlah: 260000 },
    },
    efisiensi: { lancar: '90%', tunggakan: '75%', total: '83%' },
  },
];

function formatNumber(v: number | string) {
  if (typeof v === 'number') return Intl.NumberFormat('id-ID').format(v);
  return v;
}

interface DataTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any; // allow existing prop usage; will fallback to sampleRows
}

export function DataTable({ data }: DataTableProps) {
  // If provided data already matches DRDRow shape, accept it; else use sample
  const rows: DRDRow[] = React.useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (Array.isArray(data) && data.length && 'kasir' in (data[0] as any)) {
      return data as DRDRow[];
    }
    return sampleRows;
  }, [data]);

  return (
    <div className='w-full px-4 lg:px-6'>
      <div className='overflow-hidden rounded-lg border'>
        <Table>
          <TableHeader className='bg-muted'>
            <TableRow>
              <TableHead rowSpan={3} className='align-middle text-center'>
                Kasir
              </TableHead>
              <TableHead rowSpan={3} className='align-middle text-center'>
                Jumlah Rayon
              </TableHead>
              <TableHead colSpan={6} className='text-center'>
                Total DRD Penagihan
              </TableHead>
              <TableHead colSpan={6} className='text-center'>
                Total Lunas DRD Penagihan
              </TableHead>
              <TableHead colSpan={6} className='text-center'>
                Sisa DRD Penagihan
              </TableHead>
              <TableHead colSpan={3} className='text-center'>
                Efisiensi
              </TableHead>
            </TableRow>
            <TableRow>
              {Array.from({ length: 3 }).map((_, idx) => (
                <React.Fragment key={idx}>
                  <TableHead colSpan={2} className='text-center'>
                    Lancar
                  </TableHead>
                  <TableHead colSpan={2} className='text-center'>
                    Tunggakan
                  </TableHead>
                  <TableHead colSpan={2} className='text-center'>
                    Total
                  </TableHead>
                </React.Fragment>
              ))}
              <TableHead rowSpan={2} className='text-center'>
                Lancar
              </TableHead>
              <TableHead rowSpan={2} className='text-center'>
                Tunggakan
              </TableHead>
              <TableHead rowSpan={2} className='text-center'>
                Total
              </TableHead>
            </TableRow>
            <TableRow>
              {Array.from({ length: 3 * 3 }).map((_, i) => (
                <React.Fragment key={i}>
                  <TableHead className='text-center'>Lbr</TableHead>
                  <TableHead className='text-center'>Jumlah</TableHead>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.kasir}</TableCell>
                <TableCell className='text-center'>
                  {formatNumber(r.jumlahRayon)}
                </TableCell>
                {/* Total DRD Penagihan */}
                <TableCell className='text-right'>
                  {formatNumber(r.totalDrdPenagihan.lancar.lbr)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatNumber(r.totalDrdPenagihan.lancar.jumlah)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatNumber(r.totalDrdPenagihan.tunggakan.lbr)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatNumber(r.totalDrdPenagihan.tunggakan.jumlah)}
                </TableCell>
                <TableCell className='text-right font-medium'>
                  {formatNumber(r.totalDrdPenagihan.total.lbr)}
                </TableCell>
                <TableCell className='text-right font-medium'>
                  {formatNumber(r.totalDrdPenagihan.total.jumlah)}
                </TableCell>
                {/* Total Lunas DRD Penagihan */}
                <TableCell className='text-right'>
                  {formatNumber(r.totalLunasDrdPenagihan.lancar.lbr)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatNumber(r.totalLunasDrdPenagihan.lancar.jumlah)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatNumber(r.totalLunasDrdPenagihan.tunggakan.lbr)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatNumber(r.totalLunasDrdPenagihan.tunggakan.jumlah)}
                </TableCell>
                <TableCell className='text-right font-medium'>
                  {formatNumber(r.totalLunasDrdPenagihan.total.lbr)}
                </TableCell>
                <TableCell className='text-right font-medium'>
                  {formatNumber(r.totalLunasDrdPenagihan.total.jumlah)}
                </TableCell>
                {/* Sisa DRD Penagihan */}
                <TableCell className='text-right'>
                  {formatNumber(r.sisaDrdPenagihan.lancar.lbr)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatNumber(r.sisaDrdPenagihan.lancar.jumlah)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatNumber(r.sisaDrdPenagihan.tunggakan.lbr)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatNumber(r.sisaDrdPenagihan.tunggakan.jumlah)}
                </TableCell>
                <TableCell className='text-right font-medium'>
                  {formatNumber(r.sisaDrdPenagihan.total.lbr)}
                </TableCell>
                <TableCell className='text-right font-medium'>
                  {formatNumber(r.sisaDrdPenagihan.total.jumlah)}
                </TableCell>
                {/* Efisiensi */}
                <TableCell className='text-right'>
                  {formatNumber(r.efisiensi.lancar)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatNumber(r.efisiensi.tunggakan)}
                </TableCell>
                <TableCell className='text-right font-medium'>
                  {formatNumber(r.efisiensi.total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

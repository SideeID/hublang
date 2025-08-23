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

interface DrdRow {
  no: number;
  golongan: string;
  pelangganTotal: number;
  pelangganAktif: number;
  pelangganPasif: number;
  pelangganM3: number; 
  tagihanHargaAir: number;
  tagihanAdministrasi: number;
  tagihanDataMeter: number;
  totalTagihan: number; 
  rataM3: number; 
  rataRupiah: number; 
}

const sampleData: DrdRow[] = [
  {
    no: 1,
    golongan: 'Rumah Tangga',
    pelangganTotal: 120,
    pelangganAktif: 110,
    pelangganPasif: 10,
    pelangganM3: 1850,
    tagihanHargaAir: 12500000,
    tagihanAdministrasi: 900000,
    tagihanDataMeter: 350000,
    totalTagihan: 12500000 + 900000 + 350000,
    rataM3: 1850 / 110,
    rataRupiah: (12500000 + 900000 + 350000) / 110,
  },
  {
    no: 2,
    golongan: 'Niaga Kecil',
    pelangganTotal: 60,
    pelangganAktif: 55,
    pelangganPasif: 5,
    pelangganM3: 1500,
    tagihanHargaAir: 9800000,
    tagihanAdministrasi: 420000,
    tagihanDataMeter: 200000,
    totalTagihan: 9800000 + 420000 + 200000,
    rataM3: 1500 / 55,
    rataRupiah: (9800000 + 420000 + 200000) / 55,
  },
  {
    no: 3,
    golongan: 'Industri',
    pelangganTotal: 15,
    pelangganAktif: 14,
    pelangganPasif: 1,
    pelangganM3: 2100,
    tagihanHargaAir: 18750000,
    tagihanAdministrasi: 300000,
    tagihanDataMeter: 150000,
    totalTagihan: 18750000 + 300000 + 150000,
    rataM3: 2100 / 14,
    rataRupiah: (18750000 + 300000 + 150000) / 14,
  },
];

function formatNumber(n: number, opts: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat('id-ID', opts).format(n);
}

export function DrdTable({ data }: { data?: DrdRow[] }) {
  const rows = data && data.length ? data : sampleData;

  const totals = React.useMemo(() => {
    return rows.reduce(
      (acc, r) => {
        acc.pelangganTotal += r.pelangganTotal;
        acc.pelangganAktif += r.pelangganAktif;
        acc.pelangganPasif += r.pelangganPasif;
        acc.pelangganM3 += r.pelangganM3;
        acc.tagihanHargaAir += r.tagihanHargaAir;
        acc.tagihanAdministrasi += r.tagihanAdministrasi;
        acc.tagihanDataMeter += r.tagihanDataMeter;
        acc.totalTagihan += r.totalTagihan;
        acc.rataM3 += r.rataM3;
        acc.rataRupiah += r.rataRupiah;
        return acc;
      },
      {
        pelangganTotal: 0,
        pelangganAktif: 0,
        pelangganPasif: 0,
        pelangganM3: 0,
        tagihanHargaAir: 0,
        tagihanAdministrasi: 0,
        tagihanDataMeter: 0,
        totalTagihan: 0,
        rataM3: 0,
        rataRupiah: 0,
      },
    );
  }, [rows]);

  return (
    <div className='w-full px-4 lg:px-6'>
      <div className='overflow-auto rounded-lg border'>
        <Table>
          <TableHeader className='bg-muted'>
            <TableRow>
              <TableHead rowSpan={2} className='text-center align-middle'>
                No
              </TableHead>
              <TableHead rowSpan={2} className='text-center align-middle'>
                GOLONGAN
              </TableHead>
              <TableHead colSpan={4} className='text-center'>
                Pelanggan
              </TableHead>
              <TableHead colSpan={3} className='text-center'>
                TAGIHAN
              </TableHead>
              <TableHead rowSpan={2} className='text-center align-middle'>
                TOTAL TAGIHAN
              </TableHead>
              <TableHead colSpan={2} className='text-center'>
                RATA-RATA
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead className='text-center'>Total</TableHead>
              <TableHead className='text-center'>Aktif</TableHead>
              <TableHead className='text-center'>Pasif</TableHead>
              <TableHead className='text-center'>M3</TableHead>
              <TableHead className='text-center'>Harga Air</TableHead>
              <TableHead className='text-center'>Administrasi</TableHead>
              <TableHead className='text-center'>Data Meter</TableHead>
              <TableHead className='text-center'>M3</TableHead>
              <TableHead className='text-center'>RUPIAH</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.no}>
                <TableCell className='text-center'>{r.no}</TableCell>
                <TableCell>{r.golongan}</TableCell>
                <TableCell className='text-right'>
                  {formatNumber(r.pelangganTotal)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatNumber(r.pelangganAktif)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatNumber(r.pelangganPasif)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatNumber(r.pelangganM3)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatNumber(r.tagihanHargaAir)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatNumber(r.tagihanAdministrasi)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatNumber(r.tagihanDataMeter)}
                </TableCell>
                <TableCell className='text-right font-medium'>
                  {formatNumber(r.totalTagihan)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatNumber(r.rataM3, { maximumFractionDigits: 2 })}
                </TableCell>
                <TableCell className='text-right'>
                  {formatNumber(r.rataRupiah, { maximumFractionDigits: 0 })}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className='bg-muted/50 font-medium'>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className='text-right'>
                {formatNumber(totals.pelangganTotal)}
              </TableCell>
              <TableCell className='text-right'>
                {formatNumber(totals.pelangganAktif)}
              </TableCell>
              <TableCell className='text-right'>
                {formatNumber(totals.pelangganPasif)}
              </TableCell>
              <TableCell className='text-right'>
                {formatNumber(totals.pelangganM3)}
              </TableCell>
              <TableCell className='text-right'>
                {formatNumber(totals.tagihanHargaAir)}
              </TableCell>
              <TableCell className='text-right'>
                {formatNumber(totals.tagihanAdministrasi)}
              </TableCell>
              <TableCell className='text-right'>
                {formatNumber(totals.tagihanDataMeter)}
              </TableCell>
              <TableCell className='text-right'>
                {formatNumber(totals.totalTagihan)}
              </TableCell>
              <TableCell className='text-right'>
                {formatNumber(totals.rataM3, { maximumFractionDigits: 2 })}
              </TableCell>
              <TableCell className='text-right'>
                {formatNumber(totals.rataRupiah, { maximumFractionDigits: 0 })}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

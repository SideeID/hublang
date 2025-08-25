import { apiFetch } from './client';

export interface PenerimaanParams {
  start_date: string;
  end_date: string;
}

export interface PenerimaanTotal {
  lancar: string; 
  tunggakan: string; 
  total: string; 
}

export interface PenerimaanItem {
  wilayah: string;
  lancar: string; 
  tunggakan: string; 
  total: string; 
}

export interface PenerimaanData {
  totalpenerimaan: PenerimaanTotal;
  detail: PenerimaanItem[];
  bulan_lalu: PenerimaanItem[];
}

export interface PenerimaanResponse {
  status: string;
  message: string;
  data: PenerimaanData;
}

export function getPenerimaan(params: PenerimaanParams) {
  const search = new URLSearchParams(
    params as unknown as Record<string, string>,
  ).toString();
  return apiFetch<PenerimaanResponse>(`/api/hublang/penerimaan?${search}`);
}

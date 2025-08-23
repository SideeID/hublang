'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronsUpDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationFilterProps {
  onChange?: (value: {
    kecamatan?: string;
    kelurahan?: string;
    rayon?: string;
  }) => void;
  disabled?: boolean;
}

const WILAYAH_DATA: Record<string, Record<string, string[]>> = {
  'Kecamatan A': {
    'Kelurahan A1': ['Rayon 1', 'Rayon 2'],
    'Kelurahan A2': ['Rayon 3'],
  },
  'Kecamatan B': {
    'Kelurahan B1': ['Rayon 4', 'Rayon 5', 'Rayon 6'],
    'Kelurahan B2': ['Rayon 7'],
  },
  'Kecamatan C': {
    'Kelurahan C1': ['Rayon 8'],
  },
};

export function LocationFilter({ onChange, disabled }: LocationFilterProps) {
  const [kecamatan, setKecamatan] = React.useState<string | undefined>();
  const [kelurahan, setKelurahan] = React.useState<string | undefined>();
  const [rayon, setRayon] = React.useState<string | undefined>();

  const kelurahanOptions = React.useMemo(() => {
    if (!kecamatan) return [];
    return Object.keys(WILAYAH_DATA[kecamatan] || {});
  }, [kecamatan]);

  const rayonOptions = React.useMemo(() => {
    if (!kecamatan || !kelurahan) return [];
    return WILAYAH_DATA[kecamatan]?.[kelurahan] || [];
  }, [kecamatan, kelurahan]);

  function emit(next: {
    kecamatan?: string;
    kelurahan?: string;
    rayon?: string;
  }) {
    onChange?.(next);
  }

  function onSelectKecamatan(val: string) {
    setKecamatan(val);
    setKelurahan(undefined);
    setRayon(undefined);
    emit({ kecamatan: val });
  }
  function onSelectKelurahan(val: string) {
    setKelurahan(val);
    setRayon(undefined);
    emit({ kecamatan, kelurahan: val });
  }
  function onSelectRayon(val: string) {
    setRayon(val);
    emit({ kecamatan, kelurahan, rayon: val });
  }

  return (
    <div className='flex w-full max-w-xl flex-col'>
      <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-3'>
        <Combo
          placeholder='Kecamatan'
          value={kecamatan}
          onChange={onSelectKecamatan}
          options={Object.keys(WILAYAH_DATA).map((k) => ({
            label: k,
            value: k,
          }))}
          disabled={disabled}
          widthClass='md:w-48'
        />
        <Combo
          placeholder='Kelurahan'
          value={kelurahan}
          onChange={onSelectKelurahan}
          options={kelurahanOptions.map((k) => ({ label: k, value: k }))}
          disabled={!kecamatan || disabled}
          widthClass='md:w-48'
        />
        <Combo
          placeholder='Rayon'
          value={rayon}
          onChange={onSelectRayon}
          options={rayonOptions.map((r) => ({ label: r, value: r }))}
          disabled={!kelurahan || disabled}
          widthClass='md:w-40'
        />
      </div>
    </div>
  );
}

interface ComboOption {
  label: string;
  value: string;
}
interface ComboProps {
  placeholder: string;
  value?: string;
  onChange: (val: string) => void;
  options: ComboOption[];
  disabled?: boolean;
  widthClass?: string;
}

function Combo({
  placeholder,
  value,
  onChange,
  options,
  disabled,
  widthClass,
}: ComboProps) {
  const [open, setOpen] = React.useState(false);
  const selected = options.find((o) => o.value === value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant='outline'
          role='combobox'
          aria-expanded={open}
          disabled={disabled}
          className={cn('justify-between w-full', widthClass)}
        >
          {selected ? selected.label : placeholder}
          <ChevronsUpDown className='opacity-50 size-4 shrink-0' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0'>
        <Command>
          <CommandInput
            placeholder={`Cari ${placeholder.toLowerCase()}...`}
            className='h-9'
          />
          <CommandList>
            <CommandEmpty>Tidak ada data.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  {opt.label}
                  <Check
                    className={cn(
                      'ml-auto size-4',
                      value === opt.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

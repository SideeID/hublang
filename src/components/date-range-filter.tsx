'use client';

import * as React from 'react';
import { CalendarIcon, X } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

function formatDate(date: Date | undefined) {
  if (!date) return '';
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

interface DateRangeFilterProps {
  label?: string;
  value?: DateRange | undefined;
  onChange?: (range: DateRange | undefined) => void;
  numberOfMonths?: number;
  autoClose?: boolean;
}

export function DateRangeFilter({
  value,
  onChange,
  numberOfMonths = 2,
  autoClose = true,
}: DateRangeFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [range, setRange] = React.useState<DateRange | undefined>(value);
  const [month, setMonth] = React.useState<Date | undefined>(
    value?.from || new Date(),
  );

  React.useEffect(() => {
    setRange(value);
  }, [value]);

  function handleSelect(newRange: DateRange | undefined) {
    setRange(newRange);
    onChange?.(newRange);
    if (autoClose && newRange?.from && newRange?.to) {
      setOpen(false);
    }
  }

  function clear() {
    setRange(undefined);
    onChange?.(undefined);
  }

  return (
    <div className='flex flex-col gap-2 w-full max-w-md'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className='flex gap-2 w-full cursor-pointer'>
            <div className='relative flex-1'>
              <Input
                placeholder='Mulai'
                value={formatDate(range?.from)}
                readOnly
                className='pr-9 cursor-pointer'
              />
              <div className='pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground'>
                <CalendarIcon className='size-4' />
              </div>
            </div>
            <div className='relative flex-1'>
              <Input
                placeholder='Selesai'
                value={formatDate(range?.to)}
                readOnly
                className='pr-9 cursor-pointer'
              />
              <div className='pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground'>
                <CalendarIcon className='size-4' />
              </div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className='w-auto p-3 flex flex-col gap-3'
          align='start'
          sideOffset={10}
        >
          <Calendar
            mode='range'
            selected={range}
            month={month}
            onMonthChange={setMonth}
            onSelect={handleSelect}
            numberOfMonths={numberOfMonths}
            captionLayout='dropdown'
          />
          <div className='flex gap-2 justify-end'>
            {range?.from || range?.to ? (
              <Button variant='ghost' size='sm' onClick={clear} type='button'>
                <X className='size-3.5' /> Reset
              </Button>
            ) : null}
            <Button
              size='sm'
              variant='default'
              type='button'
              onClick={() => setOpen(false)}
              disabled={!range?.from}
            >
              Tutup
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

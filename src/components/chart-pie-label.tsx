'use client';

import { Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export interface PenerimaanTotals {
  lancar: number;
  tunggakan: number;
}

const defaultTotals: PenerimaanTotals = { lancar: 100, tunggakan: 40 };

const chartConfig = {
  value: {
    label: 'Nilai',
  },
  lancar: {
    label: 'Lancar',
    color: 'var(--chart-1)',
  },
  tunggakan: {
    label: 'Tunggakan',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

interface ChartPieLabelProps {
  totals?: PenerimaanTotals;
  title?: string;
  description?: string;
}

export function ChartPieLabel({
  totals = defaultTotals,
  title = 'Total Penerimaan',
  description,
}: ChartPieLabelProps) {
  const chartData = [
    { name: 'lancar', value: totals.lancar, fill: 'var(--color-lancar)' },
    {
      name: 'tunggakan',
      value: totals.tunggakan,
      fill: 'var(--color-tunggakan)',
    },
  ];

  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0'
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey='value' label nameKey='name' />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

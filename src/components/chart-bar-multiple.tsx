'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

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

export interface WilayahBarDatum {
  wilayah: string;
  lancar: number;
  tunggakan: number;
}

const defaultData: WilayahBarDatum[] = [
  { wilayah: 'KANTOR PUSAT', lancar: 100, tunggakan: 40 },
  { wilayah: 'IKK POLUT', lancar: 80, tunggakan: 25 },
  { wilayah: 'IKK GALESONG', lancar: 120, tunggakan: 30 },
];

const chartConfig = {
  lancar: {
    label: 'Lancar',
    color: 'var(--chart-1)',
  },
  tunggakan: {
    label: 'Tunggakan',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

interface ChartBarMultipleProps {
  data?: WilayahBarDatum[];
  title?: string;
  description?: string;
}

export function ChartBarMultiple({
  data = defaultData,
  title = 'Lancar vs Tunggakan',
  description,
}: ChartBarMultipleProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='wilayah'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dashed' />}
            />
            <Bar dataKey='lancar' fill='var(--color-lancar)' radius={4} />
            <Bar dataKey='tunggakan' fill='var(--color-tunggakan)' radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

interface OverviewProps {
  data: any[];
}

const chartConfig = {
  total: {
    label: 'Total',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export const Overview = ({ data }: OverviewProps) => {
  return (
    <>
      <ChartContainer config={chartConfig} className="h-[350px] w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="total" fill="var(--color-total)" radius={8} />
        </BarChart>
      </ChartContainer>
    </>
  );
};

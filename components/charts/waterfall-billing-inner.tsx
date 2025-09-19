'use client';

import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts';
import type { WaterfallBillingProps } from '@/types/charts';

function buildWaterfall(steps: WaterfallBillingProps['steps']) {
  let cumulative = 0;
  return steps.map((step) => {
    const start = cumulative;
    cumulative += step.value;
    return { ...step, start, end: cumulative };
  });
}

export default function WaterfallBillingInner({ steps, currency = '¥' }: WaterfallBillingProps) {
  const data = buildWaterfall(steps);
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data} margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(12,31,58,0.1)" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `${currency}${value / 1000}k`} />
        <Tooltip formatter={(value: number) => `${currency}${value.toLocaleString()}`} />
        <Bar dataKey="value" name="金额" fill="#142B4E" barSize={28} radius={[8, 8, 0, 0]} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

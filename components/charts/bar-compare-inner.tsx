'use client';

import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';
import type { BarCompareProps } from '@/types/charts';

export default function BarCompareInner({ data, labels, height = 280 }: BarCompareProps) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(12,31,58,0.1)" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="valueA" name={labels.a} fill="#33C4FF" radius={[8, 8, 0, 0]} />
          <Bar dataKey="valueB" name={labels.b} fill="#27AE60" radius={[8, 8, 0, 0]} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

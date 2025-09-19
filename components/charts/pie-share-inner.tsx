'use client';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import type { PieShareProps } from '@/types/charts';

const colors = ['#33C4FF', '#27AE60', '#FF5A5A', '#142B4E', '#0C1F3A'];

export default function PieShareInner({ data, innerRadius = 60, outerRadius = 90 }: PieShareProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={innerRadius} outerRadius={outerRadius}>
          {data.map((entry, index) => (
            <Cell key={`slice-${entry.name}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

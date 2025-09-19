'use client';

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import type { RadarSavingProps } from '@/types/charts';

export default function RadarSavingInner({ metrics }: RadarSavingProps) {
  const data = metrics.map((metric) => ({ subject: metric.label, 当前: metric.value, 目标: metric.target }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data} margin={{ top: 16, right: 24, bottom: 16, left: 24 }}>
        <PolarGrid stroke="rgba(12,31,58,0.16)" />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar name="当前" dataKey="当前" stroke="#33C4FF" fill="#33C4FF" fillOpacity={0.4} />
        <Radar name="目标" dataKey="目标" stroke="#27AE60" fill="#27AE60" fillOpacity={0.2} />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
}

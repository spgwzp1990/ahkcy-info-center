'use client';

import * as React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Brush,
} from 'recharts';
import type { TrendChartProps } from '@/types/charts';

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border/50 bg-white/90 p-3 text-xs text-foreground shadow-brand">
      <p className="font-semibold">{new Date(label).toLocaleString()}</p>
      <ul className="mt-1 space-y-1">
        {payload.map((item: any) => (
          <li key={item.dataKey} className="flex items-center gap-2">
            <span className="block h-2 w-2 rounded-full" style={{ backgroundColor: item.stroke }} />
            {item.name}: <strong>{item.value}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TrendChartInner({ data, series, yAxes, height = 320, onBrushChange }: TrendChartProps) {
  const axisMap = new Map(yAxes.map((axis) => [axis.key, axis]));

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 16, right: 24, left: 24, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(12,31,58,0.1)" />
          <XAxis dataKey="ts" tickFormatter={(value) => new Date(value).toLocaleTimeString('zh-CN', { hour: '2-digit' })} />
          {yAxes.map((axis) => (
            <YAxis
              key={axis.key}
              yAxisId={axis.key}
              label={{ value: axis.label, angle: -90, position: 'insideLeft', fill: axis.color ?? '#142B4E' }}
              tickFormatter={(value) => `${value}${axis.unit ?? ''}`}
              stroke={axis.color ?? '#142B4E'}
            />
          ))}
          <Tooltip content={<ChartTooltip />} />
          <Legend />
          {series.map((serie) => (
            <Line
              key={serie.key}
              type="monotone"
              dataKey={serie.key}
              name={serie.label}
              stroke={serie.color ?? axisMap.get(serie.key)?.color ?? '#33C4FF'}
              strokeWidth={2}
              dot={false}
              yAxisId={serie.key}
              isAnimationActive={false}
            />
          ))}
          <Brush dataKey="ts" height={24} stroke="#33C4FF" onChange={onBrushChange} travellerWidth={12} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

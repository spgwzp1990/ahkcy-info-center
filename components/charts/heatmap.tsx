'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import type { HeatmapProps } from '@/types/charts';
import { Skeleton } from '@/components/common/skeleton';

function colorScale(value: number, thresholds: number[]) {
  if (value >= thresholds[2]) return 'bg-danger/80';
  if (value >= thresholds[1]) return 'bg-danger/40';
  if (value >= thresholds[0]) return 'bg-info/60';
  return 'bg-info/20';
}

export function Heatmap({ data, thresholds = [40, 60, 80], isLoading }: HeatmapProps) {
  const zones = React.useMemo(() => Array.from(new Set(data.map((item) => item.zone))), [data]);
  const times = React.useMemo(() => Array.from(new Set(data.map((item) => item.time))), [data]);

  if (isLoading) {
    return <Skeleton className="h-64 w-full rounded-xl" />;
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[auto,1fr] gap-2">
        <div />
        <div className="grid grid-cols-12 gap-1 text-[10px] text-muted">
          {times.map((time) => (
            <span key={time} className="text-center">
              {time}
            </span>
          ))}
        </div>
        {zones.map((zone) => (
          <React.Fragment key={zone}>
            <span className="text-xs font-medium text-muted">{zone}</span>
            <div className="grid grid-cols-12 gap-1">
              {times.map((time) => {
                const value = data.find((item) => item.zone === zone && item.time === time)?.value ?? 0;
                return (
                  <motion.span
                    key={`${zone}-${time}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.18 }}
                    className={`flex aspect-square items-center justify-center rounded-[6px] text-[10px] text-white ${colorScale(
                      value,
                      thresholds,
                    )}`}
                    aria-label={`${zone} ${time} 负荷 ${value}%`}
                  >
                    {value}
                  </motion.span>
                );
              })}
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted">
        <span className="h-3 w-3 rounded-full bg-info/20" aria-hidden /> 正常
        <span className="h-3 w-3 rounded-full bg-info/60" aria-hidden /> 偏高
        <span className="h-3 w-3 rounded-full bg-danger/40" aria-hidden /> 预警
        <span className="h-3 w-3 rounded-full bg-danger/80" aria-hidden /> 告警
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/common/card';
import { Skeleton } from '@/components/common/skeleton';
import { cn, formatNumber } from '@/lib/utils';

export interface KpiCardProps {
  title: string;
  value: number;
  unit?: string;
  delta?: number;
  icon: LucideIcon;
  isLoading?: boolean;
}

export function KpiCard({ title, value, unit, delta, icon: Icon, isLoading }: KpiCardProps) {
  if (isLoading) {
    return <Skeleton className="h-36 rounded-xl" />;
  }

  const DeltaIcon = delta && delta >= 0 ? ArrowUpRight : ArrowDownRight;
  const deltaColor = delta && delta >= 0 ? 'text-success' : 'text-danger';

  return (
    <Card className="relative overflow-hidden">
      <motion.span
        aria-hidden
        className="absolute -right-10 top-6 h-28 w-28 rounded-full bg-info/10"
        initial={{ scale: 0.6, opacity: 0.4 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ duration: 0.2 }}
      />
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            {unit && <CardDescription className="mt-1 text-xs uppercase tracking-wide">{unit}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-semibold text-foreground">
          {formatNumber(value)}
          {unit && <span className="ml-1 text-base text-muted">{unit}</span>}
        </span>
        {delta !== undefined && (
          <span className={cn('flex items-center gap-1 text-sm font-medium', deltaColor)}>
            <DeltaIcon className="h-4 w-4" aria-hidden />
            {Math.abs(delta).toFixed(1)}%
          </span>
        )}
      </div>
    </Card>
  );
}

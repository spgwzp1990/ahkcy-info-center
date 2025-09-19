'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ToggleLeft, ToggleRight } from 'lucide-react';
import type { Strategy } from '@/types/models';
import { Button } from '@/components/common/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/common/card';
import { formatNumber } from '@/lib/utils';

export interface StrategyCardProps {
  strategy: Strategy;
  onToggle: (id: string, enabled: boolean) => void;
  onDrilldown?: (strategy: Strategy) => void;
}

export function StrategyCard({ strategy, onToggle, onDrilldown }: StrategyCardProps) {
  const [enabled, setEnabled] = React.useState(strategy.enabled);
  const handleToggle = () => {
    setEnabled((prev) => {
      const next = !prev;
      onToggle(strategy.id, next);
      return next;
    });
  };

  return (
    <Card className="relative overflow-hidden">
      <motion.span
        aria-hidden
        className="absolute -left-10 top-12 h-28 w-28 rounded-full bg-brand/10"
        initial={{ scale: 0.8, opacity: 0.3 }}
        animate={{ scale: enabled ? 1 : 0.6, opacity: enabled ? 0.7 : 0.3 }}
      />
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand">
            <Sparkles className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <CardTitle>{strategy.name}</CardTitle>
            <CardDescription>{strategy.kpiTarget}</CardDescription>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleToggle} aria-pressed={enabled} aria-label="切换策略">
          {enabled ? <ToggleRight className="h-5 w-5 text-info" aria-hidden /> : <ToggleLeft className="h-5 w-5 text-muted" aria-hidden />}
          {enabled ? '运行中' : '已关闭'}
        </Button>
      </CardHeader>
      <div className="flex items-center justify-between text-sm text-muted">
        <div>
          <span className="text-xs uppercase tracking-wide text-muted">最近收益</span>
          <p className="text-lg font-semibold text-foreground">¥{formatNumber(strategy.lastBenefit)}</p>
        </div>
        <div className="text-right">
          <span className="text-xs uppercase tracking-wide text-muted">自信度</span>
          <p className="text-lg font-semibold text-foreground">{Math.round(strategy.confidence * 100)}%</p>
        </div>
      </div>
      {onDrilldown && (
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" onClick={() => onDrilldown(strategy)}>
            查看详情
          </Button>
        </div>
      )}
    </Card>
  );
}

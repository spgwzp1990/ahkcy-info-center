'use client';

import { motion } from 'framer-motion';
import { Download, HelpCircle, RefreshCw, Timer } from 'lucide-react';
import { Button } from '@/components/common/button';
import { Switch } from '@/components/common/switch';
import { useFilters } from '@/hooks/use-filters';
import type { FilterBarProps, TimeRange } from '@/types/filters';
import { cn } from '@/lib/utils';

const timeRanges: Array<{ label: string; value: TimeRange }> = [
  { label: '近 1 小时', value: 'last_1h' },
  { label: '近 24 小时', value: 'last_24h' },
  { label: '近 7 天', value: 'last_7d' },
  { label: '自定义', value: 'custom' },
];

export function FilterBar({ sites, deviceTypes, tags, isLoading, onExport, onHelp }: FilterBarProps) {
  const filters = useFilters();

  return (
    <motion.section
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Timer className="h-4 w-4" aria-hidden />
            <span>筛选器</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-xl border border-border/60 bg-white/70 p-1 shadow-sm dark:bg-brand/20">
              {(['png', 'csv', 'pdf'] as const).map((type) => (
                <Button
                  key={type}
                  variant="ghost"
                  size="sm"
                  onClick={() => onExport(type)}
                  className="capitalize"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden />
                  {type}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className={cn(filters.autoRefresh ? 'text-info' : 'text-muted')}
              onClick={filters.toggleAutoRefresh}
            >
              <RefreshCw className={cn('h-3.5 w-3.5', filters.autoRefresh && 'animate-spin')} aria-hidden />
              自动刷新
            </Button>
            <Button variant="ghost" size="sm" onClick={onHelp}>
              <HelpCircle className="h-3.5 w-3.5" aria-hidden />
              快捷键 ?
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">时间范围</span>
            <select
              className="focus-ring rounded-xl border border-border/60 bg-white/80 px-3 py-2 text-sm text-foreground shadow-sm dark:bg-brand/30"
              value={filters.timeRange}
              onChange={(e) => filters.update({ timeRange: e.target.value as TimeRange })}
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">站点</span>
            <select
              className="focus-ring rounded-xl border border-border/60 bg-white/80 px-3 py-2 text-sm text-foreground shadow-sm dark:bg-brand/30"
              value={filters.site}
              onChange={(e) => filters.update({ site: e.target.value })}
            >
              {sites.map((site) => (
                <option key={site.value} value={site.value}>
                  {site.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">设备类型</span>
            <select
              multiple
              aria-label="设备类型多选"
              className="focus-ring h-12 rounded-xl border border-border/60 bg-white/80 px-3 py-2 text-sm text-foreground shadow-sm dark:bg-brand/30"
              value={filters.deviceTypes}
              onChange={(e) =>
                filters.update({
                  deviceTypes: Array.from(e.target.selectedOptions).map((option) => option.value),
                })
              }
            >
              {deviceTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">标签</span>
            <select
              multiple
              aria-label="标签多选"
              className="focus-ring h-12 rounded-xl border border-border/60 bg-white/80 px-3 py-2 text-sm text-foreground shadow-sm dark:bg-brand/30"
              value={filters.tags}
              onChange={(e) =>
                filters.update({
                  tags: Array.from(e.target.selectedOptions).map((option) => option.value),
                })
              }
            >
              {tags.map((tag) => (
                <option key={tag.value} value={tag.value}>
                  {tag.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex items-center justify-between text-sm text-muted">
          <Switch
            checked={filters.autoRefresh}
            onChange={(event) => filters.update({ autoRefresh: event.target.checked })}
            aria-label="切换自动刷新"
          />
          <span>{isLoading ? '加载中…' : '筛选已更新'}</span>
        </div>
      </div>
    </motion.section>
  );
}

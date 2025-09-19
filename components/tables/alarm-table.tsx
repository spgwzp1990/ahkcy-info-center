'use client';

import * as React from 'react';
import { Download, Filter, Search } from 'lucide-react';
import { Button } from '@/components/common/button';
import { Skeleton } from '@/components/common/skeleton';
import type { Alarm } from '@/types/models';
import { formatDate } from '@/lib/utils';

const levelColorMap: Record<Alarm['level'], string> = {
  low: 'bg-brand/20 text-brand',
  medium: 'bg-info/20 text-info',
  high: 'bg-danger/20 text-danger',
  critical: 'bg-danger text-white',
};

export interface AlarmTableProps {
  alarms: Alarm[];
  isLoading?: boolean;
  onExport: (format: 'csv' | 'xlsx') => void;
}

const pageSize = 5;

export function AlarmTable({ alarms, isLoading, onExport }: AlarmTableProps) {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [level, setLevel] = React.useState<'all' | Alarm['level']>('all');

  const filtered = alarms.filter((alarm) => {
    const matchesLevel = level === 'all' || alarm.level === level;
    const matchesSearch = alarm.desc.toLowerCase().includes(search.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  React.useEffect(() => {
    setPage(1);
  }, [level, search]);

  if (isLoading) {
    return <Skeleton className="h-64 rounded-xl" role="status" aria-live="polite" />;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Filter className="h-4 w-4" aria-hidden />
          <span>筛选告警</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="搜索描述…"
              className="focus-ring h-9 rounded-xl border border-border/60 bg-white/80 pl-9 pr-3 text-sm shadow-sm dark:bg-brand/30"
            />
          </label>
          <select
            aria-label="按等级筛选"
            value={level}
            onChange={(event) => setLevel(event.target.value as Alarm['level'] | 'all')}
            className="focus-ring h-9 rounded-xl border border-border/60 bg-white/80 px-3 text-sm shadow-sm dark:bg-brand/30"
          >
            <option value="all">全部等级</option>
            <option value="low">低</option>
            <option value="medium">中</option>
            <option value="high">高</option>
            <option value="critical">紧急</option>
          </select>
          <Button variant="outline" size="sm" onClick={() => onExport('csv')}>
            <Download className="h-3.5 w-3.5" aria-hidden /> CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => onExport('xlsx')}>
            <Download className="h-3.5 w-3.5" aria-hidden /> Excel
          </Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-border/50">
        <table className="min-w-full divide-y divide-border/50 text-left text-sm">
          <thead className="bg-brand-surface/80 text-white">
            <tr>
              <th scope="col" className="px-4 py-3">时间</th>
              <th scope="col" className="px-4 py-3">设备</th>
              <th scope="col" className="px-4 py-3">描述</th>
              <th scope="col" className="px-4 py-3">阈值</th>
              <th scope="col" className="px-4 py-3">处理</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 bg-white/80 dark:bg-brand/20">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  暂无符合条件的告警
                </td>
              </tr>
            ) : (
              paginated.map((alarm) => (
                <tr key={alarm.id} className="transition hover:bg-info/5">
                  <td className="px-4 py-3 font-medium text-foreground">{formatDate(alarm.ts)}</td>
                  <td className="px-4 py-3">
                    <span className="mb-1 block font-semibold text-foreground">{alarm.deviceId}</span>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${levelColorMap[alarm.level]}`}
                    >
                      {alarm.level}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">{alarm.desc}</td>
                  <td className="px-4 py-3 text-muted">
                    <span className="font-semibold text-foreground">{alarm.value}</span> / {alarm.threshold}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {alarm.ack ? (
                      <span className="rounded-full bg-success/20 px-3 py-1 text-xs text-success">
                        已派工 {alarm.workOrderId}
                      </span>
                    ) : (
                      <span className="rounded-full bg-danger/10 px-3 py-1 text-xs text-danger">待确认</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          第 {page} / {totalPages} 页，共 {filtered.length} 条
        </span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            上一页
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            下一页
          </Button>
        </div>
      </div>
    </div>
  );
}

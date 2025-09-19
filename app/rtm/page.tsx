'use client';

import { useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { FilterBar } from '@/components/filters/filter-bar';
import { TrendChart } from '@/components/charts/trend-chart';
import { AlarmTable } from '@/components/tables/alarm-table';
import { PfdCanvas } from '@/components/canvas/pfd-canvas';
import { useRtmTrend, useAlarms } from '@/lib/queries';
import { mockTrend, mockAlarms } from '@/lib/mock-data';
import type { FilterOption } from '@/types/filters';

const siteOptions: FilterOption[] = [
  { label: '全部站点', value: 'all' },
  { label: '示范站 A', value: 'a' },
];

const deviceOptions: FilterOption[] = [
  { label: '主机', value: 'main' },
  { label: '水泵', value: 'pump' },
  { label: '阀门', value: 'valve' },
];

const tagOptions: FilterOption[] = [
  { label: '一级告警', value: 'critical' },
  { label: '二级告警', value: 'high' },
  { label: '未确认', value: 'pending' },
];

export default function RtmPage() {
  const { data: trend = mockTrend, isLoading } = useRtmTrend();
  const { data: alarms = mockAlarms, isLoading: alarmLoading } = useAlarms();

  const nodes = useMemo(
    () => [
      { id: 'w1', title: '地热井', description: '井口温度 68℃', status: 'normal' },
      { id: 'hx1', title: '换热站', description: '一次水 55℃', status: 'warning', slot: '旁通阀 65%' },
      { id: 'hp1', title: '热泵', description: 'COP 5.8', status: 'normal', slot: '压缩机 A 运行' },
      { id: 'hl1', title: '用户侧', description: '回水 32℃', status: 'normal', slot: '流量 180 m³/h' },
    ],
    [],
  );

  return (
    <AppShell>
      <FilterBar
        sites={siteOptions}
        deviceTypes={deviceOptions}
        tags={tagOptions}
        onExport={(type) => console.log('export', type)}
        onHelp={() => alert('实时监测页面快捷键：A 显示告警，L 锁定趋势')}
      />
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-6 px-6 py-6">
        <header className="flex flex-col gap-4">
          <Breadcrumbs items={[{ label: '翼轸地热 EZ-EMS', href: '/dashboard' }, { label: '实时监测' }]} />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-foreground">实时运行监测</h1>
            <p className="text-sm text-muted">秒级掌握关键点位与告警闭环。</p>
          </div>
        </header>
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr,1fr]">
          <div className="rounded-xl border border-border/60 bg-white/80 p-6 shadow-brand dark:bg-brand/30">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">运行趋势</h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-info/10 px-3 py-1 text-xs text-info">
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden /> 支持刷选
              </span>
            </div>
            <TrendChart
              data={trend}
              series={[
                { key: 'load', label: '机组负荷', color: '#33C4FF' },
                { key: 'pressure', label: '一次压力', color: '#142B4E' },
              ]}
              yAxes={[
                { key: 'load', label: 'kW', color: '#33C4FF' },
                { key: 'pressure', label: 'MPa', color: '#142B4E' },
              ]}
              isLoading={isLoading}
              onBrushChange={(range) => console.log('trend brush', range)}
            />
          </div>
          <PfdCanvas
            nodes={nodes}
            connections={[
              { from: 'w1', to: 'hx1', label: '热水' },
              { from: 'hx1', to: 'hp1', label: '一次循环' },
              { from: 'hp1', to: 'hl1', label: '供热' },
            ]}
            onNodeClick={(node) => alert(`${node.title} 状态 ${node.status}`)}
          />
        </section>
        <section className="rounded-xl border border-border/60 bg-white/80 p-6 shadow-brand dark:bg-brand/30">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">实时告警</h2>
            <span className="text-sm text-muted">支持筛选、导出、分页</span>
          </div>
          <AlarmTable alarms={alarms} isLoading={alarmLoading} onExport={(format) => console.log('export', format)} />
        </section>
      </main>
    </AppShell>
  );
}

'use client';

import { useMemo } from 'react';
import { Activity, Battery, Flame, Gauge } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { FilterBar } from '@/components/filters/filter-bar';
import { KpiCard } from '@/components/cards/kpi-card';
import { TrendChart } from '@/components/charts/trend-chart';
import { BarCompare } from '@/components/charts/bar-compare';
import { PieShare } from '@/components/charts/pie-share';
import { useRtmKpi, useRtmTrend, useEaSummary } from '@/lib/queries';
import { mockTrend } from '@/lib/mock-data';
import type { FilterOption } from '@/types/filters';

const siteOptions: FilterOption[] = [
  { label: '全部站点', value: 'all' },
  { label: '示范站 A', value: 'a' },
  { label: '示范站 B', value: 'b' },
];

const deviceOptions: FilterOption[] = [
  { label: '地热井', value: 'well' },
  { label: '热泵机组', value: 'pump' },
  { label: '板式换热器', value: 'exchanger' },
];

const tagOptions: FilterOption[] = [
  { label: '节能', value: 'saving' },
  { label: '检修', value: 'maintenance' },
  { label: '重点监控', value: 'critical' },
];

export default function DashboardPage() {
  const { data: kpi, isLoading: loadingKpi } = useRtmKpi();
  const { data: trendData = mockTrend, isLoading: loadingTrend } = useRtmTrend();
  const { data: eaSummary } = useEaSummary();

  const energySplit = useMemo(
    () => [
      { name: '地热', value: 52 },
      { name: '市电', value: 38 },
      { name: '储能', value: 10 },
    ],
    [],
  );

  const compareData = useMemo(
    () => [
      { category: '供热', valueA: 3200, valueB: 2800 },
      { category: '供冷', valueA: 2100, valueB: 1900 },
      { category: '生活热水', valueA: 980, valueB: 860 },
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
        onHelp={() => alert('快捷键：F 聚焦筛选，/ 搜索，? 打开帮助')}
      />
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-6 px-6 py-6">
        <header className="flex flex-col gap-4">
          <Breadcrumbs items={[{ label: '翼轸地热 EZ-EMS', href: '/dashboard' }, { label: '总览' }]} />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-foreground">能源运营总览</h1>
            <p className="text-sm text-muted">聚焦地热站当日能效、负荷与告警动态。</p>
          </div>
        </header>
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard title="综合能效" value={kpi?.savingsRate ?? 0} unit="%" delta={4.2} icon={Gauge} isLoading={loadingKpi} />
          <KpiCard title="总能耗" value={kpi?.totalEnergy ?? 0} unit="MWh" delta={-3.8} icon={Activity} isLoading={loadingKpi} />
          <KpiCard title="可再生占比" value={kpi?.renewableShare ?? 0} unit="%" delta={2.4} icon={Flame} isLoading={loadingKpi} />
          <KpiCard title="告警数量" value={kpi?.alarms ?? 0} unit="条" delta={-12.5} icon={Battery} isLoading={loadingKpi} />
        </section>
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border/60 bg-white/80 p-6 shadow-brand dark:bg-brand/30">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">负荷趋势</h2>
              <span className="text-sm text-muted">支持刷选、缩放</span>
            </div>
            <TrendChart
              data={trendData}
              series={[
                { key: 'load', label: '负荷 (kW)', color: '#33C4FF' },
                { key: 'temp', label: '供回水温差 (℃)', color: '#FF5A5A' },
              ]}
              yAxes={[
                { key: 'load', label: 'kW', color: '#33C4FF' },
                { key: 'temp', label: '℃', color: '#FF5A5A' },
              ]}
              isLoading={loadingTrend}
              onBrushChange={(range) => console.log('brush range', range)}
            />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-border/60 bg-white/80 p-6 shadow-brand dark:bg-brand/30">
              <h2 className="mb-4 text-xl font-semibold text-foreground">能源结构</h2>
              <PieShare data={energySplit} />
            </div>
            <div className="rounded-xl border border-border/60 bg-white/80 p-6 shadow-brand dark:bg-brand/30">
              <h2 className="mb-4 text-xl font-semibold text-foreground">分场站对比</h2>
              <BarCompare data={compareData} labels={{ a: '本期', b: '同期' }} />
            </div>
          </div>
        </section>
        {eaSummary && (
          <section className="rounded-xl border border-border/60 bg-brand/20 p-6 text-sm text-white">
            <h2 className="mb-3 text-xl font-semibold">能耗简报</h2>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {Object.entries(eaSummary).map(([key, value]: any) => (
                <li key={key} className="rounded-xl bg-white/10 p-4">
                  <p className="text-xs uppercase text-white/60">{key}</p>
                  <p className="mt-2 text-lg font-semibold">{value.usage} MWh</p>
                  <p className="text-xs text-white/70">同比 {Math.round((value.yoy ?? 0) * 100)}%</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </AppShell>
  );
}

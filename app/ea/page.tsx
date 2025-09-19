'use client';

import { useMemo } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { FilterBar } from '@/components/filters/filter-bar';
import { BarCompare } from '@/components/charts/bar-compare';
import { Heatmap } from '@/components/charts/heatmap';
import { PieShare } from '@/components/charts/pie-share';
import { useEaSummary } from '@/lib/queries';
import type { FilterOption } from '@/types/filters';

const siteOptions: FilterOption[] = [
  { label: '全部站点', value: 'all' },
  { label: '行政区东区', value: 'east' },
];

const deviceOptions: FilterOption[] = [
  { label: '采暖', value: 'heat' },
  { label: '制冷', value: 'cool' },
  { label: '热水', value: 'water' },
];

const tagOptions: FilterOption[] = [
  { label: '同比下降', value: 'down' },
  { label: '同比上升', value: 'up' },
];

export default function EaPage() {
  const { data: summary } = useEaSummary();

  const compareData = useMemo(
    () => [
      { category: '电', valueA: 12560, valueB: 11800 },
      { category: '热', valueA: 5600, valueB: 5800 },
      { category: '冷', valueA: 3200, valueB: 2900 },
    ],
    [],
  );

  const heatmapData = useMemo(
    () =>
      Array.from({ length: 5 }).flatMap((_, zoneIndex) =>
        Array.from({ length: 12 }).map((__, hour) => ({
          zone: `区域 ${zoneIndex + 1}`,
          time: `${hour + 1}时`,
          value: Math.floor(Math.random() * 100),
        })),
      ),
    [],
  );

  const pieData = useMemo(
    () => [
      { name: '空调', value: 42 },
      { name: '动力', value: 30 },
      { name: '照明', value: 18 },
      { name: '其他', value: 10 },
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
        onHelp={() => alert('能耗分析：Shift+D 对比期，Shift+H 导出热力图')}
      />
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-6 px-6 py-6">
        <header className="flex flex-col gap-4">
          <Breadcrumbs items={[{ label: '翼轸地热 EZ-EMS', href: '/dashboard' }, { label: '能耗分析' }]} />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-foreground">能耗拆解</h1>
            <p className="text-sm text-muted">透视各能源介质的时空分布与同比趋势。</p>
          </div>
        </header>
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr,1fr]">
          <div className="rounded-xl border border-border/60 bg-white/80 p-6 shadow-brand dark:bg-brand/30">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">介质对比</h2>
              <span className="text-sm text-muted">本期 vs 同期</span>
            </div>
            <BarCompare data={compareData} labels={{ a: '本期', b: '同期' }} />
          </div>
          <div className="rounded-xl border border-border/60 bg-white/80 p-6 shadow-brand dark:bg-brand/30">
            <h2 className="mb-4 text-xl font-semibold text-foreground">终端能耗构成</h2>
            <PieShare data={pieData} />
          </div>
        </section>
        <section className="rounded-xl border border-border/60 bg-white/80 p-6 shadow-brand dark:bg-brand/30">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">区域热力图</h2>
            <span className="text-sm text-muted">高光识别异常能耗</span>
          </div>
          <Heatmap data={heatmapData} />
        </section>
        {summary && (
          <section className="rounded-xl border border-border/60 bg-brand/20 p-6 text-sm text-white">
            <h2 className="mb-3 text-xl font-semibold">能耗概览</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {Object.entries(summary).map(([key, value]: any) => (
                <div key={key} className="rounded-xl bg-white/10 p-4">
                  <p className="text-xs uppercase text-white/50">{key}</p>
                  <p className="mt-2 text-lg font-semibold">{value.usage} MWh</p>
                  <p className="text-xs text-white/70">同比 {Math.round((value.yoy ?? 0) * 100)}%</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </AppShell>
  );
}

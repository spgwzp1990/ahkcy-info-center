'use client';

import { useMemo } from 'react';
import { Leaf } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { FilterBar } from '@/components/filters/filter-bar';
import { RadarSaving } from '@/components/charts/radar-saving';
import { PieShare } from '@/components/charts/pie-share';
import { useEcReport } from '@/lib/queries';
import type { FilterOption } from '@/types/filters';

const siteOptions: FilterOption[] = [
  { label: '全部站点', value: 'all' },
  { label: '零碳园区', value: 'zero' },
];

const deviceOptions: FilterOption[] = [
  { label: '锅炉', value: 'boiler' },
  { label: '空调', value: 'hvac' },
];

const tagOptions: FilterOption[] = [
  { label: '碳交易', value: 'ets' },
  { label: '碳中和', value: 'neutral' },
];

export default function EcPage() {
  const { data: report } = useEcReport();

  const radarData = useMemo(
    () => [
      { label: '供热效率', value: 82, target: 90 },
      { label: '供冷效率', value: 76, target: 88 },
      { label: '峰谷移峰', value: 68, target: 75 },
      { label: '碳减排', value: 72, target: 80 },
      { label: '可再生', value: 64, target: 70 },
    ],
    [],
  );

  const pieData = useMemo(
    () => [
      { name: '地热直接利用', value: 45 },
      { name: '电气化改造', value: 30 },
      { name: '绿电采购', value: 15 },
      { name: '碳汇', value: 10 },
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
        onHelp={() => alert('能碳分析：C 查看碳足迹，R 对比基准年')}
      />
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-6 px-6 py-6">
        <header className="flex flex-col gap-4">
          <Breadcrumbs items={[{ label: '翼轸地热 EZ-EMS', href: '/dashboard' }, { label: '能碳分析' }]} />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-foreground">能碳协同</h1>
            <p className="text-sm text-muted">量化 Scope1/2 排放与减碳成效。</p>
          </div>
        </header>
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr,1fr]">
          <div className="rounded-xl border border-border/60 bg-white/80 p-6 shadow-brand dark:bg-brand/30">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                <Leaf className="h-5 w-5 text-info" aria-hidden />
                碳绩效雷达
              </h2>
              <span className="text-sm text-muted">目标 vs 现状</span>
            </div>
            <RadarSaving metrics={radarData} />
          </div>
          <div className="rounded-xl border border-border/60 bg-white/80 p-6 shadow-brand dark:bg-brand/30">
            <h2 className="mb-4 text-xl font-semibold text-foreground">减碳贡献来源</h2>
            <PieShare data={pieData} />
          </div>
        </section>
        {report && (
          <section className="rounded-xl border border-border/60 bg-brand/20 p-6 text-sm text-white">
            <h2 className="mb-3 text-xl font-semibold">排放报告</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-xs uppercase text-white/60">Scope 1</p>
                <p className="mt-2 text-lg font-semibold">{report.scope1} tCO₂e</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-xs uppercase text-white/60">Scope 2</p>
                <p className="mt-2 text-lg font-semibold">{report.scope2} tCO₂e</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-xs uppercase text-white/60">抵消</p>
                <p className="mt-2 text-lg font-semibold">{report.offsets} tCO₂e</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-xs uppercase text-white/60">强度</p>
                <p className="mt-2 text-lg font-semibold">{report.intensity} tCO₂e/MWh</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </AppShell>
  );
}

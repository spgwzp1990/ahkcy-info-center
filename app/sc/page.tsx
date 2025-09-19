'use client';

import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { FilterBar } from '@/components/filters/filter-bar';
import { StrategyCard } from '@/components/cards/strategy-card';
import { SetpointPanel } from '@/components/panels/setpoint-panel';
import { PfdCanvas } from '@/components/canvas/pfd-canvas';
import { useStrategies } from '@/lib/queries';
import { mockStrategies } from '@/lib/mock-data';
import type { FilterOption } from '@/types/filters';

const siteOptions: FilterOption[] = [
  { label: '全部站点', value: 'all' },
  { label: '示范站 A', value: 'a' },
];

const deviceOptions: FilterOption[] = [
  { label: '热泵', value: 'hp' },
  { label: '蓄能', value: 'storage' },
];

const tagOptions: FilterOption[] = [
  { label: 'AI 策略', value: 'ai' },
  { label: '手动', value: 'manual' },
];

export default function ScPage() {
  const { data: strategies = mockStrategies } = useStrategies();
  const [currentStrategies, setCurrentStrategies] = useState(strategies);

  useEffect(() => {
    setCurrentStrategies(strategies);
  }, [strategies]);

  const handleToggleStrategy = (id: string, enabled: boolean) => {
    setCurrentStrategies((prev) => prev.map((item) => (item.id === id ? { ...item, enabled } : item)));
  };

  return (
    <AppShell>
      <FilterBar
        sites={siteOptions}
        deviceTypes={deviceOptions}
        tags={tagOptions}
        onExport={(type) => console.log('export', type)}
        onHelp={() => alert('智能控制：S 启停策略，Shift+O 一键优化')}
      />
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-6 px-6 py-6">
        <header className="flex flex-col gap-4">
          <Breadcrumbs items={[{ label: '翼轸地热 EZ-EMS', href: '/dashboard' }, { label: '智能控制' }]} />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-foreground">策略智控</h1>
            <p className="text-sm text-muted">AI 推荐策略、设定点联动与一键执行。</p>
          </div>
        </header>
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr,1fr]">
          <div className="space-y-4">
            {currentStrategies.map((strategy) => (
              <StrategyCard
                key={strategy.id}
                strategy={strategy}
                onToggle={handleToggleStrategy}
                onDrilldown={(item) => alert(`${item.name} 详情`)}
              />
            ))}
          </div>
          <SetpointPanel
            title="供热优化设定"
            description="设定点即时下发，支持安全联锁。"
            items={[
              { id: 'temp', label: '供水温度', min: 45, max: 65, value: 58, unit: '℃', step: 0.5 },
              { id: 'flow', label: '循环水流量', min: 120, max: 220, value: 180, unit: 'm³/h', step: 5 },
              { id: 'pressure', label: '供回水压差', min: 0.6, max: 1.2, value: 0.85, unit: 'MPa', step: 0.01 },
            ]}
            onSubmit={(items) => alert(JSON.stringify(items))}
          />
        </section>
        <section className="rounded-xl border border-border/60 bg-white/80 p-6 shadow-brand dark:bg-brand/30">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
              <Sparkles className="h-5 w-5 text-info" aria-hidden />
              策略覆盖流程
            </h2>
            <span className="text-sm text-muted">查看影响范围</span>
          </div>
          <PfdCanvas
            nodes={[
              { id: 'hp', title: '热泵', description: 'COP 5.6', status: 'normal', slot: 'AI 调节中' },
              { id: 'tes', title: '蓄热槽', description: '剩余 68%', status: 'warning', slot: '放热模式' },
              { id: 'net', title: '用户侧', description: '室温 21℃', status: 'normal', slot: '舒适度 92%' },
            ]}
            connections={[
              { from: 'hp', to: 'tes', label: '余热' },
              { from: 'tes', to: 'net', label: '平衡' },
            ]}
          />
        </section>
      </main>
    </AppShell>
  );
}

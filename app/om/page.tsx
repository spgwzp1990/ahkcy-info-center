'use client';

import { ClipboardList, Wrench } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { FilterBar } from '@/components/filters/filter-bar';
import { AlarmTable } from '@/components/tables/alarm-table';
import { useAlarms, useTickets } from '@/lib/queries';
import { mockAlarms, mockTickets } from '@/lib/mock-data';
import type { FilterOption } from '@/types/filters';

const siteOptions: FilterOption[] = [
  { label: '全部站点', value: 'all' },
  { label: '维保站 1', value: 'm1' },
];

const deviceOptions: FilterOption[] = [
  { label: '巡检', value: 'inspection' },
  { label: '维修', value: 'repair' },
];

const tagOptions: FilterOption[] = [
  { label: '待派工', value: 'new' },
  { label: '紧急', value: 'urgent' },
];

export default function OmPage() {
  const { data: alarms = mockAlarms } = useAlarms();
  const { data: tickets = mockTickets } = useTickets();

  return (
    <AppShell>
      <FilterBar
        sites={siteOptions}
        deviceTypes={deviceOptions}
        tags={tagOptions}
        onExport={(type) => console.log('export', type)}
        onHelp={() => alert('运维管理：N 新工单，Ctrl+K 快速跳转')}
      />
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-6 px-6 py-6">
        <header className="flex flex-col gap-4">
          <Breadcrumbs items={[{ label: '翼轸地热 EZ-EMS', href: '/dashboard' }, { label: '运维管理' }]} />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-foreground">运维协同中心</h1>
            <p className="text-sm text-muted">对接告警派工、工单流转与 SLA 跟踪。</p>
          </div>
        </header>
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr,1fr]">
          <div className="rounded-xl border border-border/60 bg-white/80 p-6 shadow-brand dark:bg-brand/30">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                <Wrench className="h-5 w-5 text-info" aria-hidden />
                待处理告警
              </h2>
              <span className="text-sm text-muted">联动派单</span>
            </div>
            <AlarmTable alarms={alarms} onExport={(format) => console.log('导出', format)} />
          </div>
          <div className="rounded-xl border border-dashed border-border/60 bg-white/60 p-6 shadow-brand dark:bg-brand/20">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
              <ClipboardList className="h-5 w-5 text-info" aria-hidden />
              工单节奏
            </h2>
            <ul className="space-y-3 text-sm text-muted">
              {tickets.map((ticket) => (
                <li key={ticket.id} className="rounded-xl bg-white/80 p-4 shadow-sm dark:bg-brand/30">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-foreground">{ticket.title}</p>
                    <span className="rounded-full bg-info/10 px-3 py-0.5 text-xs text-info">{ticket.priority}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">责任人 {ticket.assignee}</p>
                  <p className="mt-2 text-xs text-muted">SLA {ticket.sla}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {ticket.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] text-brand">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </AppShell>
  );
}

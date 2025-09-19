'use client';

import { useMemo } from 'react';
import { Download } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { FilterBar } from '@/components/filters/filter-bar';
import { WaterfallBilling } from '@/components/charts/waterfall-billing';
import { useBillingList } from '@/lib/queries';
import { mockBills } from '@/lib/mock-data';
import type { FilterOption } from '@/types/filters';

const siteOptions: FilterOption[] = [
  { label: '全部客户', value: 'all' },
  { label: '航城数据中心', value: 'hc' },
];

const deviceOptions: FilterOption[] = [
  { label: '热量表', value: 'heat' },
  { label: '冷量表', value: 'cold' },
];

const tagOptions: FilterOption[] = [
  { label: '待开票', value: 'invoice' },
  { label: '欠费', value: 'arrears' },
];

export default function BillPage() {
  const { data: bills = mockBills } = useBillingList();

  const waterfallData = useMemo(
    () => [
      { name: '应收', value: bills[0]?.amounts.due ?? 0 },
      { name: '优惠', value: -(bills[0]?.amounts.discount ?? 0) },
      { name: '税金', value: bills[0]?.amounts.tax ?? 0 },
      { name: '实收', value: -(bills[0]?.amounts.paid ?? 0) },
      { name: '欠费', value: bills[0]?.amounts.arrears ?? 0 },
    ],
    [bills],
  );

  return (
    <AppShell>
      <FilterBar
        sites={siteOptions}
        deviceTypes={deviceOptions}
        tags={tagOptions}
        onExport={(type) => console.log('export', type)}
        onHelp={() => alert('收费管理：E 导出账单，P 生成 PDF')}
      />
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-6 px-6 py-6">
        <header className="flex flex-col gap-4">
          <Breadcrumbs items={[{ label: '翼轸地热 EZ-EMS', href: '/dashboard' }, { label: '收费管理' }]} />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-foreground">收费结算</h1>
            <p className="text-sm text-muted">高频账单、票据与欠费清单一站管控。</p>
          </div>
        </header>
        <section className="rounded-xl border border-border/60 bg-white/80 p-6 shadow-brand dark:bg-brand/30">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">账单瀑布</h2>
            <span className="text-sm text-muted">展示费用构成</span>
          </div>
          <WaterfallBilling steps={waterfallData} />
        </section>
        <section className="rounded-xl border border-border/60 bg-white/80 p-6 shadow-brand dark:bg-brand/30">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">账单列表</h2>
            <button
              type="button"
              className="focus-ring inline-flex items-center gap-2 rounded-xl border border-border/60 bg-white/80 px-3 py-2 text-sm text-foreground shadow-sm dark:bg-brand/30"
              onClick={() => console.log('导出账单')}
            >
              <Download className="h-4 w-4" aria-hidden /> 导出
            </button>
          </div>
          <div className="overflow-hidden rounded-xl border border-border/40">
            <table className="min-w-full divide-y divide-border/40 text-left text-sm">
              <thead className="bg-brand-surface/90 text-white">
                <tr>
                  <th className="px-4 py-3">客户</th>
                  <th className="px-4 py-3">周期</th>
                  <th className="px-4 py-3">模型</th>
                  <th className="px-4 py-3">应收</th>
                  <th className="px-4 py-3">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 bg-white/80 dark:bg-brand/20">
                {bills.map((bill) => (
                  <tr key={bill.id} className="transition hover:bg-info/5">
                    <td className="px-4 py-3 font-semibold text-foreground">{bill.customer}</td>
                    <td className="px-4 py-3 text-muted">{bill.period}</td>
                    <td className="px-4 py-3 text-muted">{bill.model}</td>
                    <td className="px-4 py-3 text-muted">¥{bill.amounts.due.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-info/10 px-3 py-0.5 text-xs text-info">{bill.invoiceStatus}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </AppShell>
  );
}

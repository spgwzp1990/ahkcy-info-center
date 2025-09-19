import type { Alarm, Billing, Strategy, Ticket } from '@/types/models';
import type { TrendPoint } from '@/types/charts';

export const mockKpi = {
  totalEnergy: 12560,
  savingsRate: 18.5,
  renewableShare: 42,
  alarms: 6,
};

export const mockTrend: TrendPoint[] = Array.from({ length: 24 }).map((_, idx) => ({
  ts: new Date(Date.now() - (23 - idx) * 60 * 60 * 1000).toISOString(),
  load: Math.round(300 + Math.random() * 80),
  temp: parseFloat((18 + Math.random() * 4).toFixed(1)),
  pressure: parseFloat((0.85 + Math.random() * 0.2).toFixed(2)),
}));

export const mockAlarms: Alarm[] = [
  {
    id: 'alm-1',
    level: 'high',
    deviceId: 'dev-1',
    ts: new Date().toISOString(),
    desc: '主机频率偏高',
    value: 52,
    threshold: 45,
    ack: false,
    workOrderId: undefined,
  },
  {
    id: 'alm-2',
    level: 'medium',
    deviceId: 'dev-2',
    ts: new Date().toISOString(),
    desc: '冷却水流量不足',
    value: 210,
    threshold: 250,
    ack: true,
    workOrderId: 'wo-88',
  },
];

export const mockTickets: Ticket[] = [
  {
    id: 'wo-88',
    title: '巡检循环泵振动',
    priority: 'urgent',
    assignee: '张伟',
    status: 'in_progress',
    start: new Date().toISOString(),
    sla: '4h',
    tags: ['泵站', '巡检'],
  },
];

export const mockStrategies: Strategy[] = [
  {
    id: 'str-1',
    name: '余热回收优化',
    enabled: true,
    kpiTarget: 'COP ≥ 5.6',
    lastBenefit: 3200,
    confidence: 0.82,
  },
  {
    id: 'str-2',
    name: '夜间深冷补偿',
    enabled: false,
    kpiTarget: '夜间负荷 ≤ 40%',
    lastBenefit: 980,
    confidence: 0.67,
  },
];

export const mockBills: Billing[] = [
  {
    id: 'bill-2024-03',
    customer: '航城数据中心',
    period: '2024-03',
    model: '分时阶梯',
    readings: { start: 120034, end: 126782 },
    amounts: { due: 356000, discount: 16000, tax: 22000, paid: 280000, arrears: 74000 },
    invoiceStatus: 'issued',
  },
];

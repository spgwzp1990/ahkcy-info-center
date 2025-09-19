export interface DeviceMetrics {
  power: number;
  flow: number;
  tin: number;
  tout: number;
  pin: number;
  pout: number;
  freq: number;
  valve: number;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'online' | 'offline' | 'alarm';
  metrics: DeviceMetrics;
  healthScore: number;
}

export interface Meter {
  id: string;
  media: 'elec' | 'water' | 'heat' | 'cold' | 'gas';
  scope: string;
  unit: string;
  factor: number;
}

export interface Alarm {
  id: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  deviceId: string;
  ts: string;
  desc: string;
  value: number;
  threshold: number;
  ack: boolean;
  workOrderId?: string;
}

export interface Ticket {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  start: string;
  end?: string;
  sla: string;
  tags: string[];
}

export interface Billing {
  id: string;
  customer: string;
  period: string;
  model: string;
  readings: {
    start: number;
    end: number;
  };
  amounts: {
    due: number;
    discount: number;
    tax: number;
    paid: number;
    arrears: number;
  };
  invoiceStatus: 'draft' | 'issued' | 'paid' | 'overdue';
}

export interface Strategy {
  id: string;
  name: string;
  enabled: boolean;
  kpiTarget: string;
  lastBenefit: number;
  confidence: number;
}

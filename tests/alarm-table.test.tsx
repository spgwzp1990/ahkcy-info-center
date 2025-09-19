import { render, screen, fireEvent } from '@testing-library/react';
import { AlarmTable } from '@/components/tables/alarm-table';
import type { Alarm } from '@/types/models';

const alarms: Alarm[] = [
  {
    id: 'a1',
    level: 'high',
    deviceId: 'dev-1',
    ts: '2024-04-20T12:00:00Z',
    desc: '高压侧压力超限',
    value: 52,
    threshold: 45,
    ack: false,
  },
  {
    id: 'a2',
    level: 'low',
    deviceId: 'dev-2',
    ts: '2024-04-20T13:00:00Z',
    desc: '温差偏低',
    value: 18,
    threshold: 22,
    ack: true,
    workOrderId: 'wo-1',
  },
];

describe('AlarmTable', () => {
  it('renders alarm rows', () => {
    render(<AlarmTable alarms={alarms} onExport={() => {}} />);
    expect(screen.getByText('高压侧压力超限')).toBeInTheDocument();
    expect(screen.getByText('温差偏低')).toBeInTheDocument();
  });

  it('filters by level', () => {
    render(<AlarmTable alarms={alarms} onExport={() => {}} />);
    fireEvent.change(screen.getByLabelText('按等级筛选'), { target: { value: 'high' } });
    expect(screen.getByText('高压侧压力超限')).toBeInTheDocument();
    expect(screen.queryByText('温差偏低')).not.toBeInTheDocument();
  });
});

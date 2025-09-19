import { render, screen, fireEvent } from '@testing-library/react';
import { StrategyCard } from '@/components/cards/strategy-card';
import type { Strategy } from '@/types/models';

describe('StrategyCard', () => {
  const strategy: Strategy = {
    id: 'str-1',
    name: '余热回收优化',
    enabled: true,
    kpiTarget: 'COP ≥ 5.6',
    lastBenefit: 3200,
    confidence: 0.85,
  };

  it('renders strategy information', () => {
    render(<StrategyCard strategy={strategy} onToggle={() => {}} />);
    expect(screen.getByText('余热回收优化')).toBeInTheDocument();
    expect(screen.getByText('COP ≥ 5.6')).toBeInTheDocument();
    expect(screen.getByText(/3200/)).toBeInTheDocument();
  });

  it('toggles strategy state when clicked', () => {
    const handleToggle = vi.fn();
    render(<StrategyCard strategy={strategy} onToggle={handleToggle} />);
    const button = screen.getByRole('button', { name: /运行中/ });
    fireEvent.click(button);
    expect(handleToggle).toHaveBeenCalledWith('str-1', false);
  });
});

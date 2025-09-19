import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/common/skeleton';
import type { TrendChartProps } from '@/types/charts';

const TrendChartInner = dynamic(() => import('./trend-chart-inner'), {
  ssr: false,
  loading: () => <Skeleton className="h-80 w-full rounded-xl" />,
});

export function TrendChart(props: TrendChartProps) {
  if (props.isLoading) {
    return <Skeleton className="h-80 w-full rounded-xl" />;
  }
  return <TrendChartInner {...props} />;
}

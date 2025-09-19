import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/common/skeleton';
import type { BarCompareProps } from '@/types/charts';

const BarCompareInner = dynamic(() => import('./bar-compare-inner'), {
  ssr: false,
  loading: () => <Skeleton className="h-72 w-full rounded-xl" />,
});

export function BarCompare(props: BarCompareProps) {
  if (props.isLoading) {
    return <Skeleton className="h-72 w-full rounded-xl" />;
  }
  return <BarCompareInner {...props} />;
}

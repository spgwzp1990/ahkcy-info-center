import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/common/skeleton';
import type { PieShareProps } from '@/types/charts';

const PieShareInner = dynamic(() => import('./pie-share-inner'), {
  ssr: false,
  loading: () => <Skeleton className="h-64 w-full rounded-xl" />,
});

export function PieShare(props: PieShareProps) {
  if (props.isLoading) {
    return <Skeleton className="h-64 w-full rounded-xl" />;
  }
  return <PieShareInner {...props} />;
}

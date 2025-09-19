import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/common/skeleton';
import type { RadarSavingProps } from '@/types/charts';

const RadarSavingInner = dynamic(() => import('./radar-saving-inner'), {
  ssr: false,
  loading: () => <Skeleton className="h-72 w-full rounded-xl" />,
});

export function RadarSaving(props: RadarSavingProps) {
  if (props.isLoading) {
    return <Skeleton className="h-72 w-full rounded-xl" />;
  }
  return <RadarSavingInner {...props} />;
}

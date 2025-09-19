import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/common/skeleton';
import type { WaterfallBillingProps } from '@/types/charts';

const WaterfallBillingInner = dynamic(() => import('./waterfall-billing-inner'), {
  ssr: false,
  loading: () => <Skeleton className="h-72 w-full rounded-xl" />,
});

export function WaterfallBilling(props: WaterfallBillingProps) {
  if (props.isLoading) {
    return <Skeleton className="h-72 w-full rounded-xl" />;
  }
  return <WaterfallBillingInner {...props} />;
}

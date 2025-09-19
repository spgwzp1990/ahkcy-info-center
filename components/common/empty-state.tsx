import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-white/40 p-8 text-center text-sm text-muted dark:bg-brand/20">
      <Inbox className="mb-3 h-8 w-8 text-info" aria-hidden />
      <h4 className="mb-1 text-base font-semibold text-foreground">{title}</h4>
      <p>{description}</p>
    </div>
  );
}

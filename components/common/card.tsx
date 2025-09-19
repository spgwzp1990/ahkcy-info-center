import * as React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      role="group"
      {...props}
      className={cn(
        'rounded-xl border border-border/60 bg-white/70 p-6 shadow-brand backdrop-blur-sm transition dark:bg-brand/30',
        'dark:border-white/10',
        className,
      )}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn('mb-4 flex items-center justify-between gap-3', className)} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 {...props} className={cn('text-lg font-semibold text-foreground', className)} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className={cn('text-sm text-muted', className)} />;
}

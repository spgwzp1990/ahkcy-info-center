'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ...props }, ref) => (
    <label className={cn('relative inline-flex cursor-pointer items-center gap-2 text-sm', className)}>
      <input ref={ref} type="checkbox" className="sr-only" {...props} />
      <span
        aria-hidden
        className={cn(
          'h-5 w-9 rounded-full border border-border bg-muted transition-colors',
          props.checked ? 'bg-brand border-brand' : 'bg-muted/40',
        )}
      >
        <span
          className={cn(
            'absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-brand transition-transform',
            props.checked ? 'translate-x-4' : 'translate-x-0',
          )}
        />
      </span>
      <span>{props.checked ? '开启' : '关闭'}</span>
    </label>
  ),
);
Switch.displayName = 'Switch';

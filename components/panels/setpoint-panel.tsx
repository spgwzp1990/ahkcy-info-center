'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/button';

export interface SetpointItem {
  id: string;
  label: string;
  min: number;
  max: number;
  unit: string;
  step?: number;
  value: number;
}

export interface SetpointPanelProps {
  title: string;
  description?: string;
  items: SetpointItem[];
  onSubmit: (items: Array<{ id: string; value: number }>) => void;
}

export function SetpointPanel({ title, description, items, onSubmit }: SetpointPanelProps) {
  const [values, setValues] = React.useState(() => new Map(items.map((item) => [item.id, item.value])));
  const handleChange = (id: string, value: number) => {
    setValues((prev) => new Map(prev).set(id, value));
  };

  const handleSave = () => {
    onSubmit(Array.from(values.entries()).map(([id, value]) => ({ id, value })));
  };

  return (
    <div className="rounded-xl border border-border/60 bg-white/70 p-6 shadow-brand dark:bg-brand/30">
      <div className="mb-4 space-y-1">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && <p className="text-sm text-muted">{description}</p>}
      </div>
      <div className="space-y-4">
        {items.map((item) => {
          const value = values.get(item.id) ?? item.value;
          return (
            <div key={item.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm text-muted">
                <span>{item.label}</span>
                <span className="font-semibold text-foreground">
                  {value}
                  {item.unit}
                </span>
              </div>
              <motion.input
                type="range"
                min={item.min}
                max={item.max}
                step={item.step ?? 1}
                value={value}
                onChange={(event) => handleChange(item.id, Number(event.target.value))}
                className="focus-ring h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-info/40 via-info/80 to-info"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              />
              <div className="flex justify-between text-xs text-muted">
                <span>
                  最小 {item.min}
                  {item.unit}
                </span>
                <span>
                  最大 {item.max}
                  {item.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex justify-end">
        <Button variant="secondary" onClick={handleSave}>
          应用设定
        </Button>
      </div>
    </div>
  );
}

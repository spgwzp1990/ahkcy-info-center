'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, Power, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PfdNodeStatus = 'normal' | 'warning' | 'offline';

export interface PfdNode {
  id: string;
  title: string;
  description?: string;
  status?: PfdNodeStatus;
  slot?: React.ReactNode;
}

export interface PfdConnection {
  from: string;
  to: string;
  label?: string;
}

export interface PfdCanvasProps {
  nodes: PfdNode[];
  connections: PfdConnection[];
  onNodeClick?: (node: PfdNode) => void;
}

const statusIconMap: Record<PfdNodeStatus, React.ReactNode> = {
  normal: <Activity className="h-4 w-4 text-info" aria-hidden />,
  warning: <AlertTriangle className="h-4 w-4 text-danger" aria-hidden />,
  offline: <WifiOff className="h-4 w-4 text-muted" aria-hidden />,
};

export function PfdCanvas({ nodes, connections, onNodeClick }: PfdCanvasProps) {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));

  return (
    <div className="overflow-x-auto rounded-xl border border-border/60 bg-white/70 p-6 shadow-brand dark:bg-brand/30">
      <div
        className="grid gap-12"
        style={{ gridTemplateColumns: `repeat(${nodes.length}, minmax(200px, 1fr))` }}
        role="list"
        aria-label="工艺流程"
      >
        {nodes.map((node) => (
          <motion.button
            key={node.id}
            type="button"
            role="listitem"
            onClick={() => onNodeClick?.(node)}
            whileHover={{ translateY: -4 }}
            className={cn(
              'focus-ring relative flex min-h-[140px] flex-col rounded-xl border border-border/60 bg-white/90 p-4 text-left shadow-brand',
              'dark:bg-brand/30',
            )}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Power className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{node.title}</p>
                  {node.description && <p className="text-xs text-muted">{node.description}</p>}
                </div>
              </div>
              <span aria-label={`状态: ${node.status ?? 'normal'}`}>{statusIconMap[node.status ?? 'normal']}</span>
            </div>
            <div className="flex-1 text-sm text-muted">{node.slot ?? '暂无指标'}</div>
          </motion.button>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted">
        {connections.map((connection) => {
          const from = nodeMap.get(connection.from);
          const to = nodeMap.get(connection.to);
          if (!from || !to) return null;
          return (
            <span key={`${connection.from}-${connection.to}`} className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{from.title}</span>
              <span aria-hidden className="h-px w-12 bg-gradient-to-r from-brand to-info" />
              <span className="font-semibold text-foreground">{to.title}</span>
              {connection.label && <span className="rounded-full bg-info/10 px-2 py-0.5 text-[10px] text-info">{connection.label}</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}

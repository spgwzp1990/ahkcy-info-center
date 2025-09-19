'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Gauge, ActivitySquare, Wrench, BarChart3, Leaf, Wallet, Bot } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: '总览', icon: Gauge },
  { href: '/rtm', label: '实时监测', icon: ActivitySquare },
  { href: '/om', label: '运维管理', icon: Wrench },
  { href: '/ea', label: '能耗分析', icon: BarChart3 },
  { href: '/ec', label: '能碳分析', icon: Leaf },
  { href: '/bill', label: '收费管理', icon: Wallet },
  { href: '/sc', label: '智能控制', icon: Bot },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col bg-brand/95 text-white shadow-brand xl:flex">
      <div className="flex h-20 items-center px-6 text-lg font-semibold tracking-wide">
        EZ-EMS
      </div>
      <nav aria-label="主导航" className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'focus-ring flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition',
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white',
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-6 pb-6 text-xs text-white/60">
        © {new Date().getFullYear()} 翼轸地热
      </div>
    </aside>
  );
}

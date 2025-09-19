import * as React from 'react';
import { Sidebar } from './sidebar';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex w-full flex-col" id="main-content">
        {children}
      </div>
    </div>
  );
}

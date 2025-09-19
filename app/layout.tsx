import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { QueryProvider } from '@/components/layout/query-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata: Metadata = {
  title: '翼轸地热智慧能源管理平台 EZ-EMS',
  description: '面向地热能源站的实时监测、能效优化与智能控制一体化平台。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable}`}>
        <ThemeProvider>
          <QueryProvider>
            <a
              href="#main-content"
              className="focus-ring absolute left-2 top-2 z-50 -translate-y-full rounded-full bg-brand-surface px-4 py-2 text-sm text-white transition focus:translate-y-0"
            >
              跳到主要内容
            </a>
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { NextResponse } from 'next/server';
import { mockTrend } from '@/lib/mock-data';

export function GET() {
  return NextResponse.json({ data: mockTrend, meta: { granularity: 'hourly' } });
}

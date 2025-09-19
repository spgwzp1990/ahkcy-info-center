import { NextResponse } from 'next/server';
import { mockKpi } from '@/lib/mock-data';

export function GET() {
  return NextResponse.json({ data: mockKpi, meta: { generatedAt: new Date().toISOString() } });
}

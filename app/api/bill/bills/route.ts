import { NextResponse } from 'next/server';
import { mockBills } from '@/lib/mock-data';

export function GET() {
  return NextResponse.json({ data: mockBills });
}

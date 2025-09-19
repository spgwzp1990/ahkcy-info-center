import { NextResponse } from 'next/server';
import { mockStrategies } from '@/lib/mock-data';

export function GET() {
  return NextResponse.json({ data: mockStrategies });
}

export async function POST(request: Request) {
  const payload = await request.json();
  return NextResponse.json({ data: { received: payload } }, { status: 201 });
}

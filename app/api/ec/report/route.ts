import { NextResponse } from 'next/server';

const report = {
  scope1: 320,
  scope2: 480,
  offsets: 120,
  intensity: 0.82,
};

export function GET() {
  return NextResponse.json({ data: report });
}

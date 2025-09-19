import { NextResponse } from 'next/server';

const summary = {
  elec: { usage: 12800, yoy: -0.12 },
  heat: { usage: 5200, yoy: 0.08 },
  water: { usage: 820, yoy: -0.05 },
};

export function GET() {
  return NextResponse.json({ data: summary });
}

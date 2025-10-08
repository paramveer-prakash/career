import { NextResponse } from 'next/server';

export async function GET() {
  const templates = [
    {
      key: 'modern',
      name: 'Modern',
      description: 'Bold headings, chips, accent gradient',
    },
    {
      key: 'classic',
      name: 'Classic',
      description: 'Conventional, readable, clean',
    },
    {
      key: 'minimal',
      name: 'Minimal',
      description: 'Sparse, two-column, airy',
    },
  ];

  return NextResponse.json(templates);
}

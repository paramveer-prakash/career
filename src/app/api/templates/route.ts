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
    {
      key: 'professional',
      name: 'Professional',
      description: 'Clean blue header, profile picture support, corporate style',
    },
    {
      key: 'creative',
      name: 'Creative',
      description: 'Purple gradient background, timeline design, emoji icons',
    },
    {
      key: 'minimal-dark',
      name: 'Minimal Dark',
      description: 'Dark theme, sleek design, modern typography',
    },
    {
      key: 'executive',
      name: 'Executive',
      description: 'Dark header, competency bars, executive styling',
    },
    {
      key: 'colorful',
      name: 'Colorful',
      description: 'Rainbow stripes, vibrant colors, playful design',
    },
    {
      key: 'tech-modern',
      name: 'Tech Modern',
      description: 'Dark theme with green accents, perfect for developers',
    },
  ];

  return NextResponse.json(templates);
}

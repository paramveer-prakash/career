import { NextRequest, NextResponse } from 'next/server';
import { generateHtml } from '@/lib/html-generator';
import { seedResume } from '@/lib/templates/seed-resume';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ templateKey: string }> }
) {
  try {
    const { templateKey } = await params;
    
    // Validate template key
    const validTemplates = ['modern', 'classic', 'minimal', 'professional', 'creative', 'minimal-dark', 'executive', 'colorful', 'tech-modern'];
    if (!validTemplates.includes(templateKey)) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Always use seed data for consistent thumbnails
    const resumeData = seedResume;

    // Generate HTML based on template using dummy data
    const html = generateHtml(templateKey, resumeData);
    
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
    
  } catch (error) {
    console.error('Error rendering template thumbnail:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

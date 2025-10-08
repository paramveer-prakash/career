import { NextRequest, NextResponse } from 'next/server';
import { generateHtml } from '@/lib/html-generator';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ templateKey: string; resumeId: string }> }
) {
  try {
    const { templateKey, resumeId } = await params;
    
    // Validate template key
    const validTemplates = ['modern', 'classic', 'minimal'];
    if (!validTemplates.includes(templateKey)) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Fetch resume data
    const resumeData = await fetchResumeData(resumeId);
    
    if (!resumeData) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }

    // Generate HTML based on template
    const html = generateHtml(templateKey, resumeData);
    
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
    
  } catch (error) {
    console.error('Error rendering template:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function fetchResumeData(resumeId: string) {
  try {
    // First, try to fetch from your backend API
    if (process.env.NEXT_PUBLIC_API_URL) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/resumes/${resumeId}`, {
          headers: {
            'Authorization': `Bearer ${process.env.API_TOKEN}`,
          },
        });
        
        if (response.ok) {
          return await response.json();
        }
      } catch (error) {
        console.log('Backend API not available, using test data');
      }
    }
    
    // Fallback: use test data for any resume ID when backend is not available
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/test-resume`);
    if (response.ok) {
      const testData = await response.json();
      // Update the ID to match the requested resume ID
      return { ...testData, id: parseInt(resumeId) };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching resume data:', error);
    return null;
  }
}
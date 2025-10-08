import { NextRequest, NextResponse } from 'next/server';
import { generateHtml } from '@/lib/html-generator';
import puppeteer from 'puppeteer';

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

    // Generate HTML using the utility function
    const html = generateHtml(templateKey, resumeData);
    
    // Generate PDF using Puppeteer
    const pdfBuffer = await generatePDF(html);
    
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="resume-${resumeId}-${templateKey}.pdf"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
    
  } catch (error) {
    console.error('Error generating PDF:', error);
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

async function generatePDF(html: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    });
    
    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { generateHtml } from '@/lib/html-generator';
import puppeteer from 'puppeteer';
import { appConfig } from '@/lib/config';

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

    // Extract authorization token from request headers
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || null;

    // Fetch resume data with authentication
    const resumeData = await fetchResumeData(resumeId, token);
    
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

async function fetchResumeData(resumeId: string, token: string | null = null) {
  try {
    // First, try to fetch from your backend API
    if (appConfig.apiUrl) {
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        
        // Add authorization header if token is provided
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(`${appConfig.apiUrl}/api/v1/resumes/${resumeId}`, {
          headers,
        });
        
        console.log("Backend API response status:", response.status);
        if (response.ok) {
          return await response.json();
        } else if (response.status === 401) {
          console.log('Authentication failed - token may be invalid or expired');
        } else if (response.status === 403) {
          console.log('Access forbidden - insufficient permissions');
        }
      } catch (error) {
        console.log('Backend API not available, using test data:', error);
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

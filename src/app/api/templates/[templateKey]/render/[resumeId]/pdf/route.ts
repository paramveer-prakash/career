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
    const validTemplates = ['modern', 'classic', 'minimal', 'professional', 'creative', 'minimal-dark', 'executive', 'colorful', 'tech-modern'];
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
    
    return new NextResponse(new Uint8Array(pdfBuffer), {
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
    
    // Set viewport to match browser preview
    await page.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 1
    });
    
    // Add CSS to ensure consistent rendering
    const htmlWithPDFCSS = html.replace(
      '<style>',
      `<style>
        /* PDF-specific CSS adjustments */
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          body {
            font-size: 12px !important;
            line-height: 1.4 !important;
            margin: 0 !important;
            padding: 10px !important;
          }
          .resume-container {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          /* Scale down large elements for PDF */
          h1 { font-size: 24px !important; }
          h2 { font-size: 18px !important; }
          h3 { font-size: 16px !important; }
          .name { font-size: 28px !important; }
          .section-title { font-size: 16px !important; }
          .profile-picture { 
            width: 80px !important; 
            height: 80px !important; 
          }
          .header-section { 
            padding: 20px 0 !important; 
            margin-bottom: 20px !important; 
          }
          .content-grid { 
            gap: 20px !important; 
          }
          .experience-item, .education-item { 
            margin-bottom: 15px !important; 
            padding: 15px !important; 
          }
          .skill-item { 
            padding: 8px 12px !important; 
            font-size: 12px !important; 
          }
          /* Ensure gradients and colors print correctly */
          .bg-gradient-to-r, .bg-gradient-to-br, .bg-gradient-to-l {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `
    );
    
    await page.setContent(htmlWithPDFCSS, { waitUntil: 'networkidle0' });
    
    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');
    
    // Wait a bit more for any animations or transitions
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: false,
      margin: {
        top: '0.3in',
        right: '0.3in',
        bottom: '0.3in',
        left: '0.3in'
      },
      scale: 0.75, // Scale down to fit better
      displayHeaderFooter: false,
      timeout: 30000 // Increase timeout for complex layouts
    });
    
    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}

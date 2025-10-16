// Import the new template registry
import { getTemplateCSS as getRegistryCSS } from './template-registry';

// CSS content cache
const cssCache: Record<string, string> = {};

export function loadTemplateCSS(templateKey: string): string {
  // For now, always use the legacy CSS with our updates
  // This ensures we get the updated modern template CSS
  const cssContent = getTemplateCSS(templateKey);
  
  // Cache the CSS content
  cssCache[templateKey] = cssContent;

  return cssContent;
}

function getTemplateCSS(templateKey: string): string {
  const baseCSS = `
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 20px;
      background: white;
      color: #1a1a1a;
      line-height: 1.6;
      font-size: 14px;
    }
    .resume-container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    /* PDF-specific adjustments */
    @media print {
      body {
        font-size: 12px;
        line-height: 1.4;
        padding: 10px;
      }
      .resume-container {
        max-width: 100%;
        margin: 0;
      }
      /* Ensure consistent sizing across templates */
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
    }
  `;

  const templateSpecificCSS = {
    modern: `
      .modern-resume { max-width: 210mm; margin: 0 auto; background: white; color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; }
      
      /* Header Section */
      .header-section { border-bottom: 4px solid #2563eb; padding-bottom: 24px; margin-bottom: 32px; }
      .header-content { display: flex; justify-content: space-between; align-items: flex-start; }
      .name-section { flex: 1; }
      .name { font-size: 36px; font-weight: 700; margin: 0 0 12px 0; color: #1a1a1a; letter-spacing: -0.025em; }
      .contact-info { display: flex; flex-wrap: wrap; gap: 16px; font-size: 14px; color: #6b7280; }
      .contact-item { display: flex; align-items: center; gap: 6px; }
      .avatar { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #2563eb, #06b6d4); box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3); flex-shrink: 0; }
      
      /* Summary Section */
      .summary-section { margin-bottom: 32px; }
      .section-title { font-size: 20px; font-weight: 700; color: #1a1a1a; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em; border-left: 4px solid #2563eb; padding-left: 12px; }
      .summary-text { color: #374151; line-height: 1.6; text-align: justify; }
      
      /* Content Grid */
      .content-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 32px; }
      .left-column { display: flex; flex-direction: column; gap: 32px; }
      .right-column { display: flex; flex-direction: column; }
      
      /* Skills Section */
      .skills-section { }
      .skills-list { display: flex; flex-direction: column; gap: 8px; }
      .skill-item { }
      .skill-name { font-size: 14px; font-weight: 500; color: #1a1a1a; margin-bottom: 4px; }
      .skill-bar { height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden; }
      .skill-fill { height: 100%; background: linear-gradient(90deg, #2563eb, #06b6d4); border-radius: 4px; width: 80%; }
      
      /* Education Section */
      .education-section { }
      .education-list { display: flex; flex-direction: column; gap: 16px; }
      .education-item { border-left: 2px solid #d1d5db; padding-left: 16px; }
      .education-item:hover { border-left-color: #2563eb; }
      .degree { font-weight: 600; color: #1a1a1a; font-size: 14px; }
      .institution { font-size: 14px; color: #374151; font-weight: 500; margin-top: 4px; }
      .year { font-size: 12px; color: #6b7280; margin-top: 4px; }
      
      /* Experience Section */
      .experience-section { }
      .experience-list { display: flex; flex-direction: column; gap: 24px; }
      .experience-item { position: relative; padding-left: 24px; border-left: 2px solid #d1d5db; }
      .experience-item:hover { border-left-color: #2563eb; }
      .timeline-dot { position: absolute; left: -9px; top: 4px; width: 16px; height: 16px; border-radius: 50%; background: #2563eb; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3); }
      .experience-content { }
      .job-title { font-size: 18px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
      .job-meta { display: flex; align-items: center; gap: 12px; font-size: 14px; color: #6b7280; margin-bottom: 8px; }
      .company { font-weight: 500; color: #2563eb; }
      .duration { }
      .responsibilities { margin: 0; padding: 0; }
      .responsibility-item { display: flex; gap: 8px; font-size: 14px; color: #374151; margin-bottom: 6px; }
      .bullet { color: #2563eb; font-weight: 700; margin-top: 2px; }
    `,
    classic: `
      .classic-resume { max-width: 210mm; margin: 0 auto; background: white; color: #1a1a1a; font-family: Georgia, 'Times New Roman', serif; line-height: 1.6; }
      
      /* Header Section */
      .header-section { text-align: center; border-bottom: 2px solid #1f2937; padding-bottom: 24px; margin-bottom: 32px; }
      .name { font-size: 48px; font-weight: 700; color: #1a1a1a; margin: 0 0 16px 0; letter-spacing: -0.025em; }
      .contact-info { display: flex; justify-content: center; flex-wrap: wrap; gap: 16px; font-size: 14px; color: #6b7280; }
      
      /* Section Titles */
      .section-title { font-size: 24px; font-weight: 700; color: #1a1a1a; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #d1d5db; text-transform: uppercase; letter-spacing: 0.05em; }
      
      /* Summary Section */
      .summary-section { margin-bottom: 32px; }
      .summary-text { color: #374151; line-height: 1.6; text-align: justify; }
      
      /* Experience Section */
      .experience-section { margin-bottom: 32px; }
      .experience-list { display: flex; flex-direction: column; gap: 24px; }
      .work-item { }
      .work-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
      .job-title { font-size: 20px; font-weight: 700; color: #1a1a1a; margin: 0; }
      .work-dates { font-size: 14px; color: #6b7280; font-weight: 500; }
      .company-name { color: #374151; font-weight: 600; margin-bottom: 12px; }
      .responsibilities { margin: 0; padding-left: 24px; }
      .responsibility-item { color: #374151; line-height: 1.6; margin: 8px 0; position: relative; }
      .responsibility-item::before { content: '▸'; position: absolute; left: -24px; color: #9ca3af; font-weight: 700; }
      
      /* Education Section */
      .education-section { margin-bottom: 32px; }
      .education-list { display: flex; flex-direction: column; gap: 16px; }
      .education-item { }
      .education-header { display: flex; justify-content: space-between; align-items: baseline; }
      .education-details { }
      .degree { font-size: 18px; font-weight: 700; color: #1a1a1a; margin: 0 0 4px 0; }
      .institution { color: #374151; font-weight: 600; margin-top: 4px; }
      .graduation-year { font-size: 14px; color: #6b7280; font-weight: 500; }
      
      /* Skills Section */
      .skills-section { margin-bottom: 32px; }
      .skills-list { display: flex; flex-wrap: wrap; gap: 12px; }
      .skill-tag { padding: 8px 16px; background: #f3f4f6; color: #1a1a1a; font-weight: 600; border-radius: 4px; border: 1px solid #d1d5db; font-size: 14px; }
    `,
    minimal: `
      .minimal-resume { max-width: 210mm; margin: 0 auto; background: white; color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; padding: 8px; }
      
      /* Header Section */
      .header-section { margin-bottom: 40px; }
      .name { font-size: 36px; font-weight: 300; color: #1a1a1a; margin: 0 0 12px 0; letter-spacing: 0.05em; }
      .contact-info { display: flex; flex-wrap: wrap; gap: 16px; font-size: 14px; color: #6b7280; font-weight: 300; }
      .separator { margin: 0 16px; color: #d1d5db; }
      
      /* Section Titles */
      .section-title { font-size: 10px; font-weight: 600; color: #1a1a1a; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.1em; }
      
      /* Summary Section */
      .summary-section { margin-bottom: 40px; }
      .summary-text { color: #374151; line-height: 1.6; font-weight: 300; }
      
      /* Experience Section */
      .experience-section { margin-bottom: 40px; }
      .experience-list { display: flex; flex-direction: column; gap: 24px; }
      .work-item { border-left: 1px solid #e5e7eb; padding-left: 24px; }
      .work-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
      .job-title { font-size: 18px; font-weight: 500; color: #1a1a1a; margin: 0; }
      .work-dates { font-size: 14px; color: #6b7280; font-weight: 400; }
      .company-name { color: #374151; font-weight: 400; margin-bottom: 8px; }
      .responsibilities { margin: 0; padding-left: 0; }
      .responsibility-item { color: #374151; line-height: 1.6; margin: 4px 0; font-weight: 300; }
      
      /* Education Section */
      .education-section { margin-bottom: 40px; }
      .education-list { display: flex; flex-direction: column; gap: 16px; }
      .education-item { }
      .education-header { display: flex; justify-content: space-between; align-items: baseline; }
      .education-details { }
      .degree { font-size: 16px; font-weight: 500; color: #1a1a1a; margin: 0 0 4px 0; }
      .institution { color: #374151; font-weight: 400; margin-top: 4px; }
      .graduation-year { font-size: 14px; color: #6b7280; font-weight: 400; }
      
      /* Skills Section */
      .skills-section { margin-bottom: 40px; }
      .skills-list { display: flex; flex-wrap: wrap; gap: 8px; }
      .skill-item { color: #374151; font-size: 14px; font-weight: 300; }
    `,
    professional: `
      .professional-resume { max-width: 210mm; margin: 0 auto; background: white; color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; }
      
      /* Header Section */
      .header-section { background: linear-gradient(to right, #1e293b, #475569); color: white; padding: 40px 32px; margin-bottom: 32px; border-radius: 8px; }
      .name { font-size: 36px; font-weight: 700; margin: 0 0 16px 0; letter-spacing: -0.025em; }
      .contact-info { display: flex; flex-wrap: wrap; gap: 24px; font-size: 14px; }
      .contact-item { display: flex; align-items: center; gap: 8px; }
      
      /* Section Titles */
      .section-title { font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em; padding-bottom: 8px; border-bottom: 2px solid #cbd5e1; }
      
      /* Summary Section */
      .summary-section { margin-bottom: 32px; padding: 0 32px; }
      .summary-text { color: #374151; line-height: 1.6; margin-top: 16px; }
      
      /* Two Column Layout */
      .content-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 32px; padding: 0 32px; }
      
      /* Left Column */
      .left-column { display: flex; flex-direction: column; gap: 32px; }
      
      /* Skills Section */
      .skills-section { }
      .skills-list { display: flex; flex-direction: column; gap: 8px; margin-top: 16px; }
      .skill-item { display: flex; align-items: center; gap: 12px; font-size: 14px; }
      .skill-dot { width: 6px; height: 6px; background: #475569; border-radius: 50%; }
      .skill-name { color: #374151; font-weight: 500; }
      
      /* Education Section */
      .education-section { }
      .education-list { display: flex; flex-direction: column; gap: 16px; margin-top: 16px; }
      .education-item { background: #f8fafc; padding: 16px; border-radius: 8px; }
      .degree { font-weight: 700; color: #1a1a1a; font-size: 14px; margin-bottom: 4px; }
      .institution { font-size: 14px; color: #374151; margin-bottom: 4px; }
      .year { font-size: 12px; color: #6b7280; }
      
      /* Right Column */
      .right-column { }
      
      /* Experience Section */
      .experience-section { }
      .experience-list { display: flex; flex-direction: column; gap: 24px; margin-top: 16px; }
      .work-item { }
      .work-header { margin-bottom: 8px; }
      .job-title { font-size: 18px; font-weight: 700; color: #1a1a1a; margin: 0; }
      .work-meta { display: flex; align-items: center; gap: 12px; font-size: 14px; color: #6b7280; margin-top: 4px; }
      .company { font-weight: 600; color: #1e293b; }
      .separator { color: #9ca3af; }
      .duration { font-weight: 400; }
      .responsibilities { margin: 12px 0 0 0; padding-left: 0; }
      .responsibility-item { display: flex; gap: 8px; margin: 6px 0; color: #374151; line-height: 1.6; font-size: 14px; }
      .bullet { color: #475569; font-weight: 700; margin-top: 1px; }
      .responsibility-text { flex: 1; }
    `,
    creative: `
      .creative-resume { max-width: 210mm; margin: 0 auto; background: white; color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; }
      
      /* Header with Creative Asymmetric Design */
      .header-section { position: relative; margin-bottom: 48px; }
      .header-accent { position: absolute; top: 0; right: 0; width: 66.67%; height: 128px; background: linear-gradient(to right, #9333ea, #ec4899); border-bottom-left-radius: 80px; }
      .header-content { position: relative; padding-top: 48px; padding-left: 32px; }
      .name { font-size: 48px; font-weight: 900; color: #1a1a1a; margin: 0 0 16px 0; letter-spacing: -0.025em; }
      .contact-info { display: flex; flex-direction: column; gap: 8px; font-size: 14px; color: #6b7280; }
      .contact-item { display: flex; align-items: center; gap: 8px; }
      
      /* Section Headers */
      .section-header { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
      .accent-line { height: 4px; background: linear-gradient(to right, #9333ea, #ec4899); }
      .accent-line.small { width: 32px; }
      .accent-line.large { width: 48px; }
      .section-title { font-size: 20px; font-weight: 700; color: #1a1a1a; text-transform: uppercase; letter-spacing: 0.05em; margin: 0; }
      
      /* Summary Section */
      .summary-section { margin-bottom: 40px; padding: 0 32px; }
      .summary-text { color: #374151; line-height: 1.6; padding-left: 64px; }
      
      /* Two Column Layout */
      .content-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 32px; padding: 0 32px; }
      
      /* Left Column */
      .left-column { display: flex; flex-direction: column; gap: 32px; }
      
      /* Skills Section */
      .skills-section { }
      .skills-list { display: flex; flex-direction: column; gap: 12px; padding-left: 48px; }
      .skill-item { display: flex; align-items: center; gap: 12px; }
      .skill-dot { width: 8px; height: 8px; background: linear-gradient(to right, #9333ea, #ec4899); border-radius: 50%; }
      .skill-name { font-size: 14px; color: #374151; font-weight: 500; }
      
      /* Education Section */
      .education-section { }
      .education-list { display: flex; flex-direction: column; gap: 16px; padding-left: 48px; }
      .education-item { }
      .degree { font-weight: 700; color: #1a1a1a; font-size: 14px; margin-bottom: 4px; }
      .institution { font-size: 14px; color: #374151; margin-bottom: 4px; }
      .year { font-size: 12px; color: #6b7280; }
      
      /* Right Column */
      .right-column { }
      
      /* Experience Section */
      .experience-section { }
      .experience-list { display: flex; flex-direction: column; gap: 24px; padding-left: 64px; }
      .work-item { position: relative; }
      .decorative-accent { position: absolute; left: -48px; top: 0; width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(to bottom right, #9333ea, #ec4899); opacity: 0.2; }
      .job-title { font-size: 18px; font-weight: 700; color: #1a1a1a; margin: 0 0 4px 0; }
      .work-meta { display: flex; align-items: center; gap: 12px; font-size: 14px; color: #6b7280; margin-bottom: 12px; }
      .company { font-weight: 600; color: #7c3aed; }
      .separator { color: #9ca3af; }
      .duration { font-weight: 400; }
      .responsibilities { margin: 0; padding-left: 0; }
      .responsibility-item { display: flex; gap: 8px; margin: 6px 0; color: #374151; line-height: 1.6; font-size: 14px; }
      .bullet { color: #9333ea; font-weight: 700; margin-top: 1px; }
      .responsibility-text { flex: 1; }
    `,
    'minimal-dark': `
      .minimal-dark-resume { max-width: 210mm; margin: 0 auto; background: #111827; color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; padding: 40px; }
      
      /* Minimalist Header */
      .header-section { margin-bottom: 48px; border-bottom: 1px solid #374151; padding-bottom: 32px; }
      .name { font-size: 48px; font-weight: 300; color: white; margin: 0 0 16px 0; letter-spacing: 0.05em; }
      .contact-info { display: flex; flex-wrap: wrap; gap: 24px; font-size: 14px; color: #9ca3af; font-weight: 300; }
      .separator { margin: 0 24px; color: #6b7280; }
      
      /* Section Titles */
      .section-title { font-size: 10px; font-weight: 600; color: #6b7280; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.1em; }
      
      /* Summary Section */
      .summary-section { margin-bottom: 48px; }
      .summary-text { color: #d1d5db; line-height: 1.6; font-weight: 300; }
      
      /* Experience Section */
      .experience-section { margin-bottom: 48px; }
      .experience-list { display: flex; flex-direction: column; gap: 32px; }
      .work-item { border-left: 2px solid #374151; padding-left: 24px; }
      .job-title { font-size: 20px; font-weight: 500; color: white; margin: 0 0 4px 0; }
      .work-meta { font-size: 14px; color: #9ca3af; font-weight: 300; margin-bottom: 12px; }
      .company { }
      .separator { margin: 0 12px; color: #6b7280; }
      .duration { }
      .responsibilities { margin: 0; padding-left: 0; }
      .responsibility-item { display: flex; gap: 12px; margin: 8px 0; color: #d1d5db; line-height: 1.6; font-size: 14px; font-weight: 300; }
      .bullet { color: #6b7280; margin-top: 1px; }
      .responsibility-text { flex: 1; }
      
      /* Education & Skills Grid */
      .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
      
      /* Education Section */
      .education-section { }
      .education-list { display: flex; flex-direction: column; gap: 16px; }
      .education-item { border-left: 2px solid #374151; padding-left: 24px; }
      .degree { font-weight: 500; color: white; margin-bottom: 4px; }
      .institution { font-size: 14px; color: #9ca3af; font-weight: 300; margin-bottom: 4px; }
      .year { font-size: 12px; color: #6b7280; font-weight: 300; }
      
      /* Skills Section */
      .skills-section { }
      .skills-list { display: flex; flex-direction: column; gap: 8px; }
      .skill-item { font-size: 14px; color: #d1d5db; font-weight: 300; border-left: 2px solid #374151; padding-left: 24px; }
    `,
    executive: `
      .executive-resume { max-width: 210mm; margin: 0 auto; background: white; color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; }
      
      /* Sophisticated Header */
      .header-section { background: #111827; color: white; padding: 48px 40px; margin-bottom: 40px; }
      .name { font-size: 48px; font-weight: 700; margin: 0 0 16px 0; letter-spacing: -0.025em; }
      .header-accent { height: 4px; width: 128px; background: #f59e0b; margin-bottom: 24px; }
      .contact-info { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; font-size: 14px; }
      .contact-item { display: flex; align-items: center; gap: 8px; }
      
      /* Section Headers */
      .section-header { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
      .accent-line { height: 24px; width: 4px; background: #f59e0b; }
      .section-title { font-size: 24px; font-weight: 700; color: #1a1a1a; margin: 0; }
      
      /* Summary Section */
      .summary-section { margin-bottom: 40px; padding: 0 40px; }
      .summary-text { color: #374151; line-height: 1.6; font-size: 18px; }
      
      /* Experience Section */
      .experience-section { margin-bottom: 40px; padding: 0 40px; }
      .experience-list { display: flex; flex-direction: column; gap: 24px; }
      .work-item { border-left: 4px solid #e5e7eb; padding-left: 24px; }
      .job-title { font-size: 20px; font-weight: 700; color: #1a1a1a; margin: 0 0 4px 0; }
      .work-meta { display: flex; align-items: center; gap: 16px; font-size: 14px; color: #6b7280; margin-bottom: 12px; }
      .company { font-weight: 600; color: #b45309; }
      .duration { font-weight: 400; }
      .responsibilities { margin: 0; padding-left: 0; }
      .responsibility-item { display: flex; gap: 12px; margin: 8px 0; color: #374151; line-height: 1.6; font-size: 14px; }
      .bullet { color: #f59e0b; font-weight: 700; margin-top: 1px; }
      .responsibility-text { flex: 1; }
      
      /* Education & Skills Grid */
      .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 0 40px; }
      
      /* Education Section */
      .education-section { }
      .education-list { display: flex; flex-direction: column; gap: 16px; }
      .education-item { background: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; }
      .degree { font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
      .institution { color: #374151; margin-bottom: 4px; }
      .year { font-size: 12px; color: #6b7280; }
      
      /* Skills Section */
      .skills-section { }
      .skills-list { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .skill-item { display: flex; align-items: center; gap: 8px; }
      .skill-dot { width: 8px; height: 8px; background: #f59e0b; border-radius: 50%; }
      .skill-name { font-size: 14px; color: #374151; font-weight: 500; }
    `,
    colorful: `
      .colorful-resume { background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%); color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-height: 100vh; }
      .header-section { position: relative; padding: 80px 0; }
      .header-background { position: absolute; top: 0; left: 0; right: 0; bottom: 0; }
      .color-stripes { position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; }
      .stripe { flex: 1; height: 100%; }
      .stripe-1 { background: linear-gradient(135deg, #ff6b6b, #ff8e8e); }
      .stripe-2 { background: linear-gradient(135deg, #4ecdc4, #44a08d); }
      .stripe-3 { background: linear-gradient(135deg, #45b7d1, #96c93d); }
      .header-content { position: relative; z-index: 2; max-width: 900px; margin: 0 auto; padding: 0 20px; }
      .profile-section { display: flex; align-items: center; gap: 50px; }
      .profile-picture { width: 180px; height: 180px; border-radius: 50%; overflow: hidden; border: 6px solid rgba(255, 255, 255, 0.8); box-shadow: 0 15px 40px rgba(0,0,0,0.3); }
      .profile-picture img { width: 100%; height: 100%; object-fit: cover; }
      .name { font-size: 52px; font-weight: 900; margin: 0 0 20px 0; color: white; text-shadow: 3px 3px 6px rgba(0,0,0,0.4); }
      .contact-info { display: flex; flex-direction: column; gap: 15px; }
      .contact-item { display: flex; align-items: center; gap: 15px; font-size: 18px; color: white; }
      .icon { font-size: 24px; }
      .content-sections { background: white; color: #1a1a1a; margin: 50px 20px; padding: 50px; border-radius: 30px; box-shadow: 0 30px 60px rgba(0,0,0,0.2); }
      .section-title { font-size: 32px; font-weight: 800; color: #ff6b6b; margin-bottom: 25px; display: flex; align-items: center; gap: 15px; }
      .title-icon { font-size: 28px; }
      .title-decoration { font-size: 24px; }
      .summary-text { font-size: 20px; line-height: 1.8; color: #374151; }
      .skills-container { display: flex; flex-wrap: wrap; gap: 20px; }
      .skill-badge { padding: 15px 25px; border-radius: 30px; font-weight: 700; color: white; font-size: 16px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); transition: all 0.3s ease; }
      .skill-badge:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,0,0,0.3); }
      .skill-1 { background: linear-gradient(135deg, #ff6b6b, #ff8e8e); }
      .skill-2 { background: linear-gradient(135deg, #4ecdc4, #44a08d); }
      .skill-3 { background: linear-gradient(135deg, #45b7d1, #96c93d); }
      .skill-4 { background: linear-gradient(135deg, #f093fb, #f5576c); }
      .experience-timeline { position: relative; }
      .timeline-item { display: flex; gap: 25px; margin-bottom: 40px; }
      .timeline-marker { width: 25px; height: 25px; border-radius: 50%; flex-shrink: 0; margin-top: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
      .marker-1 { background: linear-gradient(135deg, #ff6b6b, #ff8e8e); }
      .marker-2 { background: linear-gradient(135deg, #4ecdc4, #44a08d); }
      .marker-3 { background: linear-gradient(135deg, #45b7d1, #96c93d); }
      .timeline-content { flex: 1; background: linear-gradient(135deg, #f8fafc, #ffffff); padding: 25px; border-radius: 20px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
      .job-title { font-size: 24px; font-weight: 800; color: #ff6b6b; margin-bottom: 8px; }
      .company { font-size: 18px; color: #6b7280; margin-bottom: 8px; font-weight: 600; }
      .duration { font-size: 16px; color: #9ca3af; font-weight: 500; }
      .responsibilities { margin: 15px 0 0 0; padding-left: 25px; }
      .responsibilities li { margin: 8px 0; color: #374151; line-height: 1.6; }
      .responsibilities li::marker { color: #ff6b6b; }
      .education-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
      .education-card { padding: 25px; border-radius: 20px; text-align: center; color: white; box-shadow: 0 8px 25px rgba(0,0,0,0.2); transition: all 0.3s ease; }
      .education-card:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(0,0,0,0.3); }
      .card-1 { background: linear-gradient(135deg, #ff6b6b, #ff8e8e); }
      .card-2 { background: linear-gradient(135deg, #4ecdc4, #44a08d); }
      .card-3 { background: linear-gradient(135deg, #45b7d1, #96c93d); }
      .degree { font-weight: 800; margin-bottom: 10px; font-size: 20px; }
      .institution { opacity: 0.95; margin-bottom: 8px; font-size: 18px; }
      .year { opacity: 0.9; font-size: 16px; font-weight: 600; }
    `,
    'tech-modern': `
      .tech-modern-resume { max-width: 210mm; margin: 0 auto; background: #f9fafb; color: #111827; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace; line-height: 1.6; }
      
      /* Tech Header with Grid Pattern */
      .header-section { background: linear-gradient(to bottom right, #059669, #0d9488); color: white; padding: 40px; margin-bottom: 32px; position: relative; overflow: hidden; }
      .grid-pattern { position: absolute; inset: 0; opacity: 0.1; }
      .grid-pattern::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.2) 20px, rgba(255,255,255,0.2) 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.2) 20px, rgba(255,255,255,0.2) 21px); }
      .header-content { position: relative; }
      .resume-tag { font-size: 12px; color: #a7f3d0; margin-bottom: 8px; font-weight: 700; letter-spacing: 0.1em; }
      .name { font-size: 36px; font-weight: 700; margin: 0 0 16px 0; }
      .contact-badges { display: flex; flex-wrap: wrap; gap: 16px; }
      .contact-badge { background: rgba(255, 255, 255, 0.1); padding: 8px 12px; border-radius: 4px; font-size: 14px; font-family: ui-sans-serif, system-ui, sans-serif; }
      
      /* Summary Section */
      .summary-section { margin-bottom: 32px; padding: 0 40px; }
      .summary-card { background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); border-left: 4px solid #059669; }
      .code-comment { font-size: 12px; color: #059669; font-weight: 700; margin-bottom: 8px; letter-spacing: 0.1em; }
      .summary-text { color: #374151; line-height: 1.6; font-family: ui-sans-serif, system-ui, sans-serif; }
      
      /* Two Column Layout */
      .content-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 24px; padding: 0 40px; }
      
      /* Left Column */
      .left-column { display: flex; flex-direction: column; gap: 24px; }
      
      /* Skills Card */
      .skills-card { background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
      .skills-list { display: flex; flex-direction: column; gap: 8px; }
      .skill-item { display: flex; align-items: center; gap: 8px; font-size: 14px; font-family: ui-sans-serif, system-ui, sans-serif; }
      .skill-bullet { color: #059669; }
      .skill-name { color: #374151; }
      
      /* Education Card */
      .education-card { background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
      .education-list { display: flex; flex-direction: column; gap: 12px; }
      .education-item { }
      .degree { font-weight: 600; color: #111827; margin-bottom: 4px; font-size: 14px; font-family: ui-sans-serif, system-ui, sans-serif; }
      .institution { font-size: 14px; color: #6b7280; margin-bottom: 4px; font-family: ui-sans-serif, system-ui, sans-serif; }
      .year { font-size: 12px; color: #9ca3af; font-family: ui-sans-serif, system-ui, sans-serif; }
      
      /* Right Column */
      .right-column { }
      
      /* Experience Card */
      .experience-card { background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
      .experience-list { display: flex; flex-direction: column; gap: 24px; }
      .work-item { }
      .work-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 8px; }
      .work-title-section { }
      .job-title { font-size: 18px; font-weight: 700; color: #111827; margin: 0 0 4px 0; font-family: ui-sans-serif, system-ui, sans-serif; }
      .company { font-size: 14px; color: #047857; font-weight: 600; font-family: ui-sans-serif, system-ui, sans-serif; }
      .duration-badge { font-size: 12px; color: #6b7280; background: #f3f4f6; padding: 4px 12px; border-radius: 4px; font-family: ui-sans-serif, system-ui, sans-serif; }
      .responsibilities { margin: 12px 0 0 0; padding-left: 0; }
      .responsibility-item { display: flex; gap: 8px; margin: 6px 0; color: #374151; line-height: 1.6; font-size: 14px; font-family: ui-sans-serif, system-ui, sans-serif; }
      .responsibility-bullet { color: #059669; font-weight: 700; margin-top: 1px; }
      .responsibility-text { flex: 1; }
    `
  };

  return baseCSS + (templateSpecificCSS[templateKey as keyof typeof templateSpecificCSS] || '');
}

// getDefaultCSS function removed - using embedded CSS instead

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
      .header { margin-bottom: 8px; }
      .header h1 { font-size: 24px; font-weight: 600; margin: 0 0 8px 0; color: #1a1a1a; }
      .contact { color: #6b7280; font-size: 14px; margin-bottom: 16px; }
      .summary { margin-bottom: 24px; color: #374151; white-space: pre-wrap; }
      .skills, .experience, .education { margin-bottom: 16px; }
      .skills h2, .experience h2, .education h2 { font-weight: 600; margin: 0 0 4px 0; color: #1a1a1a; font-size: 14px; }
      .skills-list { display: flex; flex-wrap: wrap; gap: 8px; }
      .skill-item { border: 1px solid #e5e7eb; background: #f3f4f6; color: #1a1a1a; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
      .experience-list { display: flex; flex-direction: column; gap: 12px; }
      .experience-item { margin-bottom: 0; }
      .job-title { font-weight: 500; color: #1a1a1a; margin-bottom: 4px; }
      .responsibilities { margin: 0; padding-left: 20px; color: #374151; }
      .responsibilities li { margin: 2px 0; }
      .education-list { display: flex; flex-direction: column; gap: 8px; }
      .education-item { color: #1a1a1a; }
    `,
    minimal: `
      .header { margin-bottom: 16px; }
      .name { font-size: 20px; font-weight: 600; margin: 0 0 4px 0; color: #1a1a1a; }
      .contact { color: #6b7280; font-size: 14px; }
      .summary { margin-bottom: 24px; color: #374151; white-space: pre-wrap; }
      .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
      .left-column, .right-column { display: flex; flex-direction: column; gap: 12px; }
      .skills, .education, .experience { display: flex; flex-direction: column; gap: 8px; }
      .skills h3, .education h3, .experience h3 { font-weight: 600; margin: 0; color: #1a1a1a; font-size: 14px; }
      .skills-list, .education-list { margin: 0; padding-left: 20px; color: #374151; }
      .skills-list li, .education-list li { margin: 4px 0; }
      .experience-list { display: flex; flex-direction: column; gap: 8px; }
      .experience-item { margin-bottom: 0; }
      .job-title { font-weight: 500; color: #1a1a1a; }
    `,
    professional: `
      .professional-resume { background: white; color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      .header-section { background: linear-gradient(135deg, #1f2937, #374151); color: white; padding: 40px 0; margin-bottom: 30px; }
      .header-content { max-width: 800px; margin: 0 auto; padding: 0 20px; }
      .profile-section { display: flex; align-items: center; gap: 30px; }
      .profile-picture { width: 120px; height: 120px; border-radius: 50%; overflow: hidden; border: 4px solid rgba(255, 255, 255, 0.3); }
      .profile-picture img { width: 100%; height: 100%; object-fit: cover; }
      .name { font-size: 36px; font-weight: 700; margin: 0 0 10px 0; }
      .title { font-size: 18px; color: #d1d5db; margin-bottom: 20px; }
      .contact-info { display: flex; flex-direction: column; gap: 8px; }
      .contact-item { display: flex; align-items: center; gap: 10px; font-size: 16px; }
      .summary-section { margin-bottom: 30px; background: #f8fafc; padding: 25px; border-radius: 8px; border-left: 4px solid #3b82f6; }
      .section-title { font-size: 24px; font-weight: 700; color: #1f2937; margin-bottom: 15px; }
      .summary-text { font-size: 16px; line-height: 1.6; color: #374151; }
      .content-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 40px; }
      .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
      .skill-item { background: white; border: 2px solid #e5e7eb; padding: 12px; border-radius: 8px; text-align: center; font-weight: 600; color: #374151; }
      .experience-item { margin-bottom: 25px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; background: white; }
      .job-title { font-size: 20px; font-weight: 700; color: #1f2937; margin-bottom: 8px; }
      .company { font-size: 16px; color: #6b7280; margin-bottom: 8px; font-weight: 600; }
      .duration { font-size: 14px; color: #9ca3af; font-weight: 500; }
      .responsibilities { margin: 15px 0 0 0; padding-left: 20px; }
      .responsibilities li { margin: 8px 0; color: #374151; line-height: 1.6; }
      .responsibilities li::marker { color: #3b82f6; }
      .education-item { margin-bottom: 20px; padding: 20px; background: #f8fafc; border-radius: 8px; }
      .degree { font-weight: 700; color: #1f2937; margin-bottom: 8px; font-size: 18px; }
      .institution { color: #374151; margin-bottom: 6px; font-size: 16px; }
      .year { color: #6b7280; font-size: 14px; font-weight: 600; }
    `,
    creative: `
      .creative-resume { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-height: 100vh; }
      .header-section { position: relative; padding: 60px 0; }
      .header-background { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9)); }
      .header-content { position: relative; z-index: 2; max-width: 800px; margin: 0 auto; padding: 0 20px; }
      .profile-section { display: flex; align-items: center; gap: 40px; }
      .profile-picture { width: 150px; height: 150px; border-radius: 50%; overflow: hidden; border: 5px solid rgba(255, 255, 255, 0.3); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
      .profile-picture img { width: 100%; height: 100%; object-fit: cover; }
      .name { font-size: 42px; font-weight: 800; margin: 0 0 15px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
      .title { font-size: 20px; color: rgba(255, 255, 255, 0.9); margin-bottom: 20px; }
      .contact-info { display: flex; flex-direction: column; gap: 12px; }
      .contact-item { display: flex; align-items: center; gap: 12px; font-size: 16px; }
      .content-sections { background: white; color: #1a1a1a; margin: 40px 20px; padding: 40px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
      .section-title { font-size: 28px; font-weight: 700; color: #667eea; margin-bottom: 20px; }
      .summary-text { font-size: 18px; line-height: 1.7; color: #374151; }
      .skills-container { display: flex; flex-wrap: wrap; gap: 15px; }
      .skill-badge { padding: 12px 20px; border-radius: 25px; font-weight: 600; color: white; font-size: 14px; background: linear-gradient(135deg, #667eea, #764ba2); }
      .experience-item { margin-bottom: 30px; padding: 25px; background: linear-gradient(135deg, #f8fafc, #ffffff); border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
      .job-title { font-size: 22px; font-weight: 700; color: #667eea; margin-bottom: 8px; }
      .company { font-size: 16px; color: #6b7280; margin-bottom: 8px; font-weight: 600; }
      .duration { font-size: 14px; color: #9ca3af; font-weight: 500; }
      .responsibilities { margin: 15px 0 0 0; padding-left: 20px; }
      .responsibilities li { margin: 8px 0; color: #374151; line-height: 1.6; }
      .responsibilities li::marker { color: #667eea; }
      .education-item { margin-bottom: 20px; padding: 20px; background: linear-gradient(135deg, #f8fafc, #ffffff); border-radius: 15px; box-shadow: 0 3px 10px rgba(0,0,0,0.1); }
      .degree { font-weight: 700; color: #667eea; margin-bottom: 8px; font-size: 18px; }
      .institution { color: #374151; margin-bottom: 6px; font-size: 16px; }
      .year { color: #6b7280; font-size: 14px; font-weight: 600; }
    `,
    'minimal-dark': `
      .minimal-dark-resume { background: #111827; color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      .header-section { background: linear-gradient(135deg, #1f2937, #374151); color: white; padding: 50px 0; margin-bottom: 40px; }
      .header-content { max-width: 800px; margin: 0 auto; padding: 0 20px; }
      .profile-section { display: flex; align-items: center; gap: 40px; }
      .profile-picture { width: 140px; height: 140px; border-radius: 50%; overflow: hidden; border: 4px solid rgba(255, 255, 255, 0.2); }
      .profile-picture img { width: 100%; height: 100%; object-fit: cover; }
      .name { font-size: 40px; font-weight: 800; margin: 0 0 12px 0; }
      .title { font-size: 18px; color: #d1d5db; margin-bottom: 25px; }
      .contact-info { display: flex; flex-direction: column; gap: 10px; }
      .contact-item { display: flex; align-items: center; gap: 12px; font-size: 16px; }
      .summary-section { margin-bottom: 40px; background: #1f2937; padding: 30px; border-radius: 10px; border-left: 4px solid #10b981; }
      .section-title { font-size: 26px; font-weight: 700; color: #10b981; margin-bottom: 18px; }
      .summary-text { font-size: 17px; line-height: 1.7; color: #d1d5db; }
      .content-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 50px; }
      .skills-list { display: flex; flex-direction: column; gap: 15px; }
      .skill-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: #1f2937; border-radius: 8px; }
      .skill-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; }
      .skill-name { font-weight: 500; color: #f9fafb; }
      .experience-item { margin-bottom: 30px; padding: 25px; background: #1f2937; border-radius: 10px; border-left: 4px solid #10b981; }
      .job-title { font-size: 20px; font-weight: 700; color: #10b981; margin-bottom: 8px; }
      .company { font-size: 16px; color: #9ca3af; margin-bottom: 8px; font-weight: 600; }
      .duration { font-size: 14px; color: #6b7280; font-weight: 500; }
      .responsibilities { margin: 15px 0 0 0; padding-left: 20px; }
      .responsibility-item { display: flex; align-items: flex-start; gap: 10px; margin: 10px 0; color: #d1d5db; line-height: 1.6; }
      .check-icon { width: 16px; height: 16px; color: #10b981; margin-top: 2px; flex-shrink: 0; }
      .education-item { margin-bottom: 25px; padding: 20px; background: #1f2937; border-radius: 10px; position: relative; }
      .education-border { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #10b981, #059669); border-radius: 10px 10px 0 0; }
      .degree { font-weight: 700; color: #10b981; margin-bottom: 8px; font-size: 18px; }
      .institution { color: #d1d5db; margin-bottom: 6px; font-size: 16px; }
      .year { color: #9ca3af; font-size: 14px; font-weight: 600; }
    `,
    executive: `
      .executive-resume { background: white; color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      .header-section { background: linear-gradient(135deg, #1f2937, #374151); color: white; padding: 60px 0; margin-bottom: 50px; position: relative; }
      .header-section::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(31, 41, 55, 0.95), rgba(55, 65, 81, 0.95)); }
      .header-content { max-width: 900px; margin: 0 auto; padding: 0 20px; position: relative; z-index: 2; }
      .profile-section { display: flex; align-items: center; gap: 50px; }
      .profile-picture { width: 160px; height: 160px; border-radius: 50%; overflow: hidden; border: 6px solid rgba(255, 255, 255, 0.3); box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3); }
      .profile-picture img { width: 100%; height: 100%; object-fit: cover; }
      .name { font-size: 48px; font-weight: 900; margin: 0 0 15px 0; text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4); }
      .title { font-size: 22px; color: #d1d5db; margin-bottom: 25px; font-weight: 500; }
      .contact-info { display: flex; flex-direction: column; gap: 15px; }
      .contact-item { display: flex; align-items: center; gap: 15px; font-size: 18px; }
      .icon { font-size: 22px; }
      .summary-section { margin-bottom: 50px; background: linear-gradient(135deg, #f8fafc, #ffffff); padding: 40px; border-radius: 15px; border-left: 6px solid #3b82f6; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
      .section-title { font-size: 32px; font-weight: 800; color: #1f2937; margin-bottom: 25px; border-bottom: 4px solid #3b82f6; padding-bottom: 12px; }
      .summary-text { font-size: 20px; line-height: 1.8; color: #374151; }
      .content-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 60px; }
      .competencies-list { display: flex; flex-direction: column; gap: 20px; }
      .competency-item { display: flex; flex-direction: column; gap: 8px; }
      .competency-name { font-weight: 700; color: #1f2937; font-size: 18px; }
      .competency-bar { height: 12px; background: #e5e7eb; border-radius: 6px; overflow: hidden; box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1); }
      .competency-fill { height: 100%; background: linear-gradient(90deg, #3b82f6, #1d4ed8); width: 85%; border-radius: 6px; }
      .experience-item { margin-bottom: 35px; padding: 30px; border: 2px solid #e5e7eb; border-radius: 15px; background: linear-gradient(135deg, #f9fafb, #ffffff); box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08); }
      .job-title { font-size: 24px; font-weight: 800; color: #1f2937; margin-bottom: 10px; }
      .company { font-size: 18px; color: #6b7280; margin-bottom: 10px; font-weight: 600; }
      .duration { font-size: 16px; color: #9ca3af; font-weight: 500; }
      .responsibilities { margin: 20px 0 0 0; padding-left: 25px; }
      .responsibilities li { margin: 10px 0; color: #374151; line-height: 1.7; }
      .responsibilities li::marker { color: #3b82f6; }
      .education-item { margin-bottom: 25px; padding: 25px; background: linear-gradient(135deg, #f8fafc, #ffffff); border-radius: 15px; box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08); }
      .degree { font-weight: 800; color: #1f2937; margin-bottom: 10px; font-size: 20px; }
      .institution { color: #374151; margin-bottom: 8px; font-size: 18px; }
      .year { color: #6b7280; font-size: 16px; font-weight: 600; }
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
      .tech-modern-resume { background: #111827; color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      .header-section { background: linear-gradient(135deg, #10b981, #3b82f6); color: white; padding: 60px 0; margin-bottom: 40px; position: relative; }
      .header-content { max-width: 1000px; margin: 0 auto; padding: 0 20px; position: relative; z-index: 2; }
      .profile-section { display: flex; align-items: center; gap: 40px; }
      .profile-picture { width: 160px; height: 160px; border-radius: 50%; overflow: hidden; border: 4px solid rgba(255, 255, 255, 0.3); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); }
      .profile-picture img { width: 100%; height: 100%; object-fit: cover; }
      .name { font-size: 48px; font-weight: 900; margin: 0 0 15px 0; text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4); }
      .title { font-size: 22px; color: rgba(255, 255, 255, 0.9); margin-bottom: 25px; font-weight: 500; }
      .contact-info { display: flex; flex-direction: column; gap: 12px; }
      .email, .phone { font-size: 18px; opacity: 0.95; display: flex; align-items: center; gap: 8px; }
      .summary-section { margin-bottom: 40px; background: linear-gradient(135deg, #1f2937, #374151); padding: 30px; border-radius: 12px; border-left: 5px solid #10b981; }
      .section-title { font-size: 28px; font-weight: 700; color: #10b981; margin-bottom: 20px; border-bottom: 3px solid #10b981; padding-bottom: 10px; }
      .summary-text { font-size: 18px; line-height: 1.7; color: #d1d5db; }
      .content-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 50px; }
      .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
      .skill-item { background: linear-gradient(135deg, #1f2937, #374151); border: 2px solid #10b981; padding: 15px; border-radius: 12px; text-align: center; font-weight: 600; color: #10b981; transition: all 0.3s ease; }
      .skill-item:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3); }
      .experience-item { margin-bottom: 30px; padding: 25px; border-left: 5px solid #10b981; background: linear-gradient(135deg, #1f2937, #374151); border-radius: 0 12px 12px 0; box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3); }
      .job-title { font-size: 22px; font-weight: 700; color: #10b981; margin-bottom: 8px; }
      .company { font-size: 18px; color: #9ca3af; margin-bottom: 8px; font-weight: 500; }
      .duration { font-size: 16px; color: #6b7280; font-weight: 500; }
      .responsibilities { margin: 15px 0 0 0; padding-left: 25px; }
      .responsibilities li { margin: 8px 0; color: #d1d5db; line-height: 1.6; }
      .responsibilities li::marker { color: #10b981; }
      .education-item { margin-bottom: 20px; padding: 20px; background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2); }
      .degree { font-weight: 700; color: #10b981; margin-bottom: 8px; font-size: 18px; }
      .institution { color: #d1d5db; margin-bottom: 8px; font-size: 16px; }
      .year { color: #9ca3af; font-size: 16px; font-weight: 500; }
    `
  };

  return baseCSS + (templateSpecificCSS[templateKey as keyof typeof templateSpecificCSS] || '');
}

// getDefaultCSS function removed - using embedded CSS instead

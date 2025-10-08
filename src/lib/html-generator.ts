export function generateHtml(templateKey: string, data: any): string {
  const css = getTemplateCSS(templateKey);
  
  let htmlContent = '';
  
  switch (templateKey) {
    case 'modern':
      htmlContent = generateModernTemplate(data);
      break;
    case 'classic':
      htmlContent = generateClassicTemplate(data);
      break;
    case 'minimal':
      htmlContent = generateMinimalTemplate(data);
      break;
    default:
      htmlContent = generateModernTemplate(data);
  }
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
    <style>
        ${css}
    </style>
</head>
<body>
    <div class="resume-container">
        ${htmlContent}
    </div>
</body>
</html>`;
}

function generateModernTemplate(data: any): string {
  const skills = (data.skills || []).map((skill: any) => 
    `<span class="skill-chip">${skill.name || skill.skill}</span>`
  ).join('');

  const workExperiences = (data.workExperiences || []).map((work: any) => {
    const responsibilities = (work.responsibilities || []).map((resp: any) => 
      `<li>${resp.description}</li>`
    ).join('');
    
    return `
      <div class="experience-item">
        <div class="job-title">${work.jobTitle}</div>
        ${responsibilities ? `<ul class="responsibilities">${responsibilities}</ul>` : ''}
      </div>
    `;
  }).join('');

  const educations = (data.educations || []).map((edu: any) => 
    `<li>${edu.institution}</li>`
  ).join('');

  return `
    <div class="header">
      <div class="name-section">
        <h1>${data.primaryName || 'Your Name'}</h1>
        <div class="contact">${[data.primaryEmail, data.primaryPhone, data.primaryLocation].filter(Boolean).join(' · ')}</div>
      </div>
      <div class="avatar"></div>
    </div>
    
    ${data.summary ? `<div class="summary"><p>${data.summary}</p></div>` : ''}
    
    <div class="content-grid">
      <div class="skills-section">
        <h3>Skills</h3>
        <div class="skills-list">
          ${skills}
        </div>
      </div>
      
      <div class="experience-section">
        <h3>Experience</h3>
        <div class="experience-list">
          ${workExperiences}
        </div>
      </div>
    </div>
    
    <div class="education-section">
      <h3>Education</h3>
      <ul class="education-list">
        ${educations}
      </ul>
    </div>
  `;
}

function generateClassicTemplate(data: any): string {
  const skills = (data.skills || []).map((skill: any) => 
    `<span class="skill-item">${skill.name || skill.skill}</span>`
  ).join('');

  const workExperiences = (data.workExperiences || []).map((work: any) => {
    const responsibilities = (work.responsibilities || []).map((resp: any) => 
      `<li>${resp.description}</li>`
    ).join('');
    
    return `
      <div class="experience-item">
        <div class="job-title">${work.jobTitle}</div>
        ${responsibilities ? `<ul class="responsibilities">${responsibilities}</ul>` : ''}
      </div>
    `;
  }).join('');

  const educations = (data.educations || []).map((edu: any) => 
    `<div class="education-item">${edu.institution}</div>`
  ).join('');

  return `
    <h1>${data.primaryName || 'Your Name'}</h1>
    <div class="contact">${data.primaryEmail} · ${data.primaryPhone} · ${data.primaryLocation}</div>
    ${data.summary ? `<p class="summary">${data.summary}</p>` : ''}
    
    ${skills ? `
      <section class="skills">
        <h2>Skills</h2>
        <div class="skills-list">
          ${skills}
        </div>
      </section>
    ` : ''}
    
    ${workExperiences ? `
      <section class="experience">
        <h2>Work Experience</h2>
        <div class="experience-list">
          ${workExperiences}
        </div>
      </section>
    ` : ''}
    
    ${educations ? `
      <section class="education">
        <h2>Education</h2>
        <div class="education-list">
          ${educations}
        </div>
      </section>
    ` : ''}
  `;
}

function generateMinimalTemplate(data: any): string {
  const skills = (data.skills || []).map((skill: any) => 
    `<li>${skill.name || skill.skill}</li>`
  ).join('');

  const workExperiences = (data.workExperiences || []).map((work: any) => 
    `<div class="work-item"><div class="job-title">${work.jobTitle}</div></div>`
  ).join('');

  const educations = (data.educations || []).map((edu: any) => 
    `<li>${edu.institution}</li>`
  ).join('');

  return `
    <div class="header">
      <div class="name">${data.primaryName || 'Your Name'}</div>
      <div class="contact">${[data.primaryEmail, data.primaryPhone, data.primaryLocation].filter(Boolean).join(' · ')}</div>
    </div>
    
    ${data.summary ? `<p class="summary">${data.summary}</p>` : ''}
    
    <div class="content-grid">
      <div class="left-column">
        <div class="skills">
          <h3>Skills</h3>
          <ul class="skills-list">
            ${skills}
          </ul>
        </div>
        
        <div class="education">
          <h3>Education</h3>
          <ul class="education-list">
            ${educations}
          </ul>
        </div>
      </div>
      
      <div class="right-column">
        <div class="experience">
          <h3>Work</h3>
          <div class="experience-list">
            ${workExperiences}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function getTemplateCSS(templateKey: string): string {
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
  `;

  const templateSpecificCSS = {
    modern: `
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
      .name-section h1 { font-size: 24px; font-weight: 600; margin: 0 0 4px 0; color: #1a1a1a; letter-spacing: -0.025em; }
      .contact { color: #6b7280; font-size: 14px; }
      .avatar { width: 40px; height: 40px; background: linear-gradient(135deg, #3b82f6, #06b6d4); border-radius: 6px; }
      .summary { margin: 16px 0; color: #374151; white-space: pre-wrap; }
      .content-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 16px; margin-top: 24px; }
      .skills-section, .experience-section { display: flex; flex-direction: column; gap: 8px; }
      .skills-section { grid-column: 1; }
      .experience-section { grid-column: 2; }
      .skills-section h3, .experience-section h3, .education-section h3 { font-weight: 600; margin: 0; color: #1a1a1a; font-size: 14px; }
      .skills-list { display: flex; flex-wrap: wrap; gap: 8px; }
      .skill-chip { border: 1px solid #dbeafe; background: #eff6ff; color: #1e40af; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 500; }
      .experience-list { display: flex; flex-direction: column; gap: 12px; }
      .experience-item { border: 1px solid #e5e7eb; background: #f9fafb; border-radius: 6px; padding: 12px; }
      .job-title { font-weight: 500; color: #1a1a1a; margin-bottom: 8px; }
      .responsibilities { margin: 0; padding-left: 20px; color: #374151; }
      .responsibilities li { margin: 2px 0; }
      .education-section { margin-top: 24px; }
      .education-section h3 { font-weight: 600; margin: 0 0 8px 0; color: #1a1a1a; font-size: 14px; }
      .education-list { margin: 0; padding-left: 20px; color: #374151; }
      .education-list li { margin: 4px 0; }
    `,
    classic: `
      h1 { font-size: 24px; font-weight: 600; margin-bottom: 8px; }
      .contact { color: #6b7280; margin-bottom: 16px; }
      .summary { margin-bottom: 24px; color: #374151; white-space: pre-wrap; }
      section { margin-bottom: 16px; }
      h2 { font-weight: 600; margin-bottom: 4px; color: #1a1a1a; }
      .skills-list { display: flex; flex-wrap: wrap; gap: 8px; }
      .skill-item { border: 1px solid #e5e7eb; background: #f3f4f6; color: #111827; padding: 4px 8px; border-radius: 4px; }
      .experience-list { display: flex; flex-direction: column; gap: 12px; }
      .experience-item { margin-bottom: 12px; }
      .job-title { font-weight: 500; color: #1a1a1a; }
      .responsibilities { margin: 0; padding-left: 20px; color: #374151; }
      .responsibilities li { margin: 2px 0; }
      .education-list { display: flex; flex-direction: column; gap: 8px; }
      .education-item { color: #111827; }
    `,
    minimal: `
      .header { margin-bottom: 16px; }
      .name { font-size: 20px; font-weight: 600; }
      .contact { color: #6b7280; }
      .summary { margin-bottom: 24px; color: #374151; white-space: pre-wrap; }
      .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
      .left-column, .right-column { display: flex; flex-direction: column; gap: 12px; }
      h3 { font-weight: 600; margin-bottom: 8px; color: #1a1a1a; }
      .skills-list, .education-list { margin: 0; padding-left: 20px; color: #374151; }
      .skills-list li, .education-list li { margin: 4px 0; }
      .experience-list { display: flex; flex-direction: column; gap: 8px; }
      .work-item { margin-bottom: 8px; }
      .job-title { font-weight: 500; color: #1a1a1a; }
    `
  };

  return baseCSS + (templateSpecificCSS[templateKey as keyof typeof templateSpecificCSS] || '');
}

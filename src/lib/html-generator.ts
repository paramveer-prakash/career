/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadTemplateCSS } from './templates/css-loader';

export function generateHtml(templateKey: string, data: any): string {
  const css = loadTemplateCSS(templateKey);
  
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
    case 'professional':
      htmlContent = generateProfessionalTemplate(data);
      break;
    case 'creative':
      htmlContent = generateCreativeTemplate(data);
      break;
    case 'minimal-dark':
      htmlContent = generateMinimalDarkTemplate(data);
      break;
    case 'executive':
      htmlContent = generateExecutiveTemplate(data);
      break;
    case 'colorful':
      htmlContent = generateColorfulTemplate(data);
      break;
    case 'tech-modern':
      htmlContent = generateTechModernTemplate(data);
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
    `<div class="skill-item">
      <div class="skill-name">${skill.name || skill.skill}</div>
      <div class="skill-bar">
        <div class="skill-fill"></div>
      </div>
    </div>`
  ).join('');

  const workExperiences = (data.workExperiences || []).map((work: any) => {
    const responsibilities = (work.responsibilities || []).map((resp: any) => 
      `<li class="responsibility-item">
        <span class="bullet">•</span>
        <span>${typeof resp === 'string' ? resp : resp.description}</span>
      </li>`
    ).join('');
    
    return `
      <div class="experience-item">
        <div class="timeline-dot"></div>
        <div class="experience-content">
          <h3 class="job-title">${work.jobTitle}</h3>
          <div class="job-meta">
            <span class="company">${work.companyName || work.company || 'Company'}</span>
            ${(work.startDate || work.endDate) ? `<span class="duration">${work.startDate} - ${work.isCurrent ? 'Present' : (work.endDate || 'Present')}</span>` : ''}
          </div>
          ${responsibilities ? `<ul class="responsibilities">${responsibilities}</ul>` : ''}
        </div>
      </div>
    `;
  }).join('');

  const educations = (data.educations || []).map((edu: any) => 
    `<div class="education-item">
      <div class="degree">${edu.degree || 'Degree'}</div>
      <div class="institution">${edu.institution}</div>
      ${edu.graduationYear ? `<div class="year">${edu.graduationYear}</div>` : ''}
    </div>`
  ).join('');

  return `
    <div class="modern-resume">
      <!-- Header Section -->
      <div class="header-section">
        <div class="header-content">
          <div class="name-section">
            <h1 class="name">${data.primaryName || 'Your Name'}</h1>
            <div class="contact-info">
              ${data.primaryEmail ? `<span class="contact-item">✉ ${data.primaryEmail}</span>` : ''}
              ${data.primaryPhone ? `<span class="contact-item">✆ ${data.primaryPhone}</span>` : ''}
              ${data.primaryLocation ? `<span class="contact-item">⌘ ${data.primaryLocation}</span>` : ''}
            </div>
          </div>
          <div class="avatar"></div>
        </div>
      </div>

      <!-- Professional Summary -->
      ${data.summary ? `
        <div class="summary-section">
          <h2 class="section-title">Professional Summary</h2>
          <p class="summary-text">${data.summary}</p>
        </div>
      ` : ''}

      <!-- Two Column Layout -->
      <div class="content-grid">
        <!-- Left Column - Skills & Education -->
        <div class="left-column">
          ${skills ? `
            <div class="skills-section">
              <h2 class="section-title">Skills</h2>
              <div class="skills-list">${skills}</div>
            </div>
          ` : ''}

          ${educations ? `
            <div class="education-section">
              <h2 class="section-title">Education</h2>
              <div class="education-list">${educations}</div>
            </div>
          ` : ''}
        </div>

        <!-- Right Column - Experience -->
        <div class="right-column">
          ${workExperiences ? `
            <div class="experience-section">
              <h2 class="section-title">Professional Experience</h2>
              <div class="experience-list">${workExperiences}</div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function generateClassicTemplate(data: any): string {
  const skills = (data.skills || []).map((skill: any) => 
    `<span class="skill-tag">${skill.name || skill.skill}</span>`
  ).join('');

  const workExperiences = (data.workExperiences || []).map((work: any) => {
    const responsibilities = (work.responsibilities || []).map((resp: any) => 
      `<li class="responsibility-item">${typeof resp === 'string' ? resp : resp.description}</li>`
    ).join('');
    
    return `
      <div class="work-item">
        <div class="work-header">
          <h3 class="job-title">${work.jobTitle}</h3>
          ${(work.startDate || work.endDate) ? `<span class="work-dates">${work.startDate} - ${work.isCurrent ? 'Present' : (work.endDate || 'Present')}</span>` : ''}
        </div>
        <div class="company-name">${work.companyName || 'Company'}</div>
        ${responsibilities ? `<ul class="responsibilities">${responsibilities}</ul>` : ''}
      </div>
    `;
  }).join('');

  const educations = (data.educations || []).map((edu: any) => 
    `<div class="education-item">
      <div class="education-header">
        <div class="education-details">
          <h3 class="degree">${edu.degree || 'Degree'}</h3>
          <div class="institution">${edu.institution}</div>
        </div>
        ${edu.graduationYear ? `<span class="graduation-year">${edu.graduationYear}</span>` : ''}
      </div>
    </div>`
  ).join('');

  return `
    <div class="classic-resume">
      <!-- Header Section -->
      <div class="header-section">
        <h1 class="name">${data.primaryName || data.title || 'Your Name'}</h1>
        <div class="contact-info">
          ${data.primaryEmail ? `<span>${data.primaryEmail}</span>` : ''}
          ${data.primaryPhone ? `<span>•</span><span>${data.primaryPhone}</span>` : ''}
          ${data.primaryLocation ? `<span>•</span><span>${data.primaryLocation}</span>` : ''}
        </div>
      </div>

      <!-- Professional Summary -->
      ${data.summary ? `
        <section class="summary-section">
          <h2 class="section-title">Profile</h2>
          <p class="summary-text">${data.summary}</p>
        </section>
      ` : ''}

      <!-- Professional Experience -->
      ${workExperiences ? `
        <section class="experience-section">
          <h2 class="section-title">Professional Experience</h2>
          <div class="experience-list">${workExperiences}</div>
        </section>
      ` : ''}

      <!-- Education -->
      ${educations ? `
        <section class="education-section">
          <h2 class="section-title">Education</h2>
          <div class="education-list">${educations}</div>
        </section>
      ` : ''}

      <!-- Skills -->
      ${skills ? `
        <section class="skills-section">
          <h2 class="section-title">Skills</h2>
          <div class="skills-list">${skills}</div>
        </section>
      ` : ''}
    </div>
  `;
}

function generateMinimalTemplate(data: any): string {
  const skills = (data.skills || []).map((skill: any) => 
    `<span class="skill-item">${skill.name || skill.skill}</span>`
  ).join('');

  const workExperiences = (data.workExperiences || []).map((work: any) => {
    const responsibilities = (work.responsibilities || []).map((resp: any) => 
      `<li class="responsibility-item">${typeof resp === 'string' ? resp : resp.description}</li>`
    ).join('');
    
    return `
      <div class="work-item">
        <div class="work-header">
          <h3 class="job-title">${work.jobTitle}</h3>
          ${(work.startDate || work.endDate) ? `<span class="work-dates">${work.startDate} - ${work.isCurrent ? 'Present' : (work.endDate || 'Present')}</span>` : ''}
        </div>
        <div class="company-name">${work.companyName || 'Company'}</div>
        ${responsibilities ? `<ul class="responsibilities">${responsibilities}</ul>` : ''}
      </div>
    `;
  }).join('');

  const educations = (data.educations || []).map((edu: any) => 
    `<div class="education-item">
      <div class="education-header">
        <div class="education-details">
          <h3 class="degree">${edu.degree || 'Degree'}</h3>
          <div class="institution">${edu.institution}</div>
        </div>
        ${edu.graduationYear ? `<span class="graduation-year">${edu.graduationYear}</span>` : ''}
      </div>
    </div>`
  ).join('');

  return `
    <div class="minimal-resume">
      <!-- Header Section -->
      <div class="header-section">
        <h1 class="name">${data.primaryName || 'Your Name'}</h1>
        <div class="contact-info">
          ${data.primaryEmail ? `<span>${data.primaryEmail}</span>` : ''}
          ${data.primaryPhone ? `<span class="separator">|</span><span>${data.primaryPhone}</span>` : ''}
          ${data.primaryLocation ? `<span class="separator">|</span><span>${data.primaryLocation}</span>` : ''}
        </div>
      </div>

      <!-- Professional Summary -->
      ${data.summary ? `
        <section class="summary-section">
          <h2 class="section-title">About</h2>
          <p class="summary-text">${data.summary}</p>
        </section>
      ` : ''}

      <!-- Experience Section -->
      ${workExperiences ? `
        <section class="experience-section">
          <h2 class="section-title">Experience</h2>
          <div class="experience-list">${workExperiences}</div>
        </section>
      ` : ''}

      <!-- Education Section -->
      ${educations ? `
        <section class="education-section">
          <h2 class="section-title">Education</h2>
          <div class="education-list">${educations}</div>
        </section>
      ` : ''}

      <!-- Skills Section -->
      ${skills ? `
        <section class="skills-section">
          <h2 class="section-title">Skills</h2>
          <div class="skills-list">${skills}</div>
        </section>
      ` : ''}
    </div>
  `;
}

function generateProfessionalTemplate(data: any): string {
  const skills = (data.skills || []).map((skill: any) => 
    `<div class="skill-item">
      <div class="skill-dot"></div>
      <span class="skill-name">${skill.name || skill.skill}</span>
    </div>`
  ).join('');

  const workExperiences = (data.workExperiences || []).map((work: any) => {
    const responsibilities = (work.responsibilities || []).map((resp: any) => 
      `<li class="responsibility-item">
        <span class="bullet">•</span>
        <span class="responsibility-text">${typeof resp === 'string' ? resp : resp.description}</span>
      </li>`
    ).join('');
    
    return `
      <div class="work-item">
        <div class="work-header">
          <h3 class="job-title">${work.jobTitle}</h3>
          <div class="work-meta">
            <span class="company">${work.companyName || work.company || 'Company'}</span>
            <span class="separator">|</span>
            <span class="duration">${work.startDate} - ${work.isCurrent ? 'Present' : (work.endDate || 'Present')}</span>
          </div>
        </div>
        ${responsibilities ? `<ul class="responsibilities">${responsibilities}</ul>` : ''}
      </div>
    `;
  }).join('');

  const educations = (data.educations || []).map((edu: any) => 
    `<div class="education-item">
      <div class="degree">${edu.degree || 'Degree'}</div>
      <div class="institution">${edu.institution}</div>
      <div class="year">${edu.graduationYear}</div>
    </div>`
  ).join('');

  return `
    <div class="professional-resume">
      <!-- Header Section -->
      <div class="header-section">
        <h1 class="name">${data.primaryName || 'Your Name'}</h1>
        <div class="contact-info">
          ${data.primaryEmail ? `<span class="contact-item">✉ ${data.primaryEmail}</span>` : ''}
          ${data.primaryPhone ? `<span class="contact-item">✆ ${data.primaryPhone}</span>` : ''}
        </div>
      </div>

      <!-- Professional Summary -->
      ${data.summary ? `
        <section class="summary-section">
          <h2 class="section-title">Professional Summary</h2>
          <p class="summary-text">${data.summary}</p>
        </section>
      ` : ''}

      <!-- Two Column Layout -->
      <div class="content-grid">
        <!-- Left Column - Skills & Education -->
        <div class="left-column">
          ${skills ? `
            <section class="skills-section">
              <h2 class="section-title">Core Skills</h2>
              <div class="skills-list">${skills}</div>
            </section>
          ` : ''}

          ${educations ? `
            <section class="education-section">
              <h2 class="section-title">Education</h2>
              <div class="education-list">${educations}</div>
            </section>
          ` : ''}
        </div>

        <!-- Right Column - Experience -->
        <div class="right-column">
          ${workExperiences ? `
            <section class="experience-section">
              <h2 class="section-title">Professional Experience</h2>
              <div class="experience-list">${workExperiences}</div>
            </section>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function generateCreativeTemplate(data: any): string {
  const skills = (data.skills || []).map((skill: any) => 
    `<div class="skill-item">
      <div class="skill-dot"></div>
      <span class="skill-name">${skill.name || skill.skill}</span>
    </div>`
  ).join('');

  const workExperiences = (data.workExperiences || []).map((work: any) => {
    const responsibilities = (work.responsibilities || []).map((resp: any) => 
      `<li class="responsibility-item">
        <span class="bullet">▸</span>
        <span class="responsibility-text">${typeof resp === 'string' ? resp : resp.description}</span>
      </li>`
    ).join('');
    
    return `
      <div class="work-item">
        <div class="decorative-accent"></div>
        <h3 class="job-title">${work.jobTitle}</h3>
        <div class="work-meta">
          <span class="company">${work.companyName || work.company || 'Company'}</span>
          <span class="separator">•</span>
          <span class="duration">${work.startDate} - ${work.isCurrent ? 'Present' : (work.endDate || 'Present')}</span>
        </div>
        ${responsibilities ? `<ul class="responsibilities">${responsibilities}</ul>` : ''}
      </div>
    `;
  }).join('');

  const educations = (data.educations || []).map((edu: any) => 
    `<div class="education-item">
      <div class="degree">${edu.degree || 'Degree'}</div>
      <div class="institution">${edu.institution}</div>
      <div class="year">${edu.graduationYear}</div>
    </div>`
  ).join('');

  return `
    <div class="creative-resume">
      <!-- Header with Creative Asymmetric Design -->
      <div class="header-section">
        <div class="header-accent"></div>
        <div class="header-content">
          <h1 class="name">${data.primaryName || 'Your Name'}</h1>
          <div class="contact-info">
            ${data.primaryEmail ? `<span class="contact-item">✉ ${data.primaryEmail}</span>` : ''}
            ${data.primaryPhone ? `<span class="contact-item">✆ ${data.primaryPhone}</span>` : ''}
          </div>
        </div>
      </div>

      <!-- Professional Summary -->
      ${data.summary ? `
        <section class="summary-section">
          <div class="section-header">
            <div class="accent-line"></div>
            <h2 class="section-title">About</h2>
          </div>
          <p class="summary-text">${data.summary}</p>
        </section>
      ` : ''}

      <!-- Two Column Layout -->
      <div class="content-grid">
        <!-- Left Column - Skills & Education -->
        <div class="left-column">
          ${skills ? `
            <section class="skills-section">
              <div class="section-header">
                <div class="accent-line small"></div>
                <h2 class="section-title">Skills</h2>
              </div>
              <div class="skills-list">${skills}</div>
            </section>
          ` : ''}

          ${educations ? `
            <section class="education-section">
              <div class="section-header">
                <div class="accent-line small"></div>
                <h2 class="section-title">Education</h2>
              </div>
              <div class="education-list">${educations}</div>
            </section>
          ` : ''}
        </div>

        <!-- Right Column - Experience -->
        <div class="right-column">
          ${workExperiences ? `
            <section class="experience-section">
              <div class="section-header">
                <div class="accent-line large"></div>
                <h2 class="section-title">Experience</h2>
              </div>
              <div class="experience-list">${workExperiences}</div>
            </section>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function generateMinimalDarkTemplate(data: any): string {
  const skills = (data.skills || []).map((skill: any) =>
    `<div class="skill-item">${skill.name || skill.skill}</div>`
  ).join('');

  const workExperiences = (data.workExperiences || []).map((work: any) => {
    const responsibilities = (work.responsibilities || []).map((resp: any) =>
      `<li class="responsibility-item">
        <span class="bullet">—</span>
        <span class="responsibility-text">${typeof resp === 'string' ? resp : resp.description}</span>
      </li>`
    ).join('');

    return `
      <div class="work-item">
        <h3 class="job-title">${work.jobTitle}</h3>
        <div class="work-meta">
          <span class="company">${work.companyName || work.company || 'Company'}</span>
          ${(work.startDate || work.endDate) ? `<span class="separator">·</span><span class="duration">${work.startDate} - ${work.isCurrent ? 'Present' : (work.endDate || 'Present')}</span>` : ''}
        </div>
        ${responsibilities ? `<ul class="responsibilities">${responsibilities}</ul>` : ''}
      </div>
    `;
  }).join('');

  const educations = (data.educations || []).map((edu: any) =>
    `<div class="education-item">
      <div class="degree">${edu.degree || 'Degree'}</div>
      <div class="institution">${edu.institution}</div>
      ${edu.graduationYear ? `<div class="year">${edu.graduationYear}</div>` : ''}
    </div>`
  ).join('');

  // Note: profilePicture and currentJobTitle are intentionally unused in this template
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _profilePicture = data.profilePicture;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _currentJobTitle = data.workExperiences && data.workExperiences.length > 0 ? data.workExperiences[0].jobTitle : '';

  return `
    <div class="minimal-dark-resume">
      <!-- Minimalist Header -->
      <div class="header-section">
        <h1 class="name">${data.primaryName || data.title || 'Your Name'}</h1>
        <div class="contact-info">
          ${data.primaryEmail ? `<span>${data.primaryEmail}</span>` : ''}
          ${data.primaryPhone ? `<span class="separator">·</span><span>${data.primaryPhone}</span>` : ''}
          ${data.primaryLocation ? `<span class="separator">·</span><span>${data.primaryLocation}</span>` : ''}
        </div>
      </div>

      <!-- Summary -->
      ${data.summary ? `
        <section class="summary-section">
          <h2 class="section-title">Profile</h2>
          <p class="summary-text">${data.summary}</p>
        </section>
      ` : ''}

      <!-- Experience -->
      ${workExperiences ? `
        <section class="experience-section">
          <h2 class="section-title">Experience</h2>
          <div class="experience-list">${workExperiences}</div>
        </section>
      ` : ''}

      <!-- Education & Skills Grid -->
      <div class="content-grid">
        <!-- Education -->
        ${educations ? `
          <section class="education-section">
            <h2 class="section-title">Education</h2>
            <div class="education-list">${educations}</div>
          </section>
        ` : ''}

        <!-- Skills -->
        ${skills ? `
          <section class="skills-section">
            <h2 class="section-title">Skills</h2>
            <div class="skills-list">${skills}</div>
          </section>
        ` : ''}
      </div>
    </div>
  `;
}

function generateExecutiveTemplate(data: any): string {
  const skills = (data.skills || []).map((skill: any) => 
    `<div class="skill-item">
      <div class="skill-dot"></div>
      <span class="skill-name">${skill.name || skill.skill}</span>
    </div>`
  ).join('');

  const workExperiences = (data.workExperiences || []).map((work: any) => {
    const responsibilities = (work.responsibilities || []).map((resp: any) => 
      `<li class="responsibility-item">
        <span class="bullet">▸</span>
        <span class="responsibility-text">${typeof resp === 'string' ? resp : resp.description}</span>
      </li>`
    ).join('');
    
    return `
      <div class="work-item">
        <h3 class="job-title">${work.jobTitle}</h3>
        <div class="work-meta">
          <span class="company">${work.companyName || work.company || 'Company'}</span>
          ${(work.startDate || work.endDate) ? `<span class="duration">${work.startDate} - ${work.isCurrent ? 'Present' : (work.endDate || 'Present')}</span>` : ''}
        </div>
        ${responsibilities ? `<ul class="responsibilities">${responsibilities}</ul>` : ''}
      </div>
    `;
  }).join('');

  const educations = (data.educations || []).map((edu: any) => 
    `<div class="education-item">
      <div class="degree">${edu.degree || 'Degree'}</div>
      <div class="institution">${edu.institution}</div>
      ${edu.graduationYear ? `<div class="year">${edu.graduationYear}</div>` : ''}
    </div>`
  ).join('');

  return `
    <div class="executive-resume">
      <!-- Sophisticated Header -->
      <div class="header-section">
        <h1 class="name">${data.primaryName || 'Your Name'}</h1>
        <div class="header-accent"></div>
        <div class="contact-info">
          ${data.primaryEmail ? `<span class="contact-item">✉ ${data.primaryEmail}</span>` : ''}
          ${data.primaryPhone ? `<span class="contact-item">✆ ${data.primaryPhone}</span>` : ''}
        </div>
      </div>

      <!-- Executive Summary -->
      ${data.summary ? `
        <section class="summary-section">
          <div class="section-header">
            <div class="accent-line"></div>
            <h2 class="section-title">Executive Summary</h2>
          </div>
          <p class="summary-text">${data.summary}</p>
        </section>
      ` : ''}

      <!-- Leadership Experience -->
      ${workExperiences ? `
        <section class="experience-section">
          <div class="section-header">
            <div class="accent-line"></div>
            <h2 class="section-title">Leadership Experience</h2>
          </div>
          <div class="experience-list">${workExperiences}</div>
        </section>
      ` : ''}

      <!-- Education & Skills Grid -->
      <div class="content-grid">
        <!-- Education -->
        ${educations ? `
          <section class="education-section">
            <div class="section-header">
              <div class="accent-line"></div>
              <h2 class="section-title">Education</h2>
            </div>
            <div class="education-list">${educations}</div>
          </section>
        ` : ''}

        <!-- Skills -->
        ${skills ? `
          <section class="skills-section">
            <div class="section-header">
              <div class="accent-line"></div>
              <h2 class="section-title">Core Competencies</h2>
            </div>
            <div class="skills-list">${skills}</div>
          </section>
        ` : ''}
      </div>
    </div>
  `;
}

function generateColorfulTemplate(data: any): string {
  const skills = (data.skills || []).map((skill: any, index: number) => 
    `<div class="skill-badge skill-${(index % 4) + 1}">${skill.name || skill.skill}</div>`
  ).join('');

  const workExperiences = (data.workExperiences || []).map((work: any, index: number) => {
    const responsibilities = (work.responsibilities || []).map((resp: any) => 
      `<li>${typeof resp === 'string' ? resp : resp.description}</li>`
    ).join('');
    
    return `
      <div class="timeline-item">
        <div class="timeline-marker marker-${(index % 3) + 1}"></div>
        <div class="timeline-content">
          <div class="job-header">
            <div class="job-title">${work.jobTitle}</div>
            <div class="company">${work.company}</div>
            <div class="duration">${work.startDate} - ${work.endDate}</div>
          </div>
          ${responsibilities ? `<ul class="responsibilities">${responsibilities}</ul>` : ''}
        </div>
      </div>
    `;
  }).join('');

  const educations = (data.educations || []).map((edu: any, index: number) => 
    `<div class="education-card card-${(index % 3) + 1}">
      <div class="degree">${edu.degree}</div>
      <div class="institution">${edu.institution}</div>
      <div class="year">${edu.graduationYear}</div>
    </div>`
  ).join('');

  const profilePicture = data.profilePicture ? 
    `<div class="profile-picture"><img src="${data.profilePicture}" alt="Profile" /></div>` : '';

  return `
    <div class="colorful-resume">
      <div class="header-section">
        <div class="header-background">
          <div class="color-stripes">
            <div class="stripe stripe-1"></div>
            <div class="stripe stripe-2"></div>
            <div class="stripe stripe-3"></div>
          </div>
        </div>
        <div class="header-content">
          <div class="profile-section">
            ${profilePicture}
            <div class="name-section">
              <h1 class="name">${data.primaryName || 'Your Name'}</h1>
              <div class="contact-info">
                <div class="contact-item">
                  <span class="icon">📧</span>
                  <span>${data.primaryEmail}</span>
                </div>
                <div class="contact-item">
                  <span class="icon">📱</span>
                  <span>${data.primaryPhone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      ${data.summary ? `
        <div class="summary-section">
          <h2 class="section-title">
            <span class="title-decoration">✨</span>
            About Me
            <span class="title-decoration">✨</span>
          </h2>
          <p class="summary-text">${data.summary}</p>
        </div>
      ` : ''}
      
      <div class="content-sections">
        ${skills ? `
          <div class="skills-section">
            <h3 class="section-title">
              <span class="title-icon">🎨</span>
              Skills & Talents
            </h3>
            <div class="skills-container">${skills}</div>
          </div>
        ` : ''}
        
        ${workExperiences ? `
          <div class="experience-section">
            <h3 class="section-title">
              <span class="title-icon">🚀</span>
              Work Journey
            </h3>
            <div class="experience-timeline">${workExperiences}</div>
          </div>
        ` : ''}
        
        ${educations ? `
          <div class="education-section">
            <h3 class="section-title">
              <span class="title-icon">🎓</span>
              Education
            </h3>
            <div class="education-grid">${educations}</div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// getTemplateCSS function removed - now using CSS loader from separate files
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTemplateCSS(templateKey: string): string {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    `,
    professional: `
      .professional-resume { background: white; color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      .header-section { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 50px 0; margin-bottom: 40px; position: relative; }
      .header-section::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(30, 64, 175, 0.9), rgba(59, 130, 246, 0.9)); }
      .header-content { max-width: 800px; margin: 0 auto; padding: 0 20px; position: relative; z-index: 2; }
      .profile-info { display: flex; align-items: center; gap: 40px; }
      .profile-picture { width: 140px; height: 140px; border-radius: 50%; overflow: hidden; border: 5px solid rgba(255, 255, 255, 0.3); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); }
      .profile-picture img { width: 100%; height: 100%; object-fit: cover; }
      .name { font-size: 42px; font-weight: 800; margin: 0 0 15px 0; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); }
      .contact-info { display: flex; flex-direction: column; gap: 12px; }
      .email, .phone { font-size: 18px; opacity: 0.95; display: flex; align-items: center; gap: 8px; }
      .email::before { content: '📧'; }
      .phone::before { content: '📱'; }
      .summary-section { margin-bottom: 40px; background: #f8fafc; padding: 30px; border-radius: 12px; border-left: 5px solid #3b82f6; }
      .section-title { font-size: 28px; font-weight: 700; color: #1e40af; margin-bottom: 20px; border-bottom: 3px solid #3b82f6; padding-bottom: 10px; }
      .summary-text { font-size: 18px; line-height: 1.7; color: #374151; }
      .content-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 50px; }
      .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
      .skill-item { background: linear-gradient(135deg, #f8fafc, #e2e8f0); border: 2px solid #e2e8f0; padding: 15px; border-radius: 12px; text-align: center; font-weight: 600; color: #1e40af; transition: all 0.3s ease; }
      .skill-item:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(59, 130, 246, 0.2); }
      .experience-item { margin-bottom: 30px; padding: 25px; border-left: 5px solid #3b82f6; background: linear-gradient(135deg, #f8fafc, #ffffff); border-radius: 0 12px 12px 0; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); }
      .job-title { font-size: 22px; font-weight: 700; color: #1e40af; margin-bottom: 8px; }
      .company { font-size: 18px; color: #6b7280; margin-bottom: 8px; font-weight: 500; }
      .duration { font-size: 16px; color: #9ca3af; font-weight: 500; }
      .responsibilities { margin: 15px 0 0 0; padding-left: 25px; }
      .responsibilities li { margin: 8px 0; color: #374151; line-height: 1.6; }
      .responsibilities li::marker { color: #3b82f6; }
      .education-item { margin-bottom: 20px; padding: 20px; background: linear-gradient(135deg, #f8fafc, #ffffff); border-radius: 12px; box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05); }
      .degree { font-weight: 700; color: #1e40af; margin-bottom: 8px; font-size: 18px; }
      .institution { color: #374151; margin-bottom: 8px; font-size: 16px; }
      .year { color: #6b7280; font-size: 16px; font-weight: 500; }
    `,
    creative: `
      .creative-resume { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      .header-section { position: relative; padding: 80px 0; }
      .header-background { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
      .header-content { position: relative; z-index: 2; max-width: 900px; margin: 0 auto; padding: 0 20px; }
      .profile-section { display: flex; align-items: center; gap: 50px; }
      .profile-picture { width: 180px; height: 180px; border-radius: 50%; overflow: hidden; border: 6px solid rgba(255,255,255,0.4); box-shadow: 0 15px 40px rgba(0,0,0,0.3); }
      .profile-picture img { width: 100%; height: 100%; object-fit: cover; }
      .name { font-size: 48px; font-weight: 900; margin: 0 0 20px 0; text-shadow: 3px 3px 6px rgba(0,0,0,0.4); }
      .contact-info { display: flex; flex-direction: column; gap: 15px; }
      .contact-item { display: flex; align-items: center; gap: 15px; font-size: 18px; }
      .icon { font-size: 24px; }
      .content-sections { background: white; color: #1a1a1a; margin: 50px 20px; padding: 50px; border-radius: 25px; box-shadow: 0 25px 50px rgba(0,0,0,0.15); }
      .section-title { font-size: 32px; font-weight: 800; color: #667eea; margin-bottom: 25px; display: flex; align-items: center; gap: 15px; }
      .title-icon { font-size: 28px; }
      .summary-text { font-size: 20px; line-height: 1.8; color: #374151; }
      .skills-container { display: flex; flex-wrap: wrap; gap: 20px; }
      .skill-badge { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 15px 25px; border-radius: 30px; font-weight: 700; font-size: 16px; box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3); transition: all 0.3s ease; }
      .skill-badge:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4); }
      .experience-timeline { position: relative; }
      .timeline-item { display: flex; gap: 25px; margin-bottom: 40px; }
      .timeline-marker { width: 25px; height: 25px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; flex-shrink: 0; margin-top: 8px; box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3); }
      .timeline-content { flex: 1; background: linear-gradient(135deg, #f8fafc, #ffffff); padding: 25px; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.08); }
      .job-title { font-size: 24px; font-weight: 800; color: #667eea; margin-bottom: 8px; }
      .company { font-size: 18px; color: #6b7280; margin-bottom: 8px; font-weight: 600; }
      .duration { font-size: 16px; color: #9ca3af; font-weight: 500; }
      .responsibilities { margin: 15px 0 0 0; padding-left: 25px; }
      .responsibilities li { margin: 8px 0; color: #374151; line-height: 1.6; }
      .responsibilities li::marker { color: #667eea; }
      .education-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
      .education-card { background: linear-gradient(135deg, #f8fafc, #e2e8f0); padding: 25px; border-radius: 20px; text-align: center; box-shadow: 0 5px 20px rgba(0,0,0,0.08); transition: all 0.3s ease; }
      .education-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.12); }
      .degree { font-weight: 800; color: #667eea; margin-bottom: 10px; font-size: 20px; }
      .institution { color: #374151; margin-bottom: 8px; font-size: 18px; }
      .year { color: #6b7280; font-size: 16px; font-weight: 600; }
    `,
    'minimal-dark': `
      .minimal-dark-resume { background: white; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      .resume-container { max-width: 1200px; margin: 0 auto; box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15); border-radius: 12px; overflow: hidden; }
      .resume-grid { display: grid; grid-template-columns: 2fr 3fr; min-height: 100vh; }
      
      /* LEFT SIDEBAR */
      .sidebar { background: linear-gradient(135deg, #1e293b, #0f172a, #1e293b); color: white; padding: 40px; display: flex; flex-direction: column; }
      
      .profile-picture-container { position: relative; display: flex; justify-content: center; margin-bottom: 32px; }
      .profile-picture { width: 192px; height: 192px; border-radius: 50%; overflow: hidden; border: 4px solid #475569; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); }
      .profile-picture img { width: 100%; height: 100%; object-fit: cover; }
      .status-indicator { position: absolute; bottom: -8px; right: -8px; width: 64px; height: 64px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 4px solid #1e293b; }
      .check-icon { width: 32px; height: 32px; color: white; }
      
      .name-section { text-align: center; margin-bottom: 32px; }
      .name { font-size: 24px; font-weight: 700; margin: 0 0 8px 0; color: white; }
      .job-title { color: #10b981; font-size: 18px; font-weight: 500; margin: 0; }
      
      .divider { width: 64px; height: 4px; background: #10b981; margin: 0 auto 32px auto; }
      
      .section-title { color: #10b981; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; display: flex; align-items: center; }
      .section-icon { width: 20px; height: 20px; margin-right: 8px; }
      
      .contact-info { display: flex; flex-direction: column; gap: 16px; }
      .contact-item { display: flex; align-items: flex-start; }
      .contact-icon { width: 20px; height: 20px; margin-right: 12px; margin-top: 2px; color: #10b981; flex-shrink: 0; }
      .contact-item span { font-size: 14px; word-break: break-word; }
      
      .skills-list { display: flex; flex-direction: column; gap: 12px; }
      .skill-item { display: flex; align-items: center; }
      .skill-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; margin-right: 12px; }
      .skill-name { font-size: 14px; }
      
      .education-list { display: flex; flex-direction: column; gap: 20px; }
      .education-item { display: flex; }
      .education-border { width: 2px; background: #10b981; margin-right: 16px; }
      .education-content { flex: 1; }
      .degree { font-weight: 600; font-size: 14px; margin-bottom: 4px; color: white; }
      .institution { color: #cbd5e1; font-size: 12px; margin-bottom: 4px; }
      .year { color: #10b981; font-size: 12px; font-weight: 500; }
      
      /* RIGHT MAIN CONTENT */
      .main-content { background: white; padding: 40px; color: #1e293b; }
      
      .main-section-title { font-size: 20px; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; color: #1e293b; }
      .title-accent { width: 4px; height: 32px; background: #10b981; margin-right: 12px; }
      
      .summary-text { color: #475569; line-height: 1.6; font-size: 16px; }
      
      .experience-list { display: flex; flex-direction: column; gap: 32px; }
      .experience-item { position: relative; padding-left: 32px; }
      .experience-timeline { display: flex; }
      .timeline-dot { position: absolute; left: -2px; top: 0; width: 16px; height: 16px; background: #10b981; border-radius: 50%; border: 2px solid white; }
      .experience-content { flex: 1; }
      
      .job-header { margin-bottom: 12px; }
      .job-title { font-size: 20px; font-weight: 700; margin-bottom: 4px; color: #1e293b; }
      .company { font-size: 18px; color: #10b981; font-weight: 600; margin-bottom: 4px; }
      .duration { color: #64748b; font-weight: 500; font-size: 16px; }
      
      .responsibilities { margin: 16px 0 0 0; padding: 0; }
      .responsibility-item { display: flex; align-items: flex-start; margin-bottom: 8px; color: #475569; line-height: 1.5; font-size: 14px; }
      .responsibility-item .check-icon { width: 16px; height: 16px; margin-right: 8px; margin-top: 2px; color: #10b981; flex-shrink: 0; }
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

  // getTemplateCSS function removed - now using CSS loader from separate files
  return '';
}

function generateTechModernTemplate(data: any): string {
  const skills = (data.skills || []).map((skill: any) => 
    `<div class="skill-item">
      <span class="skill-bullet">▸</span>
      <span class="skill-name">${skill.name || skill.skill}</span>
    </div>`
  ).join('');

  const workExperiences = (data.workExperiences || []).map((work: any) => {
    const responsibilities = (work.responsibilities || []).map((resp: any) => 
      `<li class="responsibility-item">
        <span class="responsibility-bullet">&gt;</span>
        <span class="responsibility-text">${typeof resp === 'string' ? resp : resp.description}</span>
      </li>`
    ).join('');
    
    return `
      <div class="work-item">
        <div class="work-header">
          <div class="work-title-section">
            <h3 class="job-title">${work.jobTitle}</h3>
            <div class="company">${work.companyName || work.company || 'Company'}</div>
          </div>
          ${(work.startDate || work.endDate) ? `
            <span class="duration-badge">
              ${work.startDate} - ${work.isCurrent ? 'Present' : (work.endDate || 'Present')}
            </span>
          ` : ''}
        </div>
        ${responsibilities ? `<ul class="responsibilities">${responsibilities}</ul>` : ''}
      </div>
    `;
  }).join('');

  const educations = (data.educations || []).map((edu: any) => 
    `<div class="education-item">
      <div class="degree">${edu.degree || 'Degree'}</div>
      <div class="institution">${edu.institution}</div>
      ${edu.graduationYear ? `<div class="year">${edu.graduationYear}</div>` : ''}
    </div>`
  ).join('');

  return `
    <div class="tech-modern-resume">
      <!-- Tech Header with Grid Pattern -->
      <div class="header-section">
        <div class="grid-pattern"></div>
        <div class="header-content">
          <div class="resume-tag">&lt;RESUME /&gt;</div>
          <h1 class="name">${data.primaryName || 'Your Name'}</h1>
          <div class="contact-badges">
            ${data.primaryEmail ? `<span class="contact-badge">${data.primaryEmail}</span>` : ''}
            ${data.primaryPhone ? `<span class="contact-badge">${data.primaryPhone}</span>` : ''}
            ${data.primaryLocation ? `<span class="contact-badge">${data.primaryLocation}</span>` : ''}
          </div>
        </div>
      </div>

      <!-- Summary -->
      ${data.summary ? `
        <div class="summary-section">
          <div class="summary-card">
            <div class="code-comment">// ABOUT</div>
            <p class="summary-text">${data.summary}</p>
          </div>
        </div>
      ` : ''}

      <!-- Two Column Layout -->
      <div class="content-grid">
        <!-- Left Column -->
        <div class="left-column">
          ${skills ? `
            <div class="skills-card">
              <div class="code-comment">// TECH STACK</div>
              <div class="skills-list">${skills}</div>
            </div>
          ` : ''}

          ${educations ? `
            <div class="education-card">
              <div class="code-comment">// EDUCATION</div>
              <div class="education-list">${educations}</div>
            </div>
          ` : ''}
        </div>

        <!-- Right Column - Experience -->
        <div class="right-column">
          ${workExperiences ? `
            <div class="experience-card">
              <div class="code-comment">// WORK EXPERIENCE</div>
              <div class="experience-list">${workExperiences}</div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}


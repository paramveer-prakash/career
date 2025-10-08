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
    `<span class="skill-chip">${skill.name || skill.skill}</span>`
  ).join('');

  const workExperiences = (data.workExperiences || []).map((work: any) => {
    const responsibilities = (work.responsibilities || []).map((resp: any) => 
      `<li>${typeof resp === 'string' ? resp : resp.description}</li>`
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
      `<li>${typeof resp === 'string' ? resp : resp.description}</li>`
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

function generateProfessionalTemplate(data: any): string {
  const skills = (data.skills || []).map((skill: any) => 
    `<div class="skill-item">${skill.name || skill.skill}</div>`
  ).join('');

  const workExperiences = (data.workExperiences || []).map((work: any) => {
    const responsibilities = (work.responsibilities || []).map((resp: any) => 
      `<li>${typeof resp === 'string' ? resp : resp.description}</li>`
    ).join('');
    
    return `
      <div class="experience-item">
        <div class="job-header">
          <div class="job-title">${work.jobTitle}</div>
          <div class="company">${work.company}</div>
          <div class="duration">${work.startDate} - ${work.endDate}</div>
        </div>
        ${responsibilities ? `<ul class="responsibilities">${responsibilities}</ul>` : ''}
      </div>
    `;
  }).join('');

  const educations = (data.educations || []).map((edu: any) => 
    `<div class="education-item">
      <div class="degree">${edu.degree}</div>
      <div class="institution">${edu.institution}</div>
      <div class="year">${edu.graduationYear}</div>
    </div>`
  ).join('');

  const profilePicture = data.profilePicture ? 
    `<div class="profile-picture"><img src="${data.profilePicture}" alt="Profile" /></div>` : '';

  return `
    <div class="professional-resume">
      <div class="header-section">
        <div class="header-content">
          <div class="profile-info">
            ${profilePicture}
            <div class="name-section">
              <h1 class="name">${data.primaryName || 'Your Name'}</h1>
              <div class="contact-info">
                <span class="email">${data.primaryEmail}</span>
                <span class="phone">${data.primaryPhone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      ${data.summary ? `
        <div class="summary-section">
          <h2 class="section-title">Professional Summary</h2>
          <p class="summary-text">${data.summary}</p>
        </div>
      ` : ''}
      
      <div class="content-grid">
        <div class="left-column">
          ${skills ? `
            <div class="skills-section">
              <h3 class="section-title">Skills</h3>
              <div class="skills-grid">${skills}</div>
            </div>
          ` : ''}
          
          ${educations ? `
            <div class="education-section">
              <h3 class="section-title">Education</h3>
              <div class="education-list">${educations}</div>
            </div>
          ` : ''}
        </div>
        
        <div class="right-column">
          ${workExperiences ? `
            <div class="experience-section">
              <h3 class="section-title">Professional Experience</h3>
              <div class="experience-list">${workExperiences}</div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function generateCreativeTemplate(data: any): string {
  const skills = (data.skills || []).map((skill: any) => 
    `<div class="skill-badge">${skill.name || skill.skill}</div>`
  ).join('');

  const workExperiences = (data.workExperiences || []).map((work: any) => {
    const responsibilities = (work.responsibilities || []).map((resp: any) => 
      `<li>${typeof resp === 'string' ? resp : resp.description}</li>`
    ).join('');
    
    return `
      <div class="timeline-item">
        <div class="timeline-marker"></div>
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

  const educations = (data.educations || []).map((edu: any) => 
    `<div class="education-card">
      <div class="degree">${edu.degree}</div>
      <div class="institution">${edu.institution}</div>
      <div class="year">${edu.graduationYear}</div>
    </div>`
  ).join('');

  const profilePicture = data.profilePicture ? 
    `<div class="profile-picture"><img src="${data.profilePicture}" alt="Profile" /></div>` : '';

  return `
    <div class="creative-resume">
      <div class="header-section">
        <div class="header-background"></div>
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
            <span class="title-icon">💼</span>
            About Me
          </h2>
          <p class="summary-text">${data.summary}</p>
        </div>
      ` : ''}
      
      <div class="content-sections">
        ${skills ? `
          <div class="skills-section">
            <h3 class="section-title">
              <span class="title-icon">🛠️</span>
              Skills & Expertise
            </h3>
            <div class="skills-container">${skills}</div>
          </div>
        ` : ''}
        
        ${workExperiences ? `
          <div class="experience-section">
            <h3 class="section-title">
              <span class="title-icon">🚀</span>
              Work Experience
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

function generateMinimalDarkTemplate(data: any): string {
  const skills = (data.skills || []).map((skill: any) =>
    `<div class="skill-item">
      <div class="skill-dot"></div>
      <span class="skill-name">${skill.name || skill.skill}</span>
    </div>`
  ).join('');

  const workExperiences = (data.workExperiences || []).map((work: any) => {
    const responsibilities = (work.responsibilities || []).map((resp: any) =>
      `<li class="responsibility-item">
        <svg class="check-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span>${typeof resp === 'string' ? resp : resp.description}</span>
      </li>`
    ).join('');

    return `
      <div class="experience-item">
        <div class="experience-timeline">
          <div class="timeline-dot"></div>
          <div class="experience-content">
            <div class="job-header">
              <div class="job-title">${work.jobTitle}</div>
              <div class="company">${work.company}</div>
              <div class="duration">${work.startDate} - ${work.endDate}</div>
            </div>
            ${responsibilities ? `<ul class="responsibilities">${responsibilities}</ul>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');

  const educations = (data.educations || []).map((edu: any) =>
    `<div class="education-item">
      <div class="education-border"></div>
      <div class="education-content">
        <div class="degree">${edu.degree}</div>
        <div class="institution">${edu.institution}</div>
        <div class="year">${edu.graduationYear}</div>
      </div>
    </div>`
  ).join('');

  const profilePicture = data.profilePicture ?
    `<div class="profile-picture-container">
      <div class="profile-picture">
        <img src="${data.profilePicture}" alt="${data.primaryName}" />
      </div>
      <div class="status-indicator">
        <svg class="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>` : '';

  const currentJobTitle = data.workExperiences && data.workExperiences.length > 0 ? data.workExperiences[0].jobTitle : '';

  return `
    <div class="minimal-dark-resume">
      <div class="resume-container">
        <div class="resume-grid">
          <!-- LEFT SIDEBAR -->
          <div class="sidebar">
            ${profilePicture}
            
            <div class="name-section">
              <h1 class="name">${data.primaryName || 'Your Name'}</h1>
              ${currentJobTitle ? `<p class="job-title">${currentJobTitle}</p>` : ''}
            </div>

            <div class="divider"></div>

            <div class="contact-section">
              <h3 class="section-title">
                <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact
              </h3>
              <div class="contact-info">
                <div class="contact-item">
                  <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>${data.primaryEmail}</span>
                </div>
                <div class="contact-item">
                  <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>${data.primaryPhone}</span>
                </div>
              </div>
            </div>

            ${skills ? `
              <div class="skills-section">
                <h3 class="section-title">
                  <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Skills
                </h3>
                <div class="skills-list">${skills}</div>
              </div>
            ` : ''}

            ${educations ? `
              <div class="education-section">
                <h3 class="section-title">
                  <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  Education
                </h3>
                <div class="education-list">${educations}</div>
              </div>
            ` : ''}
          </div>

          <!-- RIGHT MAIN CONTENT -->
          <div class="main-content">
            ${data.summary ? `
              <div class="summary-section">
                <h2 class="main-section-title">
                  <div class="title-accent"></div>
                  Professional Summary
                </h2>
                <p class="summary-text">${data.summary}</p>
              </div>
            ` : ''}

            ${workExperiences ? `
              <div class="experience-section">
                <h2 class="main-section-title">
                  <div class="title-accent"></div>
                  Work Experience
                </h2>
                <div class="experience-list">${workExperiences}</div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}

function generateExecutiveTemplate(data: any): string {
  const skills = (data.skills || []).map((skill: any) => 
    `<div class="competency-item">
      <div class="competency-name">${skill.name || skill.skill}</div>
      <div class="competency-bar">
        <div class="competency-fill"></div>
      </div>
    </div>`
  ).join('');

  const workExperiences = (data.workExperiences || []).map((work: any) => {
    const responsibilities = (work.responsibilities || []).map((resp: any) => 
      `<li>${typeof resp === 'string' ? resp : resp.description}</li>`
    ).join('');
    
    return `
      <div class="experience-item">
        <div class="job-header">
          <div class="job-title">${work.jobTitle}</div>
          <div class="company">${work.company}</div>
          <div class="duration">${work.startDate} - ${work.endDate}</div>
        </div>
        ${responsibilities ? `<ul class="responsibilities">${responsibilities}</ul>` : ''}
      </div>
    `;
  }).join('');

  const educations = (data.educations || []).map((edu: any) => 
    `<div class="education-item">
      <div class="degree">${edu.degree}</div>
      <div class="institution">${edu.institution}</div>
      <div class="year">${edu.graduationYear}</div>
    </div>`
  ).join('');

  const profilePicture = data.profilePicture ? 
    `<div class="profile-picture"><img src="${data.profilePicture}" alt="Profile" /></div>` : '';

  return `
    <div class="executive-resume">
      <div class="header-section">
        <div class="header-background"></div>
        <div class="header-content">
          <div class="profile-section">
            ${profilePicture}
            <div class="name-section">
              <h1 class="name">${data.primaryName || 'Your Name'}</h1>
              <div class="title">Executive Professional</div>
              <div class="contact-info">
                <div class="contact-item">
                  <span class="icon">✉</span>
                  <span>${data.primaryEmail}</span>
                </div>
                <div class="contact-item">
                  <span class="icon">📞</span>
                  <span>${data.primaryPhone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      ${data.summary ? `
        <div class="summary-section">
          <h2 class="section-title">Executive Summary</h2>
          <p class="summary-text">${data.summary}</p>
        </div>
      ` : ''}
      
      <div class="content-grid">
        <div class="left-column">
          ${skills ? `
            <div class="skills-section">
              <h3 class="section-title">Core Competencies</h3>
              <div class="competencies-list">${skills}</div>
            </div>
          ` : ''}
          
          ${educations ? `
            <div class="education-section">
              <h3 class="section-title">Education</h3>
              <div class="education-list">${educations}</div>
            </div>
          ` : ''}
        </div>
        
        <div class="right-column">
          ${workExperiences ? `
            <div class="experience-section">
              <h3 class="section-title">Professional Experience</h3>
              <div class="experience-list">${workExperiences}</div>
            </div>
          ` : ''}
        </div>
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

  return baseCSS + (templateSpecificCSS[templateKey as keyof typeof templateSpecificCSS] || '');
}

function generateTechModernTemplate(data: any): string {
  const skills = (data.skills || []).map((skill: any) => 
    `<div class="skill-item">${skill.name || skill.skill}</div>`
  ).join('');

  const workExperiences = (data.workExperiences || []).map((work: any) => {
    const responsibilities = (work.responsibilities || []).map((resp: any) => 
      `<li>${typeof resp === 'string' ? resp : resp.description}</li>`
    ).join('');
    
    return `
      <div class="experience-item">
        <div class="job-header">
          <div class="job-title">${work.jobTitle}</div>
          <div class="company">${work.company}</div>
          <div class="duration">${work.startDate} - ${work.endDate}</div>
        </div>
        ${responsibilities ? `<ul class="responsibilities">${responsibilities}</ul>` : ''}
      </div>
    `;
  }).join('');

  const educations = (data.educations || []).map((edu: any) => 
    `<div class="education-item">
      <div class="degree">${edu.degree}</div>
      <div class="institution">${edu.institution}</div>
      <div class="year">${edu.graduationYear}</div>
    </div>`
  ).join('');

  const profilePicture = data.profilePicture ? 
    `<div class="profile-picture"><img src="${data.profilePicture}" alt="Profile" /></div>` : '';

  return `
    <div class="tech-modern-resume">
      <div class="header-section">
        <div class="header-content">
          <div class="profile-section">
            ${profilePicture}
            <div class="name-section">
              <h1 class="name">${data.primaryName || 'Your Name'}</h1>
              <div class="title">Tech Professional</div>
              <div class="contact-info">
                <span class="email">💻 ${data.primaryEmail}</span>
                <span class="phone">📱 ${data.primaryPhone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      ${data.summary ? `
        <div class="summary-section">
          <h2 class="section-title">Tech Summary</h2>
          <p class="summary-text">${data.summary}</p>
        </div>
      ` : ''}
      
      <div class="content-grid">
        <div class="left-column">
          ${skills ? `
            <div class="skills-section">
              <h3 class="section-title">Tech Stack</h3>
              <div class="skills-grid">${skills}</div>
            </div>
          ` : ''}
          
          ${educations ? `
            <div class="education-section">
              <h3 class="section-title">Education</h3>
              <div class="education-list">${educations}</div>
            </div>
          ` : ''}
        </div>
        
        <div class="right-column">
          ${workExperiences ? `
            <div class="experience-section">
              <h3 class="section-title">Tech Experience</h3>
              <div class="experience-list">${workExperiences}</div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}


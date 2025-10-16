/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

// Template Configuration Interface
export interface TemplateConfig {
  key: string;
  name: string;
  description: string;
  category: 'professional' | 'modern' | 'creative' | 'minimal';
  layout: {
    header: {
      style: 'centered' | 'left-aligned' | 'right-aligned' | 'split';
      showAvatar: boolean;
      showTitle: boolean;
    };
    sections: {
      skills: {
        style: 'chips' | 'list' | 'grid' | 'bars';
        position: 'left' | 'right' | 'full-width';
      };
      experience: {
        style: 'cards' | 'timeline' | 'simple' | 'detailed';
        position: 'left' | 'right' | 'full-width';
      };
      education: {
        style: 'cards' | 'list' | 'simple';
        position: 'left' | 'right' | 'full-width';
      };
    };
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    typography: {
      headingFont: string;
      bodyFont: string;
      headingSize: 'small' | 'medium' | 'large';
    };
  };
}

// Template Generator Class
export class TemplateGenerator {
  private config: TemplateConfig;

  constructor(config: TemplateConfig) {
    this.config = config;
  }

  // Generate HTML structure
  generateHTML(data: any): string {
    const { layout } = this.config;
    
    let html = '<div class="resume-container">';
    
    // Header Section
    html += this.generateHeader(data, layout.header);
    
    // Main Content Grid
    html += '<div class="content-grid">';
    
    // Left Column
    if (layout.sections.skills.position === 'left' || layout.sections.education.position === 'left') {
      html += '<div class="left-column">';
      if (layout.sections.skills.position === 'left') {
        html += this.generateSkillsSection(data, layout.sections.skills);
      }
      if (layout.sections.education.position === 'left') {
        html += this.generateEducationSection(data, layout.sections.education);
      }
      html += '</div>';
    }
    
    // Right Column
    if (layout.sections.experience.position === 'right' || layout.sections.skills.position === 'right' || layout.sections.education.position === 'right') {
      html += '<div class="right-column">';
      if (layout.sections.experience.position === 'right') {
        html += this.generateExperienceSection(data, layout.sections.experience);
      }
      if (layout.sections.skills.position === 'right') {
        html += this.generateSkillsSection(data, layout.sections.skills);
      }
      if (layout.sections.education.position === 'right') {
        html += this.generateEducationSection(data, layout.sections.education);
      }
      html += '</div>';
    }
    
    // Full Width Sections
    if (layout.sections.experience.position === 'full-width') {
      html += this.generateExperienceSection(data, layout.sections.experience);
    }
    if (layout.sections.skills.position === 'full-width') {
      html += this.generateSkillsSection(data, layout.sections.skills);
    }
    if (layout.sections.education.position === 'full-width') {
      html += this.generateEducationSection(data, layout.sections.education);
    }
    
    html += '</div>'; // content-grid
    html += '</div>'; // resume-container
    
    return html;
  }

  // Generate CSS
  generateCSS(): string {
    const { layout } = this.config;
    const { colors, typography } = layout;
    
    return `
      /* Base Styles */
      body {
        font-family: ${typography.bodyFont};
        margin: 0;
        padding: 20px;
        background: ${colors.background};
        color: ${colors.text};
        line-height: 1.6;
        font-size: 14px;
      }
      
      .resume-container {
        max-width: 800px;
        margin: 0 auto;
      }
      
      /* Header Styles */
      .header-section {
        ${this.generateHeaderCSS(layout.header, colors)}
      }
      
      /* Content Grid */
      .content-grid {
        ${this.generateGridCSS(layout)}
      }
      
      /* Section Styles */
      .skills-section, .experience-section, .education-section {
        ${this.generateSectionCSS(colors, typography)}
      }
      
      /* Skills Styles */
      .skills-list {
        ${this.generateSkillsCSS(layout.sections.skills, colors)}
      }
      
      /* Experience Styles */
      .experience-list {
        ${this.generateExperienceCSS(layout.sections.experience, colors)}
      }
      
      /* Education Styles */
      .education-list {
        ${this.generateEducationCSS(layout.sections.education, colors)}
      }
      
      /* Print Styles */
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
  }

  // Generate Preview SVG for Template Gallery
  generatePreviewSVG(): string {
    const { layout } = this.config;
    const { colors } = layout;
    const svgWidth = 150;
    const svgHeight = 200;
    
    let svg = `<svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">`;
    
    // Background
    svg += `<rect width="${svgWidth}" height="${svgHeight}" fill="${colors.background}"/>`;
    
    // Header
    svg += this.generateHeaderPreview(svgWidth, colors);
    
    // Content sections based on layout
    svg += this.generateContentPreview(svgWidth, svgHeight, layout, colors);
    
    svg += '</svg>';
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  // Helper methods for HTML generation
  private generateHeader(data: any, headerLayout: any): string {
    let html = '<div class="header-section">';
    
    if (headerLayout.style === 'split') {
      html += '<div class="header-split">';
      html += '<div class="name-section">';
      html += `<h1 class="name">${data.firstName || ''} ${data.lastName || ''}</h1>`;
      if (headerLayout.showTitle && data.title) {
        html += `<p class="title">${data.title}</p>`;
      }
      html += '</div>';
      if (headerLayout.showAvatar) {
        html += '<div class="avatar"></div>';
      }
      html += '</div>';
    } else {
      html += `<h1 class="name">${data.firstName || ''} ${data.lastName || ''}</h1>`;
      if (headerLayout.showTitle && data.title) {
        html += `<p class="title">${data.title}</p>`;
      }
    }
    
    // Contact info
    if (data.email || data.phone) {
      html += '<div class="contact">';
      if (data.email) html += `<span>${data.email}</span>`;
      if (data.phone) html += `<span>${data.phone}</span>`;
      html += '</div>';
    }
    
    // Summary
    if (data.summary) {
      html += `<div class="summary">${data.summary}</div>`;
    }
    
    html += '</div>';
    return html;
  }

  private generateSkillsSection(data: any, skillsLayout: any): string {
    if (!data.skills || data.skills.length === 0) return '';
    
    let html = '<div class="skills-section">';
    html += '<h3>Skills</h3>';
    html += '<div class="skills-list">';
    
    data.skills.forEach((skill: any) => {
      if (skillsLayout.style === 'chips') {
        html += `<span class="skill-chip">${skill}</span>`;
      } else if (skillsLayout.style === 'bars') {
        html += `<div class="skill-bar"><span class="skill-name">${skill}</span><div class="skill-progress"></div></div>`;
      } else {
        html += `<div class="skill-item">${skill}</div>`;
      }
    });
    
    html += '</div></div>';
    return html;
  }

  private generateExperienceSection(data: any, _experienceLayout: any): string {
    if (!data.experience || data.experience.length === 0) return '';
    
    let html = '<div class="experience-section">';
    html += '<h3>Experience</h3>';
    html += '<div class="experience-list">';
    
    data.experience.forEach((exp: any) => {
      html += '<div class="experience-item">';
      html += `<div class="job-title">${exp.title || ''}</div>`;
      html += `<div class="company">${exp.company || ''}</div>`;
      html += `<div class="duration">${exp.startDate || ''} - ${exp.endDate || 'Present'}</div>`;
      if (exp.responsibilities && exp.responsibilities.length > 0) {
        html += '<ul class="responsibilities">';
        exp.responsibilities.forEach((resp: string) => {
          html += `<li>${resp}</li>`;
        });
        html += '</ul>';
      }
      html += '</div>';
    });
    
    html += '</div></div>';
    return html;
  }

  private generateEducationSection(data: any, _educationLayout: any): string {
    if (!data.education || data.education.length === 0) return '';
    
    let html = '<div class="education-section">';
    html += '<h3>Education</h3>';
    html += '<div class="education-list">';
    
    data.education.forEach((edu: any) => {
      html += '<div class="education-item">';
      html += `<div class="degree">${edu.degree || ''}</div>`;
      html += `<div class="institution">${edu.institution || ''}</div>`;
      html += `<div class="year">${edu.year || ''}</div>`;
      html += '</div>';
    });
    
    html += '</div></div>';
    return html;
  }

  // Helper methods for CSS generation
  private generateHeaderCSS(headerLayout: any, _colors: any): string {
    switch (headerLayout.style) {
      case 'split':
        return `
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        `;
      case 'centered':
        return `
          text-align: center;
          margin-bottom: 24px;
        `;
      default:
        return `
          margin-bottom: 16px;
        `;
    }
  }

  private generateGridCSS(layout: any): string {
    const hasLeftColumn = layout.sections.skills.position === 'left' || layout.sections.education.position === 'left';
    const hasRightColumn = layout.sections.experience.position === 'right' || layout.sections.skills.position === 'right' || layout.sections.education.position === 'right';
    
    if (hasLeftColumn && hasRightColumn) {
      return `
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 24px;
        margin-top: 24px;
      `;
    } else if (hasLeftColumn || hasRightColumn) {
      return `
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        margin-top: 24px;
      `;
    } else {
      return `
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 24px;
      `;
    }
  }

  private generateSectionCSS(_colors: any, _typography: any): string {
    return `
      margin-bottom: 16px;
    `;
  }

  private generateSkillsCSS(skillsLayout: any, _colors: any): string {
    switch (skillsLayout.style) {
      case 'chips':
        return `
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        `;
      case 'bars':
        return `
          display: flex;
          flex-direction: column;
          gap: 12px;
        `;
      default:
        return `
          display: flex;
          flex-direction: column;
          gap: 8px;
        `;
    }
  }

  private generateExperienceCSS(experienceLayout: any, _colors: any): string {
    switch (experienceLayout.style) {
      case 'cards':
        return `
          display: flex;
          flex-direction: column;
          gap: 12px;
        `;
      case 'timeline':
        return `
          position: relative;
          padding-left: 20px;
        `;
      default:
        return `
          display: flex;
          flex-direction: column;
          gap: 12px;
        `;
    }
  }

  private generateEducationCSS(educationLayout: any, _colors: any): string {
    switch (educationLayout.style) {
      case 'cards':
        return `
          display: flex;
          flex-direction: column;
          gap: 12px;
        `;
      default:
        return `
          display: flex;
          flex-direction: column;
          gap: 8px;
        `;
    }
  }

  // Helper methods for SVG preview generation
  private generateHeaderPreview(width: number, colors: any): string {
    return `
      <rect x="10" y="10" width="${width - 20}" height="30" fill="${colors.primary}" rx="4"/>
      <text x="15" y="25" fill="white" font-family="Arial" font-size="12" font-weight="bold">John Doe</text>
    `;
  }

  private generateContentPreview(width: number, height: number, layout: any, colors: any): string {
    let svg = '';
    const startY = 50;
    
    // Skills section
    if (layout.sections.skills.position === 'left') {
      svg += `<rect x="10" y="${startY}" width="${width/2 - 15}" height="${height - startY - 10}" fill="${colors.background}" rx="2"/>`;
      svg += `<text x="15" y="${startY + 15}" fill="${colors.text}" font-family="Arial" font-size="10" font-weight="bold">Skills</text>`;
    }
    
    // Experience section
    if (layout.sections.experience.position === 'right') {
      svg += `<rect x="${width/2 + 5}" y="${startY}" width="${width/2 - 15}" height="${height - startY - 10}" fill="${colors.background}" rx="2"/>`;
      svg += `<text x="${width/2 + 10}" y="${startY + 15}" fill="${colors.text}" font-family="Arial" font-size="10" font-weight="bold">Experience</text>`;
    }
    
    return svg;
  }
}

// Predefined template configurations
export const TEMPLATE_CONFIGS: Record<string, TemplateConfig> = {
  modern: {
    key: 'modern',
    name: 'Modern',
    description: 'Bold headings, chips, accent gradient',
    category: 'modern',
    layout: {
      header: {
        style: 'split',
        showAvatar: true,
        showTitle: true
      },
      sections: {
        skills: {
          style: 'chips',
          position: 'left'
        },
        experience: {
          style: 'cards',
          position: 'right'
        },
        education: {
          style: 'simple',
          position: 'left'
        }
      },
      colors: {
        primary: '#3b82f6',
        secondary: '#06b6d4',
        accent: '#10b981',
        background: '#ffffff',
        text: '#1a1a1a'
      },
      typography: {
        headingFont: 'Arial, sans-serif',
        bodyFont: 'Arial, sans-serif',
        headingSize: 'medium'
      }
    }
  },
  
  classic: {
    key: 'classic',
    name: 'Classic',
    description: 'Conventional, readable, clean',
    category: 'professional',
    layout: {
      header: {
        style: 'left-aligned',
        showAvatar: false,
        showTitle: true
      },
      sections: {
        skills: {
          style: 'list',
          position: 'left'
        },
        experience: {
          style: 'simple',
          position: 'right'
        },
        education: {
          style: 'list',
          position: 'left'
        }
      },
      colors: {
        primary: '#374151',
        secondary: '#6b7280',
        accent: '#3b82f6',
        background: '#ffffff',
        text: '#1a1a1a'
      },
      typography: {
        headingFont: 'Times New Roman, serif',
        bodyFont: 'Times New Roman, serif',
        headingSize: 'medium'
      }
    }
  },
  
  minimal: {
    key: 'minimal',
    name: 'Minimal',
    description: 'Sparse, two-column, airy',
    category: 'minimal',
    layout: {
      header: {
        style: 'centered',
        showAvatar: false,
        showTitle: false
      },
      sections: {
        skills: {
          style: 'list',
          position: 'left'
        },
        experience: {
          style: 'simple',
          position: 'right'
        },
        education: {
          style: 'simple',
          position: 'left'
        }
      },
      colors: {
        primary: '#000000',
        secondary: '#666666',
        accent: '#000000',
        background: '#ffffff',
        text: '#000000'
      },
      typography: {
        headingFont: 'Helvetica, sans-serif',
        bodyFont: 'Helvetica, sans-serif',
        headingSize: 'small'
      }
    }
  }
};

// Utility function to create a new template
export function createTemplate(config: TemplateConfig): {
  html: (data: any) => string;
  css: () => string;
  preview: () => string;
} {
  const generator = new TemplateGenerator(config);
  
  return {
    html: (data: any) => generator.generateHTML(data),
    css: () => generator.generateCSS(),
    preview: () => generator.generatePreviewSVG()
  };
}

// Utility function to add a new template to the system
export function addTemplate(config: TemplateConfig): void {
  TEMPLATE_CONFIGS[config.key] = config;
}

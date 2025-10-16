import { TemplateConfig, addTemplate } from './template-generator';

// Simple template creator with presets
export class TemplateCreator {
  
  // Create a professional template
  static createProfessional(key: string, name: string, description: string, primaryColor: string = '#3b82f6'): TemplateConfig {
    return {
      key,
      name,
      description,
      category: 'professional',
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
            style: 'cards',
            position: 'left'
          }
        },
        colors: {
          primary: primaryColor,
          secondary: this.lightenColor(primaryColor, 20),
          accent: this.darkenColor(primaryColor, 10),
          background: '#ffffff',
          text: '#1a1a1a'
        },
        typography: {
          headingFont: 'Arial, sans-serif',
          bodyFont: 'Arial, sans-serif',
          headingSize: 'medium'
        }
      }
    };
  }

  // Create a modern template
  static createModern(key: string, name: string, description: string, primaryColor: string = '#10b981'): TemplateConfig {
    return {
      key,
      name,
      description,
      category: 'modern',
      layout: {
        header: {
          style: 'centered',
          showAvatar: false,
          showTitle: true
        },
        sections: {
          skills: {
            style: 'bars',
            position: 'left'
          },
          experience: {
            style: 'timeline',
            position: 'right'
          },
          education: {
            style: 'simple',
            position: 'left'
          }
        },
        colors: {
          primary: primaryColor,
          secondary: this.lightenColor(primaryColor, 30),
          accent: this.darkenColor(primaryColor, 15),
          background: '#ffffff',
          text: '#1a1a1a'
        },
        typography: {
          headingFont: 'Helvetica, sans-serif',
          bodyFont: 'Helvetica, sans-serif',
          headingSize: 'large'
        }
      }
    };
  }

  // Create a creative template
  static createCreative(key: string, name: string, description: string, primaryColor: string = '#8b5cf6'): TemplateConfig {
    return {
      key,
      name,
      description,
      category: 'creative',
      layout: {
        header: {
          style: 'split',
          showAvatar: true,
          showTitle: true
        },
        sections: {
          skills: {
            style: 'chips',
            position: 'full-width'
          },
          experience: {
            style: 'cards',
            position: 'full-width'
          },
          education: {
            style: 'cards',
            position: 'full-width'
          }
        },
        colors: {
          primary: primaryColor,
          secondary: this.lightenColor(primaryColor, 25),
          accent: this.darkenColor(primaryColor, 5),
          background: '#ffffff',
          text: '#1a1a1a'
        },
        typography: {
          headingFont: 'Georgia, serif',
          bodyFont: 'Georgia, serif',
          headingSize: 'large'
        }
      }
    };
  }

  // Create a minimal template
  static createMinimal(key: string, name: string, description: string, primaryColor: string = '#000000'): TemplateConfig {
    return {
      key,
      name,
      description,
      category: 'minimal',
      layout: {
        header: {
          style: 'left-aligned',
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
          primary: primaryColor,
          secondary: '#666666',
          accent: primaryColor,
          background: '#ffffff',
          text: primaryColor
        },
        typography: {
          headingFont: 'Helvetica, sans-serif',
          bodyFont: 'Helvetica, sans-serif',
          headingSize: 'small'
        }
      }
    };
  }

  // Create a custom template with full control
  static createCustom(config: {
    key: string;
    name: string;
    description: string;
    category?: 'professional' | 'modern' | 'creative' | 'minimal';
    layout?: Partial<TemplateConfig['layout']>;
    colors?: Partial<TemplateConfig['layout']['colors']>;
    typography?: Partial<TemplateConfig['layout']['typography']>;
  }): TemplateConfig {
    const defaultConfig: TemplateConfig = {
      key: config.key,
      name: config.name,
      description: config.description,
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
            style: 'simple',
            position: 'left'
          }
        },
        colors: {
          primary: '#3b82f6',
          secondary: '#6b7280',
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
    };

    return {
      ...defaultConfig,
      ...config,
      layout: {
        ...defaultConfig.layout,
        ...config.layout,
        header: {
          ...defaultConfig.layout.header,
          ...config.layout?.header
        },
        sections: {
          ...defaultConfig.layout.sections,
          ...config.layout?.sections,
          skills: {
            ...defaultConfig.layout.sections.skills,
            ...config.layout?.sections?.skills
          },
          experience: {
            ...defaultConfig.layout.sections.experience,
            ...config.layout?.sections?.experience
          },
          education: {
            ...defaultConfig.layout.sections.education,
            ...config.layout?.sections?.education
          }
        },
        colors: {
          ...defaultConfig.layout.colors,
          ...(config.colors || {})
        },
        typography: {
          ...defaultConfig.layout.typography,
          ...(config.typography || {})
        }
      }
    }
  };

  // Helper function to lighten a color
  private static lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }

  // Helper function to darken a color
  private static darkenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
      (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
      (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
  }
}

// Quick template creation functions
export const quickTemplates = {
  // Professional templates
  corporate: () => TemplateCreator.createProfessional('corporate', 'Corporate', 'Clean corporate style', '#1f2937'),
  executive: () => TemplateCreator.createProfessional('executive', 'Executive', 'Executive-level design', '#7c3aed'),
  
  // Modern templates
  tech: () => TemplateCreator.createModern('tech', 'Tech', 'Modern tech industry style', '#06b6d4'),
  startup: () => TemplateCreator.createModern('startup', 'Startup', 'Dynamic startup vibe', '#f59e0b'),
  
  // Creative templates
  designer: () => TemplateCreator.createCreative('designer', 'Designer', 'Creative designer portfolio', '#ec4899'),
  artist: () => TemplateCreator.createCreative('artist', 'Artist', 'Artistic and expressive', '#8b5cf6'),
  
  // Minimal templates
  clean: () => TemplateCreator.createMinimal('clean', 'Clean', 'Ultra-clean minimal design', '#374151'),
  simple: () => TemplateCreator.createMinimal('simple', 'Simple', 'Simple and elegant', '#6b7280')
};

// Function to add a template to the system
export function addNewTemplate(config: TemplateConfig): void {
  addTemplate(config);
  // Template added silently
}

// Function to create and add a template in one step
export function createAndAddTemplate(
  type: 'professional' | 'modern' | 'creative' | 'minimal' | 'custom',
  key: string,
  name: string,
  description: string,
  options?: {
    primaryColor?: string;
    customConfig?: Partial<TemplateConfig>;
  }
): TemplateConfig {
  let config: TemplateConfig;
  
  switch (type) {
    case 'professional':
      config = TemplateCreator.createProfessional(key, name, description, options?.primaryColor);
      break;
    case 'modern':
      config = TemplateCreator.createModern(key, name, description, options?.primaryColor);
      break;
    case 'creative':
      config = TemplateCreator.createCreative(key, name, description, options?.primaryColor);
      break;
    case 'minimal':
      config = TemplateCreator.createMinimal(key, name, description, options?.primaryColor);
      break;
    case 'custom':
      config = TemplateCreator.createCustom({
        key,
        name,
        description,
        ...options?.customConfig
      });
      break;
    default:
      throw new Error(`Unknown template type: ${type}`);
  }
  
  addNewTemplate(config);
  return config;
}

// Example usage and documentation
export const templateExamples = {
  // Add a new professional template
  addProfessional: () => {
    const config = createAndAddTemplate(
      'professional',
      'finance',
      'Finance Professional',
      'Clean design for finance professionals',
      { primaryColor: '#059669' }
    );
    return config;
  },
  
  // Add a new modern template
  addModern: () => {
    const config = createAndAddTemplate(
      'modern',
      'developer',
      'Developer',
      'Modern design for developers',
      { primaryColor: '#dc2626' }
    );
    return config;
  },
  
  // Add a custom template
  addCustom: () => {
    const config = createAndAddTemplate(
      'custom',
      'medical',
      'Medical Professional',
      'Clean design for medical professionals',
      {
        customConfig: {
          category: 'professional',
          layout: {
            header: {
              style: 'centered',
              showAvatar: true,
              showTitle: true
            },
            sections: {
              skills: {
                style: 'chips',
                position: 'full-width'
              },
              experience: {
                style: 'detailed',
                position: 'full-width'
              },
              education: {
                style: 'cards',
                position: 'full-width'
              }
            },
            colors: {
              primary: '#0891b2',
              secondary: '#0e7490',
              accent: '#06b6d4',
              background: '#ffffff',
              text: '#0f172a'
            },
            typography: {
              headingFont: 'Arial, sans-serif',
              bodyFont: 'Arial, sans-serif',
              headingSize: 'medium'
            }
          }
        }
      }
    );
    return config;
  }
};

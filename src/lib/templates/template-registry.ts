/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTemplate, TEMPLATE_CONFIGS } from './template-generator';
import { createAndAddTemplate, quickTemplates } from './template-creator';

export type ResumeTemplateKey = 'classic' | 'minimal' | 'modern' | 'professional' | 'creative' | 'minimal-dark' | 'executive' | 'colorful' | 'tech-modern';

export interface TemplateInfo {
  key: ResumeTemplateKey;
  name: string;
  description: string;
  category: 'professional' | 'creative' | 'minimal' | 'modern';
  preview: string; // Base64 or URL to preview image
}

// Template Registry Class
export class TemplateRegistry {
  private static instance: TemplateRegistry;
  private templates: Map<string, any> = new Map();
  private cssCache: Map<string, string> = new Map();
  private previewCache: Map<string, string> = new Map();

  private constructor() {
    this.initializeBuiltInTemplates();
  }

  public static getInstance(): TemplateRegistry {
    if (!TemplateRegistry.instance) {
      TemplateRegistry.instance = new TemplateRegistry();
    }
    return TemplateRegistry.instance;
  }

  // Initialize built-in templates
  private initializeBuiltInTemplates(): void {
    Object.values(TEMPLATE_CONFIGS).forEach(config => {
      this.registerTemplate(config);
    });
  }

  // Register a new template
  public registerTemplate(config: any): void {
    const template = createTemplate(config);
    this.templates.set(config.key, {
      ...config,
      generator: template
    });
    
    // Clear caches when new template is added
    this.cssCache.delete(config.key);
    this.previewCache.delete(config.key);
  }

  // Get template configuration
  public getTemplate(key: string): any {
    return this.templates.get(key);
  }

  // Get all templates
  public getAllTemplates(): any[] {
    return Array.from(this.templates.values()).map(template => ({
      key: template.key,
      name: template.name,
      description: template.description,
      category: template.category
    }));
  }

  // Generate HTML for a template
  public generateHTML(templateKey: string, data: any): string {
    const template = this.templates.get(templateKey);
    if (!template) {
      throw new Error(`Template "${templateKey}" not found`);
    }
    return template.generator.html(data);
  }

  // Get CSS for a template
  public getCSS(templateKey: string): string {
    // Check cache first
    if (this.cssCache.has(templateKey)) {
      return this.cssCache.get(templateKey)!;
    }

    const template = this.templates.get(templateKey);
    if (!template) {
      throw new Error(`Template "${templateKey}" not found`);
    }

    const css = template.generator.css();
    this.cssCache.set(templateKey, css);
    return css;
  }

  // Get preview SVG for a template
  public getPreview(templateKey: string): string {
    // Check cache first
    if (this.previewCache.has(templateKey)) {
      return this.previewCache.get(templateKey)!;
    }

    const template = this.templates.get(templateKey);
    if (!template) {
      throw new Error(`Template "${templateKey}" not found`);
    }

    const preview = template.generator.preview();
    this.previewCache.set(templateKey, preview);
    return preview;
  }

  // Add a new template using the creator
  public addTemplate(
    type: 'professional' | 'modern' | 'creative' | 'minimal' | 'custom',
    key: string,
    name: string,
    description: string,
    options?: {
      primaryColor?: string;
      customConfig?: any;
    }
  ): void {
    const config = createAndAddTemplate(type, key, name, description, options);
    this.registerTemplate(config);
  }

  // Add a quick template
  public addQuickTemplate(templateName: keyof typeof quickTemplates): void {
    const config = quickTemplates[templateName]();
    this.registerTemplate(config);
  }

  // Get templates by category
  public getTemplatesByCategory(category: string): any[] {
    return Array.from(this.templates.values())
      .filter(template => template.category === category)
      .map(template => ({
        key: template.key,
        name: template.name,
        description: template.description,
        category: template.category
      }));
  }

  // Check if template exists
  public hasTemplate(key: string): boolean {
    return this.templates.has(key);
  }

  // Remove a template
  public removeTemplate(key: string): void {
    this.templates.delete(key);
    this.cssCache.delete(key);
    this.previewCache.delete(key);
  }

  // Clear all caches
  public clearCaches(): void {
    this.cssCache.clear();
    this.previewCache.clear();
  }

  // Get template statistics
  public getStats(): {
    totalTemplates: number;
    templatesByCategory: Record<string, number>;
    cachedCSS: number;
    cachedPreviews: number;
  } {
    const templatesByCategory: Record<string, number> = {};
    
    Array.from(this.templates.values()).forEach(template => {
      templatesByCategory[template.category] = (templatesByCategory[template.category] || 0) + 1;
    });

    return {
      totalTemplates: this.templates.size,
      templatesByCategory,
      cachedCSS: this.cssCache.size,
      cachedPreviews: this.previewCache.size
    };
  }


  // Fallback templates for when registry is not available
  public getFallbackTemplates(): TemplateInfo[] {

    return [
      {
        key: 'executive',
        name: 'Executive',
        description: 'Leadership, sophisticated, premium',
        category: 'professional',
        preview: '/templates/executive.png'
      },
      {
        key: 'tech-modern',
        name: 'Tech Modern',
        description: 'Developer-focused, technical, sleek',
        category: 'modern',
        preview: '/templates/tech-modern.png'
      },
      {
        key: 'professional',
        name: 'Professional',
        description: 'Corporate, structured, formal',
        category: 'professional',
        preview: '/templates/professional.png'
      },
      {
        key: 'modern',
        name: 'Modern',
        description: 'Bold headings, chips, accent gradient',
        category: 'modern',
        preview: '/templates/modern.png'
      },
      {
        key: 'classic',
        name: 'Classic',
        description: 'Conventional, readable, clean',
        category: 'professional',
        preview: '/templates/classic.png'
      },
      {
        key: 'minimal',
        name: 'Minimal',
        description: 'Sparse, two-column, airy',
        category: 'minimal',
        preview: '/templates/minimal.png'
      },
      {
        key: 'creative',
        name: 'Creative',
        description: 'Colorful, artistic, unique',
        category: 'creative',
        preview: '/templates/creative.png'
      },
      {
        key: 'minimal-dark',
        name: 'Minimal Dark',
        description: 'Dark theme, clean, modern',
        category: 'minimal',
        preview: '/templates/minimal-dark.png'
      },
      
      
      /*{
        key: 'colorful',
        name: 'Colorful',
        description: 'Vibrant, energetic, fun',
        category: 'creative',
        preview: '/templates/colorful.png'
      },*/
    ];

  } 
}

// Export singleton instance
export const templateRegistry = TemplateRegistry.getInstance();

// Convenience functions
export const addTemplate = (
  type: 'professional' | 'modern' | 'creative' | 'minimal' | 'custom',
  key: string,
  name: string,
  description: string,
  options?: {
    primaryColor?: string;
    customConfig?: any;
  }
) => templateRegistry.addTemplate(type, key, name, description, options);

export const getTemplate = (key: string) => templateRegistry.getTemplate(key);
export const getAllTemplates = () => templateRegistry.getAllTemplates();
export const getTemplatesByCategory = (category: string) => templateRegistry.getTemplatesByCategory(category);
export const generateHTML = (templateKey: string, data: any) => templateRegistry.generateHTML(templateKey, data);
export const getTemplateCSS = (templateKey: string) => templateRegistry.getCSS(templateKey);
export const getTemplatePreview = (templateKey: string) => templateRegistry.getPreview(templateKey);
export const getFallbackTemplates = () => templateRegistry.getFallbackTemplates();

// Quick template addition functions
export const addQuickTemplate = (templateName: keyof typeof quickTemplates) => templateRegistry.addQuickTemplate(templateName);

// Example usage:
/*
// Add a new professional template
addTemplate('professional', 'finance', 'Finance Professional', 'Clean design for finance professionals', {
  primaryColor: '#059669'
});

// Add a quick template
addQuickTemplate('corporate');

// Get all templates
const templates = getAllTemplates();

// Generate HTML
const html = generateHTML('finance', resumeData);

// Get CSS
const css = getTemplateCSS('finance');

// Get preview
const preview = getTemplatePreview('finance');
*/

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
        key: 'professional',
        name: 'Professional',
        description: 'Corporate, structured, formal',
        category: 'professional',
        preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMWYyOTM3Ii8+CjxjaXJjbGUgY3g9IjgwIiBjeT0iNTAiIHI9IjMwIiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjEyMCIgeT0iNDAiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIj5Kb2huIERvZTwvdGV4dD4KPHRleHQgeD0iMTIwIiB5PSI2MCIgZmlsbD0iI2QxZDVkYiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5Tb2Z0d2FyZSBFbmdpbmVlcjwvdGV4dD4KPHRleHQgeD0iMTIwIiB5PSI4MCIgZmlsbD0iI2QxZDVkYiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5qb2huQGV4YW1wbGUuY29tPC90ZXh0Pgo8cmVjdCB4PSIyMCIgeT0iMTIwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZjhmYWZjIiBzdHJva2U9IiMzYjgyZjYiIHN0cm9rZS13aWR0aD0iNCIgcng9IjQiLz4KPHRleHQgeD0iMzAiIHk9IjE0MCIgZmlsbD0iIzFmMjkzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCI+U3VtbWFyeTwvdGV4dD4KPHRleHQgeD0iMzAiIHk9IjE2MCIgZmlsbD0iIzM3NDE1MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5FeHBlcmllbmNlZCBzb2Z0d2FyZSBlbmdpbmVlciB3aXRoIDUrIHllYXJzIG9mIGV4cGVyaWVuY2UuPC90ZXh0Pgo8cmVjdCB4PSIyMCIgeT0iMjAwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZTU1NzViIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSI0Ii8+Cjx0ZXh0IHg9IjMwIiB5PSIyMjAiIGZpbGw9IiMxZjI5MzciIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPlNraWxsczwvdGV4dD4KPHJlY3QgeD0iMzAiIHk9IjI0MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMiIgcng9IjQiLz4KPHRleHQgeD0iMzUiIHk9IjI1NSIgZmlsbD0iIzM3NDE1MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj5KYXZhU2NyaXB0PC90ZXh0Pgo8cmVjdCB4PSIxNjAiIHk9IjIwMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxNDAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2U1NTc1YiIgc3Ryb2tlLXdpZHRoPSIyIiByeD0iNCIvPgo8dGV4dCB4PSIxNzAiIHk9IjIyMCIgZmlsbD0iIzFmMjkzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+RXhwZXJpZW5jZTwvdGV4dD4KPHJlY3QgeD0iMTcwIiB5PSIyNDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2U1NTc1YiIgc3Ryb2tlLXdpZHRoPSIxIiByeD0iNCIvPgo8dGV4dCB4PSIxNzUiIHk9IjI1NSIgZmlsbD0iIzFmMjkzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iYm9sZCI+U2VuaW9yIERldmVsb3BlcjwvdGV4dD4KPHRleHQgeD0iMTc1IiB5PSIyNzAiIGZpbGw9IiM2YjcyODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCI+VGVjaCBDb3JwPC90ZXh0Pgo8L3N2Zz4K'
      },
      {
        key: 'creative',
        name: 'Creative',
        description: 'Colorful, artistic, unique',
        category: 'creative',
        preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNjY3ZWVhO3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM3NjRiYTI7c3RvcC1vcGFjaXR5OjEiIC8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZ3JhZCkiLz4KPGNpcmNsZSBjeD0iMTUwIiBjeT0iODAiIHI9IjQwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNCIvPgo8dGV4dCB4PSIxNTAiIHk9IjQwIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Sm9obiBEb2U8L3RleHQ+Cjx0ZXh0IHg9IjE1MCIgeT0iMTMwIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Tb2Z0d2FyZSBFbmdpbmVlcjwvdGV4dD4KPHJlY3QgeD0iMjAiIHk9IjE2MCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSIyMDAiIGZpbGw9IndoaXRlIiByeD0iMTIiLz4KPHRleHQgeD0iMzAiIHk9IjE4MCIgZmlsbD0iIzY2N2VlYSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCI+U3VtbWFyeTwvdGV4dD4KPHRleHQgeD0iMzAiIHk9IjIwMCIgZmlsbD0iIzM3NDE1MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5FeHBlcmllbmNlZCBzb2Z0d2FyZSBlbmdpbmVlciB3aXRoIGNyZWF0aXZlIHNvbHV0aW9ucy48L3RleHQ+Cjx0ZXh0IHg9IjMwIiB5PSIyNDAiIGZpbGw9IiM2NjdlZWEiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiPlNraWxsczwvdGV4dD4KPHJlY3QgeD0iMzAiIHk9IjI2MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjI0IiBmaWxsPSIjNjY3ZWVhIiByeD0iMTIiLz4KPHRleHQgeD0iMzUiIHk9IjI3NSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCI+SmF2YVNjcmlwdDwvdGV4dD4KPHJlY3QgeD0iMzAiIHk9IjMwMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNjY3ZWVhIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSI4Ii8+Cjx0ZXh0IHg9IjM1IiB5PSIzMjAiIGZpbGw9IiM2NjdlZWEiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9ImJvbGQiPlNlbmlvciBEZXZlbG9wZXI8L3RleHQ+Cjx0ZXh0IHg9IjM1IiB5PSIzMzUiIGZpbGw9IiM2YjcyODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCI+VGVjaCBDb3JwPC90ZXh0Pgo8L3N2Zz4K'
      },
      {
        key: 'minimal-dark',
        name: 'Minimal Dark',
        description: 'Dark theme, clean, modern',
        category: 'minimal',
        preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMTExODI3Ii8+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMWYyOTM3Ii8+CjxjaXJjbGUgY3g9IjgwIiBjeT0iNTAiIHI9IjMwIiBmaWxsPSIjZjlmYWZiIiBzdHJva2U9IiNmOWZhZmIiIHN0cm9rZS13aWR0aD0iNCIvPgo8dGV4dCB4PSIxMjAiIHk9IjQwIiBmaWxsPSIjZjlmYWZiIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIj5Kb2huIERvZTwvdGV4dD4KPHRleHQgeD0iMTIwIiB5PSI2MCIgZmlsbD0iI2QxZDVkYiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5Tb2Z0d2FyZSBFbmdpbmVlcjwvdGV4dD4KPHRleHQgeD0iMTIwIiB5PSI4MCIgZmlsbD0iI2QxZDVkYiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5qb2huQGV4YW1wbGUuY29tPC90ZXh0Pgo8cmVjdCB4PSIyMCIgeT0iMTIwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMWYyOTM3IiBzdHJva2U9IiMxMGI5ODEiIHN0cm9rZS13aWR0aD0iNCIgcng9IjQiLz4KPHRleHQgeD0iMzAiIHk9IjE0MCIgZmlsbD0iIzEwYjk4MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCI+U3VtbWFyeTwvdGV4dD4KPHRleHQgeD0iMzAiIHk9IjE2MCIgZmlsbD0iI2QxZDVkYiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5FeHBlcmllbmNlZCBzb2Z0d2FyZSBlbmdpbmVlciB3aXRoIGRhcmsgdGhlbWUuPC90ZXh0Pgo8cmVjdCB4PSIyMCIgeT0iMjAwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iIzFmMjkzNyIgc3Ryb2tlPSIjMTBiOTgxIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSI0Ii8+Cjx0ZXh0IHg9IjMwIiB5PSIyMjAiIGZpbGw9IiMxMGI5ODEiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPlNraWxsczwvdGV4dD4KPHJlY3QgeD0iMzAiIHk9IjI0MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMWYyOTM3IiBzdHJva2U9IiMxMGI5ODEiIHN0cm9rZS13aWR0aD0iMiIgcng9IjQiLz4KPHRleHQgeD0iMzUiIHk9IjI1NSIgZmlsbD0iI2Y5ZmFmYiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj5KYXZhU2NyaXB0PC90ZXh0Pgo8cmVjdCB4PSIxNjAiIHk9IjIwMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxNDAiIGZpbGw9IiMxZjI5MzciIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIyIiByeD0iNCIvPgo8dGV4dCB4PSIxNzAiIHk9IjIyMCIgZmlsbD0iIzEwYjk4MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+RXhwZXJpZW5jZTwvdGV4dD4KPHJlY3QgeD0iMTcwIiB5PSIyNDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiMxZjI5MzciIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIxIiByeD0iNCIvPgo8dGV4dCB4PSIxNzUiIHk9IjI1NSIgZmlsbD0iIzEwYjk4MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iYm9sZCI+U2VuaW9yIERldmVsb3BlcjwvdGV4dD4KPHRleHQgeD0iMTc1IiB5PSIyNzAiIGZpbGw9IiM5Y2EzYWYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCI+VGVjaCBDb3JwPC90ZXh0Pgo8L3N2Zz4K'
      },
      {
        key: 'executive',
        name: 'Executive',
        description: 'Leadership, sophisticated, premium',
        category: 'professional',
        preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDE1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImV4ZWNHcmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzM3NDE1MTtzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMWYyOTM3O3N0b3Atb3BhY2l0eToxIiAvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iNjAiIGZpbGw9InVybCgjZXhlY0dyYWQpIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iMzAiIHI9IjE1IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIvPgo8dGV4dCB4PSI2NSIgeT0iMjAiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSJib2xkIj5Kb2huIERvZTwvdGV4dD4KPHRleHQgeD0iNjUiIHk9IjMzIiBmaWxsPSIjZDFkNWRiIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iOCI+RXhlY3V0aXZlPC90ZXh0Pgo8dGV4dCB4PSI2NSIgeT0iNDUiIGZpbGw9IiNkMWQ1ZGIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI2Ij5qb2huQGV4YW1wbGUuY29tPC90ZXh0Pgo8cmVjdCB4PSI4IiB5PSI3MCIgd2lkdGg9IjEzNCIgaGVpZ2h0PSIzMCIgZmlsbD0iI2Y4ZmFmYyIgc3Ryb2tlPSIjM2I4MmY2IiBzdHJva2Utd2lkdGg9IjMiIHJ4PSI0Ii8+Cjx0ZXh0IHg9IjEyIiB5PSI4NSIgZmlsbD0iIzFmMjkzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0iYm9sZCI+U3VtbWFyeTwvdGV4dD4KPHRleHQgeD0iMTIiIHk9Ijk1IiBmaWxsPSIjMzc0MTUxIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNiI+RXhlY3V0aXZlIGxlYWRlciB3aXRoIGV4cGVyaWVuY2U8L3RleHQ+CjxyZWN0IHg9IjgiIHk9IjExMCIgd2lkdGg9IjY1IiBoZWlnaHQ9IjgwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMSIgcng9IjMiLz4KPHRleHQgeD0iMTIiIHk9IjEyNSIgZmlsbD0iIzFmMjkzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjgiIGZvbnQtd2VpZ2h0PSJib2xkIj5Db21wZXRlbmNpZXM8L3RleHQ+CjxyZWN0IHg9IjEyIiB5PSIxMzUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI0IiBmaWxsPSIjZTU1NzViIiByeD0iMiIvPgo8cmVjdCB4PSIxMiIgeT0iMTQxIiB3aWR0aD0iNDAiIGhlaWdodD0iNCIkZmlsbD0iIzNiODJmNiIgcng9IjIiLz4KPHRleHQgeD0iMTQiIHk9IjE1NSIgZmlsbD0iIzM3NDE1MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjYiPlN0cmF0ZWd5PC90ZXh0Pgo8cmVjdCB4PSIxMiIgeT0iMTY1IiB3aWR0aD0iNTAiIGhlaWdodD0iNCIgZmlsbD0iI2U1NTc1YiIgcng9IjIiLz4KPHRleHQgeD0iMTQiIHk9IjE4NSIgZmlsbD0iIzM3NDE1MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjYiPkxlYWRlcnNoaXA8L3RleHQ+CjxyZWN0IHg9Ijc3IiB5PSIxMTAiIHdpZHRoPSI2NSIgaGVpZ2h0PSI4MCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZTVlN2ViIiBzdHJva2Utd2lkdGg9IjEiIHJ4PSIzIi8+Cjx0ZXh0IHg9IjgxIiB5PSIxMjUiIGZpbGw9IiMxZjI5MzciIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI4IiBmb250LXdlaWdodD0iYm9sZCI+RXhwZXJpZW5jZTwvdGV4dD4KPHJlY3QgeD0iODEiIHk9IjEzNSIgd2lkdGg9IjU1IiBoZWlnaHQ9IjIwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMSIgcng9IjMiLz4KPHRleHQgeD0iODMiIHk9IjE0NSIgZmlsbD0iIzFmMjkzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjciIGZvbnQtd2VpZ2h0PSJib2xkIj5DVE8gJiBGb3VuZGVyPC90ZXh0Pgo8dGV4dCB4PSI4MyIgeT0iMTU1IiBmaWxsPSIjNmI3MjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNiI+VGVjaCBDb3JwPC90ZXh0Pgo8dGV4dCB4PSI4MyIgeT0iMTY1IiBmaWxsPSIjOWNhM2FmIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNSI+MjAyMC1QcmVzZW50PC90ZXh0Pgo8L3N2Zz4K'
      },
      {
        key: 'colorful',
        name: 'Colorful',
        description: 'Vibrant, energetic, fun',
        category: 'creative',
        preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImNvbG9yR3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmZjZiNmI7c3RvcC1vcGFjaXR5OjEiIC8+CjxzdG9wIG9mZnNldD0iNTAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNGVjZGM0O3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM0NWI3ZDE7c3RvcC1vcGFjaXR5OjEiIC8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjY29sb3JHcmFkKSIvPgo8Y2lyY2xlIGN4PSIxNTAiIGN5PSI4MCIgcj0iNDAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iNDAiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjgiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Kb2huIERvZTwvdGV4dD4KPHRleHQgeD0iMTUwIiB5PSIxMzAiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZ1bGwtU3RhY2sgRGV2ZWxvcGVyPC90ZXh0Pgo8cmVjdCB4PSIyMCIgeT0iMTYwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjIwMCIgZmlsbD0id2hpdGUiIHJ4PSIxNSIvPgo8dGV4dCB4PSIzMCIgeT0iMTgwIiBmaWxsPSIjZmY2YjZiIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSJib2xkIj5TdW1tYXJ5PC90ZXh0Pgo8dGV4dCB4PSIzMCIgeT0iMjAwIiBmaWxsPSIjMzc0MTUxIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiPkNyZWF0aXZlIGFuZCBlbmVyZ2V0aWMgZGV2ZWxvcGVyIHdpdGggYSBwYXNzaW9uIGZvciBpbm5vdmF0aW9uLjwvdGV4dD4KPHRleHQgeD0iMzAiIHk9IjI0MCIgZmlsbD0iI2ZmNmI2YiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCI+U2tpbGxzPC90ZXh0Pgo8cmVjdCB4PSIzMCIgeT0iMjYwIiB3aWR0aD0iODAiIGhlaWdodD0iMjQiIGZpbGw9IiNmZjZiNmIiIHJ4PSIxMiIvPgo8dGV4dCB4PSIzNSIgeT0iMjc1IiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj5KYXZhU2NyaXB0PC90ZXh0Pgo8cmVjdCB4PSIxMjAiIHk9IjI2MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjI0IiBmaWxsPSIjNGVjZGM0IiByeD0iMTIiLz4KPHRleHQgeD0iMTI1IiB5PSIyNzUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiPlJlYWN0PC90ZXh0Pgo8cmVjdCB4PSIyMTAiIHk9IjI2MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjI0IiBmaWxsPSIjNDViN2QxIiByeD0iMTIiLz4KPHRleHQgeD0iMjE1IiB5PSIyNzUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiPk5vZGUuanM8L3RleHQ+Cjx0ZXh0IHg9IjMwIiB5PSIzMjAiIGZpbGw9IiNmZjZiNmIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiPkV4cGVyaWVuY2U8L3RleHQ+CjxyZWN0IHg9IjMwIiB5PSIzNDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmNmI2YiIgc3Ryb2tlLXdpZHRoPSIyIiByeD0iOCIvPgo8dGV4dCB4PSIzNSIgeT0iMzU1IiBmaWxsPSIjZmY2YjZiIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSJib2xkIj5TZW5pb3IgRGV2ZWxvcGVyPC90ZXh0Pgo8dGV4dCB4PSIzNSIgeT0iMzcwIiBmaWxsPSIjNmI3MjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiPlRlY2ggQ29ycDwvdGV4dD4KPC9zdmc+'
      },
      {
        key: 'tech-modern',
        name: 'Tech Modern',
        description: 'Developer-focused, technical, sleek',
        category: 'modern',
        preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InRlY2hHcmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzEwYjk4MTtzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojM2I4MmY2O3N0b3Atb3BhY2l0eToxIiAvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMTExODI3Ii8+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ1cmwoI3RlY2hHcmFkKSIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI1MCIgcj0iMzAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI0Ii8+Cjx0ZXh0IHg9IjE0MCIgeT0iNDAiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIj5Kb2huIERvZTwvdGV4dD4KPHRleHQgeD0iMTQwIiB5PSI2MCIgZmlsbD0iI2ZmZmZmZiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5Tb2Z0d2FyZSBFbmdpbmVlcjwvdGV4dD4KPHRleHQgeD0iMTQwIiB5PSI4MCIgZmlsbD0iI2ZmZmZmZiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5qb2huQGV4YW1wbGUuY29tPC90ZXh0Pgo8cmVjdCB4PSIyMCIgeT0iMTIwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMWYyOTM3IiBzdHJva2U9IiMxMGI5ODEiIHN0cm9rZS13aWR0aD0iNSIgcng9IjYiLz4KPHRleHQgeD0iMzAiIHk9IjE0MCIgZmlsbD0iIzEwYjk4MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCI+U3VtbWFyeTwvdGV4dD4KPHRleHQgeD0iMzAiIHk9IjE2MCIgZmlsbD0iI2QxZDVkYiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5UZWNobmljYWwgZGV2ZWxvcGVyIHdpdGggZXhwZXJ0aXNlIGluIG1vZGVybiB0ZWNobm9sb2dpZXMuPC90ZXh0Pgo8cmVjdCB4PSIyMCIgeT0iMjAwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iIzFmMjkzNyIgc3Ryb2tlPSIjMTBiOTgxIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSI2Ii8+Cjx0ZXh0IHg9IjMwIiB5PSIyMjAiIGZpbGw9IiMxMGI5ODEiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPlNraWxsczwvdGV4dD4KPHJlY3QgeD0iMzAiIHk9IjI0MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMWYyOTM3IiBzdHJva2U9IiMxMGI5ODEiIHN0cm9rZS13aWR0aD0iMiIgcng9IjYiLz4KPHRleHQgeD0iMzUiIHk9IjI1NSIgZmlsbD0iIzEwYjk4MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj5KYXZhU2NyaXB0PC90ZXh0Pgo8cmVjdCB4PSIxNjAiIHk9IjIwMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxNDAiIGZpbGw9IiMxZjI5MzciIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIyIiByeD0iNiIvPgo8dGV4dCB4PSIxNzAiIHk9IjIyMCIgZmlsbD0iIzEwYjk4MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+RXhwZXJpZW5jZTwvdGV4dD4KPHJlY3QgeD0iMTcwIiB5PSIyNDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiMxZjI5MzciIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIxIiByeD0iNiIvPgo8dGV4dCB4PSIxNzUiIHk9IjI1NSIgZmlsbD0iIzEwYjk4MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iYm9sZCI+U2VuaW9yIERldmVsb3BlcjwvdGV4dD4KPHRleHQgeD0iMTc1IiB5PSIyNzAiIGZpbGw9IiM5Y2EzYWYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCI+VGVjaCBDb3JwPC90ZXh0Pgo8L3N2Zz4K'
      }
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

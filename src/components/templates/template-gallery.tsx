import React, { useState, useEffect } from 'react';
import { getAllTemplates, getTemplatePreview, ResumeTemplateKey, TemplateInfo, getFallbackTemplates } from '@/lib/templates/template-registry';




// Get templates from the new registry or use fallback
const getTemplatesFromRegistry = (): TemplateInfo[] => {
  try {
    const registryTemplates = getAllTemplates();
    return getFallbackTemplates();
    if (registryTemplates.length === 0) {
      return getFallbackTemplates();
    }
    
    return registryTemplates.map(template => ({
      key: template.key as ResumeTemplateKey,
      name: template.name,
      description: template.description,
      category: template.category,
      preview: getTemplatePreview(template.key)
    }));
  } catch (error) {
    console.log('Registry not available, using fallback templates', error);
    return getFallbackTemplates();
  }
};

// Get templates from registry or fallback (dynamic loading)
const getTemplates = (): TemplateInfo[] => getTemplatesFromRegistry();

interface TemplateGalleryProps {
  selectedTemplate: ResumeTemplateKey;
  onTemplateSelect: (template: ResumeTemplateKey) => void;
  className?: string;
  compact?: boolean;
}

export function TemplateGallery({ 
  selectedTemplate, 
  onTemplateSelect, 
  className = '',
  compact = false
}: TemplateGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [templates, setTemplates] = useState<TemplateInfo[]>([]);
  
  // Load templates dynamically with useEffect
  useEffect(() => {
    const loadTemplates = () => {
      const loadedTemplates = getTemplates();
      
      // If we only have 3 templates (built-in only), try to reinitialize
      if (loadedTemplates.length === 3) {
        // Try to reinitialize templates
        try {
          // Import and call initializeTemplates
          import('@/lib/templates').then(({ initializeTemplates }) => {
            initializeTemplates();
            // Try loading again after a short delay
            setTimeout(() => {
              const retryTemplates = getTemplates();
              setTemplates(retryTemplates);
            }, 200);
          });
        } catch (error) {
          console.error('Failed to reinitialize templates:', error);
        }
      }
      
      setTemplates(loadedTemplates);
    };
    
    // Load immediately
    loadTemplates();
    
    // Also try loading after a short delay to ensure registry is ready
    const timeout = setTimeout(loadTemplates, 100);
    
    return () => clearTimeout(timeout);
  }, []);

  const categories = [
    { key: 'all', label: 'All Templates', count: templates.length },
    { key: 'professional', label: 'Professional', count: templates.filter(t => t.category === 'professional').length },
    { key: 'modern', label: 'Modern', count: templates.filter(t => t.category === 'modern').length },
    { key: 'creative', label: 'Creative', count: templates.filter(t => t.category === 'creative').length },
    { key: 'minimal', label: 'Minimal', count: templates.filter(t => t.category === 'minimal').length },
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  if (compact) {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Category Filter - Compact */}
        <div className="flex flex-wrap gap-1">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                selectedCategory === category.key
                  ? 'bg-blue-600 text-gray-1100'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Template Grid - Two Column with Wider Thumbnails */}
        <div className="grid grid-cols-2 gap-3">
          {filteredTemplates.map((template) => (
            <div
              key={template.key}
              onClick={() => onTemplateSelect(template.key)}
              className={`group cursor-pointer rounded-lg border transition-all duration-200 hover:shadow-lg relative overflow-hidden ${
                selectedTemplate === template.key
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {/* Template Preview - Wider for Better Visibility */}
              <div className="w-full h-[240px] relative overflow-hidden bg-gray-50 border border-gray-200">
                <img
                  src={template.preview}
                  alt={`${template.name} template preview`}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                />
                
                {/* Selection Indicator */}
                {selectedTemplate === template.key && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Hover Overlay with Name and Description */}
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-200 flex items-end">
                  <div className="w-full p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                    <h3 className="font-semibold text-white text-sm mb-1">{template.name}</h3>
                    <p className="text-xs text-gray-200 line-clamp-2">{template.description}</p>
                    <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                      template.category === 'professional' ? 'bg-blue-500 text-white' :
                      template.category === 'modern' ? 'bg-green-500 text-white' :
                      template.category === 'creative' ? 'bg-purple-500 text-white' :
                      'bg-gray-500 text-white'
                    }`}>
                      {template.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label} ({category.count})
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.key}
            onClick={() => onTemplateSelect(template.key)}
            className={`group cursor-pointer rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
              selectedTemplate === template.key
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            {/* Template Preview */}
            <div className="aspect-[3/4] rounded-t-xl overflow-hidden bg-gray-50">
              <img
                src={template.preview}
                alt={`${template.name} template preview`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Template Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{template.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  template.category === 'professional' ? 'bg-blue-100 text-blue-800' :
                  template.category === 'modern' ? 'bg-green-100 text-green-800' :
                  template.category === 'creative' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {template.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              
              {/* Selection Indicator */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  selectedTemplate === template.key ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {selectedTemplate === template.key ? 'Selected' : 'Select'}
                </span>
                {selectedTemplate === template.key && (
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

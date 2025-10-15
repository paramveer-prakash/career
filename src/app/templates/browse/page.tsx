'use client'
import { useState, useMemo } from 'react'
import { getAllTemplates, getFallbackTemplates, ResumeTemplateKey } from '@/lib/templates/template-registry'
import { ResumePreview } from '@/components/templates/preview'
import { getSeedForProfession } from '@/lib/templates/seed-resume'

interface TemplateInfo {
  key: ResumeTemplateKey;
  name: string;
  description: string;
  category: 'professional' | 'creative' | 'minimal' | 'modern';
}

const professionFilters = [
  { key: 'all', label: 'All Professions', icon: '📋' },
  { key: 'technology', label: 'Technology', icon: '💻' },
  { key: 'finance', label: 'Finance', icon: '💰' },
  { key: 'healthcare', label: 'Healthcare', icon: '⚕️' },
  { key: 'marketing', label: 'Marketing', icon: '📊' },
];

export default function TemplateBrowserPage() {
  const [selectedProfession, setSelectedProfession] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [previewingTemplate, setPreviewingTemplate] = useState<ResumeTemplateKey | null>(null)
  
  const templates = useMemo(() => {
    try {
      return getFallbackTemplates() as TemplateInfo[]
    } catch {
      return []
    }
  }, [])

  const categories = [
    { key: 'all', label: 'All Styles' },
    { key: 'professional', label: 'Professional' },
    { key: 'modern', label: 'Modern' },
    { key: 'creative', label: 'Creative' },
    { key: 'minimal', label: 'Minimal' },
  ]

  const filteredTemplates = useMemo(() => {
    return templates.filter(t => 
      selectedCategory === 'all' || t.category === selectedCategory
    )
  }, [templates, selectedCategory])

  const previewData = useMemo(() => {
    return getSeedForProfession(selectedProfession === 'all' ? 'technology' : selectedProfession)
  }, [selectedProfession])

  return (
    <div className="min-h-screen from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Resume Template Gallery</h1>
          <p className="text-gray-600 mt-2">Browse professional templates tailored for your industry</p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        {/* Profession Filter */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Filter by Profession</h2>
          <div className="flex flex-wrap gap-2">
            {professionFilters.map((prof) => (
              <button
                key={prof.key}
                onClick={() => setSelectedProfession(prof.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedProfession === prof.key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="mr-2">{prof.icon}</span>
                {prof.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Filter by Style</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.key}
              onClick={() => setPreviewingTemplate(template.key)}
              className="group cursor-pointer bg-white rounded-xl border-2 border-gray-200 transition-all duration-200 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1"
            >
              {/* Preview Thumbnail */}
              <div className="aspect-[1/1.414] rounded-t-xl overflow-hidden bg-gray-50 relative p-1">
                <img
                  src={`/templates/${template.key}.png`}
                  alt={`${template.name} template preview`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="absolute inset-0 from-gray-100 to-gray-200 hidden items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📄</div>
                    <div className="text-sm font-medium text-gray-600">{template.name}</div>
                  </div>
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-white rounded-full px-4 py-2 text-sm font-medium text-blue-600 shadow-lg">
                      Click to Preview
                    </div>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
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
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">🔍</div>
            <p className="text-gray-600">No templates found for this combination</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewingTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
          <div 
            className="relative z-10 w-full max-w-6xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-h-[90vh] flex flex-col"
            style={{ backgroundColor: '#ffffff' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200" style={{ backgroundColor: '#f9fafb' }}>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {templates.find(t => t.key === previewingTemplate)?.name} Template
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Preview with {professionFilters.find(p => p.key === selectedProfession)?.label || 'Demo'} data
                </p>
              </div>
              <button 
                onClick={() => setPreviewingTemplate(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6" style={{ backgroundColor: '#f9fafb' }}>
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                  <ResumePreview data={previewData} template={previewingTemplate} />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200" style={{ backgroundColor: '#f9fafb' }}>
              <div className="text-sm text-gray-500">
                💡 This is demo data - your actual resume will use your information
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setPreviewingTemplate(null)}
                  className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
                <a
                  href={`/templates/snap/${previewingTemplate}`}
                  className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors"
                >
                  View Full Preview
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


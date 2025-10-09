'use client';

import { useState } from 'react';

export default function ResumeDemo() {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [resumeId, setResumeId] = useState('26');
  const [format, setFormat] = useState('html');

  const templates = [
    { key: 'modern', name: 'Modern', description: 'Bold headings, chips, accent gradient' },
    { key: 'classic', name: 'Classic', description: 'Conventional, readable, clean' },
    { key: 'minimal', name: 'Minimal', description: 'Sparse, two-column, airy' }
  ];

  const handleRender = () => {
    const url = `/api/templates/${selectedTemplate}/render/${resumeId}/${format}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-full bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Resume Rendering Demo</h1>
          
          <div className="space-y-6">
            {/* Template Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Template
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.key}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedTemplate === template.key
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTemplate(template.key)}
                  >
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resume ID
              </label>
              <input
                type="text"
                value={resumeId}
                onChange={(e) => setResumeId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter resume ID"
              />
            </div>

            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Output Format
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="html"
                    checked={format === 'html'}
                    onChange={(e) => setFormat(e.target.value)}
                    className="mr-2"
                  />
                  HTML
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="pdf"
                    checked={format === 'pdf'}
                    onChange={(e) => setFormat(e.target.value)}
                    className="mr-2"
                  />
                  PDF
                </label>
              </div>
            </div>

            {/* Render Button */}
            <div>
              <button
                onClick={handleRender}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Render Resume
              </button>
            </div>

            {/* API Endpoints Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">API Endpoints</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    GET /api/templates
                  </code>
                  <span className="ml-2 text-gray-600">- List available templates</span>
                </div>
                <div>
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    GET /api/templates/{'{templateKey}'}/render/{'{resumeId}'}/html
                  </code>
                  <span className="ml-2 text-gray-600">- Render as HTML</span>
                </div>
                <div>
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    GET /api/templates/{'{templateKey}'}/render/{'{resumeId}'}/pdf
                  </code>
                  <span className="ml-2 text-gray-600">- Render as PDF</span>
                </div>
              </div>
            </div>

            {/* Current Selection */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Current Selection</h3>
              <p className="text-blue-800">
                Template: <strong>{templates.find(t => t.key === selectedTemplate)?.name}</strong> | 
                Resume ID: <strong>{resumeId}</strong> | 
                Format: <strong>{format.toUpperCase()}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

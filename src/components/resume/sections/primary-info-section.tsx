'use client';

import { Resume } from '@/services/resume-service';

interface PrimaryInfoSectionProps {
  resume: Resume;
  onUpdate: (updates: Partial<Resume>) => void;
}

export function PrimaryInfoSection({ resume, onUpdate }: PrimaryInfoSectionProps) {
  const handleFieldChange = (field: keyof Resume, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">👤</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Primary Information</h2>
          <p className="text-sm text-gray-500">Your basic contact details</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={resume.primaryName || ''}
            onChange={(e) => handleFieldChange('primaryName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={resume.primaryEmail || ''}
            onChange={(e) => handleFieldChange('primaryEmail', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={resume.primaryPhone || ''}
            onChange={(e) => handleFieldChange('primaryPhone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={resume.primaryLocation || ''}
            onChange={(e) => handleFieldChange('primaryLocation', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="City, State, Country"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Summary
          </label>
          <textarea
            value={resume.summary || ''}
            onChange={(e) => handleFieldChange('summary', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Write a brief summary of your professional background and key achievements..."
          />
        </div>
      </div>
    </div>
  );
}

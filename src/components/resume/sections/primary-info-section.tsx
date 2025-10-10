'use client';

import { useState } from 'react';
import { Resume } from '@/services/resume-service';
import { useAI } from '@/hooks/use-ai';
import { AIButton } from '@/components/ui/ai-button';
import { AISuggestionsPanel } from '@/components/ui/ai-suggestions-panel';

interface PrimaryInfoSectionProps {
  resume: Resume;
  onUpdate: (updates: Partial<Resume>) => void;
}

export function PrimaryInfoSection({ resume, onUpdate }: PrimaryInfoSectionProps) {
  const { loading, error, generateSummary, resetAIState } = useAI();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{
    id: string;
    content: string;
    type: 'enhancement' | 'alternative' | 'recommendation';
    confidence: number;
  }>>([]);

  const handleFieldChange = (field: keyof Resume, value: string) => {
    onUpdate({ [field]: value });
  };

  const handleGenerateSummary = async () => {
    try {
      const response = await generateSummary({
        resumeId: resume.id,
        workExperiences: resume.workExperiences || [],
        skills: resume.skills || [],
        education: resume.educations || []
      });

      if (response.success) {
        const aiSuggestions: Array<{
          id: string;
          content: string;
          type: 'enhancement' | 'alternative' | 'recommendation';
          confidence: number;
        }> = [
          {
            id: '1',
            content: response.summary,
            type: 'enhancement',
            confidence: 0.9
          }
        ];

        if (response.alternativeSummaries) {
          response.alternativeSummaries.forEach((alt, index) => {
            aiSuggestions.push({
              id: `alt-${index + 1}`,
              content: alt,
              type: 'alternative',
              confidence: 0.8
            });
          });
        }

        setSuggestions(aiSuggestions);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error('Failed to generate summary:', error);
    }
  };

  const handleApplySuggestion = (suggestion: { id: string; content: string; type: 'enhancement' | 'alternative' | 'recommendation'; confidence: number }) => {
    onUpdate({ summary: suggestion.content });
    setShowSuggestions(false);
    resetAIState();
  };

  const handleDismissSuggestion = (suggestionId: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
    if (suggestions.length === 1) {
      setShowSuggestions(false);
    }
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
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Professional Summary
            </label>
            <AIButton
              onClick={handleGenerateSummary}
              loading={loading}
              variant="outline"
              size="sm"
            >
              Generate with AI
            </AIButton>
          </div>
          <textarea
            value={resume.summary || ''}
            onChange={(e) => handleFieldChange('summary', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Write a brief summary of your professional background and key achievements..."
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>
      </div>

      {/* AI Suggestions Panel */}
      <AISuggestionsPanel
        suggestions={suggestions}
        onApply={handleApplySuggestion}
        onDismiss={handleDismissSuggestion}
        title="AI-Generated Summary Options"
        isOpen={showSuggestions}
        onClose={() => setShowSuggestions(false)}
      />
    </div>
  );
}

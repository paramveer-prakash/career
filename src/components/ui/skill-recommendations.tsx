'use client';

import { useState } from 'react';

interface SkillRecommendation {
  skill: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

interface SkillRecommendationsProps {
  recommendations: SkillRecommendation[];
  missingKeywords: string[];
  onAddSkill: (skill: string) => void;
  isOpen: boolean;
  onClose: () => void;
  asModal?: boolean; // New prop to control whether to render as modal or content
}

export function SkillRecommendations({ 
  recommendations, 
  missingKeywords, 
  onAddSkill, 
  isOpen, 
  onClose,
  asModal = true
}: SkillRecommendationsProps) {
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  if (!isOpen) return null;

  const filteredRecommendations = selectedPriority === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.priority === selectedPriority);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔥';
      case 'medium': return '⚡';
      case 'low': return '💡';
      default: return '📌';
    }
  };

  const content = (
    <>
      {/* Priority Filter */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Filter by priority:</span>
          {['all', 'high', 'medium', 'low'].map((priority) => (
            <button
              key={priority}
              onClick={() => setSelectedPriority(priority as 'all' | 'high' | 'medium' | 'low')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                selectedPriority === priority
                  ? 'bg-purple-100 text-purple-700 border border-purple-200'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              {priority === 'all' ? 'All' : priority.charAt(0).toUpperCase() + priority.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto max-h-[50vh]">
          {/* Missing Keywords */}
          {missingKeywords.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Missing Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-orange-100 text-orange-800 border border-orange-200 rounded-lg text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Skill Recommendations */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended Skills</h3>
            {filteredRecommendations.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🎉</div>
                <p className="text-gray-500">No recommendations for the selected priority level.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRecommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-lg mr-2">{getPriorityIcon(recommendation.priority)}</span>
                          <h4 className="font-semibold text-gray-900">{recommendation.skill}</h4>
                          <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(recommendation.priority)}`}>
                            {recommendation.priority} priority
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{recommendation.reason}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end mt-4">
                      <button
                        onClick={() => onAddSkill(recommendation.skill)}
                        className="px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200"
                      >
                        Add to Skills
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
        <p className="text-sm text-gray-500">
          Recommendations are based on job description analysis and industry trends.
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          Close
        </button>
      </div>
    </>
  );

  if (asModal) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div 
          className="rounded-3xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden border border-slate-200"
          style={{ backgroundColor: 'white' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-t-3xl">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Skill Gap Analysis</h2>
                <p className="text-sm opacity-90">AI-powered recommendations based on job requirements</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-white/20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {content}
        </div>
      </div>
    );
  }

  return content;
}

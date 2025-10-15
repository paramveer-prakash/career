'use client';

import React, { useState } from 'react';
import { AIService, CareerGuidanceRequest } from '@/services/ai-service';
import { Resume } from '@/services/resume-service';

interface CareerGuidanceProps {
  resumeId: string;
  resume: Resume;
  isOpen: boolean;
  onClose: () => void;
  isSidebarMode?: boolean;
}

export function CareerGuidance({ resumeId, isOpen, onClose, isSidebarMode = false }: CareerGuidanceProps) {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Array<{
    action: string;
    priority: 'high' | 'medium' | 'low';
    timeline: string;
    resources?: string[];
  }>>([]);
  const [skillGaps, setSkillGaps] = useState<string[]>([]);
  const [nextSteps, setNextSteps] = useState<string[]>([]);
  const [currentGoals, setCurrentGoals] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [timeHorizon, setTimeHorizon] = useState<'short-term' | 'medium-term' | 'long-term'>('medium-term');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const handleGetGuidance = async () => {
    setLoading(true);
    try {
      const request: CareerGuidanceRequest = {
        resumeId,
        currentGoals: currentGoals || undefined,
        targetRole: targetRole || undefined,
        timeHorizon
      };

      const response = await AIService.getCareerGuidance(request);
      
      if (response.success) {
        setRecommendations(response.recommendations || []);
        setSkillGaps(response.skillGaps || []);
        setNextSteps(response.nextSteps || []);
      }
    } catch (error) {
      console.error('Failed to get career guidance:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const filteredRecommendations = recommendations.filter(rec => 
    selectedPriority === 'all' || rec.priority === selectedPriority
  );

  if (!isOpen) return null;

  // Sidebar mode - render content only
  if (isSidebarMode) {
    return (
      <div className="h-full flex flex-col">
        {/* Career Goals Input */}
        {recommendations.length === 0 && (
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Career Goals & Preferences</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Career Goals
                </label>
                <textarea
                  value={currentGoals}
                  onChange={(e) => setCurrentGoals(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm"
                  placeholder="Describe your career goals..."
                />
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Role
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    placeholder="e.g., Senior Software Architect"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Horizon
                  </label>
                  <select
                    value={timeHorizon}
                    onChange={(e) => setTimeHorizon(e.target.value as 'short-term' | 'medium-term' | 'long-term')}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  >
                    <option value="short-term">Short-term (3-6 months)</option>
                    <option value="medium-term">Medium-term (6-18 months)</option>
                    <option value="long-term">Long-term (1-3 years)</option>
                  </select>
                </div>
              </div>
              
              <button
                onClick={handleGetGuidance}
                disabled={loading}
                className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
              >
                {loading ? 'Analyzing Career Path...' : 'Get Career Guidance'}
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {recommendations.length > 0 && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Recommendations */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Recommendations ({filteredRecommendations.length})
                </h3>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="px-2 py-1 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              
              <div className="space-y-2">
                {filteredRecommendations.map((rec, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{getPriorityIcon(rec.priority)}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-1">
                          <h4 className="font-medium text-gray-900 text-sm">{rec.action}</h4>
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                            {rec.priority}
                          </span>
                          <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                            {rec.timeline}
                          </span>
                        </div>
                        
                        {rec.resources && rec.resources.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-medium text-gray-700 mb-1">Resources:</p>
                            <div className="flex flex-wrap gap-1">
                              {rec.resources.map((resource: string, idx: number) => (
                                <span key={idx} className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                                  {resource}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Gaps */}
            {skillGaps.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="mr-1">🎯</span>
                  Skill Gaps
                </h3>
                <div className="space-y-1">
                  {skillGaps.slice(0, 3).map((gap, index) => (
                    <div key={index} className="flex items-center gap-1 p-2 bg-orange-50 border border-orange-200 rounded">
                      <span className="text-orange-500 text-xs">⚠️</span>
                      <p className="text-xs text-orange-800">{gap}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Next Steps */}
            {nextSteps.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="mr-1">📋</span>
                  Next Steps
                </h3>
                <div className="space-y-1">
                  {nextSteps.slice(0, 4).map((step, index) => (
                    <div key={index} className="flex items-start gap-1 p-2 bg-blue-50 border border-blue-200 rounded">
                      <span className="text-blue-500 mt-0.5 text-xs">{index + 1}.</span>
                      <p className="text-xs text-blue-800">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={() => {
                  setRecommendations([]);
                  setSkillGaps([]);
                  setNextSteps([]);
                  setCurrentGoals('');
                  setTargetRole('');
                }}
                className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
              >
                New Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Modal mode - original implementation
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border-2 border-gray-200 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🚀</span>
            <div>
              <h2 className="text-xl font-semibold">Career Path Guidance</h2>
              <p className="text-sm opacity-90">AI-powered career development recommendations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Career Goals Input */}
          {recommendations.length === 0 && (
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Goals & Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Career Goals
                  </label>
                  <textarea
                    value={currentGoals}
                    onChange={(e) => setCurrentGoals(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    placeholder="Describe your current career goals and what you want to achieve..."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Role
                    </label>
                    <input
                      type="text"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="e.g., Senior Software Architect, Tech Lead"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Horizon
                    </label>
                    <select
                      value={timeHorizon}
                      onChange={(e) => setTimeHorizon(e.target.value as 'short-term' | 'medium-term' | 'long-term')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="short-term">Short-term (3-6 months)</option>
                      <option value="medium-term">Medium-term (6-18 months)</option>
                      <option value="long-term">Long-term (1-3 years)</option>
                    </select>
                  </div>
                </div>
                
                <button
                  onClick={handleGetGuidance}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? 'Analyzing Career Path...' : 'Get Career Guidance'}
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          {recommendations.length > 0 && (
            <div className="p-6 space-y-6">
              {/* Recommendations */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Career Recommendations ({filteredRecommendations.length})
                  </h3>
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
                
                <div className="space-y-4">
                  {filteredRecommendations.map((rec, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{getPriorityIcon(rec.priority)}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{rec.action}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                              {rec.priority} priority
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              {rec.timeline}
                            </span>
                          </div>
                          
                          {rec.resources && rec.resources.length > 0 && (
                            <div className="mt-3">
                              <p className="text-sm font-medium text-gray-700 mb-2">Resources:</p>
                              <div className="flex flex-wrap gap-2">
                                {rec.resources.map((resource: string, idx: number) => (
                                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                                    {resource}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Gaps */}
              {skillGaps.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">🎯</span>
                    Identified Skill Gaps
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {skillGaps.map((gap, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <span className="text-orange-500">⚠️</span>
                        <p className="text-sm text-orange-800">{gap}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Next Steps */}
              {nextSteps.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">📋</span>
                    Immediate Next Steps
                  </h3>
                  <div className="space-y-2">
                    {nextSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <span className="text-blue-500 mt-1">{index + 1}.</span>
                        <p className="text-sm text-blue-800">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setRecommendations([]);
                    setSkillGaps([]);
                    setNextSteps([]);
                    setCurrentGoals('');
                    setTargetRole('');
                  }}
                  className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  New Analysis
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

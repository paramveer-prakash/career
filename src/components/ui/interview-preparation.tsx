'use client';

import React, { useState } from 'react';
import { AIService, InterviewPreparationRequest, InterviewQuestion } from '@/services/ai-service';
import { Resume } from '@/services/resume-service';

interface InterviewPreparationProps {
  resumeId: string;
  resume: Resume;
  isOpen: boolean;
  onClose: () => void;
  isSidebarMode?: boolean;
}

export function InterviewPreparation({ resumeId, isOpen, onClose, isSidebarMode = false }: InterviewPreparationProps) {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [preparationTips, setPreparationTips] = useState<string[]>([]);
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const handleGenerateQuestions = async () => {
    setLoading(true);
    try {
      const request: InterviewPreparationRequest = {
        resumeId,
        jobTitle: jobTitle || undefined,
        company: company || undefined,
        jobDescription: jobDescription || undefined
      };

      const response = await AIService.generateInterviewQuestions(request);
      
      if (response.success) {
        setQuestions(response.questions || []);
        setPreparationTips(response.preparationTips || []);
      }
    } catch (error) {
      console.error('Failed to generate interview questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return '💻';
      case 'behavioral': return '🧠';
      case 'situational': return '🎯';
      case 'company-specific': return '🏢';
      default: return '❓';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredQuestions = questions.filter(q => {
    const categoryMatch = selectedCategory === 'all' || q.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  if (!isOpen) return null;

  // Sidebar mode - render content only
  if (isSidebarMode) {
    return (
      <div className="h-full flex flex-col">
        {/* Job Information Input */}
        {questions.length === 0 && (
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Information (Optional)</h3>
            <div className="space-y-3 mb-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Job Title
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="e.g., Google, Microsoft"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description (Optional)
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm"
                  placeholder="Paste the job description here..."
                />
              </div>
              <button
                onClick={handleGenerateQuestions}
                disabled={loading}
                className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
              >
                {loading ? 'Generating Questions...' : 'Generate Interview Questions'}
              </button>
            </div>
          </div>
        )}

        {/* Preparation Tips */}
        {preparationTips.length > 0 && (
          <div className="p-4 border-b border-gray-200 bg-blue-50">
            <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
              <span className="mr-1">💡</span>
              Preparation Tips
            </h3>
            <div className="space-y-1">
              {preparationTips.slice(0, 4).map((tip, index) => (
                <div key={index} className="flex items-start gap-1 p-2 bg-white rounded border border-blue-200">
                  <span className="text-blue-500 mt-0.5 text-xs">•</span>
                  <p className="text-xs text-blue-800">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Questions */}
        {questions.length > 0 && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">
                Questions ({filteredQuestions.length})
              </h3>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-2 py-1 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">All</option>
                  <option value="behavioral">Behavioral</option>
                  <option value="technical">Technical</option>
                  <option value="situational">Situational</option>
                  <option value="company-specific">Company</option>
                </select>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-2 py-1 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">All</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredQuestions.map((question) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-sm">{getCategoryIcon(question.category)}</span>
                        <h4 className="font-medium text-gray-900 text-sm">{question.question}</h4>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty}
                        </span>
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                          {question.category}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                      className="ml-2 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      {expandedQuestion === question.id ? 'Hide' : 'Show'}
                    </button>
                  </div>

                  {expandedQuestion === question.id && (
                    <div className="mt-2 space-y-2 border-t border-gray-100 pt-2">
                      {question.suggestedAnswer && (
                        <div>
                          <h5 className="font-medium text-gray-900 text-xs mb-1">Suggested Answer:</h5>
                          <p className="text-xs text-gray-700 bg-green-50 p-2 rounded border border-green-200">
                            {question.suggestedAnswer}
                          </p>
                        </div>
                      )}
                      
                      {question.tips && question.tips.length > 0 && (
                        <div>
                          <h5 className="font-medium text-gray-900 text-xs mb-1">Tips:</h5>
                          <ul className="space-y-1">
                            {question.tips.map((tip, index) => (
                              <li key={index} className="flex items-start gap-1 text-xs text-gray-700">
                                <span className="text-green-500 mt-0.5">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredQuestions.length === 0 && (
              <div className="text-center py-6">
                <div className="text-2xl mb-2">🔍</div>
                <p className="text-gray-500 text-sm">No questions match your filters.</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Modal mode - original implementation
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border-2 border-gray-200 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🎯</span>
            <div>
              <h2 className="text-xl font-semibold">Interview Preparation</h2>
              <p className="text-sm opacity-90">AI-generated questions based on your resume</p>
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
          {/* Job Information Input */}
          {questions.length === 0 && (
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Information (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Job Title
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Google, Microsoft"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description (Optional)
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Paste the job description here for more targeted questions..."
                />
              </div>
              <button
                onClick={handleGenerateQuestions}
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? 'Generating Questions...' : 'Generate Interview Questions'}
              </button>
            </div>
          )}

          {/* Preparation Tips */}
          {preparationTips.length > 0 && (
            <div className="p-6 border-b border-gray-200 bg-blue-50">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <span className="mr-2">💡</span>
                Preparation Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {preparationTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-white rounded-lg border border-blue-200">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <p className="text-sm text-blue-800">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Questions */}
          {questions.length > 0 && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Interview Questions ({filteredQuestions.length})
                </h3>
                <div className="flex gap-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    <option value="behavioral">Behavioral</option>
                    <option value="technical">Technical</option>
                    <option value="situational">Situational</option>
                    <option value="company-specific">Company-Specific</option>
                  </select>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredQuestions.map((question) => (
                  <div key={question.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{getCategoryIcon(question.category)}</span>
                          <h4 className="font-semibold text-gray-900">{question.question}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty} difficulty
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            {question.category}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                        className="ml-4 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        {expandedQuestion === question.id ? 'Hide Details' : 'Show Details'}
                      </button>
                    </div>

                    {expandedQuestion === question.id && (
                      <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
                        {question.suggestedAnswer && (
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Suggested Answer:</h5>
                            <p className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg border border-green-200">
                              {question.suggestedAnswer}
                            </p>
                          </div>
                        )}
                        
                        {question.tips && question.tips.length > 0 && (
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Tips:</h5>
                            <ul className="space-y-1">
                              {question.tips.map((tip, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                  <span className="text-green-500 mt-1">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredQuestions.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🔍</div>
                  <p className="text-gray-500">No questions match your current filters.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

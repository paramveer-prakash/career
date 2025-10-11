'use client';

import { useState } from 'react';
import { PrimaryButton } from '@/components/ui/button';
import { useSkills } from '@/hooks/use-skills';
import { useAI } from '@/hooks/use-ai';
import { AIButton } from '@/components/ui/ai-button';
import { SkillRecommendations } from '@/components/ui/skill-recommendations';
import { Resume } from '@/services/resume-service';

interface SkillsSectionProps {
  resumeId: string;
  resume: Resume;
}

export function SkillsSection({ resumeId, resume }: SkillsSectionProps) {
  // Use skills from resume data instead of separate API call
  const skills = resume.skills || [];
  const { addSkill, updateSkill, deleteSkill, moveSkill } = useSkills(resumeId);
  const { loading: aiLoading, error: aiError, analyzeSkillGaps } = useAI();
  const [newSkillName, setNewSkillName] = useState('');
  const [showSkillRecommendations, setShowSkillRecommendations] = useState(false);
  const [showEditMode, setShowEditMode] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [recommendations, setRecommendations] = useState<{
    recommendedSkills: Array<{
      skill: string;
      reason: string;
      priority: 'high' | 'medium' | 'low';
    }>;
    missingKeywords: string[];
  } | null>(null);

  const handleAddSkill = async () => {
    if (!newSkillName.trim()) return;
    
    try {
      await addSkill({
        name: newSkillName.trim(),
        sortOrder: skills.length,
        isVisible: true
      });
      setNewSkillName('');
    } catch (error) {
      console.error('Failed to add skill:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSkill();
    }
  };

  const handleAnalyzeSkillGaps = async () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description to analyze skill gaps.');
      return;
    }

    try {
      const response = await analyzeSkillGaps({
        resumeId,
        jobDescription,
        currentSkills: skills
      });

      if (response.success) {
        setRecommendations(response);
        setShowSkillRecommendations(true);
      }
    } catch (error) {
      console.error('Failed to analyze skill gaps:', error);
    }
  };

  const handleAddRecommendedSkill = async (skillName: string) => {
    try {
      await addSkill({
        name: skillName,
        sortOrder: skills.length,
        isVisible: true
      });
    } catch (error) {
      console.error('Failed to add recommended skill:', error);
    }
  };


  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">🛠️</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
            <p className="text-sm text-gray-500">Your technical and professional skills</p>
          </div>
        </div>
        <AIButton
          onClick={() => setShowSkillRecommendations(true)}
          variant="outline"
          size="sm"
        >
          Analyze Gaps
        </AIButton>
      </div>

      {/* Add New Skill */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new skill..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <PrimaryButton
            onClick={handleAddSkill}
            disabled={!newSkillName.trim()}
            className="px-4 py-2"
          >
            Add
          </PrimaryButton>
        </div>
      </div>

      {/* Skills Display */}
      <div className="space-y-4">
        {skills.length > 0 ? (
          <>
            {/* Compact Skills View */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div key={skill.id || `skill-${index}`} className="group relative">
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-medium border border-green-200 hover:from-green-200 hover:to-emerald-200 transition-all duration-200">
                    <span>{skill.name}</span>
                    <button 
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 ml-1"
                      onClick={() => deleteSkill(skill.id)}
                      title="Remove skill"
                    >
                      ×
                    </button>
                  </div>
                  
                  {/* Move buttons - only show on hover */}
                  <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                    <button 
                      className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white rounded-full text-xs disabled:opacity-30 shadow-sm"
                      onClick={() => moveSkill(skill.id, 'up')}
                      disabled={index === 0}
                      title="Move up"
                    >
                      ↑
                    </button>
                    <button 
                      className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white rounded-full text-xs disabled:opacity-30 shadow-sm"
                      onClick={() => moveSkill(skill.id, 'down')}
                      disabled={index === skills.length - 1}
                      title="Move down"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Edit Mode Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                {skills.length} skill{skills.length !== 1 ? 's' : ''} • Hover to reorder or remove
              </p>
              <button 
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => setShowEditMode(!showEditMode)}
              >
                {showEditMode ? 'Hide Edit Mode' : 'Show Edit Mode'}
              </button>
            </div>
            
            {/* Detailed Edit Mode */}
            {showEditMode && (
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Edit Skills</h4>
                {skills.map((skill, index) => (
                  <div key={`edit-${skill.id || `skill-${index}`}`} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <input 
                      className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none text-sm" 
                      value={skill.name} 
                      onChange={e => updateSkill(skill.id, { name: e.target.value })}
                      placeholder="Skill name..."
                    />
                    <div className="flex gap-1">
                      <button 
                        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white rounded text-xs disabled:opacity-30"
                        onClick={() => moveSkill(skill.id, 'up')}
                        disabled={index === 0}
                        title="Move up"
                      >
                        ↑
                      </button>
                      <button 
                        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white rounded text-xs disabled:opacity-30"
                        onClick={() => moveSkill(skill.id, 'down')}
                        disabled={index === skills.length - 1}
                        title="Move down"
                      >
                        ↓
                      </button>
                      <button 
                        className="w-6 h-6 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded text-xs"
                        onClick={() => deleteSkill(skill.id)}
                        title="Delete skill"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
            No skills added yet. Add your first skill above.
          </div>
        )}
      </div>

      {/* AI Skill Recommendations Panel */}
      {showSkillRecommendations && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div 
            className="rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border-2 border-gray-200"
            style={{ backgroundColor: 'white' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                <h2 className="text-xl font-semibold text-gray-900">AI Skill Gap Analysis</h2>
              </div>
              <button
                onClick={() => setShowSkillRecommendations(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content based on whether we have recommendations or not */}
            {recommendations ? (
              /* Show Recommendations */
              <div className="p-6">
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
                  <button
                    onClick={() => {
                      setRecommendations(null);
                      setJobDescription('');
                    }}
                    className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    New Analysis
                  </button>
                </div>
                <SkillRecommendations
                  recommendations={recommendations.recommendedSkills}
                  missingKeywords={recommendations.missingKeywords}
                  onAddSkill={handleAddRecommendedSkill}
                  isOpen={true}
                  onClose={() => setShowSkillRecommendations(false)}
                  asModal={false}
                />
              </div>
            ) : (
              /* Show Job Description Input */
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Paste the job description here to analyze skill gaps..."
                />
                <div className="mt-4 flex justify-end">
                  <AIButton
                    onClick={handleAnalyzeSkillGaps}
                    loading={aiLoading}
                    disabled={!jobDescription.trim()}
                  >
                    Analyze Skills
                  </AIButton>
                </div>
                {aiError && (
                  <p className="mt-2 text-sm text-red-600">{aiError}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

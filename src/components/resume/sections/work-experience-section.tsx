'use client';

import { useState } from 'react';
import { PrimaryButton } from '@/components/ui/button';
import { useWorkExperience } from '@/hooks/use-work-experience';
import { WorkExperience, WorkResponsibility, Resume } from '@/services/resume-service';

interface WorkExperienceSectionProps {
  resumeId: string;
  resume: Resume;
}

export function WorkExperienceSection({ resumeId, resume }: WorkExperienceSectionProps) {
  // Use work experiences from resume data instead of separate API call
  const workExperiences = resume.workExperiences || [];
  const { 
    addWorkExperience, 
    updateWorkExperience, 
    deleteWorkExperience,
    addResponsibility,
    updateResponsibility,
    deleteResponsibility,
    moveResponsibility
  } = useWorkExperience(resumeId);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newWorkExp, setNewWorkExp] = useState<Partial<WorkExperience>>({
    jobTitle: '',
    companyName: '',
    companyLocation: '',
    employmentType: 'Full-time',
    startDate: '',
    endDate: '',
    isCurrent: false,
    jobDescription: '',
    technologies: [],
    industry: '',
    sortOrder: 0,
    isVisible: true,
    responsibilities: []
  });

  const handleAddWorkExperience = async () => {
    if (!newWorkExp.jobTitle || !newWorkExp.companyName) return;
    
    try {
      await addWorkExperience(newWorkExp as Omit<WorkExperience, 'id'>);
      setNewWorkExp({
        jobTitle: '',
        companyName: '',
        companyLocation: '',
        employmentType: 'Full-time',
        startDate: '',
        endDate: '',
        isCurrent: false,
        jobDescription: '',
        technologies: [],
        industry: '',
        sortOrder: 0,
        isVisible: true,
        responsibilities: []
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add work experience:', error);
    }
  };

  const handleAddResponsibility = async (workExpId: string) => {
    try {
      await addResponsibility(workExpId, {
        description: '',
        sortOrder: 0,
        isVisible: true
      });
    } catch (error) {
      console.error('Failed to add responsibility:', error);
    }
  };


  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">💼</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Work Experience</h2>
            <p className="text-sm text-gray-500">Your professional work history</p>
          </div>
        </div>
        <PrimaryButton
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2"
        >
          + Add Experience
        </PrimaryButton>
      </div>

      {/* Add New Work Experience Form */}
      {showAddForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-md font-medium text-gray-900 mb-4">Add New Work Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                value={newWorkExp.jobTitle || ''}
                onChange={(e) => setNewWorkExp(prev => ({ ...prev, jobTitle: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                value={newWorkExp.companyName || ''}
                onChange={(e) => setNewWorkExp(prev => ({ ...prev, companyName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Tech Corp"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={newWorkExp.startDate || ''}
                onChange={(e) => setNewWorkExp(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={newWorkExp.endDate || ''}
                onChange={(e) => setNewWorkExp(prev => ({ ...prev, endDate: e.target.value }))}
                disabled={newWorkExp.isCurrent}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newWorkExp.isCurrent || false}
                onChange={(e) => setNewWorkExp(prev => ({ ...prev, isCurrent: e.target.checked }))}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Currently working here</span>
            </label>
          </div>
          <div className="flex gap-2 mt-4">
            <PrimaryButton onClick={handleAddWorkExperience} className="px-4 py-2">
              Add Experience
            </PrimaryButton>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Work Experiences List */}
      <div className="space-y-4">
        {workExperiences.length > 0 ? (
          workExperiences.map((workExp, index) => (
            <div key={workExp.id || `workexp-${index}`} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={workExp.jobTitle}
                    onChange={(e) => updateWorkExperience(workExp.id, { jobTitle: e.target.value })}
                    className="text-lg font-semibold text-gray-900 border-0 bg-transparent focus:ring-0 focus:outline-none w-full"
                    placeholder="Job Title"
                  />
                  <input
                    type="text"
                    value={workExp.companyName}
                    onChange={(e) => updateWorkExperience(workExp.id, { companyName: e.target.value })}
                    className="text-gray-600 border-0 bg-transparent focus:ring-0 focus:outline-none w-full"
                    placeholder="Company Name"
                  />
                </div>
                <button
                  onClick={() => deleteWorkExperience(workExp.id)}
                  className="text-red-400 hover:text-red-600 ml-2"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  value={workExp.companyLocation || ''}
                  onChange={(e) => updateWorkExperience(workExp.id, { companyLocation: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="Location"
                />
                <input
                  type="text"
                  value={workExp.employmentType || ''}
                  onChange={(e) => updateWorkExperience(workExp.id, { employmentType: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="Employment Type"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="date"
                  value={workExp.startDate || ''}
                  onChange={(e) => updateWorkExperience(workExp.id, { startDate: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
                <input
                  type="date"
                  value={workExp.endDate || ''}
                  onChange={(e) => updateWorkExperience(workExp.id, { endDate: e.target.value })}
                  disabled={workExp.isCurrent}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm disabled:bg-gray-100"
                />
              </div>

              <textarea
                value={workExp.jobDescription || ''}
                onChange={(e) => updateWorkExperience(workExp.id, { jobDescription: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm mb-3 resize-none"
                placeholder="Job description..."
              />

              {/* Responsibilities */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700">Responsibilities</h4>
                  <button
                    onClick={() => handleAddResponsibility(workExp.id)}
                    className="text-xs text-purple-600 hover:text-purple-800"
                  >
                    + Add Responsibility
                  </button>
                </div>
                
                {Array.isArray(workExp.responsibilities) && workExp.responsibilities.length > 0 ? (
                  <div className="space-y-1">
                    {workExp.responsibilities.map((resp: WorkResponsibility, idx: number) => (
                      <div key={resp.id || idx} className="group flex items-start gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white rounded text-xs disabled:opacity-30"
                            onClick={() => moveResponsibility(workExp.id, resp.id, 'up')}
                            disabled={idx === 0}
                          >
                            ↑
                          </button>
                          <button 
                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white rounded text-xs disabled:opacity-30"
                            onClick={() => moveResponsibility(workExp.id, resp.id, 'down')}
                            disabled={idx === (workExp.responsibilities?.length || 0) - 1}
                          >
                            ↓
                          </button>
                        </div>
                        
                        <textarea 
                          className="flex-1 border-0 bg-transparent resize-none focus:ring-0 focus:outline-none text-sm" 
                          rows={1}
                          value={resp.description || ''} 
                          onChange={e => updateResponsibility(workExp.id, resp.id, { description: e.target.value })}
                          placeholder="Describe your responsibility..."
                        />
                        
                        <button 
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600"
                          onClick={() => deleteResponsibility(workExp.id, resp.id)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                    No responsibilities added yet. Click &quot;Add Responsibility&quot; to get started.
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
            No work experience added yet. Click &quot;Add Experience&quot; to get started.
          </div>
        )}
      </div>
    </div>
  );
}

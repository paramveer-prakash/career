'use client';

import { useState } from 'react';
import { PrimaryButton } from '@/components/ui/button';
import { useEducation } from '@/hooks/use-education';
import { Education } from '@/services/resume-service';

interface EducationSectionProps {
  resumeId: string;
}

export function EducationSection({ resumeId }: EducationSectionProps) {
  const { 
    educations, 
    loading, 
    addEducation, 
    updateEducation, 
    deleteEducation 
  } = useEducation(resumeId);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newEducation, setNewEducation] = useState<Partial<Education>>({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    gpa: '',
    description: '',
    sortOrder: 0,
    isVisible: true
  });

  const handleAddEducation = async () => {
    if (!newEducation.institution) return;
    
    try {
      await addEducation(newEducation as Omit<Education, 'id'>);
      setNewEducation({
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        gpa: '',
        description: '',
        sortOrder: 0,
        isVisible: true
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add education:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">🎓</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Education</h2>
            <p className="text-sm text-gray-500">Your academic background</p>
          </div>
        </div>
        <PrimaryButton
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2"
        >
          + Add Education
        </PrimaryButton>
      </div>

      {/* Add New Education Form */}
      {showAddForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-md font-medium text-gray-900 mb-4">Add New Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
              <input
                type="text"
                value={newEducation.institution || ''}
                onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., University of Technology"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
              <input
                type="text"
                value={newEducation.degree || ''}
                onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Bachelor of Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
              <input
                type="text"
                value={newEducation.fieldOfStudy || ''}
                onChange={(e) => setNewEducation(prev => ({ ...prev, fieldOfStudy: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
              <input
                type="text"
                value={newEducation.gpa || ''}
                onChange={(e) => setNewEducation(prev => ({ ...prev, gpa: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., 3.8/4.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={newEducation.startDate || ''}
                onChange={(e) => setNewEducation(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={newEducation.endDate || ''}
                onChange={(e) => setNewEducation(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newEducation.description || ''}
              onChange={(e) => setNewEducation(prev => ({ ...prev, description: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              placeholder="Additional details about your education..."
            />
          </div>
          <div className="flex gap-2 mt-4">
            <PrimaryButton onClick={handleAddEducation} className="px-4 py-2">
              Add Education
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

      {/* Education List */}
      <div className="space-y-4">
        {educations.length > 0 ? (
          educations.map((education) => (
            <div key={education.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={education.institution}
                    onChange={(e) => updateEducation(education.id, { institution: e.target.value })}
                    className="text-lg font-semibold text-gray-900 border-0 bg-transparent focus:ring-0 focus:outline-none w-full"
                    placeholder="Institution Name"
                  />
                  <input
                    type="text"
                    value={education.degree || ''}
                    onChange={(e) => updateEducation(education.id, { degree: e.target.value })}
                    className="text-gray-600 border-0 bg-transparent focus:ring-0 focus:outline-none w-full"
                    placeholder="Degree"
                  />
                </div>
                <button
                  onClick={() => deleteEducation(education.id)}
                  className="text-red-400 hover:text-red-600 ml-2"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  value={education.fieldOfStudy || ''}
                  onChange={(e) => updateEducation(education.id, { fieldOfStudy: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  placeholder="Field of Study"
                />
                <input
                  type="text"
                  value={education.gpa || ''}
                  onChange={(e) => updateEducation(education.id, { gpa: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  placeholder="GPA"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="date"
                  value={education.startDate || ''}
                  onChange={(e) => updateEducation(education.id, { startDate: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
                <input
                  type="date"
                  value={education.endDate || ''}
                  onChange={(e) => updateEducation(education.id, { endDate: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
              </div>

              <textarea
                value={education.description || ''}
                onChange={(e) => updateEducation(education.id, { description: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm resize-none"
                placeholder="Additional details..."
              />
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
            No education added yet. Click &quot;Add Education&quot; to get started.
          </div>
        )}
      </div>
    </div>
  );
}

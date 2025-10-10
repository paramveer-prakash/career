'use client';

import { useState } from 'react';
import { PrimaryButton } from '@/components/ui/button';
import { useSkills } from '@/hooks/use-skills';

interface SkillsSectionProps {
  resumeId: string;
}

export function SkillsSection({ resumeId }: SkillsSectionProps) {
  const { skills, loading, addSkill, updateSkill, deleteSkill, moveSkill } = useSkills(resumeId);
  const [newSkillName, setNewSkillName] = useState('');

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

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">🛠️</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
          <p className="text-sm text-gray-500">Your technical and professional skills</p>
        </div>
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

      {/* Skills List */}
      <div className="space-y-2">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <div key={skill.id} className="group flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white rounded text-xs disabled:opacity-30"
                  onClick={() => moveSkill(skill.id, 'up')}
                  disabled={index === 0}
                >
                  ↑
                </button>
                <button 
                  className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white rounded text-xs disabled:opacity-30"
                  onClick={() => moveSkill(skill.id, 'down')}
                  disabled={index === skills.length - 1}
                >
                  ↓
                </button>
              </div>
              
              <input 
                className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none text-sm" 
                value={skill.name} 
                onChange={e => updateSkill(skill.id, { name: e.target.value })}
                placeholder="Skill name..."
              />
              
              <button 
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600"
                onClick={() => deleteSkill(skill.id)}
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
            No skills added yet. Add your first skill above.
          </div>
        )}
      </div>
    </div>
  );
}

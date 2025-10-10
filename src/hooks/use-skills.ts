import { useState, useEffect, useCallback } from 'react';
import { ResumeService, Skill } from '@/services/resume-service';
import { getErrorMessage } from '@/utils/error-utils';

export function useSkills(resumeId: string) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSkills = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ResumeService.getSkills(resumeId);
      setSkills(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to load skills'));
      console.error('Failed to load skills', err);
    } finally {
      setLoading(false);
    }
  }, [resumeId]);

  useEffect(() => {
    if (resumeId) {
      loadSkills();
    }
  }, [resumeId, loadSkills]);

  const addSkill = async (skill: Omit<Skill, 'id'>) => {
    try {
      const newSkill = await ResumeService.createSkill(resumeId, skill);
      setSkills(prev => [...prev, newSkill]);
      return newSkill;
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to add skill'));
      throw err;
    }
  };

  const updateSkill = async (skillId: string, updates: Partial<Skill>) => {
    try {
      const updatedSkill = await ResumeService.updateSkill(resumeId, skillId, updates);
      setSkills(prev => prev.map(skill => 
        skill.id === skillId ? updatedSkill : skill
      ));
      return updatedSkill;
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to update skill'));
      throw err;
    }
  };

  const deleteSkill = async (skillId: string) => {
    try {
      await ResumeService.deleteSkill(resumeId, skillId);
      setSkills(prev => prev.filter(skill => skill.id !== skillId));
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to delete skill'));
      throw err;
    }
  };

  const moveSkill = async (skillId: string, direction: 'up' | 'down') => {
    const currentIndex = skills.findIndex(skill => skill.id === skillId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= skills.length) return;

    const reorderedSkills = [...skills];
    [reorderedSkills[currentIndex], reorderedSkills[newIndex]] = 
    [reorderedSkills[newIndex], reorderedSkills[currentIndex]];

    // Update sort orders
    reorderedSkills.forEach((skill, index) => {
      skill.sortOrder = index;
    });

    setSkills(reorderedSkills);

    // Update backend
    try {
      await Promise.all(
        reorderedSkills.map(skill => 
          ResumeService.updateSkill(resumeId, skill.id, { sortOrder: skill.sortOrder })
        )
      );
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to reorder skills'));
      // Revert on error
      loadSkills();
    }
  };

  return {
    skills,
    loading,
    error,
    addSkill,
    updateSkill,
    deleteSkill,
    moveSkill,
    refreshSkills: loadSkills
  };
}

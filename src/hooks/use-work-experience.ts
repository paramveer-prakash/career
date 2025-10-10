import { useState, useEffect, useCallback } from 'react';
import { ResumeService, WorkExperience, WorkResponsibility } from '@/services/resume-service';
import { getErrorMessage } from '@/utils/error-utils';

export function useWorkExperience(resumeId: string) {
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWorkExperiences = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ResumeService.getWorkExperiences(resumeId);
      setWorkExperiences(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to load work experiences'));
      console.error('Failed to load work experiences', err);
    } finally {
      setLoading(false);
    }
  }, [resumeId]);

  useEffect(() => {
    if (resumeId) {
      loadWorkExperiences();
    }
  }, [resumeId, loadWorkExperiences]);

  const addWorkExperience = async (workExp: Omit<WorkExperience, 'id'>) => {
    try {
      const newWorkExp = await ResumeService.createWorkExperience(resumeId, workExp);
      setWorkExperiences(prev => [...prev, newWorkExp]);
      return newWorkExp;
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to add work experience'));
      throw err;
    }
  };

  const updateWorkExperience = async (workExpId: string, updates: Partial<WorkExperience>) => {
    try {
      const updatedWorkExp = await ResumeService.updateWorkExperience(resumeId, workExpId, updates);
      setWorkExperiences(prev => prev.map(workExp => 
        workExp.id === workExpId ? updatedWorkExp : workExp
      ));
      return updatedWorkExp;
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to update work experience'));
      throw err;
    }
  };

  const deleteWorkExperience = async (workExpId: string) => {
    try {
      await ResumeService.deleteWorkExperience(resumeId, workExpId);
      setWorkExperiences(prev => prev.filter(workExp => workExp.id !== workExpId));
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to delete work experience'));
      throw err;
    }
  };

  const addResponsibility = async (workExpId: string, responsibility: Omit<WorkResponsibility, 'id'>) => {
    const workExp = workExperiences.find(we => we.id === workExpId);
    if (!workExp) return;

    const newResponsibility: WorkResponsibility = {
      ...responsibility,
      id: `temp-${Date.now()}`, // Temporary ID for optimistic update
      sortOrder: responsibility.sortOrder ?? (workExp.responsibilities?.length || 0)
    };

    // Optimistic update
    setWorkExperiences(prev => prev.map(we => 
      we.id === workExpId 
        ? { ...we, responsibilities: [...(we.responsibilities || []), newResponsibility] }
        : we
    ));

    try {
      // Update the work experience with the new responsibility
      const updatedWorkExp = await ResumeService.updateWorkExperience(resumeId, workExpId, {
        responsibilities: [...(workExp.responsibilities || []), newResponsibility]
      });
      
      setWorkExperiences(prev => prev.map(we => 
        we.id === workExpId ? updatedWorkExp : we
      ));
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to add responsibility'));
      // Revert optimistic update
      loadWorkExperiences();
      throw err;
    }
  };

  const updateResponsibility = async (workExpId: string, responsibilityId: string, updates: Partial<WorkResponsibility>) => {
    setWorkExperiences(prev => prev.map(workExp => 
      workExp.id === workExpId 
        ? {
            ...workExp,
            responsibilities: workExp.responsibilities?.map(resp => 
              resp.id === responsibilityId ? { ...resp, ...updates } : resp
            )
          }
        : workExp
    ));

    try {
      const workExp = workExperiences.find(we => we.id === workExpId);
      if (!workExp) return;

      const updatedResponsibilities = workExp.responsibilities?.map(resp => 
        resp.id === responsibilityId ? { ...resp, ...updates } : resp
      );

      await ResumeService.updateWorkExperience(resumeId, workExpId, {
        responsibilities: updatedResponsibilities
      });
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to update responsibility'));
      // Revert optimistic update
      loadWorkExperiences();
      throw err;
    }
  };

  const deleteResponsibility = async (workExpId: string, responsibilityId: string) => {
    setWorkExperiences(prev => prev.map(workExp => 
      workExp.id === workExpId 
        ? {
            ...workExp,
            responsibilities: workExp.responsibilities?.filter(resp => resp.id !== responsibilityId)
          }
        : workExp
    ));

    try {
      const workExp = workExperiences.find(we => we.id === workExpId);
      if (!workExp) return;

      const updatedResponsibilities = workExp.responsibilities?.filter(resp => resp.id !== responsibilityId);

      await ResumeService.updateWorkExperience(resumeId, workExpId, {
        responsibilities: updatedResponsibilities
      });
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to delete responsibility'));
      // Revert optimistic update
      loadWorkExperiences();
      throw err;
    }
  };

  const moveResponsibility = async (workExpId: string, responsibilityId: string, direction: 'up' | 'down') => {
    const workExp = workExperiences.find(we => we.id === workExpId);
    if (!workExp?.responsibilities) return;

    const currentIndex = workExp.responsibilities.findIndex(resp => resp.id === responsibilityId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= workExp.responsibilities.length) return;

    const reorderedResponsibilities = [...workExp.responsibilities];
    [reorderedResponsibilities[currentIndex], reorderedResponsibilities[newIndex]] = 
    [reorderedResponsibilities[newIndex], reorderedResponsibilities[currentIndex]];

    // Update sort orders
    reorderedResponsibilities.forEach((resp, index) => {
      resp.sortOrder = index;
    });

    setWorkExperiences(prev => prev.map(we => 
      we.id === workExpId 
        ? { ...we, responsibilities: reorderedResponsibilities }
        : we
    ));

    try {
      await ResumeService.updateWorkExperience(resumeId, workExpId, {
        responsibilities: reorderedResponsibilities
      });
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to reorder responsibilities'));
      // Revert on error
      loadWorkExperiences();
    }
  };

  return {
    workExperiences,
    loading,
    error,
    addWorkExperience,
    updateWorkExperience,
    deleteWorkExperience,
    addResponsibility,
    updateResponsibility,
    deleteResponsibility,
    moveResponsibility,
    refreshWorkExperiences: loadWorkExperiences
  };
}

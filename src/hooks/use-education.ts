import { useState, useEffect, useCallback } from 'react';
import { ResumeService, Education } from '@/services/resume-service';
import { getErrorMessage } from '@/utils/error-utils';

export function useEducation(resumeId: string) {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEducations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ResumeService.getEducations(resumeId);
      setEducations(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to load educations'));
      console.error('Failed to load educations', err);
    } finally {
      setLoading(false);
    }
  }, [resumeId]);

  useEffect(() => {
    if (resumeId) {
      loadEducations();
    }
  }, [resumeId, loadEducations]);

  const addEducation = async (education: Omit<Education, 'id'>) => {
    try {
      const newEducation = await ResumeService.createEducation(resumeId, education);
      setEducations(prev => [...prev, newEducation]);
      return newEducation;
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to add education'));
      throw err;
    }
  };

  const updateEducation = async (educationId: string, updates: Partial<Education>) => {
    try {
      const updatedEducation = await ResumeService.updateEducation(resumeId, educationId, updates);
      setEducations(prev => prev.map(education => 
        education.id === educationId ? updatedEducation : education
      ));
      return updatedEducation;
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to update education'));
      throw err;
    }
  };

  const deleteEducation = async (educationId: string) => {
    try {
      await ResumeService.deleteEducation(resumeId, educationId);
      setEducations(prev => prev.filter(education => education.id !== educationId));
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to delete education'));
      throw err;
    }
  };

  return {
    educations,
    loading,
    error,
    addEducation,
    updateEducation,
    deleteEducation,
    refreshEducations: loadEducations
  };
}

import { useState, useEffect } from 'react';
import { ResumeService, Resume } from '@/services/resume-service';
import { getErrorMessage } from '@/utils/error-utils';

export function useResume(id: string | null) {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadResume = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await ResumeService.getResume(id);
        setResume(data);
      } catch (err: unknown) {
        setError(getErrorMessage(err, 'Failed to load resume'));
        console.error('Failed to load resume', err);
      } finally {
        setLoading(false);
      }
    };

    loadResume();
  }, [id]);

  const updateResume = async (updates: Partial<Resume>) => {
    if (!id || !resume) return;

    try {
      const updatedResume = await ResumeService.updateResume(id, updates);
      setResume(updatedResume);
      return updatedResume;
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to update resume'));
      throw err;
    }
  };

  const deleteResume = async () => {
    if (!id) return;

    try {
      await ResumeService.deleteResume(id);
      setResume(null);
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to delete resume'));
      throw err;
    }
  };

  return {
    resume,
    loading,
    error,
    updateResume,
    deleteResume,
    setResume
  };
}

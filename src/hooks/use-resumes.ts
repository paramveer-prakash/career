import { useState, useEffect } from 'react';
import { ResumeService, Resume } from '@/services/resume-service';
import { getErrorMessage } from '@/utils/error-utils';

export function useResumes() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadResumes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ResumeService.getResumes();
      setResumes(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to load resumes'));
      console.error('Failed to load resumes', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const refreshResumes = () => {
    loadResumes();
  };

  const deleteResume = async (id: string) => {
    try {
      await ResumeService.deleteResume(id);
      setResumes(prev => prev.filter(resume => resume.id !== id));
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to delete resume'));
      throw err;
    }
  };

  return {
    resumes,
    loading,
    error,
    refreshResumes,
    deleteResume
  };
}

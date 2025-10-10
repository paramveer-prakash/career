import { useState, useEffect, useCallback } from 'react';
import { ResumeService, Certification } from '@/services/resume-service';
import { getErrorMessage } from '@/utils/error-utils';

export function useCertifications(resumeId: string) {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCertifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ResumeService.getCertifications(resumeId);
      setCertifications(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to load certifications'));
      console.error('Failed to load certifications', err);
    } finally {
      setLoading(false);
    }
  }, [resumeId]);

  useEffect(() => {
    if (resumeId) {
      loadCertifications();
    }
  }, [resumeId, loadCertifications]);

  const addCertification = async (certification: Omit<Certification, 'id'>) => {
    try {
      const newCertification = await ResumeService.createCertification(resumeId, certification);
      setCertifications(prev => [...prev, newCertification]);
      return newCertification;
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to add certification'));
      throw err;
    }
  };

  const updateCertification = async (certificationId: string, updates: Partial<Certification>) => {
    try {
      const updatedCertification = await ResumeService.updateCertification(resumeId, certificationId, updates);
      setCertifications(prev => prev.map(certification => 
        certification.id === certificationId ? updatedCertification : certification
      ));
      return updatedCertification;
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to update certification'));
      throw err;
    }
  };

  const deleteCertification = async (certificationId: string) => {
    try {
      await ResumeService.deleteCertification(resumeId, certificationId);
      setCertifications(prev => prev.filter(certification => certification.id !== certificationId));
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to delete certification'));
      throw err;
    }
  };

  return {
    certifications,
    loading,
    error,
    addCertification,
    updateCertification,
    deleteCertification,
    refreshCertifications: loadCertifications
  };
}

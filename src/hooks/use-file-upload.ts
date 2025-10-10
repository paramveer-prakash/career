import { useState } from 'react';
import { ResumeService, Resume } from '@/services/resume-service';

export interface UploadState {
  uploading: boolean;
  progress: number;
  success: boolean;
  error: string | null;
  conflictFile: File | null;
}

export function useFileUpload(onUploadSuccess?: (resumes: Resume[]) => void) {
  const [uploadState, setUploadState] = useState<UploadState>({
    uploading: false,
    progress: 0,
    success: false,
    error: null,
    conflictFile: null
  });

  const uploadFile = async (file: File, overwrite: boolean = false, newName?: string) => {
    setUploadState({
      uploading: true,
      progress: 0,
      success: false,
      error: null,
      conflictFile: null
    });

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadState(prev => ({
        ...prev,
        progress: Math.min(prev.progress + 10, 90)
      }));
    }, 200);

    try {
      const uploadedResumes = await ResumeService.uploadResumeFile(file, overwrite, newName);
      
      clearInterval(progressInterval);
      setUploadState({
        uploading: false,
        progress: 100,
        success: true,
        error: null,
        conflictFile: null
      });

      // Call success callback if provided
      onUploadSuccess?.(uploadedResumes);

      // Reset success state after 3 seconds
      setTimeout(() => {
        setUploadState(prev => ({ ...prev, success: false, progress: 0 }));
      }, 3000);

    } catch (error: unknown) {
      clearInterval(progressInterval);
      
      let errorMessage = 'Upload failed. Please try again.';
      let conflictFile: File | null = null;

      // Check if error has response property (Axios error)
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number; data?: { message?: string; error?: string } } };
        
        if (axiosError.response?.status === 409) {
          const errorData = axiosError.response.data?.message || axiosError.response.data?.error;
          conflictFile = file;
          errorMessage = errorData || `File "${file.name}" already exists. You can overwrite it or choose a different file.`;
        } else if (axiosError.response?.status === 413) {
          errorMessage = 'File is too large. Please choose a smaller file.';
        } else if (axiosError.response?.status === 415) {
          errorMessage = 'Unsupported file type. Please upload a PDF, DOC, DOCX, or TXT file.';
        } else if (axiosError.response?.status === 400) {
          errorMessage = 'Invalid file format. Please check your file and try again.';
        } else if (axiosError.response?.status === 401) {
          errorMessage = 'Authentication required. Please sign in again.';
        } else if (axiosError.response?.status === 403) {
          errorMessage = 'Permission denied. You do not have access to upload files.';
        } else if (axiosError.response?.status && axiosError.response.status >= 500) {
          errorMessage = 'Server error. Please try again later or contact support.';
        }
      }

      setUploadState({
        uploading: false,
        progress: 0,
        success: false,
        error: errorMessage,
        conflictFile
      });

      // Reset error state after 8 seconds
      setTimeout(() => {
        setUploadState(prev => ({ ...prev, error: null, conflictFile: null }));
      }, 8000);
    }
  };

  const clearError = () => {
    setUploadState(prev => ({ ...prev, error: null, conflictFile: null }));
  };

  const handleOverwrite = async (file: File) => {
    await uploadFile(file, true);
  };

  const handleRenameAndUpload = async (file: File) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const nameParts = file.name.split('.');
    const extension = nameParts.pop();
    const baseName = nameParts.join('.');
    const newName = `${baseName}-${timestamp}.${extension}`;
    await uploadFile(file, false, newName);
  };

  return {
    ...uploadState,
    uploadFile,
    clearError,
    handleOverwrite,
    handleRenameAndUpload
  };
}

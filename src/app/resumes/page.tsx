'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function Page(){
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [conflictFile, setConflictFile] = useState<File | null>(null);


  const getTimeAgo = (value: any) => {
    try {
      const d = new Date(value);
      if (isNaN(d.getTime())) return '';
      const now = new Date();
      const diffInMs = now.getTime() - d.getTime();
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      
      if (diffInDays === 0) return 'Today';
      if (diffInDays === 1) return 'Yesterday';
      if (diffInDays < 7) return `${diffInDays} days ago`;
      if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
      if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
      return `${Math.floor(diffInDays / 365)} years ago`;
    } catch {
      return '';
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const r = await api.get('/api/v1/resumes');
        const data = r.data;
        const list = Array.isArray(data) ? data : (Array.isArray(data?.content) ? data.content : []);
        setItems(list);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);
    setUploadSuccess(false);
    setUploadError(null);
    setSelectedFile(file);
    
    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);
    
    try {
      const form = new FormData();
      form.append('file', file);
      
      await api.post('/api/v1/resumes/upload', form, { headers: { 'Content-Type': 'multipart/form-data' }});
      
      // Complete the progress
      setUploadProgress(100);
      clearInterval(progressInterval);
      
      // Refresh the resumes list
      const r = await api.get('/api/v1/resumes');
      const data = r.data;
      const list = Array.isArray(data) ? data : (Array.isArray(data?.content) ? data.content : []);
      setItems(list);
      
      // Show success state
      setUploadSuccess(true);
      setSelectedFile(null);
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setUploadSuccess(false);
        setUploadProgress(0);
      }, 3000);
      
    } catch (error: any) {
      console.error('Upload failed:', error);
      console.error('Error response:', error?.response?.data);
      console.error('Error status:', error?.response?.status);
      clearInterval(progressInterval);
      setUploadProgress(0);
      setSelectedFile(null);
      
      // Handle specific error cases
      if (error?.response?.status === 409) {
        const errorMessage = error?.response?.data?.message || error?.response?.data?.error;
        setConflictFile(file); // Store the conflicting file
        if (errorMessage) {
          setUploadError(errorMessage);
        } else {
          setUploadError(`File "${file.name}" already exists. You can overwrite it or choose a different file.`);
        }
      } else if (error?.response?.status === 413) {
        setUploadError('File is too large. Please choose a smaller file.');
      } else if (error?.response?.status === 415) {
        setUploadError('Unsupported file type. Please upload a PDF, DOC, DOCX, or TXT file.');
      } else if (error?.response?.status === 400) {
        setUploadError('Invalid file format. Please check your file and try again.');
      } else if (error?.response?.status === 401) {
        setUploadError('Authentication required. Please sign in again.');
      } else if (error?.response?.status === 403) {
        setUploadError('Permission denied. You do not have access to upload files.');
      } else if (error?.response?.status >= 500) {
        setUploadError('Server error. Please try again later or contact support.');
      } else {
        setUploadError('Upload failed. Please try again or contact support if the problem persists.');
      }
      
      // Reset error state after 8 seconds (longer for 409 errors)
      setTimeout(() => {
        setUploadError(null);
      }, 8000);
      
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    if (file && /\.(pdf|doc|docx|txt)$/i.test(file.name)) {
      setUploadError(null); // Clear any previous errors
      handleFileUpload(file);
    }
  };

  const handleOverwrite = async () => {
    if (conflictFile) {
      setUploadError(null);
      setConflictFile(null);
      await handleFileUpload(conflictFile);
    }
  };

  const handleRenameAndUpload = () => {
    if (conflictFile) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const nameParts = conflictFile.name.split('.');
      const extension = nameParts.pop();
      const baseName = nameParts.join('.');
      const newName = `${baseName}-${timestamp}.${extension}`;
      
      // Create a new file with the renamed name
      const renamedFile = new File([conflictFile], newName, { type: conflictFile.type });
      setUploadError(null);
      setConflictFile(null);
      handleFileUpload(renamedFile);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your resumes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">My Resumes</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create, manage, and organize your professional resumes in one place
            </p>
          </div>

          {/* Upload Section */}
          <div className="max-w-2xl mx-auto">
            <div
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                dragOver 
                  ? 'border-blue-400 bg-blue-50' 
                  : uploading
                  ? 'border-blue-400 bg-blue-50'
                  : uploadSuccess
                  ? 'border-green-400 bg-green-50'
                  : uploadError
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {uploading ? (
                /* Uploading State */
                <div className="space-y-4">
                  <div className="text-6xl">⏳</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Uploading Resume...
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {selectedFile?.name}
                    </p>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {uploadProgress}% complete
                  </p>
                </div>
              ) : uploadSuccess ? (
                /* Success State */
                <div className="space-y-4">
                  <div className="text-6xl">✅</div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-900 mb-2">
                      Upload Successful!
                    </h3>
                    <p className="text-green-600 mb-4">
                      Your resume has been uploaded and processed
                    </p>
                  </div>
                </div>
              ) : uploadError ? (
                /* Error State */
                <div className="space-y-4">
                  <div className="text-6xl">❌</div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-900 mb-2">
                      Upload Failed
                    </h3>
                    <p className="text-red-600 mb-4">
                      {uploadError}
                    </p>
                  </div>
                  
                  {conflictFile ? (
                    /* Conflict Resolution Options */
                    <div className="space-y-3">
                      <div className="text-sm text-gray-600 mb-3">
                        File: <span className="font-medium">{conflictFile.name}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={handleOverwrite}
                          disabled={uploading}
                          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200 font-medium disabled:opacity-50"
                        >
                          🔄 Overwrite
                        </button>
                        <button
                          onClick={handleRenameAndUpload}
                          disabled={uploading}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium disabled:opacity-50"
                        >
                          📝 Rename & Upload
                        </button>
                        <button
                          onClick={() => {
                            setUploadError(null);
                            setConflictFile(null);
                            document.getElementById('file-upload')?.click();
                          }}
                          disabled={uploading}
                          className="px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-200 font-medium disabled:opacity-50"
                        >
                          📁 Choose Different File
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Generic Error */
                    <button
                      onClick={() => {
                        setUploadError(null);
                        document.getElementById('file-upload')?.click();
                      }}
                      className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              ) : (
                /* Default State */
                <div className="space-y-4">
                  <div className="text-6xl">📄</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Upload a Resume
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Drag and drop your resume file here, or click to browse
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx,.txt" 
                      className="hidden" 
                      id="file-upload"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploadError(null); // Clear any previous errors
                          setConflictFile(null); // Clear any previous conflicts
                          await handleFileUpload(file);
                          e.target.value = '';
                        }
                      }}
                    />
                    <label 
                      htmlFor="file-upload"
                      className="cursor-pointer px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium"
                    >
                      📁 Choose File
                    </label>
                    <span className="text-sm text-gray-500">
                      Supports PDF, DOC, DOCX, TXT
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Resumes Grid */}
        <div className="space-y-6">
          {items.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Resumes ({items.length})
                </h2>
                <div className="text-sm text-gray-600">
                  Last updated: {items.length > 0 ? getTimeAgo(items[0]?.updatedAt) : 'Never'}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((resume: any) => (
                  <div 
                    key={resume.id} 
                    className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="space-y-4">
                      {/* Resume Icon & Status */}
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-xl">📄</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-500">Active</span>
                        </div>
                      </div>

                      {/* Resume Info */}
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
                          {resume.title || 'Untitled Resume'}
                        </h3>
                        <p className="text-gray-600 font-medium">
                          {resume.primaryName || 'No name set'}
                        </p>
                        <p className="text-sm text-gray-500">
                          Updated {getTimeAgo(resume.updatedAt)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <a 
                          href={`/resumes/${resume.id}`}
                          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 text-sm font-medium text-center"
                        >
                          ✏️ Edit
                        </a>
                        <a 
                          href={`/resumes/${resume.id}/preview`}
                          className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 text-sm font-medium text-center"
                        >
                          👁️ Preview
                        </a>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={async () => {
                          if (!confirm('Are you sure you want to delete this resume? This action cannot be undone.')) return;
                          setDeleting(resume.id);
                          try {
                            await api.delete(`/api/v1/resumes/${resume.id}`);
                            const r = await api.get('/api/v1/resumes');
                            const data = r.data;
                            const list = Array.isArray(data) ? data : (Array.isArray(data?.content) ? data.content : []);
                            setItems(list);
                          } finally {
                            setDeleting(null);
                          }
                        }}
                        disabled={deleting === resume.id}
                        className="w-full px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 text-sm font-medium disabled:opacity-50"
                      >
                        {deleting === resume.id ? '🗑️ Deleting...' : '🗑️ Delete'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-8xl mb-6">📄</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No resumes yet
                </h3>
                <p className="text-gray-600 mb-8">
                  Get started by uploading your first resume or creating a new one from scratch.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setUploadError(null);
                      setConflictFile(null);
                      document.getElementById('file-upload')?.click();
                    }}
                    disabled={uploading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? '⏳ Uploading...' : '📁 Upload Resume'}
                  </button>
                  <p className="text-sm text-gray-500">
                    Or drag and drop a file above
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {items.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
              <div className="text-3xl mb-2">📄</div>
              <div className="text-2xl font-bold text-gray-900">{items.length}</div>
              <div className="text-gray-600">Total Resumes</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
              <div className="text-3xl mb-2">📅</div>
              <div className="text-2xl font-bold text-gray-900">
                {items.filter(r => {
                  const updated = new Date(r.updatedAt);
                  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                  return updated > weekAgo;
                }).length}
              </div>
              <div className="text-gray-600">Updated This Week</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-gray-900">
                {items.filter(r => r.title && r.title.length > 0).length}
              </div>
              <div className="text-gray-600">With Titles</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
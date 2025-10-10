'use client';

import { useState } from 'react';
import { useFileUpload } from '@/hooks/use-file-upload';
import { Resume } from '@/services/resume-service';

interface FileUploadSectionProps {
  onUploadSuccess?: (resumes: Resume[]) => void;
}

export function FileUploadSection({ onUploadSuccess }: FileUploadSectionProps) {
  const {
    uploading,
    progress,
    success,
    error,
    conflictFile,
    uploadFile,
    clearError,
    handleOverwrite,
    handleRenameAndUpload
  } = useFileUpload(onUploadSuccess);

  const [dragOver, setDragOver] = useState(false);

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
    const file = e.dataTransfer.files[0];
    if (file) {
      clearError();
      uploadFile(file);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      clearError();
      await uploadFile(file);
      e.target.value = '';
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
        dragOver
          ? 'border-blue-400 bg-blue-50'
          : uploading
          ? 'border-blue-400 bg-blue-50'
          : success
          ? 'border-green-400 bg-green-50'
          : error
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
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">
            {progress}% complete
          </p>
        </div>
      ) : success ? (
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
      ) : error ? (
        /* Error State */
        <div className="space-y-4">
          <div className="text-6xl">❌</div>
          <div>
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              Upload Failed
            </h3>
            <p className="text-red-600 mb-4">
              {error}
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
                  onClick={() => handleOverwrite(conflictFile)}
                  disabled={uploading}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200 font-medium disabled:opacity-50"
                >
                  🔄 Overwrite
                </button>
                <button
                  onClick={() => handleRenameAndUpload(conflictFile)}
                  disabled={uploading}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium disabled:opacity-50"
                >
                  📝 Rename & Upload
                </button>
                <button
                  onClick={() => {
                    clearError();
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
                clearError();
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
              onChange={handleFileSelect}
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
  );
}

'use client';

import { useState } from 'react';
import { useResumes } from '@/hooks/use-resumes';
import { FullPageLoader } from '@/components/ui/loader';
import { ResumeCard } from '@/components/resume/resume-card';
import { FileUploadSection } from '@/components/resume/file-upload-section';

export default function ResumesPage() {
  const { resumes, loading, error, refreshResumes, deleteResume } = useResumes();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteResume(id);
      // Refresh the list after deletion
      refreshResumes();
    } catch (error) {
      console.error('Failed to delete resume:', error);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <FullPageLoader text="Loading resumes..." show={true} />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Resumes</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refreshResumes}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Resumes</h1>
              <p className="text-gray-600">Manage and edit your professional resumes</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{resumes.length}</div>
              <div className="text-sm text-gray-500">Total Resumes</div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">📤</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Upload New Resume</h2>
                <p className="text-sm text-gray-500">Add a new resume to your collection</p>
              </div>
            </div>
            <FileUploadSection onUploadSuccess={refreshResumes} />
          </div>
        </div>

        {/* Resumes Grid */}
        {resumes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {resumes.map((resume) => (
                <ResumeCard
                  key={resume.id}
                  resume={resume}
                  onDelete={handleDelete}
                  deleting={deletingId === resume.id}
                />
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
                <div className="text-3xl mb-2">📄</div>
                <div className="text-2xl font-bold text-gray-900">{resumes.length}</div>
                <div className="text-gray-600">Total Resumes</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
                <div className="text-3xl mb-2">📅</div>
                <div className="text-2xl font-bold text-gray-900">
                  {resumes.filter(r => r.updatedAt && new Date(r.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                </div>
                <div className="text-gray-600">Updated This Week</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
                <div className="text-3xl mb-2">🏷️</div>
                <div className="text-2xl font-bold text-gray-900">
                  {resumes.filter(r => r.title && r.title.length > 0).length}
                </div>
                <div className="text-gray-600">With Titles</div>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="text-8xl mb-6">📄</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Resumes Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Get started by uploading your first resume. You can upload PDF, DOC, DOCX, or TXT files.
            </p>
            <div className="max-w-md mx-auto">
              <FileUploadSection onUploadSuccess={refreshResumes} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
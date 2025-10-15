'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useResumes } from '@/hooks/use-resumes';
import { FullPageLoader } from '@/components/ui/loader';
import { ResumeCard } from '@/components/resume/resume-card';
import { FileUploadSection } from '@/components/resume/file-upload-section';
import { AIResumeGenerator } from '@/components/resume/ai-resume-generator';
import { ResumeService } from '@/services/resume-service';
import { PrimaryButton, SecondaryButton } from '@/components/ui/button';
import Link from 'next/link';

export default function OverviewPage() {
  const router = useRouter();
  const { resumes, loading, error, refreshResumes, deleteResume } = useResumes();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [creatingEmpty, setCreatingEmpty] = useState(false);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteResume(id);
      refreshResumes();
    } catch (error) {
      console.error('Failed to delete resume:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCreateEmptyResume = async () => {
    setCreatingEmpty(true);
    try {
      const newResume = await ResumeService.createEmptyResume();
      
      router.push(`/resumes/${newResume.id}`);
    } catch (error) {
      console.error('Failed to create empty resume:', error);
    } finally {
      setCreatingEmpty(false);
    }
  };

  if (loading) {
    return <FullPageLoader text="Loading overview..." show={true} />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Overview</h1>
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

  // Get most recently updated resumes (max 3)
  const recentResumes = resumes
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || '').getTime() - new Date(a.updatedAt || a.createdAt || '').getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen from-slate-50 via-sky-50 to-blue-50">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Resume Overview</h1>
              <p className="text-xl text-slate-600 font-medium">Manage your professional resumes and create new ones</p>
            </div>
            <div className="text-right bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <div className="text-3xl font-bold text-slate-900">{resumes.length}</div>
              <div className="text-sm text-slate-500 font-medium">Total Resumes</div>
            </div>
          </div>
        </div>

        {/* Create Resume Section */}
        <div className="mb-12">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Create New Resume</h2>
                <p className="text-lg text-slate-600 font-medium">Create from scratch, use AI, or upload an existing file</p>
              </div>
            </div>
            
            {/* Creation Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* AI Generation */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/60 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">AI-Powered</h3>
                  <p className="text-sm text-slate-600 mb-4">Let AI create your resume from your information</p>
                  <PrimaryButton
                    onClick={() => setShowAIGenerator(true)}
                    className="w-full"
                    size="sm"
                  >
                    Generate with AI
                  </PrimaryButton>
                </div>
              </div>

              {/* Empty Resume */}
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200/60 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Start from Scratch</h3>
                  <p className="text-sm text-slate-600 mb-4">Create a blank resume and build it step by step</p>
                  <SecondaryButton
                    onClick={handleCreateEmptyResume}
                    disabled={creatingEmpty}
                    className="w-full"
                    size="sm"
                  >
                    {creatingEmpty ? 'Creating...' : 'Create Empty'}
                  </SecondaryButton>
                </div>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="border-t border-slate-200/60 pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Upload Existing Resume</h3>
                  <p className="text-sm text-slate-600">Upload PDF, DOC, DOCX, or TXT files</p>
                </div>
              </div>
              <FileUploadSection onUploadSuccess={refreshResumes} />
            </div>
          </div>
        </div>

        {/* Recent Resumes & Stats */}
        {resumes.length > 0 ? (
          <>
            {/* Recent Resumes */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Recent Resumes</h2>
                  <p className="text-slate-600">Your most recently updated resumes</p>
                </div>
                <Link
                  href="/resumes"
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors flex items-center gap-2"
                >
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              {recentResumes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recentResumes.map((resume) => (
                    <ResumeCard
                      key={resume.id}
                      resume={resume}
                      onDelete={handleDelete}
                      deleting={deletingId === resume.id}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600">No resumes found</p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{resumes.length}</div>
                <div className="text-slate-600 font-medium">Total Resumes</div>
              </div>
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {resumes.filter(r => r.updatedAt && new Date(r.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                </div>
                <div className="text-slate-600 font-medium">Updated This Week</div>
              </div>
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {resumes.filter(r => r.title && r.title.length > 0).length}
                </div>
                <div className="text-slate-600 font-medium">With Titles</div>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-400 to-slate-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">No Resumes Yet</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Get started by creating your first resume. Choose from AI generation, starting from scratch, or uploading a file.
            </p>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
              <PrimaryButton
                onClick={() => setShowAIGenerator(true)}
                className="flex-1"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate with AI
              </PrimaryButton>
              <SecondaryButton
                onClick={handleCreateEmptyResume}
                disabled={creatingEmpty}
                className="flex-1"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {creatingEmpty ? 'Creating...' : 'Start from Scratch'}
              </SecondaryButton>
            </div>
            
            <div className="max-w-md mx-auto">
              <FileUploadSection onUploadSuccess={refreshResumes} />
            </div>
          </div>
        )}

        {/* AI Resume Generator Modal */}
        {showAIGenerator && (
          <AIResumeGenerator
            onClose={() => setShowAIGenerator(false)}
            onSuccess={() => {
              setShowAIGenerator(false);
              refreshResumes();
            }}
          />
        )}
      </div>
    </div>
  );
}

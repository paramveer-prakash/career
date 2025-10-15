'use client';

import { useState, useMemo } from 'react';
import { useResumes } from '@/hooks/use-resumes';
import { FullPageLoader } from '@/components/ui/loader';
import { ResumeCard } from '@/components/resume/resume-card';
import Link from 'next/link';

export default function ResumesPage() {
  const { resumes, loading, error, refreshResumes, deleteResume } = useResumes();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'title' | 'created'>('recent');

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

  // Filter and sort resumes
  const filteredAndSortedResumes = useMemo(() => {
    let filtered = resumes;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = resumes.filter(resume => 
        (resume.title?.toLowerCase().includes(query)) ||
        (resume.primaryName?.toLowerCase().includes(query)) ||
        (resume.primaryEmail?.toLowerCase().includes(query))
      );
    }

    // Sort resumes
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return (a.title || a.primaryName || '').localeCompare(b.title || b.primaryName || '');
        case 'created':
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
        case 'recent':
        default:
          return new Date(b.updatedAt || b.createdAt || '').getTime() - new Date(a.updatedAt || a.createdAt || '').getTime();
      }
    });
  }, [resumes, searchQuery, sortBy]);

  if (loading) {
    return <FullPageLoader text="Loading resumes..." show={true} />;
  }

  if (error) {
    return (
      <div className="min-h-screen from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
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
    <div className="min-h-screen from-slate-50 via-sky-50 to-blue-50">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">All Resumes</h1>
              <p className="text-xl text-slate-600 font-medium">
                {filteredAndSortedResumes.length} of {resumes.length} resumes
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
            <Link
              href="/overview"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New
            </Link>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by title, name, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg className="h-5 w-5 text-slate-400 hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="md:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'title' | 'created')}
                className="block w-full px-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="recent">Recently Updated</option>
                <option value="title">Title A-Z</option>
                <option value="created">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Resumes Grid */}
        {filteredAndSortedResumes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedResumes.map((resume) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                onDelete={handleDelete}
                deleting={deletingId === resume.id}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-400 to-slate-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchQuery ? (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">No Resumes Found</h2>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  No resumes match your search for "{searchQuery}". Try adjusting your search terms.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Clear Search
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">No Resumes Yet</h2>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  Get started by creating your first resume from the overview page.
                </p>
                <Link
                  href="/overview"
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Your First Resume
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
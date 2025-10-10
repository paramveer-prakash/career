'use client';

import { useState } from 'react';
import { Resume } from '@/services/resume-service';
import { getTimeAgo } from '@/utils/date-utils';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';

interface ResumeCardProps {
  resume: Resume;
  onDelete: (id: string) => void;
  deleting?: boolean;
}

export function ResumeCard({ resume, onDelete, deleting = false }: ResumeCardProps) {
  const [deleteDialog, setDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDelete(resume.id);
    setDeleteDialog(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 break-words line-clamp-2">
              {resume.title || resume.primaryName || 'Untitled Resume'}
            </h3>
            {resume.primaryEmail && (
              <p className="text-gray-600 text-sm mb-2 break-all">{resume.primaryEmail}</p>
            )}
            {resume.updatedAt && (
              <p className="text-gray-500 text-xs">
                Updated {getTimeAgo(resume.updatedAt)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-xs text-gray-500">Active</span>
          </div>
        </div>

        <div className="flex gap-2">
          <a
            href={`/resumes/${resume.id}`}
            className="flex-1 px-4 py-2 text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 text-sm font-medium"
          >
            ✏️ Edit
          </a>
          <a
            href={`/resumes/${resume.id}/preview`}
            className="flex-1 px-4 py-2 text-center bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 text-sm font-medium"
          >
            👁️ Preview
          </a>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => setDeleteDialog(true)}
            disabled={deleting}
            className="w-full px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 text-sm font-medium disabled:opacity-50"
          >
            {deleting ? '⏳ Deleting...' : '🗑️ Delete'}
          </button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Resume"
        message={`Are you sure you want to delete "${resume.title || resume.primaryName || 'Untitled Resume'}"? This action cannot be undone and will permanently remove the resume and all its data.`}
        confirmText="Delete Resume"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
}

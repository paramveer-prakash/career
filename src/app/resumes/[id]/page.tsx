'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useResume } from '@/hooks/use-resume';
import { FullPageLoader } from '@/components/ui/loader';
import { SuccessButton, DestructiveButton } from '@/components/ui/button';
import { SecondaryLinkButton } from '@/components/ui/link-button';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { PrimaryInfoSection } from '@/components/resume/sections/primary-info-section';
import { SkillsSection } from '@/components/resume/sections/skills-section';
import { WorkExperienceSection } from '@/components/resume/sections/work-experience-section';
import { EducationSection } from '@/components/resume/sections/education-section';
import { CertificationsSection } from '@/components/resume/sections/certifications-section';

export default function ResumeEditorPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const { resume, loading, error, updateResume, deleteResume } = useResume(id);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; resumeId: string | null; resumeTitle: string }>({
    isOpen: false,
    resumeId: null,
    resumeTitle: ''
  });

  const handleSave = async () => {
    if (!resume) return;
    
    setSaving(true);
    try {
      await updateResume(resume);
    } catch (error) {
      console.error('Failed to save resume:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    setDeleting(true);
    try {
      await deleteResume();
      window.location.href = '/resumes';
    } catch (error) {
      console.error('Failed to delete resume:', error);
    } finally {
      setDeleting(false);
    }
  };

  const openDeleteDialog = () => {
    setDeleteDialog({
      isOpen: true,
      resumeId: id,
      resumeTitle: resume?.title || resume?.primaryName || 'Untitled Resume'
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      isOpen: false,
      resumeId: null,
      resumeTitle: ''
    });
  };

  if (loading) {
    return <FullPageLoader text="Loading resume..." show={true} />;
  }

  if (error || !resume) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Resume</h1>
          <p className="text-gray-600 mb-4">{error || 'Resume not found'}</p>
          <SecondaryLinkButton href="/resumes" className="px-6 py-2">
            ← Back to Resumes
          </SecondaryLinkButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Editor</h1>
              <p className="text-gray-600">Create and edit your professional resume</p>
            </div>
            <div className="flex gap-3">
              <SecondaryLinkButton 
                href={`/resumes/${id}/preview`}
                loadingText="Loading preview..."
                className="px-6 py-2.5"
              >
                👁️ Preview
              </SecondaryLinkButton>
              <SuccessButton
                loading={saving}
                loadingText="Saving..."
                onClick={handleSave}
                className="px-6 py-2.5"
              >
                💾 Save Resume
              </SuccessButton>
              <DestructiveButton
                loading={deleting}
                loadingText="Deleting..."
                onClick={openDeleteDialog}
                className="px-6 py-2.5"
              >
                🗑️ Delete
              </DestructiveButton>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Primary Info */}
          <div className="lg:col-span-1 space-y-6">
            <PrimaryInfoSection 
              resume={resume} 
              onUpdate={updateResume} 
            />
          </div>

          {/* Right Column - Sections */}
          <div className="lg:col-span-2 space-y-6">
            <SkillsSection resumeId={id} resume={resume} />
            <WorkExperienceSection resumeId={id} resume={resume} />
            <EducationSection resumeId={id} resume={resume} />
            <CertificationsSection resumeId={id} resume={resume} />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
        title="Delete Resume"
        message={`Are you sure you want to delete "${deleteDialog.resumeTitle}"? This action cannot be undone and will permanently remove the resume and all its data.`}
        confirmText="Delete Resume"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}
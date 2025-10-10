'use client';

import { useState } from 'react';
import { PrimaryButton } from '@/components/ui/button';
import { useCertifications } from '@/hooks/use-certifications';
import { Certification } from '@/services/resume-service';

interface CertificationsSectionProps {
  resumeId: string;
}

export function CertificationsSection({ resumeId }: CertificationsSectionProps) {
  const { 
    certifications, 
    loading, 
    addCertification, 
    updateCertification, 
    deleteCertification 
  } = useCertifications(resumeId);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCertification, setNewCertification] = useState<Partial<Certification>>({
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    sortOrder: 0,
    isVisible: true
  });

  const handleAddCertification = async () => {
    if (!newCertification.name) return;
    
    try {
      await addCertification(newCertification as Omit<Certification, 'id'>);
      setNewCertification({
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        credentialId: '',
        credentialUrl: '',
        sortOrder: 0,
        isVisible: true
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add certification:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">🏆</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Certifications</h2>
            <p className="text-sm text-gray-500">Your professional certifications</p>
          </div>
        </div>
        <PrimaryButton
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2"
        >
          + Add Certification
        </PrimaryButton>
      </div>

      {/* Add New Certification Form */}
      {showAddForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-md font-medium text-gray-900 mb-4">Add New Certification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
              <input
                type="text"
                value={newCertification.name || ''}
                onChange={(e) => setNewCertification(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., AWS Certified Solutions Architect"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
              <input
                type="text"
                value={newCertification.issuer || ''}
                onChange={(e) => setNewCertification(prev => ({ ...prev, issuer: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., Amazon Web Services"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
              <input
                type="date"
                value={newCertification.issueDate || ''}
                onChange={(e) => setNewCertification(prev => ({ ...prev, issueDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                type="date"
                value={newCertification.expiryDate || ''}
                onChange={(e) => setNewCertification(prev => ({ ...prev, expiryDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Credential ID</label>
              <input
                type="text"
                value={newCertification.credentialId || ''}
                onChange={(e) => setNewCertification(prev => ({ ...prev, credentialId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., AWS-123456"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Credential URL</label>
              <input
                type="url"
                value={newCertification.credentialUrl || ''}
                onChange={(e) => setNewCertification(prev => ({ ...prev, credentialUrl: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <PrimaryButton onClick={handleAddCertification} className="px-4 py-2">
              Add Certification
            </PrimaryButton>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Certifications List */}
      <div className="space-y-4">
        {certifications.length > 0 ? (
          certifications.map((certification) => (
            <div key={certification.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={certification.name}
                    onChange={(e) => updateCertification(certification.id, { name: e.target.value })}
                    className="text-lg font-semibold text-gray-900 border-0 bg-transparent focus:ring-0 focus:outline-none w-full"
                    placeholder="Certification Name"
                  />
                  <input
                    type="text"
                    value={certification.issuer || ''}
                    onChange={(e) => updateCertification(certification.id, { issuer: e.target.value })}
                    className="text-gray-600 border-0 bg-transparent focus:ring-0 focus:outline-none w-full"
                    placeholder="Issuer"
                  />
                </div>
                <button
                  onClick={() => deleteCertification(certification.id)}
                  className="text-red-400 hover:text-red-600 ml-2"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="date"
                  value={certification.issueDate || ''}
                  onChange={(e) => updateCertification(certification.id, { issueDate: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
                <input
                  type="date"
                  value={certification.expiryDate || ''}
                  onChange={(e) => updateCertification(certification.id, { expiryDate: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={certification.credentialId || ''}
                  onChange={(e) => updateCertification(certification.id, { credentialId: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  placeholder="Credential ID"
                />
                <input
                  type="url"
                  value={certification.credentialUrl || ''}
                  onChange={(e) => updateCertification(certification.id, { credentialUrl: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  placeholder="Credential URL"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
            No certifications added yet. Click &quot;Add Certification&quot; to get started.
          </div>
        )}
      </div>
    </div>
  );
}

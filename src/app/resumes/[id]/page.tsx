'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { FullPageLoader } from '@/components/ui/loader';
import { Button, PrimaryButton, SuccessButton, DestructiveButton } from '@/components/ui/button';
import { SecondaryLinkButton } from '@/components/ui/link-button';

export default function Page(){
  const params=useParams();
  const id=params?.id as string;
  const [resume,setResume]=useState<any>(null);
  const [saving,setSaving]=useState(false);
  const [deleting,setDeleting]=useState(false);

  useEffect(()=>{(async()=>{ if(!id) return; try{ const r=await api.get('/api/v1/resumes/'+id); setResume(r.data);} catch(e){ console.error('Failed to load resume', e); setResume(null);} })();},[id]);

  if(!resume) return <FullPageLoader text="Loading resume..." show={true} />;

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
                onClick={async()=>{ 
                  setSaving(true); 
                  try {
                    await api.put('/api/v1/resumes/'+id, resume); 
                  } finally {
                    setSaving(false); 
                  }
                }}
                className="px-6 py-2.5"
              >
                💾 Save Resume
              </SuccessButton>
              <DestructiveButton
                loading={deleting}
                loadingText="Deleting..."
                onClick={async()=>{ 
                  if(!confirm('Are you sure you want to delete this resume? This action cannot be undone.')) return; 
                  setDeleting(true);
                  try {
                    await api.delete('/api/v1/resumes/'+id); 
                    window.location.href = '/resumes';
                  } finally {
                    setDeleting(false);
                  }
                }}
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
            <PrimaryInfoSection resume={resume} setResume={setResume} />
          </div>

          {/* Right Column - Sections */}
          <div className="lg:col-span-2 space-y-6">
            <SkillsSection resumeId={id} />
            <WorkExperienceSection resumeId={id} />
            <EducationSection resumeId={id} />
            <CertificationsSection resumeId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PrimaryInfoSection({ resume, setResume }: { resume: any, setResume: (resume: any) => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">👤</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Resume Title</label>
          <textarea 
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none" 
            rows={3} 
            value={resume.title||''} 
            onChange={e=>setResume({...resume, title:e.target.value})}
            placeholder="e.g., Senior Software Engineer Resume"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input 
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
            value={resume.primaryName||''} 
            onChange={e=>setResume({...resume, primaryName:e.target.value})}
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            type="email"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
            value={resume.primaryEmail||''} 
            onChange={e=>setResume({...resume, primaryEmail:e.target.value})}
            placeholder="john.doe@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input 
            type="tel"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
            value={resume.primaryPhone||''} 
            onChange={e=>setResume({...resume, primaryPhone:e.target.value})}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input 
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
            value={resume.primaryLocation||''} 
            onChange={e=>setResume({...resume, primaryLocation:e.target.value})}
            placeholder="San Francisco, CA"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
          <textarea 
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none" 
            rows={4} 
            value={resume.summary||''} 
            onChange={e=>setResume({...resume, summary:e.target.value})}
            placeholder="Brief professional summary highlighting your key strengths and career objectives..."
          />
        </div>
      </div>
    </div>
  );
}

function SkillsSection({ resumeId }: { resumeId: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await api.get(`/api/v1/resumes/${resumeId}/skills`);
        const d = r.data;
        const list = Array.isArray(d) ? d : (Array.isArray(d?.content) ? d.content : []);
        const normalized = list.map((s: any) => ({ id: s.id, name: s.name || s.skill || s.label || '' }));
        setItems(normalized);
      } catch (e) {
        console.error('Failed to load skills', e);
        setItems([]);
      }
    })();
  }, [resumeId]);

  const addSkill = async () => {
    if (!newSkill.trim()) return;
    setLoading(true);
    try {
      await api.post(`/api/v1/resumes/${resumeId}/skills`, { name: newSkill.trim() });
      const r = await api.get(`/api/v1/resumes/${resumeId}/skills`);
      const d = r.data;
      setItems(Array.isArray(d) ? d : (Array.isArray(d?.content) ? d.content : []));
      setNewSkill('');
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (skillId: string) => {
    setLoading(true);
    try {
      await api.delete(`/api/v1/resumes/${resumeId}/skills/${skillId}`);
      const r = await api.get(`/api/v1/resumes/${resumeId}/skills`);
      const d = r.data;
      setItems(Array.isArray(d) ? d : (Array.isArray(d?.content) ? d.content : []));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">🛠️</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Skills</h2>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3">
          <input 
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200" 
            placeholder="Add a skill (e.g., JavaScript, Python, React)" 
            value={newSkill} 
            onChange={e => setNewSkill(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && addSkill()}
          />
          <PrimaryButton 
            onClick={addSkill}
            disabled={loading || !newSkill.trim()}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            {loading ? 'Adding...' : 'Add'}
          </PrimaryButton>
        </div>

        {items.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {items.map((skill: any) => (
              <div key={skill.id} className="group relative">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full text-green-800 font-medium">
                  {skill.name}
                  <button 
                    onClick={() => deleteSkill(skill.id)}
                    className="ml-1 text-green-600 hover:text-red-600 transition-colors"
                    disabled={loading}
                  >
                    ×
                  </button>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🎯</div>
            <p>No skills added yet. Add your first skill above!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function WorkExperienceSection({ resumeId }: { resumeId: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await api.get(`/api/v1/resumes/${resumeId}/work-experiences`);
        const d = r.data;
        setItems(Array.isArray(d) ? d : (Array.isArray(d?.content) ? d.content : []));
      } catch (e) {
        console.error('Failed to load work experiences', e);
        setItems([]);
      }
    })();
  }, [resumeId]);

  const addWorkExperience = async () => {
    setLoading(true);
    try {
      await api.post(`/api/v1/resumes/${resumeId}/work-experiences`, { jobTitle: 'New Position' });
      const r = await api.get(`/api/v1/resumes/${resumeId}/work-experiences`);
      setItems(r.data || []);
    } finally {
      setLoading(false);
    }
  };

  const updateWorkExperience = (workExpId: string, updatedWorkExp: any) => {
    setItems(items.map(item => item.id === workExpId ? updatedWorkExp : item));
  };

  const saveWorkExperience = async (workExp: any) => {
    setLoading(true);
    try {
      await api.put(`/api/v1/resumes/${resumeId}/work-experiences/${workExp.id}`, workExp);
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkExperience = async (workExpId: string) => {
    if (!confirm('Are you sure you want to delete this work experience?')) return;
    setLoading(true);
    try {
      await api.delete(`/api/v1/resumes/${resumeId}/work-experiences/${workExpId}`);
      const r = await api.get(`/api/v1/resumes/${resumeId}/work-experiences`);
      setItems(r.data || []);
    } finally {
      setLoading(false);
    }
  };

  const addResponsibility = (workExpId: string) => {
    const workExp = items.find(item => item.id === workExpId);
    if (workExp) {
      const newResponsibility = {
        id: `temp-${Date.now()}`,
        description: 'New responsibility',
        sortOrder: workExp.responsibilities ? workExp.responsibilities.length : 0,
        isVisible: true
      };
      const updatedWorkExp = {
        ...workExp,
        responsibilities: [...(workExp.responsibilities || []), newResponsibility]
      };
      updateWorkExperience(workExpId, updatedWorkExp);
    }
  };

  const updateResponsibility = (workExpId: string, respId: string, field: string, value: any) => {
    const workExp = items.find(item => item.id === workExpId);
    if (workExp && workExp.responsibilities) {
      const updatedResponsibilities = workExp.responsibilities.map((resp: any) => 
        resp.id === respId ? { ...resp, [field]: value } : resp
      );
      const updatedWorkExp = { ...workExp, responsibilities: updatedResponsibilities };
      updateWorkExperience(workExpId, updatedWorkExp);
    }
  };

  const deleteResponsibility = (workExpId: string, respId: string) => {
    const workExp = items.find(item => item.id === workExpId);
    if (workExp && workExp.responsibilities) {
      const updatedResponsibilities = workExp.responsibilities.filter((resp: any) => resp.id !== respId);
      const updatedWorkExp = { ...workExp, responsibilities: updatedResponsibilities };
      updateWorkExperience(workExpId, updatedWorkExp);
    }
  };

  const moveResponsibility = (workExpId: string, respId: string, direction: 'up' | 'down') => {
    const workExp = items.find(item => item.id === workExpId);
    if (workExp && workExp.responsibilities) {
      const responsibilities = [...workExp.responsibilities];
      const currentIndex = responsibilities.findIndex((resp: any) => resp.id === respId);
      
      if (currentIndex === -1) return;
      
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      
      if (newIndex >= 0 && newIndex < responsibilities.length) {
        [responsibilities[currentIndex], responsibilities[newIndex]] = [responsibilities[newIndex], responsibilities[currentIndex]];
        responsibilities.forEach((resp: any, index: number) => {
          resp.sortOrder = index;
        });
        const updatedWorkExp = { ...workExp, responsibilities };
        updateWorkExperience(workExpId, updatedWorkExp);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">💼</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Work Experience</h2>
        </div>
        <PrimaryButton 
          onClick={addWorkExperience}
          disabled={loading}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
        >
          {loading ? 'Adding...' : '+ Add Experience'}
        </PrimaryButton>
      </div>

      <div className="space-y-6">
        {items.length > 0 ? (
          items.map((workExp: any) => (
            <div key={workExp.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <input 
                  className="w-full text-lg font-semibold border-0 border-b-2 border-transparent focus:border-blue-500 focus:ring-0 bg-transparent pb-2" 
                  value={workExp.jobTitle || ''} 
                  onChange={e => {
                    const updated = { ...workExp, jobTitle: e.target.value };
                    updateWorkExperience(workExp.id, updated);
                  }}
                  placeholder="Job Title"
                />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-700">Responsibilities</h4>
                    <button 
                      onClick={() => addResponsibility(workExp.id)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      + Add Responsibility
                    </button>
                  </div>

                  {Array.isArray(workExp.responsibilities) && workExp.responsibilities.length > 0 ? (
                    <div className="space-y-2">
                      {workExp.responsibilities.map((resp: any, idx: number) => (
                        <div key={resp.id || idx} className="group flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white rounded text-xs disabled:opacity-30"
                              onClick={() => moveResponsibility(workExp.id, resp.id, 'up')}
                              disabled={idx === 0}
                            >
                              ↑
                            </button>
                            <button 
                              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white rounded text-xs disabled:opacity-30"
                              onClick={() => moveResponsibility(workExp.id, resp.id, 'down')}
                              disabled={idx === workExp.responsibilities.length - 1}
                            >
                              ↓
                            </button>
                          </div>
                          
                          <textarea 
                            className="flex-1 border-0 bg-transparent resize-none focus:ring-0 focus:outline-none text-sm" 
                            rows={2}
                            value={resp.description || ''} 
                            onChange={e => updateResponsibility(workExp.id, resp.id, 'description', e.target.value)}
                            placeholder="Describe your responsibility..."
                          />
                          
                          <button 
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600"
                            onClick={() => deleteResponsibility(workExp.id, resp.id)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                      No responsibilities added yet. Click "Add Responsibility" to get started.
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <SuccessButton 
                    size="sm" 
                    onClick={() => saveWorkExperience(workExp)}
                    disabled={loading}
                    className="px-4 py-2"
                  >
                    💾 Save
                  </SuccessButton>
                  <DestructiveButton 
                    size="sm" 
                    onClick={() => deleteWorkExperience(workExp.id)}
                    disabled={loading}
                    className="px-4 py-2"
                  >
                    🗑️ Delete
                  </DestructiveButton>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-lg font-medium mb-2">No work experience yet</h3>
            <p className="text-sm">Add your first work experience to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function EducationSection({ resumeId }: { resumeId: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await api.get(`/api/v1/resumes/${resumeId}/educations`);
        const d = r.data;
        setItems(Array.isArray(d) ? d : (Array.isArray(d?.content) ? d.content : []));
      } catch (e) {
        console.error('Failed to load educations', e);
        setItems([]);
      }
    })();
  }, [resumeId]);

  const addEducation = async () => {
    setLoading(true);
    try {
      await api.post(`/api/v1/resumes/${resumeId}/educations`, { institution: 'New Institution' });
      const r = await api.get(`/api/v1/resumes/${resumeId}/educations`);
      setItems(r.data || []);
    } finally {
      setLoading(false);
    }
  };

  const saveEducation = async (education: any) => {
    setLoading(true);
    try {
      await api.put(`/api/v1/resumes/${resumeId}/educations/${education.id}`, education);
    } finally {
      setLoading(false);
    }
  };

  const deleteEducation = async (educationId: string) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return;
    setLoading(true);
    try {
      await api.delete(`/api/v1/resumes/${resumeId}/educations/${educationId}`);
      const r = await api.get(`/api/v1/resumes/${resumeId}/educations`);
      setItems(r.data || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">🎓</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Education</h2>
        </div>
        <PrimaryButton 
          onClick={addEducation}
          disabled={loading}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
        >
          {loading ? 'Adding...' : '+ Add Education'}
        </PrimaryButton>
      </div>

      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((education: any) => (
            <div key={education.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <input 
                  className="w-full font-semibold border-0 border-b-2 border-transparent focus:border-purple-500 focus:ring-0 bg-transparent pb-2" 
                  value={education.institution || ''} 
                  onChange={e => {
                    const updated = { ...education, institution: e.target.value };
                    setItems(items.map(item => item.id === education.id ? updated : item));
                  }}
                  placeholder="Institution Name"
                />
                <div className="flex gap-2">
                  <SuccessButton 
                    size="sm" 
                    onClick={() => saveEducation(education)}
                    disabled={loading}
                    className="px-3 py-1"
                  >
                    💾 Save
                  </SuccessButton>
                  <DestructiveButton 
                    size="sm" 
                    onClick={() => deleteEducation(education.id)}
                    disabled={loading}
                    className="px-3 py-1"
                  >
                    🗑️ Delete
                  </DestructiveButton>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🎓</div>
            <p>No education entries yet. Add your first education above!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CertificationsSection({ resumeId }: { resumeId: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [newCert, setNewCert] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await api.get(`/api/v1/resumes/${resumeId}/certifications`);
        const d = r.data;
        setItems(Array.isArray(d) ? d : (Array.isArray(d?.content) ? d.content : []));
      } catch (e) {
        console.error('Failed to load certifications', e);
        setItems([]);
      }
    })();
  }, [resumeId]);

  const addCertification = async () => {
    if (!newCert.trim()) return;
    setLoading(true);
    try {
      await api.post(`/api/v1/resumes/${resumeId}/certifications`, { name: newCert.trim() });
      const r = await api.get(`/api/v1/resumes/${resumeId}/certifications`);
      setItems(r.data || []);
      setNewCert('');
    } finally {
      setLoading(false);
    }
  };

  const deleteCertification = async (certId: string) => {
    setLoading(true);
    try {
      await api.delete(`/api/v1/resumes/${resumeId}/certifications/${certId}`);
      const r = await api.get(`/api/v1/resumes/${resumeId}/certifications`);
      setItems(r.data || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">🏆</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Certifications</h2>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3">
          <input 
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200" 
            placeholder="Add a certification (e.g., AWS Certified Solutions Architect)" 
            value={newCert} 
            onChange={e => setNewCert(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && addCertification()}
          />
          <PrimaryButton 
            onClick={addCertification}
            disabled={loading || !newCert.trim()}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
          >
            {loading ? 'Adding...' : 'Add'}
          </PrimaryButton>
        </div>

        {items.length > 0 ? (
          <div className="space-y-2">
            {items.map((cert: any) => (
              <div key={cert.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg">
                <span className="font-medium text-orange-800">{cert.name}</span>
                <button 
                  onClick={() => deleteCertification(cert.id)}
                  className="text-orange-600 hover:text-red-600 transition-colors"
                  disabled={loading}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🏆</div>
            <p>No certifications added yet. Add your first certification above!</p>
          </div>
        )}
      </div>
    </div>
  );
}
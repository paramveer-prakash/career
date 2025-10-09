'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { LoadingButton, FullPageLoader } from '@/components/ui/loader';

export default function Page(){
  const params=useParams();
  const id=params?.id as string;
  const [resume,setResume]=useState<any>(null);
  const [saving,setSaving]=useState(false);
  const [deleting,setDeleting]=useState(false);

  useEffect(()=>{(async()=>{ if(!id) return; try{ const r=await api.get('/api/v1/resumes/'+id); setResume(r.data);} catch(e){ console.error('Failed to load resume', e); setResume(null);} })();},[id]);

  if(!resume) return <FullPageLoader text="Loading resume..." show={true} />;

  return (
    <div className="space-y-8">
      <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Primary Info</h2>
          <div className="flex gap-2">
            <a href={`/resumes/${id}/preview`} className="px-4 py-2 rounded bg-gray-100 text-gray-900 hover:bg-gray-200">Preview</a>
            <LoadingButton
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
              variant="primary"
              className="bg-green-600 hover:bg-green-700"
            >
              Save
            </LoadingButton>
            <LoadingButton
              loading={deleting}
              loadingText="Deleting..."
              onClick={async()=>{ 
                if(!confirm('Delete this resume?')) return; 
                setDeleting(true);
                try {
                  await api.delete('/api/v1/resumes/'+id); 
                  window.location.href='/resumes'; 
                } finally {
                  setDeleting(false);
                }
              }} 
              variant="primary"
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </LoadingButton>
          </div>
        </div>
        <label className="space-y-1 block"><span className="text-sm text-gray-600">Resume Title</span><textarea className="border border-gray-300 bg-white px-3 py-2 rounded w-full" rows={4} value={resume.title||''} onChange={e=>setResume({...resume, title:e.target.value})} /></label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="space-y-1"><span className="text-sm text-gray-600">Name</span><input className="border border-gray-300 bg-white px-3 py-2 rounded w-full" value={resume.primaryName||''} onChange={e=>setResume({...resume, primaryName:e.target.value})} /></label>
          <label className="space-y-1"><span className="text-sm text-gray-600">Email</span><input className="border border-gray-300 bg-white px-3 py-2 rounded w-full" value={resume.primaryEmail||''} onChange={e=>setResume({...resume, primaryEmail:e.target.value})} /></label>
          <label className="space-y-1"><span className="text-sm text-gray-600">Phone</span><input className="border border-gray-300 bg-white px-3 py-2 rounded w-full" value={resume.primaryPhone||''} onChange={e=>setResume({...resume, primaryPhone:e.target.value})} /></label>
          <label className="space-y-1"><span className="text-sm text-gray-600">Location</span><input className="border border-gray-300 bg-white px-3 py-2 rounded w-full" value={resume.primaryLocation||''} onChange={e=>setResume({...resume, primaryLocation:e.target.value})} /></label>
        </div>
        <label className="space-y-1 block"><span className="text-sm text-gray-600">Summary</span><textarea className="border border-gray-300 bg-white px-3 py-2 rounded w-full" rows={4} value={resume.summary||''} onChange={e=>setResume({...resume, summary:e.target.value})} /></label>
      </section>

      <Section title="Skills"><SkillsEditor resumeId={id} /></Section>
      <Section title="Work Experience"><WorkExpEditor resumeId={id} /></Section>
      <Section title="Education"><EduEditor resumeId={id} /></Section>
      <Section title="Certifications"><CertsEditor resumeId={id} /></Section>
    </div>
  );
}

function Section({title, children}:{title:string, children:React.ReactNode}){
  return (
    <section className="space-y-3 rounded-xl border border-gray-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function SkillsEditor({resumeId}:{resumeId:string}){
  const [items,setItems]=useState<any[]>([]);
  const [newSkill,setNewSkill]=useState('');
  useEffect(()=>{(async()=>{try{const r=await api.get(`/api/v1/resumes/${resumeId}/skills`); const d=r.data; const list=Array.isArray(d)?d:(Array.isArray(d?.content)?d.content:[]); const normalized=list.map((s:any)=> ({ id:s.id, name:s.name || s.skill || s.label || '' })); setItems(normalized);}catch(e){console.error('Failed to load skills', e); setItems([]);}})();},[resumeId]);
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input className="border border-gray-300 bg-white px-3 py-2 rounded flex-1" placeholder="Add skill" value={newSkill} onChange={e=>setNewSkill(e.target.value)} />
        <button className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={async()=>{ if(!newSkill) return; await api.post(`/api/v1/resumes/${resumeId}/skills`, { name:newSkill }); const r=await api.get(`/api/v1/resumes/${resumeId}/skills`); const d=r.data; setItems(Array.isArray(d)?d:(Array.isArray(d?.content)?d.content:[])); setNewSkill(''); }}>Add</button>
      </div>
      <ul className="space-y-2">{items.map((s:any)=> (
        <li key={s.id} className="flex justify-between items-center p-3 rounded-lg border border-gray-200 bg-white">
          <span>{s.name}</span>
          <button className="text-red-600 hover:text-red-700" onClick={async()=>{ await api.delete(`/api/v1/resumes/${resumeId}/skills/${s.id}`); const r=await api.get(`/api/v1/resumes/${resumeId}/skills`); const d=r.data; setItems(Array.isArray(d)?d:(Array.isArray(d?.content)?d.content:[])); }}>Delete</button>
        </li>
      ))}</ul>
    </div>
  );
}

function WorkExpEditor({resumeId}:{resumeId:string}){
  const [items,setItems]=useState<any[]>([]);
  useEffect(()=>{(async()=>{try{const r=await api.get(`/api/v1/resumes/${resumeId}/work-experiences`); const d=r.data; setItems(Array.isArray(d)?d:(Array.isArray(d?.content)?d.content:[]));}catch(e){console.error('Failed to load work experiences', e); setItems([]);}})();},[resumeId]);
  return (
    <div className="space-y-2">
      <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={async()=>{ await api.post(`/api/v1/resumes/${resumeId}/work-experiences`, { jobTitle:'New role' }); const r=await api.get(`/api/v1/resumes/${resumeId}/work-experiences`); setItems(r.data||[]); }}>Add experience</button>
      <ul className="space-y-2">{items.map((w:any)=> (
        <li key={w.id} className="border rounded p-3 space-y-3">
          <input className="border px-2 py-1 rounded w-full" value={w.jobTitle||''} onChange={e=>{ const v={...w, jobTitle:e.target.value}; setItems(items.map(x=>x.id===w.id?v:x)); }} />
          {Array.isArray(w.responsibilities) && w.responsibilities.length>0 && (
            <ul className="list-disc pl-5 space-y-1">
              {w.responsibilities.map((r:any, idx:number)=> (
                <li key={r.id || idx} className="text-sm text-gray-700">{r.description}</li>
              ))}
            </ul>
          )}
          <div className="flex gap-2">
            <button className="px-2 py-1 rounded bg-green-600 text-white" onClick={async()=>{ await api.put(`/api/v1/resumes/${resumeId}/work-experiences/${w.id}`, w); }}>Save</button>
            <button className="px-2 py-1 rounded bg-red-600 text-white" onClick={async()=>{ await api.delete(`/api/v1/resumes/${resumeId}/work-experiences/${w.id}`); const r=await api.get(`/api/v1/resumes/${resumeId}/work-experiences`); setItems(r.data||[]); }}>Delete</button>
          </div>
        </li>
      ))}</ul>
    </div>
  );
}

function EduEditor({resumeId}:{resumeId:string}){
  const [items,setItems]=useState<any[]>([]);
  useEffect(()=>{(async()=>{try{const r=await api.get(`/api/v1/resumes/${resumeId}/educations`); const d=r.data; setItems(Array.isArray(d)?d:(Array.isArray(d?.content)?d.content:[]));}catch(e){console.error('Failed to load educations', e); setItems([]);}})();},[resumeId]);
  return (
    <div className="space-y-2">
      <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={async()=>{ await api.post(`/api/v1/resumes/${resumeId}/educations`, { institution:'New school' }); const r=await api.get(`/api/v1/resumes/${resumeId}/educations`); setItems(r.data||[]); }}>Add education</button>
      <ul className="space-y-2">{items.map((e:any)=> (
        <li key={e.id} className="border rounded p-3 space-y-2">
          <input className="border px-2 py-1 rounded w-full" value={e.institution||''} onChange={ev=>{ const v={...e, institution:ev.target.value}; setItems(items.map(x=>x.id===e.id?v:x)); }} />
          <div className="flex gap-2">
            <button className="px-2 py-1 rounded bg-green-600 text-white" onClick={async()=>{ await api.put(`/api/v1/resumes/${resumeId}/educations/${e.id}`, e); }}>Save</button>
            <button className="px-2 py-1 rounded bg-red-600 text-white" onClick={async()=>{ await api.delete(`/api/v1/resumes/${resumeId}/educations/${e.id}`); const r=await api.get(`/api/v1/resumes/${resumeId}/educations`); setItems(r.data||[]); }}>Delete</button>
          </div>
        </li>
      ))}</ul>
    </div>
  );
}

function ContactsEditor({resumeId}:{resumeId:string}){
  const [items,setItems]=useState<any[]>([]);
  const [value,setValue]=useState('');
  const [contactType,setType]=useState('email');
  useEffect(()=>{(async()=>{try{const r=await api.get(`/api/v1/resumes/${resumeId}/contacts`); const d=r.data; setItems(Array.isArray(d)?d:(Array.isArray(d?.content)?d.content:[]));}catch(e){console.error('Failed to load contacts', e); setItems([]);}})();},[resumeId]);
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input className="border px-3 py-2 rounded" placeholder="type" value={contactType} onChange={e=>setType(e.target.value)} />
        <input className="border px-3 py-2 rounded flex-1" placeholder="value" value={value} onChange={e=>setValue(e.target.value)} />
        <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={async()=>{ if(!value) return; await api.post(`/api/v1/resumes/${resumeId}/contacts`, { contactType, value }); const r=await api.get(`/api/v1/resumes/${resumeId}/contacts`); setItems(r.data||[]); setValue(''); }}>Add</button>
      </div>
      <ul className="space-y-1">{items.map((c:any)=> (
        <li key={c.id} className="flex justify-between items-center">
          <span>{c.contactType}: {c.value}</span>
          <button className="text-red-600" onClick={async()=>{ await api.delete(`/api/v1/resumes/${resumeId}/contacts/${c.id}`); const r=await api.get(`/api/v1/resumes/${resumeId}/contacts`); setItems(r.data||[]); }}>Delete</button>
        </li>
      ))}</ul>
    </div>
  );
}

function CertsEditor({resumeId}:{resumeId:string}){
  const [items,setItems]=useState<any[]>([]);
  const [name,setName]=useState('');
  useEffect(()=>{(async()=>{try{const r=await api.get(`/api/v1/resumes/${resumeId}/certifications`); const d=r.data; setItems(Array.isArray(d)?d:(Array.isArray(d?.content)?d.content:[]));}catch(e){console.error('Failed to load certifications', e); setItems([]);}})();},[resumeId]);
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input className="border px-3 py-2 rounded flex-1" placeholder="Certification name" value={name} onChange={e=>setName(e.target.value)} />
        <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={async()=>{ if(!name) return; await api.post(`/api/v1/resumes/${resumeId}/certifications`, { name }); const r=await api.get(`/api/v1/resumes/${resumeId}/certifications`); setItems(r.data||[]); setName(''); }}>Add</button>
      </div>
      <ul className="space-y-1">{items.map((c:any)=> (
        <li key={c.id} className="flex justify-between items-center">
          <span>{c.name}</span>
          <button className="text-red-600" onClick={async()=>{ await api.delete(`/api/v1/resumes/${resumeId}/certifications/${c.id}`); const r=await api.get(`/api/v1/resumes/${resumeId}/certifications`); setItems(r.data||[]); }}>Delete</button>
        </li>
      ))}</ul>
    </div>
  );
}

// Removed sections without backend APIs for now: Contacts, Languages, Links, Hobbies, Extracurriculars



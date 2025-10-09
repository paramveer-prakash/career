'use client';
'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { PrimaryButton, DestructiveButton } from '@/components/ui/button';
import { PrimaryLinkButton, SecondaryLinkButton } from '@/components/ui/link-button';

export default function Page(){
  const [items,setItems]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);
  const [uploading,setUploading]=useState(false);
  const [deleting,setDeleting]=useState<string | null>(null);

  const formatUpdatedAt = (value: any) => {
    try {
      const d = new Date(value);
      if (isNaN(d.getTime())) return String(value ?? '');
      return d.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return String(value ?? '');
    }
  };

  useEffect(()=>{(async()=>{
    try{
      const r=await api.get('/api/v1/resumes');
      const data=r.data;
      const list=Array.isArray(data) ? data : (Array.isArray(data?.content) ? data.content : []);
      setItems(list);
    } finally {
      setLoading(false);
    }
  })();},[]);

  if(loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Resumes</h1>
        <form className="flex items-center gap-2" onSubmit={async(e)=>{
        e.preventDefault();
        setUploading(true);
        try {
          const formEl=e.target as HTMLFormElement;
          const input=formEl.querySelector('input[type=file]') as HTMLInputElement;
          if(!input.files?.length) return;
          const form=new FormData();
          form.append('file', input.files[0]);
          await api.post('/api/v1/resumes/upload', form, { headers: { 'Content-Type':'multipart/form-data' }});
          const r=await api.get('/api/v1/resumes');
          const data=r.data;
          const list=Array.isArray(data) ? data : (Array.isArray(data?.content) ? data.content : []);
          setItems(list);
          input.value='';
        } finally {
          setUploading(false);
        }
        }}>
          <input type="file" accept=".pdf,.doc,.docx,.txt" className="border border-gray-300 bg-white px-3 py-2 rounded" />
          <PrimaryButton className="text-gray-900" type="submit" loading={uploading} loadingText="Uploading...">
            Upload
          </PrimaryButton>
        </form>
      </div>

      <div className="grid gap-4">
        {Array.isArray(items) && items.map((r:any)=> (
          <div key={r.id} className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-medium text-gray-900">{r.title || 'Untitled Resume'}</div>
                <div className="text-sm text-gray-600">{r.primaryName || ''}</div>
                {r.updatedAt && (
                  <div className="text-xs text-gray-500">Updated {formatUpdatedAt(r.updatedAt)}</div>
                )}
              </div>
              <div className="flex gap-2">
                <a 
                  href={'/resumes/'+r.id}
                  className="px-3 py-2 rounded-md bg-blue-600 text-gray-900 hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Open
                </a>
                <a 
                  href={'/resumes/'+r.id+'/preview'}
                  className="px-3 py-2 rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Preview
                </a>
                <button
                  onClick={async()=>{
                    if(!confirm('Delete this resume?')) return;
                    setDeleting(r.id);
                    try {
                      await api.delete(`/api/v1/resumes/${r.id}`);
                      const rr=await api.get('/api/v1/resumes');
                      const data=rr.data; const list=Array.isArray(data)?data:(Array.isArray(data?.content)?data.content:[]);
                      setItems(list);
                    } finally {
                      setDeleting(null);
                    }
                  }}
                  disabled={deleting === r.id}
                  className="px-3 py-2 rounded-md bg-red-600 text-gray-900 hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  {deleting === r.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



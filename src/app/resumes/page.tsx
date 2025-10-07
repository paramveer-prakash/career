'use client';
'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function Page(){
  const [items,setItems]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Resumes</h1>
        <form className="flex items-center gap-2" onSubmit={async(e)=>{
        e.preventDefault();
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
        }}>
          <input type="file" accept=".pdf,.doc,.docx,.txt" className="border border-gray-300 bg-white px-3 py-2 rounded" />
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Upload</button>
        </form>
      </div>

      <div className="grid gap-4">
        {Array.isArray(items) && items.map((r:any)=> (
          <div key={r.id} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-medium text-gray-900">{r.title || 'Untitled Resume'}</div>
                <div className="text-sm text-gray-600">{r.primaryName || ''}</div>
                {r.updatedAt && (
                  <div className="text-xs text-gray-500">Updated {formatUpdatedAt(r.updatedAt)}</div>
                )}
              </div>
              <div className="flex gap-2 opacity-100 group-hover:opacity-100">
                <Link className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700" href={'/resumes/'+r.id}>Open</Link>
                <Link className="px-3 py-2 rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200" href={'/resumes/'+r.id+'/preview'}>Preview</Link>
                <button
                  className="px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                  onClick={async()=>{
                    if(!confirm('Delete this resume?')) return;
                    await api.delete(`/api/v1/resumes/${r.id}`);
                    const rr=await api.get('/api/v1/resumes');
                    const data=rr.data; const list=Array.isArray(data)?data:(Array.isArray(data?.content)?data.content:[]);
                    setItems(list);
                  }}
                >Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



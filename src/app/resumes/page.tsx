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
    <div className="p-6 space-y-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900">My Resumes</h1>
      <form className="space-x-2" onSubmit={async(e)=>{
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
        <input type="file" accept=".pdf,.doc,.docx,.txt" className="border px-3 py-2 rounded" />
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Upload</button>
      </form>

      <div className="grid gap-4">
        {Array.isArray(items) && items.map((r:any)=> (
          <div key={r.id} className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-medium text-gray-900">{r.title || 'Untitled Resume'}</div>
              <div className="text-sm text-gray-500">{r.primaryEmail}</div>
              {r.updatedAt && (
                <div className="text-sm text-gray-500">Last updated: {formatUpdatedAt(r.updatedAt)}</div>
              )}
            </div>
            <div className="flex gap-2">
              <Link className="px-3 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800" href={'/resumes/'+r.id}>Open</Link>
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
        ))}
      </div>
    </div>
  );
}



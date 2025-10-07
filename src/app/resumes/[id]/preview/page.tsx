'use client'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { ResumePreview, ResumeTemplateKey } from '@/components/templates/preview'

export default function PreviewPage(){
  const params = useParams()
  const id = params?.id as string
  const [resume,setResume]=useState<any>(null)
  const [loading,setLoading]=useState(true)
  const [template,setTemplate]=useState<ResumeTemplateKey>('modern')

  useEffect(()=>{(async()=>{
    if(!id) return
    try{
      const r=await api.get('/api/v1/resumes/'+id)
      // The editor pages fetch sections separately; try to fetch aggregates too if present
      const base=r.data||{}
      const [skills, work, edu] = await Promise.allSettled([
        api.get(`/api/v1/resumes/${id}/skills`),
        api.get(`/api/v1/resumes/${id}/work-experiences`),
        api.get(`/api/v1/resumes/${id}/educations`),
      ])
      const map = (res:any)=> Array.isArray(res?.data)?res.data:(Array.isArray(res?.data?.content)?res.data.content:[])
      setResume({
        ...base,
        skills: skills.status==='fulfilled' ? map(skills.value) : [],
        workExperiences: work.status==='fulfilled' ? map(work.value) : [],
        educations: edu.status==='fulfilled' ? map(edu.value) : [],
      })
    } finally { setLoading(false) }
  })()},[id])

  const templates: { key:ResumeTemplateKey, name:string, desc:string }[] = useMemo(()=>[
    { key:'modern', name:'Modern', desc:'Bold headings, chips, accent gradient' },
    { key:'classic', name:'Classic', desc:'Conventional, readable, clean' },
    { key:'minimal', name:'Minimal', desc:'Sparse, two-column, airy' },
  ],[])

  if(loading) return <div className="p-6">Loading...</div>
  if(!resume) return <div className="p-6">Resume not found</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Template Preview</h1>
        <a href={`/resumes/${id}`} className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Back to editor</a>
      </div>

      <div className="overflow-x-auto -mx-2 px-2">
        <div className="flex gap-3 min-w-max">
          {templates.map(t => (
            <button key={t.key}
              onClick={()=>setTemplate(t.key)}
              className={
                `text-left w-56 shrink-0 rounded-xl border p-4 transition-colors `+
                (template===t.key ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50')
              }>
              <div className="font-medium">{t.name}</div>
              <div className="text-xs text-gray-600">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <ResumePreview data={resume} template={template} />
    </div>
  )
}

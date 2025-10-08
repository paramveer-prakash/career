'use client'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { createAuthHeaders } from '@/lib/auth-utils'
import { ResumePreview, ResumeTemplateKey } from '@/components/templates/preview'

export default function PreviewPage(){
  const params = useParams()
  const id = params?.id as string
  const [resume,setResume]=useState<any>(null)
  const [loading,setLoading]=useState(true)
  const [template,setTemplate]=useState<ResumeTemplateKey>('modern')
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0)

  useEffect(()=>{(async()=>{
    if(!id) return
    try{
      // Try to fetch from Spring Boot API first, fallback to test data
      try {
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
      } catch (error) {
        // Fallback to test data if Spring Boot API is not available
        console.log('Spring Boot API not available, using test data');
        const testResponse = await fetch('/api/test-resume');
        if (testResponse.ok) {
          const testData = await testResponse.json();
          setResume(testData);
        }
      }
    } finally { setLoading(false) }
  })()},[id])

  const templates: { key:ResumeTemplateKey, name:string, desc:string }[] = useMemo(()=>[
    { key:'modern', name:'Modern', desc:'Bold headings, chips, accent gradient' },
    { key:'classic', name:'Classic', desc:'Conventional, readable, clean' },
    { key:'minimal', name:'Minimal', desc:'Sparse, two-column, airy' },
    { key:'professional', name:'Professional', desc:'Clean blue header, profile picture support' },
    { key:'creative', name:'Creative', desc:'Purple gradient, timeline design, emoji icons' },
    { key:'minimal-dark', name:'Minimal Dark', desc:'Dark theme, sleek design' },
    { key:'executive', name:'Executive', desc:'Dark header, competency bars' },
    { key:'colorful', name:'Colorful', desc:'Rainbow stripes, vibrant colors' },
  ],[])

  const nextTemplate = () => {
    const nextIndex = (currentTemplateIndex + 1) % templates.length
    setCurrentTemplateIndex(nextIndex)
    setTemplate(templates[nextIndex].key)
  }

  const prevTemplate = () => {
    const prevIndex = currentTemplateIndex === 0 ? templates.length - 1 : currentTemplateIndex - 1
    setCurrentTemplateIndex(prevIndex)
    setTemplate(templates[prevIndex].key)
  }

  if(loading) return <div className="p-6">Loading...</div>
  if(!resume) return <div className="p-6">Resume not found</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Resume Preview</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={async()=>{
              // Use Next.js API for HTML preview with authentication
              const path = `/api/templates/${template}/render/${id}/html`
              const token = localStorage.getItem('auth-store') ? 
                JSON.parse(localStorage.getItem('auth-store')!).state?.access_token : null;
              
              if (token) {
                // Open in new window with authentication header
                const newWindow = window.open('', '_blank');
                if (newWindow) {
                  try {
                    const response = await fetch(path, {
                      headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                      }
                    });
                    
                    if (response.ok) {
                      const html = await response.text();
                      newWindow.document.write(html);
                      newWindow.document.close();
                    } else {
                      newWindow.document.write('<h1>Error loading resume</h1>');
                      newWindow.document.close();
                    }
                  } catch (error) {
                    newWindow.document.write('<h1>Error loading resume</h1>');
                    newWindow.document.close();
                  }
                }
              } else {
                // Fallback: open directly (will use test data)
                window.open(path, '_blank');
              }
            }}
            className="px-3 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
          >Preview HTML</button>
          <button
            onClick={async()=>{
              // Use Next.js API for PDF download with authentication
              const path = `/api/templates/${template}/render/${id}/pdf`
              const token = localStorage.getItem('auth-store') ? 
                JSON.parse(localStorage.getItem('auth-store')!).state?.access_token : null;
              
              const headers: Record<string, string> = {
                'Content-Type': 'application/json',
              };
              
              if (token) {
                headers['Authorization'] = `Bearer ${token}`;
              }
              
              const response = await fetch(path, { headers });
              if (response.ok) {
                const blob = await response.blob()
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `resume-${id}-${template}.pdf`
                document.body.appendChild(a)
                a.click()
                a.remove()
                window.URL.revokeObjectURL(url)
              } else {
                console.error('Failed to generate PDF:', response.status, response.statusText)
              }
            }}
            className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >Download PDF</button>
          <button
            onClick={async()=>{
              // Download HTML with authentication
              const path = `/api/templates/${template}/render/${id}/html`
              const token = localStorage.getItem('auth-store') ? 
                JSON.parse(localStorage.getItem('auth-store')!).state?.access_token : null;
              
              const headers: Record<string, string> = {
                'Content-Type': 'application/json',
              };
              
              if (token) {
                headers['Authorization'] = `Bearer ${token}`;
              }
              
              const response = await fetch(path, { headers });
              if (response.ok) {
                const html = await response.text()
                const blob = new Blob([html], { type: 'text/html' })
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `resume-${id}-${template}.html`
                document.body.appendChild(a)
                a.click()
                a.remove()
                window.URL.revokeObjectURL(url)
              } else {
                console.error('Failed to generate HTML:', response.status, response.statusText)
              }
            }}
            className="px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
          >Download HTML</button>
          <a href={`/resumes/${id}`} className="px-3 py-2 rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200">Back to editor</a>
        </div>
      </div>

      {/* Template Carousel */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Choose Template</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={prevTemplate}
              className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              aria-label="Previous template"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm text-gray-600">
              {currentTemplateIndex + 1} of {templates.length}
            </span>
            <button
              onClick={nextTemplate}
              className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              aria-label="Next template"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Current Template Display */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{templates[currentTemplateIndex].name}</h3>
              <p className="text-sm text-gray-600">{templates[currentTemplateIndex].desc}</p>
            </div>
            <button
              onClick={() => setTemplate(templates[currentTemplateIndex].key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                template === templates[currentTemplateIndex].key
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {template === templates[currentTemplateIndex].key ? 'Selected' : 'Select'}
            </button>
          </div>
        </div>

        {/* Template Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {templates.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentTemplateIndex(index)
                setTemplate(templates[index].key)
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentTemplateIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to template ${index + 1}`}
            />
          ))}
        </div>

        {/* Quick Template Grid (Optional - for direct selection) */}
        <div className="mt-6">
          <details className="group">
            <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900">
              View all templates
            </summary>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
              {templates.map((t, index) => (
                <button
                  key={t.key}
                  onClick={() => {
                    setCurrentTemplateIndex(index)
                    setTemplate(t.key)
                  }}
                  className={`text-left p-3 rounded-lg border transition-colors ${
                    template === t.key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium text-sm">{t.name}</div>
                  <div className="text-xs text-gray-600 mt-1">{t.desc}</div>
                </button>
              ))}
            </div>
          </details>
        </div>
      </div>

      <ResumePreview data={resume} template={template} />
    </div>
  )
}

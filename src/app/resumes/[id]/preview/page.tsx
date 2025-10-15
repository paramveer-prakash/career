'use client'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { ResumePreview, ResumeTemplateKey } from '@/components/templates/preview'
import { FullPageLoader } from '@/components/ui/loader'
import { TemplateGallery } from '@/components/templates/template-gallery'
import { getTemplate } from '@/lib/templates/template-registry'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function PreviewPage(){
  const params = useParams()
  const id = params?.id as string
  const [resume,setResume]=useState<any>(null)
  const [loading,setLoading]=useState(true)
  const [template,setTemplate]=useState<ResumeTemplateKey>('modern')
  const [downloadingPDF, setDownloadingPDF] = useState(false)
  const [previewingHTML, setPreviewingHTML] = useState(false)

  const templateName = useMemo(() => {
    try {
      return getTemplate(template)?.name ?? template
    } catch {
      return template
    }
  }, [template])

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
      } catch {
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


  if(loading) return <FullPageLoader text="Loading resume..." show={true} />
  if(!resume) return <div className="p-6">Resume not found</div>

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      {/*<div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Resume Preview</h1>
            <p className="text-sm text-gray-600 mt-1">Choose a template and preview your resume</p>
          </div>
          <div className="flex items-center gap-3">
            <LoadingButton
              loading={previewingHTML}
              loadingText="Generating HTML..."
              onClick={async()=>{
                setPreviewingHTML(true)
                try {
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
                } finally {
                  setPreviewingHTML(false)
                }
              }}
              variant="secondary"
            >
              Preview HTML
            </LoadingButton>
            <LoadingButton
              loading={downloadingPDF}
              loadingText="Generating PDF..."
              onClick={async()=>{
                setDownloadingPDF(true)
                try {
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
                } finally {
                  setDownloadingPDF(false)
                }
              }}
              variant="primary"
            >
              Download PDF
            </LoadingButton>
                <SecondaryButton asChild>
                  <a href={`/resumes/${id}`}>
                    Back to Editor
                  </a>
                </SecondaryButton>
          </div>
        </div>
      </div> */}

      {/* Main Content - Three Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column - Template Selection */}
        <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Templates</h2>
            <p className="text-sm text-gray-600 mt-1">Select a template to preview</p>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <TemplateGallery
              selectedTemplate={template}
              onTemplateSelect={setTemplate}
              className="p-4"
              compact={true}
            />
          </div>
        </div>

        {/* Middle Column - Resume Preview (Widest) */}
        <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="p-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{resume?.title} : Preview {templateName}</p>
              </div>
              
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <ResumePreview data={resume} template={template} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Action Icons */}
        <div className="w-16 bg-white/80 backdrop-blur-sm border-l border-gray-200 flex flex-col items-center py-6 space-y-4">
          {/* Back to Editor */}
          <a 
            href={`/resumes/${id}`}
            className="group flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
            title="Back to Editor"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <span className="text-xs text-gray-500 mt-1 text-center">Back</span>
          </a>

          {/* Download PDF */}
          <button
            onClick={async()=>{
              setDownloadingPDF(true)
              try {
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
              } finally {
                setDownloadingPDF(false)
              }
            }}
            disabled={downloadingPDF}
            className="group flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            title="Download PDF"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
              {downloadingPDF ? (
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
            </div>
            <span className="text-xs text-gray-500 mt-1 text-center">PDF</span>
          </button>

          {/* Preview HTML */}
          <button
            onClick={async()=>{
              setPreviewingHTML(true)
              try {
                const path = `/api/templates/${template}/render/${id}/html`
                const token = localStorage.getItem('auth-store') ? 
                  JSON.parse(localStorage.getItem('auth-store')!).state?.access_token : null;

                if (token) {
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
                    } catch {
                      newWindow.document.write('<h1>Error loading resume</h1>');
                      newWindow.document.close();
                    }
                  }
                } else {
                  window.open(path, '_blank');
                }
              } finally {
                setPreviewingHTML(false)
              }
            }}
            disabled={previewingHTML}
            className="group flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            title="Preview HTML"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors">
              {previewingHTML ? (
                <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </div>
            <span className="text-xs text-gray-500 mt-1 text-center">HTML</span>
          </button>

          {/* Share */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${resume?.firstName} ${resume?.lastName} - Resume`,
                  text: 'Check out my resume',
                  url: window.location.href
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
            className="group flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
            title="Share Resume"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-100 group-hover:bg-purple-200 transition-colors">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
            <span className="text-xs text-gray-500 mt-1 text-center">Share</span>
          </button>

          {/* WhatsApp (Future feature) */}
          <button
            onClick={() => {
              const text = `Check out my resume: ${window.location.href}`;
              const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
              window.open(whatsappUrl, '_blank');
            }}
            className="group flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
            title="Send to WhatsApp"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
            </div>
            <span className="text-xs text-gray-500 mt-1 text-center">WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  )
}

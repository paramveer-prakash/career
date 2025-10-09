'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { ResumePreview, ResumeTemplateKey } from '@/components/templates/preview'
import { LoadingButton, FullPageLoader } from '@/components/ui/loader'
import { SecondaryButton } from '@/components/ui/button'
import { TemplateGallery } from '@/components/templates/template-gallery'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function PreviewPage(){
  const params = useParams()
  const id = params?.id as string
  const [resume,setResume]=useState<any>(null)
  const [loading,setLoading]=useState(true)
  const [template,setTemplate]=useState<ResumeTemplateKey>('modern')
  const [downloadingPDF, setDownloadingPDF] = useState(false)
  const [previewingHTML, setPreviewingHTML] = useState(false)

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


  if(loading) return <FullPageLoader text="Loading resume..." show={true} />
  if(!resume) return <div className="p-6">Resume not found</div>

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
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
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Templates */}
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
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

        {/* Right Side - Resume Preview */}
        <div className="flex-1 flex flex-col bg-gray-50">
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 capitalize">{template} Template</h3>
                <p className="text-sm text-gray-600">Live preview of your resume</p>
              </div>
              <div className="text-sm text-gray-500">
                {resume?.firstName} {resume?.lastName}
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <ResumePreview data={resume} template={template} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { ResumePreview, ResumeTemplateKey } from '@/components/templates/preview'
import { LoadingButton, FullPageLoader } from '@/components/ui/loader'
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Resume Preview</h1>
        <div className="flex items-center gap-2">
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
            className="bg-purple-600 hover:bg-purple-700"
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
       
          <a href={`/resumes/${id}`} className="px-3 py-2 rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200">Back to editor</a>
        </div>
      </div>

      {/* Template Gallery */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Choose Template</h2>
        <TemplateGallery
          selectedTemplate={template}
          onTemplateSelect={setTemplate}
        />
      </div>

      <ResumePreview data={resume} template={template} />
    </div>
  )
}

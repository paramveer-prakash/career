import { ResumePreview, ResumeTemplateKey } from '@/components/templates/preview'
import { seedResume } from '@/lib/templates/seed-resume'

export default async function TemplateSnapPage({
  params,
}: {
  params: Promise<{ key: string }>
}) {
  const { key } = await params

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="mx-auto max-w-4xl">
        <ResumePreview data={seedResume} template={key as ResumeTemplateKey} />
      </div>
    </div>
  )
}
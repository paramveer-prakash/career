/* eslint-disable @typescript-eslint/no-explicit-any */
export function ModernTemplate({ data }:{ data:any }){
  return (
    <div className="text-sm">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{data.primaryName||'Your Name'}</h1>
          <div className="text-gray-600">{[data.primaryEmail, data.primaryPhone, data.primaryLocation].filter(Boolean).join(' · ')}</div>
        </div>
        <div className="h-10 w-10 rounded-md bg-gradient-to-br from-blue-500 to-cyan-400" />
      </div>
      {data.summary && <p className="mt-4 text-gray-700 whitespace-pre-wrap">{data.summary}</p>}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2 md:col-span-1">
          <h3 className="font-semibold">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {(data.skills||[]).map((s:any)=> (<span key={s.id} className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-blue-700">{s.name||s.skill}</span>))}
          </div>
        </div>
        <div className="space-y-2 md:col-span-2">
          <h3 className="font-semibold">Experience</h3>
          <div className="space-y-3">
            {(data.workExperiences||[]).map((w:any)=> (
              <div key={w.id} className="rounded border border-gray-200 bg-gray-50 p-3">
                <div className="font-medium">{w.jobTitle}</div>
                {Array.isArray(w.responsibilities) && (
                  <ul className="list-disc pl-5 text-gray-700">
                    {w.responsibilities.map((r:any, idx:number)=> (<li key={r.id||idx}>{r.description}</li>))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold">Education</h3>
        <ul className="list-disc pl-5 text-gray-700">
          {(data.educations||[]).map((e:any)=> (<li key={e.id}>{e.institution}</li>))}
        </ul>
      </div>
    </div>
  );
}



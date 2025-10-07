/* eslint-disable @typescript-eslint/no-explicit-any */
export function MinimalTemplate({ data }:{ data:any }){
  return (
    <div className="text-sm">
      <div className="mb-4">
        <div className="text-xl font-semibold">{data.primaryName || 'Your Name'}</div>
        <div className="text-gray-600">{[data.primaryEmail, data.primaryPhone, data.primaryLocation].filter(Boolean).join(' · ')}</div>
      </div>
      {data.summary && <p className="mb-6 text-gray-700 whitespace-pre-wrap">{data.summary}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="font-semibold">Skills</h3>
          <ul className="list-disc pl-5 text-gray-700">
            {(data.skills||[]).map((s:any)=> (<li key={s.id}>{s.name||s.skill}</li>))}
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold">Education</h3>
          <ul className="list-disc pl-5 text-gray-700">
            {(data.educations||[]).map((e:any)=> (<li key={e.id}>{e.institution}</li>))}
          </ul>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <h3 className="font-semibold">Work</h3>
        <div className="space-y-2">
          {(data.workExperiences||[]).map((w:any)=> (
            <div key={w.id}>
              <div className="font-medium">{w.jobTitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



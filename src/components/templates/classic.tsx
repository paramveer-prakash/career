/* eslint-disable @typescript-eslint/no-explicit-any */
export function ClassicTemplate({ data }:{ data:any }){
  return (
    <div className="text-sm leading-6">
      <h1 className="text-2xl font-semibold mb-2">{data.primaryName || data.title || 'Your Name'}</h1>
      <div className="text-gray-600 mb-4">{data.primaryEmail} · {data.primaryPhone} · {data.primaryLocation}</div>
      {data.summary && <p className="mb-6 text-gray-700 whitespace-pre-wrap">{data.summary}</p>}
      {Array.isArray(data.skills) && data.skills.length>0 && (
        <section className="mb-4">
          <h2 className="font-semibold mb-1">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s:any)=> <span key={s.id} className="rounded border border-gray-200 bg-gray-100 text-gray-900 px-2 py-1">{s.name||s.skill}</span>)}
          </div>
        </section>
      )}
      {Array.isArray(data.workExperiences)&& data.workExperiences.length>0 && (
        <section className="mb-4">
          <h2 className="font-semibold mb-1">Work Experience</h2>
          <div className="space-y-3">
            {data.workExperiences.map((w:any)=> (
              <div key={w.id}>
                <div className="font-medium">{w.jobTitle}</div>
                {Array.isArray(w.responsibilities) && (
                  <ul className="list-disc pl-5 text-gray-700">
                    {w.responsibilities.map((r:any, idx:number)=> (<li key={r.id||idx}>{r.description}</li>))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      {Array.isArray(data.educations)&& data.educations.length>0 && (
        <section>
          <h2 className="font-semibold mb-1">Education</h2>
          <div className="space-y-2">
            {data.educations.map((e:any)=> (
              <div key={e.id} className="text-gray-900">{e.institution}</div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}



/* eslint-disable @typescript-eslint/no-explicit-any */
export function MinimalTemplate({ data }:{ data:any }){
  return (
    <div className="max-w-[210mm] mx-auto bg-white text-gray-900 font-sans leading-relaxed px-2">
      {/* Header - Clean and Simple */}
      <div className="mb-10">
        <h1 className="text-4xl font-light text-gray-900 mb-3 tracking-wide">{data.primaryName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-light">
          {data.primaryEmail && <span>{data.primaryEmail}</span>}
          {data.primaryPhone && <span className="before:content-['|'] before:mr-4 before:text-gray-300">{data.primaryPhone}</span>}
          {data.primaryLocation && <span className="before:content-['|'] before:mr-4 before:text-gray-300">{data.primaryLocation}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-10">
          <h2 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-widest">About</h2>
          <p className="text-gray-700 leading-relaxed font-light">{data.summary}</p>
        </div>
      )}

      {/* Experience Section */}
      {(data.workExperiences||[]).length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-widest">Experience</h2>
          <div className="space-y-6">
            {(data.workExperiences||[]).map((w:any)=> (
              <div key={w.id} className="border-l border-gray-200 pl-6">
                <h3 className="text-lg font-medium text-gray-900 mb-1">{w.jobTitle}</h3>
                <div className="text-sm text-gray-600 font-light mb-2">
                  <span>{w.companyName || 'Company'}</span>
                  {(w.startDate || w.endDate) && (
                    <span className="before:content-['·'] before:mx-2">
                      {w.startDate} - {w.isCurrent ? 'Present' : (w.endDate || 'Present')}
                    </span>
                  )}
                </div>
                {Array.isArray(w.responsibilities) && w.responsibilities.length > 0 && (
                  <ul className="space-y-1.5 mt-3 text-sm text-gray-700 font-light">
                    {w.responsibilities.map((r:any, idx:number)=> (
                      <li key={r.id||idx} className="flex gap-2">
                        <span className="text-gray-400 mt-1">—</span>
                        <span className="flex-1">{r.description}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        {/* Education */}
        {(data.educations||[]).length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-widest">Education</h2>
            <div className="space-y-4">
              {(data.educations||[]).map((e:any)=> (
                <div key={e.id} className="border-l border-gray-200 pl-6">
                  <div className="font-medium text-gray-900">{e.degree || 'Degree'}</div>
                  <div className="text-sm text-gray-600 font-light mt-1">{e.institution}</div>
                  {e.graduationYear && <div className="text-xs text-gray-500 font-light mt-1">{e.graduationYear}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {(data.skills||[]).length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-widest">Skills</h2>
            <div className="space-y-2">
              {(data.skills||[]).map((s:any)=> (
                <div key={s.id} className="text-sm text-gray-700 font-light border-l border-gray-200 pl-6">
                  {s.name||s.skill}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



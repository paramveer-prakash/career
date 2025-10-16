/* eslint-disable @typescript-eslint/no-explicit-any */
export function ModernTemplate({ data }:{ data:any }){
  return (
    <div className="max-w-[210mm] mx-auto bg-white text-gray-900 font-sans leading-relaxed">
      {/* Header Section */}
      <div className="border-b-4 border-blue-600 pb-6 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">{data.primaryName||'Your Name'}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {data.primaryEmail && <span className="flex items-center gap-1.5">✉ {data.primaryEmail}</span>}
              {data.primaryPhone && <span className="flex items-center gap-1.5">✆ {data.primaryPhone}</span>}
              {data.primaryLocation && <span className="flex items-center gap-1.5">⌘ {data.primaryLocation}</span>}
            </div>
          </div>
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg flex-shrink-0" />
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-l-4 border-blue-600 pl-3">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Skills & Education */}
        <div className="md:col-span-1 space-y-8">
          {/* Skills Section */}
          {(data.skills||[]).length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-l-4 border-blue-600 pl-3">Skills</h2>
              <div className="space-y-2">
                {(data.skills||[]).map((s:any)=> (
                  <div key={s.id} className="group">
                    <div className="text-sm font-medium text-gray-900 mb-1">{s.name||s.skill}</div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full w-4/5 transition-all duration-300 group-hover:w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {(data.educations||[]).length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-l-4 border-blue-600 pl-3">Education</h2>
              <div className="space-y-4">
                {(data.educations||[]).map((e:any)=> (
                  <div key={e.id} className="border-l-2 border-gray-300 pl-4 hover:border-blue-600 transition-colors">
                    <div className="font-semibold text-gray-900 text-sm">{e.degree || 'Degree'}</div>
                    <div className="text-sm text-gray-700 font-medium mt-1">{e.institution}</div>
                    {e.graduationYear && <div className="text-xs text-gray-500 mt-1">{e.graduationYear}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Experience */}
        <div className="md:col-span-2">
          {(data.workExperiences||[]).length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-l-4 border-blue-600 pl-3">Professional Experience</h2>
              <div className="space-y-6">
                {(data.workExperiences||[]).map((w:any)=> (
                  <div key={w.id} className="relative pl-6 border-l-2 border-gray-300 hover:border-blue-600 transition-colors group">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-600 group-hover:bg-cyan-500 transition-colors shadow-md"></div>
                    
                    <div className="mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{w.jobTitle}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                        <span className="font-medium text-blue-700">{w.companyName || 'Company'}</span>
                        {(w.startDate || w.endDate) && (
                          <span className="text-gray-500">
                            {w.startDate} - {w.isCurrent ? 'Present' : (w.endDate || 'Present')}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {Array.isArray(w.responsibilities) && w.responsibilities.length > 0 && (
                      <ul className="space-y-1.5 text-sm text-gray-700">
                        {w.responsibilities.map((r:any, idx:number)=> (
                          <li key={r.id||idx} className="flex gap-2">
                            <span className="text-blue-600 font-bold mt-1">•</span>
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
        </div>
      </div>
    </div>
  );
}



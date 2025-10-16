/* eslint-disable @typescript-eslint/no-explicit-any */
export function ClassicTemplate({ data }:{ data:any }){
  return (
    <div className="max-w-[210mm] mx-auto bg-white text-gray-900 font-serif leading-relaxed">
      {/* Header Section */}
      <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">{data.primaryName || data.title || 'Your Name'}</h1>
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
          {data.primaryEmail && <span>{data.primaryEmail}</span>}
          {data.primaryPhone && <span>•</span>}
          {data.primaryPhone && <span>{data.primaryPhone}</span>}
          {data.primaryLocation && <span>•</span>}
          {data.primaryLocation && <span>{data.primaryLocation}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300 uppercase tracking-wider">Profile</h2>
          <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
        </section>
      )}

      {/* Professional Experience */}
      {Array.isArray(data.workExperiences) && data.workExperiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300 uppercase tracking-wider">Professional Experience</h2>
          <div className="space-y-6">
            {data.workExperiences.map((w:any)=> (
              <div key={w.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{w.jobTitle}</h3>
                  {(w.startDate || w.endDate) && (
                    <span className="text-sm text-gray-600 font-medium">
                      {w.startDate} - {w.isCurrent ? 'Present' : (w.endDate || 'Present')}
                    </span>
                  )}
                </div>
                <div className="text-gray-700 font-semibold mb-3">{w.companyName || 'Company'}</div>
                {Array.isArray(w.responsibilities) && w.responsibilities.length > 0 && (
                  <ul className="space-y-2 ml-6">
                    {w.responsibilities.map((r:any, idx:number)=> (
                      <li key={r.id||idx} className="text-gray-700 relative before:content-['▸'] before:absolute before:-left-6 before:text-gray-400 before:font-bold">
                        {r.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {Array.isArray(data.educations) && data.educations.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300 uppercase tracking-wider">Education</h2>
          <div className="space-y-4">
            {data.educations.map((e:any)=> (
              <div key={e.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{e.degree || 'Degree'}</h3>
                    <div className="text-gray-700 font-semibold mt-1">{e.institution}</div>
                  </div>
                  {e.graduationYear && <span className="text-sm text-gray-600 font-medium">{e.graduationYear}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {Array.isArray(data.skills) && data.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300 uppercase tracking-wider">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((s:any)=> (
              <span key={s.id} className="px-4 py-2 bg-gray-100 text-gray-900 font-semibold rounded border border-gray-300 hover:bg-gray-900 hover:text-white transition-colors">
                {s.name||s.skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}



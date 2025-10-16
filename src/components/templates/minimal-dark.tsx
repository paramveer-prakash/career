/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface MinimalDarkTemplateProps {
  data: any;
}

export function MinimalDarkTemplate({ data }: MinimalDarkTemplateProps) {
  return (
    <div className="max-w-[210mm] mx-auto bg-gray-900 text-gray-100 font-sans leading-relaxed p-10">
      {/* Minimalist Header */}
      <div className="mb-12 border-b border-gray-700 pb-8">
        <h1 className="text-5xl font-light text-white mb-4 tracking-wide">{data.primaryName || data.title || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-6 text-sm text-gray-400 font-light">
          {data.primaryEmail && <span>{data.primaryEmail}</span>}
          {data.primaryPhone && <span className="before:content-['·'] before:mr-6">{data.primaryPhone}</span>}
          {data.primaryLocation && <span className="before:content-['·'] before:mr-6">{data.primaryLocation}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-12">
          <h2 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-widest">Profile</h2>
          <p className="text-gray-300 leading-relaxed font-light">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {(data.workExperiences||[]).length > 0 && (
        <div className="mb-12">
          <h2 className="text-xs font-semibold text-gray-500 mb-6 uppercase tracking-widest">Experience</h2>
          <div className="space-y-8">
            {(data.workExperiences||[]).map((w:any)=> (
              <div key={w.id} className="border-l-2 border-gray-700 pl-6 hover:border-gray-500 transition-colors">
                <h3 className="text-xl font-medium text-white mb-1">{w.jobTitle}</h3>
                <div className="text-sm text-gray-400 font-light mb-3">
                  <span>{w.companyName || w.company}</span>
                  {(w.startDate || w.endDate) && (
                    <span className="before:content-['·'] before:mx-3">
                      {w.startDate} - {w.isCurrent ? 'Present' : (w.endDate || 'Present')}
                    </span>
                  )}
                </div>
                {Array.isArray(w.responsibilities) && w.responsibilities.length > 0 && (
                  <ul className="space-y-2 text-sm text-gray-300 font-light">
                    {w.responsibilities.map((r:any, idx:number)=> (
                      <li key={r.id||idx} className="flex gap-3">
                        <span className="text-gray-600 mt-1">—</span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Education */}
        {(data.educations||[]).length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-gray-500 mb-6 uppercase tracking-widest">Education</h2>
            <div className="space-y-4">
              {(data.educations||[]).map((e:any)=> (
                <div key={e.id} className="border-l-2 border-gray-700 pl-6">
                  <div className="font-medium text-white">{e.degree || 'Degree'}</div>
                  <div className="text-sm text-gray-400 font-light mt-1">{e.institution}</div>
                  {e.graduationYear && <div className="text-xs text-gray-500 font-light mt-1">{e.graduationYear}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {(data.skills||[]).length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-gray-500 mb-6 uppercase tracking-widest">Skills</h2>
            <div className="space-y-2">
              {(data.skills||[]).map((s:any)=> (
                <div key={s.id} className="text-sm text-gray-300 font-light border-l-2 border-gray-700 pl-6">
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

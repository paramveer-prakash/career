/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface ColorfulTemplateProps {
  data: any;
}

export function ColorfulTemplate({ data }: ColorfulTemplateProps) {
  return (
    <div className="max-w-[210mm] mx-auto bg-white text-gray-900 font-sans leading-relaxed">
      {/* Vibrant Header */}
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 h-48 rounded-2xl"></div>
        <div className="relative pt-10 px-10 pb-6">
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">{data.primaryName || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-4 text-white text-sm drop-shadow">
            {data.primaryEmail && <span>✉ {data.primaryEmail}</span>}
            {data.primaryPhone && <span>✆ {data.primaryPhone}</span>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8 px-10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent mb-3">About Me</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
        {/* Left Column */}
        <div className="md:col-span-1 space-y-8">
          {/* Skills */}
          {(data.skills||[]).length > 0 && (
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent mb-4">Skills</h2>
              <div className="space-y-2">
                {(data.skills||[]).map((s:any)=> (
                  <div key={s.id} className="bg-gradient-to-r from-pink-50 to-indigo-50 p-3 rounded-lg border-l-4 border-pink-500">
                    <span className="text-sm font-medium text-gray-900">{s.name||s.skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {(data.educations||[]).length > 0 && (
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent mb-4">Education</h2>
              <div className="space-y-3">
                {(data.educations||[]).map((e:any)=> (
                  <div key={e.id} className="bg-gradient-to-r from-pink-50 to-indigo-50 p-4 rounded-lg">
                    <div className="font-bold text-gray-900 text-sm">{e.degree || 'Degree'}</div>
                    <div className="text-sm text-gray-700 mt-1">{e.institution}</div>
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
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent mb-6">Experience</h2>
              <div className="space-y-6">
                {(data.workExperiences||[]).map((w:any)=> (
                  <div key={w.id} className="border-l-4 border-pink-500 pl-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{w.jobTitle}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                      <span className="font-semibold bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">{w.companyName || w.company}</span>
                      {(w.startDate || w.endDate) && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span>{w.startDate} - {w.isCurrent ? 'Present' : (w.endDate || 'Present')}</span>
                        </>
                      )}
                    </div>
                    {Array.isArray(w.responsibilities) && w.responsibilities.length > 0 && (
                      <ul className="space-y-1.5 text-sm text-gray-700">
                        {w.responsibilities.map((r:any, idx:number)=> (
                          <li key={r.id||idx} className="flex gap-2">
                            <span className="text-pink-500 font-bold mt-1">•</span>
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

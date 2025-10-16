/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface TechModernTemplateProps {
  data: any;
}

export function TechModernTemplate({ data }: TechModernTemplateProps) {
  return (
    <div className="max-w-[210mm] mx-auto bg-gray-50 text-gray-900 font-mono leading-relaxed">
      {/* Tech Header with Grid Pattern */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white p-10 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 h-full">
            {[...Array(64)].map((_, i) => <div key={i} className="border border-white/20"></div>)}
          </div>
        </div>
        <div className="relative">
          <div className="text-xs text-emerald-200 mb-2 font-bold tracking-widest">&lt;RESUME /&gt;</div>
          <h1 className="text-4xl font-bold mb-4">{data.primaryName || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-4 text-sm font-sans">
            {data.primaryEmail && <span className="bg-white/10 px-3 py-1 rounded">{data.primaryEmail}</span>}
            {data.primaryPhone && <span className="bg-white/10 px-3 py-1 rounded">{data.primaryPhone}</span>}
            {data.primaryLocation && <span className="bg-white/10 px-3 py-1 rounded">{data.primaryLocation}</span>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8 px-10">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-emerald-600">
            <div className="text-xs text-emerald-600 font-bold mb-2 tracking-widest">{'// ABOUT'}</div>
            <p className="text-gray-700 leading-relaxed font-sans">{data.summary}</p>
          </div>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10">
        {/* Left Column */}
        <div className="md:col-span-1 space-y-6">
          {/* Skills */}
          {(data.skills||[]).length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-xs text-emerald-600 font-bold mb-4 tracking-widest">{'// TECH STACK'}</div>
              <div className="space-y-2 font-sans">
                {(data.skills||[]).map((s:any)=> (
                  <div key={s.id} className="flex items-center gap-2 text-sm">
                    <span className="text-emerald-600">▸</span>
                    <span className="text-gray-700">{s.name||s.skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {(data.educations||[]).length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-xs text-emerald-600 font-bold mb-4 tracking-widest">{'// EDUCATION'}</div>
              <div className="space-y-3 font-sans">
                {(data.educations||[]).map((e:any)=> (
                  <div key={e.id}>
                    <div className="font-semibold text-gray-900 text-sm">{e.degree || 'Degree'}</div>
                    <div className="text-sm text-gray-600 mt-1">{e.institution}</div>
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
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-xs text-emerald-600 font-bold mb-6 tracking-widest">{'// WORK EXPERIENCE'}</div>
              <div className="space-y-6 font-sans">
                {(data.workExperiences||[]).map((w:any)=> (
                  <div key={w.id}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{w.jobTitle}</h3>
                        <div className="text-sm text-emerald-700 font-semibold">{w.companyName || w.company}</div>
                      </div>
                      {(w.startDate || w.endDate) && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded">
                          {w.startDate} - {w.isCurrent ? 'Present' : (w.endDate || 'Present')}
                        </span>
                      )}
                    </div>
                    {Array.isArray(w.responsibilities) && w.responsibilities.length > 0 && (
                      <ul className="space-y-1.5 text-sm text-gray-700 mt-3">
                        {w.responsibilities.map((r:any, idx:number)=> (
                          <li key={r.id||idx} className="flex gap-2">
                            <span className="text-emerald-600 font-bold">&gt;</span>
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

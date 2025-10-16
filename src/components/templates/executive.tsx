/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface ExecutiveTemplateProps {
  data: any;
}

export function ExecutiveTemplate({ data }: ExecutiveTemplateProps) {
  return (
    <div className="max-w-[210mm] mx-auto bg-white text-gray-900 font-sans leading-relaxed">
      {/* Sophisticated Header */}
      <div className="bg-gray-900 text-white py-12 px-10 mb-10">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">{data.primaryName || 'Your Name'}</h1>
        <div className="h-1 w-32 bg-amber-500 mb-6"></div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          {data.primaryEmail && <span className="flex items-center gap-2">✉ {data.primaryEmail}</span>}
          {data.primaryPhone && <span className="flex items-center gap-2">✆ {data.primaryPhone}</span>}
        </div>
      </div>

      {/* Executive Summary */}
      {data.summary && (
        <div className="mb-10 px-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-6 w-1 bg-amber-500"></div>
            <h2 className="text-2xl font-bold text-gray-900">Executive Summary</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">{data.summary}</p>
        </div>
      )}

      {/* Professional Experience */}
      {(data.workExperiences||[]).length > 0 && (
        <div className="mb-10 px-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-6 w-1 bg-amber-500"></div>
            <h2 className="text-2xl font-bold text-gray-900">Leadership Experience</h2>
          </div>
          <div className="space-y-6">
            {(data.workExperiences||[]).map((w:any)=> (
              <div key={w.id} className="border-l-4 border-gray-200 pl-6 hover:border-amber-500 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{w.jobTitle}</h3>
                <div className="flex items-center gap-4 text-gray-600 mb-3">
                  <span className="font-semibold text-amber-700">{w.companyName || w.company}</span>
                  {(w.startDate || w.endDate) && (
                    <span className="text-sm">
                      {w.startDate} - {w.isCurrent ? 'Present' : (w.endDate || 'Present')}
                    </span>
                  )}
                </div>
                {Array.isArray(w.responsibilities) && w.responsibilities.length > 0 && (
                  <ul className="space-y-2 text-gray-700">
                    {w.responsibilities.map((r:any, idx:number)=> (
                      <li key={r.id||idx} className="flex gap-3">
                        <span className="text-amber-600 font-bold mt-1">▸</span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10">
        {/* Education */}
        {(data.educations||[]).length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-6 w-1 bg-amber-500"></div>
              <h2 className="text-2xl font-bold text-gray-900">Education</h2>
            </div>
            <div className="space-y-4">
              {(data.educations||[]).map((e:any)=> (
                <div key={e.id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-amber-500">
                  <div className="font-bold text-gray-900">{e.degree || 'Degree'}</div>
                  <div className="text-gray-700 mt-1">{e.institution}</div>
                  {e.graduationYear && <div className="text-sm text-gray-500 mt-1">{e.graduationYear}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {(data.skills||[]).length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-6 w-1 bg-amber-500"></div>
              <h2 className="text-2xl font-bold text-gray-900">Core Competencies</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(data.skills||[]).map((s:any)=> (
                <div key={s.id} className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-sm font-medium">{s.name||s.skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

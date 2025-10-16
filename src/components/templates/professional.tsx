import React from 'react';

interface ProfessionalTemplateProps {
  data: {
    id: number;
    primaryName: string;
    primaryEmail: string;
    primaryPhone: string;
    summary: string;
    skills: Array<{ name: string }>;
    workExperiences: Array<{
      jobTitle: string;
      company: string;
      startDate: string;
      endDate: string;
      responsibilities: Array<{id: number; description: string}>;
    }>;
    educations: Array<{
      degree: string;
      institution: string;
      graduationYear: string;
    }>;
    profilePicture?: string;
  };
}

export function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  return (
    <div className="max-w-[210mm] mx-auto bg-white text-gray-900 font-sans leading-relaxed">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-600 text-white py-10 px-8 mb-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">{data.primaryName}</h1>
        <div className="flex flex-wrap gap-6 text-sm">
          {data.primaryEmail && <span className="flex items-center gap-2">✉ {data.primaryEmail}</span>}
          {data.primaryPhone && <span className="flex items-center gap-2">✆ {data.primaryPhone}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-8 px-8">
          <h2 className="text-xl font-bold text-slate-800 mb-3 uppercase tracking-wide pb-2 border-b-2 border-slate-300">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed mt-4">{data.summary}</p>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
        {/* Left Column - Skills & Education */}
        <div className="md:col-span-1 space-y-8">
          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4 uppercase tracking-wide pb-2 border-b-2 border-slate-300">Core Skills</h2>
              <div className="space-y-2 mt-4">
                {data.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
                    <span className="text-gray-700 font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.educations && data.educations.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4 uppercase tracking-wide pb-2 border-b-2 border-slate-300">Education</h2>
              <div className="space-y-4 mt-4">
                {data.educations.map((edu, index) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-lg">
                    <div className="font-bold text-slate-900 text-sm mb-1">{edu.degree}</div>
                    <div className="text-sm text-gray-700 mb-1">{edu.institution}</div>
                    <div className="text-xs text-gray-500">{edu.graduationYear}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Experience */}
        <div className="md:col-span-2">
          {data.workExperiences && data.workExperiences.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4 uppercase tracking-wide pb-2 border-b-2 border-slate-300">Professional Experience</h2>
              <div className="space-y-6 mt-4">
                {data.workExperiences.map((work, index) => (
                  <div key={index}>
                    <div className="mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{work.jobTitle}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                        <span className="font-semibold text-slate-700">{work.company}</span>
                        <span className="text-gray-400">|</span>
                        <span>{work.startDate} - {work.endDate}</span>
                      </div>
                    </div>
                    {work.responsibilities && work.responsibilities.length > 0 && (
                      <ul className="space-y-1.5 text-sm text-gray-700 mt-3">
                        {work.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex} className="flex gap-2">
                            <span className="text-slate-600 font-bold mt-1">•</span>
                            <span className="flex-1">{resp.description}</span>
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

import React from 'react';

interface CreativeTemplateProps {
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

export function CreativeTemplate({ data }: CreativeTemplateProps) {
  return (
    <div className="max-w-[210mm] mx-auto bg-white text-gray-900 font-sans leading-relaxed">
      {/* Header with Creative Asymmetric Design */}
      <div className="relative mb-12">
        <div className="absolute top-0 right-0 w-2/3 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-bl-[80px]"></div>
        <div className="relative pt-12 pl-8">
          <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">{data.primaryName}</h1>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            {data.primaryEmail && <span className="flex items-center gap-2">✉ {data.primaryEmail}</span>}
            {data.primaryPhone && <span className="flex items-center gap-2">✆ {data.primaryPhone}</span>}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-10 px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">About</h2>
          </div>
          <p className="text-gray-700 leading-relaxed pl-16">{data.summary}</p>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
        {/* Left Column - Skills & Education */}
        <div className="md:col-span-1 space-y-8">
          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Skills</h2>
              </div>
              <div className="space-y-3 pl-12">
                {data.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full group-hover:scale-150 transition-transform"></div>
                    <span className="text-sm text-gray-700 font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.educations && data.educations.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Education</h2>
              </div>
              <div className="space-y-4 pl-12">
                {data.educations.map((edu, index) => (
                  <div key={index}>
                    <div className="font-bold text-gray-900 text-sm mb-1">{edu.degree}</div>
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
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">Experience</h2>
              </div>
              <div className="space-y-6 pl-16">
                {data.workExperiences.map((work, index) => (
                  <div key={index} className="relative">
                    {/* Decorative Accent */}
                    <div className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 opacity-20"></div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{work.jobTitle}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                      <span className="font-semibold text-purple-700">{work.company}</span>
                      <span className="text-gray-400">•</span>
                      <span>{work.startDate} - {work.endDate}</span>
                    </div>
                    {work.responsibilities && work.responsibilities.length > 0 && (
                      <ul className="space-y-1.5 text-sm text-gray-700">
                        {work.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex} className="flex gap-2">
                            <span className="text-purple-600 font-bold mt-1">▸</span>
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

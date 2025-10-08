import React from 'react';

interface ExecutiveTemplateProps {
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

export function ExecutiveTemplate({ data }: ExecutiveTemplateProps) {
  return (
    <div className="executive-resume bg-white text-gray-900 font-sans">
      {/* Header with Executive Design */}
      <div className="header-section bg-gradient-to-br from-gray-800 to-gray-700 text-white py-16 mb-12 relative">
        <div className="header-background absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-700"></div>
        <div className="header-content relative z-10 max-w-5xl mx-auto px-5">
          <div className="profile-section flex items-center gap-12">
            {data.profilePicture && (
              <div className="profile-picture w-40 h-40 rounded-full overflow-hidden border-6 border-white/30 shadow-2xl">
                <img src={data.profilePicture} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="name-section">
              <h1 className="name text-5xl font-black mb-3 text-shadow-lg">{data.primaryName}</h1>
              <div className="title text-xl text-gray-300 mb-6 font-medium">Executive Professional</div>
              <div className="contact-info flex flex-col gap-4">
                <div className="contact-item flex items-center gap-4 text-lg">
                  <span className="icon text-xl">✉</span>
                  <span>{data.primaryEmail}</span>
                </div>
                <div className="contact-item flex items-center gap-4 text-lg">
                  <span className="icon text-xl">📞</span>
                  <span>{data.primaryPhone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="summary-section mb-12 bg-gradient-to-br from-gray-50 to-white p-10 rounded-2xl border-l-6 border-blue-600 shadow-xl">
          <h2 className="section-title text-4xl font-black text-gray-800 mb-6 border-b-4 border-blue-600 pb-3">Executive Summary</h2>
          <p className="summary-text text-xl leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="content-grid grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Column */}
        <div className="left-column lg:col-span-1">
          {/* Core Competencies */}
          {data.skills && data.skills.length > 0 && (
            <div className="skills-section mb-8">
              <h3 className="section-title text-2xl font-bold text-gray-800 mb-6">Core Competencies</h3>
              <div className="competencies-list flex flex-col gap-5">
                {data.skills.map((skill, index) => (
                  <div key={index} className="competency-item flex flex-col gap-2">
                    <div className="competency-name font-semibold text-gray-800 text-lg">{skill.name}</div>
                    <div className="competency-bar h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                      <div className="competency-fill h-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.educations && data.educations.length > 0 && (
            <div className="education-section">
              <h3 className="section-title text-2xl font-bold text-gray-800 mb-6">Education</h3>
              <div className="education-list">
                {data.educations.map((edu, index) => (
                  <div key={index} className="education-item mb-5 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg">
                    <div className="degree font-bold text-gray-800 mb-2 text-xl">{edu.degree}</div>
                    <div className="institution text-gray-700 mb-2 text-lg">{edu.institution}</div>
                    <div className="year text-gray-600 font-semibold">{edu.graduationYear}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="right-column lg:col-span-2">
          {/* Professional Experience */}
          {data.workExperiences && data.workExperiences.length > 0 && (
            <div className="experience-section">
              <h3 className="section-title text-2xl font-bold text-gray-800 mb-6">Professional Experience</h3>
              <div className="experience-list">
                {data.workExperiences.map((work, index) => (
                  <div key={index} className="experience-item mb-10 p-8 border-2 border-gray-200 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg">
                    <div className="job-header mb-6">
                      <div className="job-title text-2xl font-bold text-gray-800 mb-2">{work.jobTitle}</div>
                      <div className="company text-lg text-gray-600 mb-2 font-semibold">{work.company}</div>
                      <div className="duration text-gray-500 font-medium">
                        {work.startDate} - {work.endDate}
                      </div>
                    </div>
                    {work.responsibilities && work.responsibilities.length > 0 && (
                      <ul className="responsibilities ml-6">
                        {work.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex} className="text-gray-700 leading-relaxed mb-3" style={{listStyleType: 'disc', color: '#3b82f6'}}>{resp.description}</li>
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

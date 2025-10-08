import React from 'react';

interface ColorfulTemplateProps {
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

export function ColorfulTemplate({ data }: ColorfulTemplateProps) {
  return (
    <div className="colorful-resume bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 text-white min-h-screen font-sans">
      {/* Header with Colorful Design */}
      <div className="header-section relative py-20">
        <div className="header-background absolute inset-0">
          <div className="color-stripes flex h-full">
            <div className="stripe stripe-1 flex-1 bg-gradient-to-br from-red-400 to-pink-500"></div>
            <div className="stripe stripe-2 flex-1 bg-gradient-to-br from-teal-400 to-cyan-500"></div>
            <div className="stripe stripe-3 flex-1 bg-gradient-to-br from-blue-400 to-indigo-500"></div>
          </div>
        </div>
        <div className="header-content relative z-10 max-w-5xl mx-auto px-5">
          <div className="profile-section flex items-center gap-12">
            {data.profilePicture && (
              <div className="profile-picture w-48 h-48 rounded-full overflow-hidden border-6 border-white/80 shadow-2xl">
                <img src={data.profilePicture} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="name-section">
              <h1 className="name text-6xl font-black mb-5 text-white text-shadow-lg">{data.primaryName}</h1>
              <div className="contact-info flex flex-col gap-4">
                <div className="contact-item flex items-center gap-4 text-lg">
                  <span className="icon text-2xl">📧</span>
                  <span>{data.primaryEmail}</span>
                </div>
                <div className="contact-item flex items-center gap-4 text-lg">
                  <span className="icon text-2xl">📱</span>
                  <span>{data.primaryPhone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="summary-section bg-white text-gray-900 mx-5 my-10 p-12 rounded-3xl shadow-2xl">
          <h2 className="section-title text-4xl font-black text-red-500 mb-6 flex items-center gap-4">
            <span className="title-decoration text-2xl">✨</span>
            About Me
            <span className="title-decoration text-2xl">✨</span>
          </h2>
          <p className="summary-text text-xl leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Main Content */}
      <div className="content-sections bg-white text-gray-900 mx-5 my-10 p-12 rounded-3xl shadow-2xl">
        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="skills-section mb-12">
            <h3 className="section-title text-4xl font-black text-red-500 mb-8 flex items-center gap-4">
              <span className="title-icon text-3xl">🎨</span>
              Skills & Talents
            </h3>
            <div className="skills-container flex flex-wrap gap-5">
              {data.skills.map((skill, index) => {
                const colorClass = (index % 4) + 1;
                const gradientClasses = {
                  1: 'bg-gradient-to-r from-red-400 to-pink-500',
                  2: 'bg-gradient-to-r from-teal-400 to-cyan-500',
                  3: 'bg-gradient-to-r from-blue-400 to-indigo-500',
                  4: 'bg-gradient-to-r from-purple-400 to-pink-500'
                };
                return (
                  <div key={index} className={`skill-badge ${gradientClasses[colorClass as keyof typeof gradientClasses]} text-white px-6 py-4 rounded-full font-bold text-lg shadow-lg hover:transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300`}>
                    {skill.name}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {data.workExperiences && data.workExperiences.length > 0 && (
          <div className="experience-section mb-12">
            <h3 className="section-title text-4xl font-black text-red-500 mb-8 flex items-center gap-4">
              <span className="title-icon text-3xl">🚀</span>
              Work Journey
            </h3>
            <div className="experience-timeline">
              {data.workExperiences.map((work, index) => {
                const markerClass = (index % 3) + 1;
                const markerGradients = {
                  1: 'bg-gradient-to-r from-red-400 to-pink-500',
                  2: 'bg-gradient-to-r from-teal-400 to-cyan-500',
                  3: 'bg-gradient-to-r from-blue-400 to-indigo-500'
                };
                return (
                  <div key={index} className="timeline-item flex gap-6 mb-10">
                    <div className={`timeline-marker w-6 h-6 ${markerGradients[markerClass as keyof typeof markerGradients]} rounded-full flex-shrink-0 mt-2 shadow-lg`}></div>
                    <div className="timeline-content flex-1 bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg">
                      <div className="job-header mb-4">
                        <div className="job-title text-2xl font-bold text-red-500 mb-2">{work.jobTitle}</div>
                        <div className="company text-lg text-gray-600 mb-2 font-semibold">{work.company}</div>
                        <div className="duration text-gray-500 font-medium">
                          {work.startDate} - {work.endDate}
                        </div>
                      </div>
                      {work.responsibilities && work.responsibilities.length > 0 && (
                        <ul className="responsibilities ml-6">
                          {work.responsibilities.map((resp, respIndex) => (
                            <li key={respIndex} className="text-gray-700 leading-relaxed mb-2" style={{listStyleType: 'disc', color: '#ef4444'}}>{resp.description}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Education */}
        {data.educations && data.educations.length > 0 && (
          <div className="education-section">
            <h3 className="section-title text-4xl font-black text-red-500 mb-8 flex items-center gap-4">
              <span className="title-icon text-3xl">🎓</span>
              Education
            </h3>
            <div className="education-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.educations.map((edu, index) => {
                const cardClass = (index % 3) + 1;
                const cardGradients = {
                  1: 'bg-gradient-to-br from-red-400 to-pink-500',
                  2: 'bg-gradient-to-br from-teal-400 to-cyan-500',
                  3: 'bg-gradient-to-br from-blue-400 to-indigo-500'
                };
                return (
                  <div key={index} className={`education-card ${cardGradients[cardClass as keyof typeof cardGradients]} text-white p-6 rounded-2xl text-center shadow-lg hover:transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300`}>
                    <div className="degree font-bold mb-3 text-xl">{edu.degree}</div>
                    <div className="institution opacity-95 mb-2 text-lg">{edu.institution}</div>
                    <div className="year opacity-90 font-semibold">{edu.graduationYear}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';

interface TechModernTemplateProps {
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

export function TechModernTemplate({ data }: TechModernTemplateProps) {
  return (
    <div className="tech-modern-resume bg-gray-900 text-white font-sans">
      {/* Header with Tech Design */}
      <div className="header-section bg-gradient-to-r from-green-400 to-blue-500 py-16 mb-12 relative">
        <div className="header-content max-w-5xl mx-auto px-5 relative z-10">
          <div className="profile-section flex items-center gap-12">
            {data.profilePicture && (
              <div className="profile-picture w-40 h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                <img src={data.profilePicture} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="name-section">
              <h1 className="name text-5xl font-black mb-3 text-white text-shadow-lg">{data.primaryName}</h1>
              <div className="title text-xl text-white/90 mb-6 font-medium">Tech Professional</div>
              <div className="contact-info flex flex-col gap-3">
                <span className="email text-lg text-white/95 flex items-center gap-2">
                  💻 {data.primaryEmail}
                </span>
                <span className="phone text-lg text-white/95 flex items-center gap-2">
                  📱 {data.primaryPhone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="summary-section mb-12 bg-gradient-to-br from-gray-800 to-gray-700 p-10 rounded-2xl border-l-6 border-green-400 shadow-xl">
          <h2 className="section-title text-3xl font-black text-green-400 mb-6 border-b-2 border-green-400 pb-3">Tech Summary</h2>
          <p className="summary-text text-lg leading-relaxed text-gray-300">{data.summary}</p>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="content-grid grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="left-column lg:col-span-1">
          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="skills-section mb-8">
              <h3 className="section-title text-2xl font-bold text-green-400 mb-4">Tech Stack</h3>
              <div className="skills-grid grid grid-cols-1 gap-3">
                {data.skills.map((skill, index) => (
                  <div key={index} className="skill-item bg-gradient-to-br from-gray-800 to-gray-700 border-2 border-green-400/30 p-4 rounded-xl text-center font-semibold text-green-400 hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.educations && data.educations.length > 0 && (
            <div className="education-section">
              <h3 className="section-title text-2xl font-bold text-green-400 mb-4">Education</h3>
              <div className="education-list">
                {data.educations.map((edu, index) => (
                  <div key={index} className="education-item mb-4 p-5 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl shadow-lg">
                    <div className="degree font-bold text-green-400 mb-2 text-lg">{edu.degree}</div>
                    <div className="institution text-gray-300 mb-2">{edu.institution}</div>
                    <div className="year text-gray-400 font-medium">{edu.graduationYear}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="right-column lg:col-span-2">
          {/* Work Experience */}
          {data.workExperiences && data.workExperiences.length > 0 && (
            <div className="experience-section">
              <h3 className="section-title text-2xl font-bold text-green-400 mb-4">Tech Experience</h3>
              <div className="experience-list">
                {data.workExperiences.map((work, index) => (
                  <div key={index} className="experience-item mb-8 p-6 border-l-4 border-green-400 bg-gradient-to-br from-gray-800 to-gray-700 rounded-r-xl shadow-lg">
                    <div className="job-header mb-4">
                      <div className="job-title text-xl font-bold text-green-400 mb-2">{work.jobTitle}</div>
                      <div className="company text-lg text-gray-300 mb-2 font-medium">{work.company}</div>
                      <div className="duration text-gray-400 font-medium">
                        {work.startDate} - {work.endDate}
                      </div>
                    </div>
                    {work.responsibilities && work.responsibilities.length > 0 && (
                      <ul className="responsibilities ml-6">
                        {work.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex} className="text-gray-300 leading-relaxed mb-2" style={{listStyleType: 'disc', color: '#4ade80'}}>{resp.description}</li>
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

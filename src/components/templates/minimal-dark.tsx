import React from 'react';

interface MinimalDarkTemplateProps {
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

export function MinimalDarkTemplate({ data }: MinimalDarkTemplateProps) {
  return (
    <div className="minimal-dark-resume bg-black text-gray-200 font-sans">
      {/* Header */}
      <div className="header-section bg-gradient-to-br from-gray-900 to-gray-800 py-16 mb-10 relative">
        <div className="header-content max-w-4xl mx-auto px-5 relative z-10">
          <div className="profile-section flex items-center gap-10">
            {data.profilePicture && (
              <div className="profile-picture w-36 h-36 rounded-full overflow-hidden border-4 border-gray-600 shadow-2xl">
                <img src={data.profilePicture} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="name-section">
              <h1 className="name text-4xl font-black mb-5 text-white text-shadow-lg">{data.primaryName}</h1>
              <div className="contact-info flex flex-col gap-3">
                <div className="contact-item flex gap-3 items-center">
                  <span className="label text-gray-400 font-semibold">Email:</span>
                  <span className="value text-gray-200">{data.primaryEmail}</span>
                </div>
                <div className="contact-item flex gap-3 items-center">
                  <span className="label text-gray-400 font-semibold">Phone:</span>
                  <span className="value text-gray-200">{data.primaryPhone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="summary-section mb-10 bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border-l-4 border-gray-600">
          <p className="summary-text text-lg leading-relaxed text-gray-300">{data.summary}</p>
        </div>
      )}

      {/* Main Content */}
      <div className="content-grid grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="left-column lg:col-span-1">
          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="skills-section mb-8">
              <h3 className="section-title text-2xl font-bold text-white mb-4 border-b-2 border-gray-600 pb-2">Skills</h3>
              <div className="skills-list flex flex-wrap gap-3">
                {data.skills.map((skill, index) => (
                  <div key={index} className="skill-item bg-gradient-to-br from-gray-800 to-gray-700 text-white px-4 py-2 rounded-full text-sm font-semibold border border-gray-600 hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.educations && data.educations.length > 0 && (
            <div className="education-section">
              <h3 className="section-title text-2xl font-bold text-white mb-4 border-b-2 border-gray-600 pb-2">Education</h3>
              <div className="education-list">
                {data.educations.map((edu, index) => (
                  <div key={index} className="education-item mb-4 p-5 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg">
                    <div className="degree font-bold text-white mb-2 text-lg">{edu.degree}</div>
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
              <h3 className="section-title text-2xl font-bold text-white mb-4 border-b-2 border-gray-600 pb-2">Experience</h3>
              <div className="experience-list">
                {data.workExperiences.map((work, index) => (
                  <div key={index} className="experience-item mb-8 p-6 border-l-4 border-gray-600 bg-gradient-to-br from-gray-900 to-gray-800 rounded-r-xl shadow-lg">
                    <div className="job-header mb-4">
                      <div className="job-title text-xl font-bold text-white mb-2">{work.jobTitle}</div>
                      <div className="company text-lg text-gray-400 mb-2 font-medium">{work.company}</div>
                      <div className="duration text-gray-500 font-medium">
                        {work.startDate} - {work.endDate}
                      </div>
                    </div>
                    {work.responsibilities && work.responsibilities.length > 0 && (
                      <ul className="responsibilities ml-6">
                        {work.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex} className="text-gray-300 leading-relaxed mb-2" style={{listStyleType: 'disc', color: '#6b7280'}}>{resp.description}</li>
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

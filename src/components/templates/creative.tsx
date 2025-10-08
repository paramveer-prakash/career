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
    <div className="creative-resume bg-gradient-to-br from-purple-600 to-purple-800 text-white min-h-screen font-sans">
      {/* Header with Creative Design */}
      <div className="header-section relative py-20">
        <div className="header-background absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800"></div>
        <div className="header-content relative z-10 max-w-4xl mx-auto px-5">
          <div className="profile-section flex items-center gap-12">
            {data.profilePicture && (
              <div className="profile-picture w-48 h-48 rounded-full overflow-hidden border-6 border-white/40 shadow-2xl">
                <img src={data.profilePicture} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="name-section">
              <h1 className="name text-5xl font-black mb-5 text-shadow-lg">{data.primaryName}</h1>
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
          <h2 className="section-title text-4xl font-black text-purple-600 mb-6 flex items-center gap-4">
            <span className="title-icon text-3xl">💼</span>
            About Me
          </h2>
          <p className="summary-text text-xl leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Main Content */}
      <div className="content-sections bg-white text-gray-900 mx-5 my-10 p-12 rounded-3xl shadow-2xl">
        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="skills-section mb-12">
            <h3 className="section-title text-4xl font-black text-purple-600 mb-8 flex items-center gap-4">
              <span className="title-icon text-3xl">🛠️</span>
              Skills & Expertise
            </h3>
            <div className="skills-container flex flex-wrap gap-5">
              {data.skills.map((skill, index) => (
                <div key={index} className="skill-badge bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-4 rounded-full font-bold text-lg shadow-lg hover:transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {data.workExperiences && data.workExperiences.length > 0 && (
          <div className="experience-section mb-12">
            <h3 className="section-title text-4xl font-black text-purple-600 mb-8 flex items-center gap-4">
              <span className="title-icon text-3xl">🚀</span>
              Work Experience
            </h3>
            <div className="experience-timeline">
              {data.workExperiences.map((work, index) => (
                <div key={index} className="timeline-item flex gap-6 mb-10">
                  <div className="timeline-marker w-6 h-6 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex-shrink-0 mt-2 shadow-lg"></div>
                  <div className="timeline-content flex-1 bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg">
                    <div className="job-header mb-4">
                      <div className="job-title text-2xl font-bold text-purple-600 mb-2">{work.jobTitle}</div>
                      <div className="company text-lg text-gray-600 mb-2 font-semibold">{work.company}</div>
                      <div className="duration text-gray-500 font-medium">
                        {work.startDate} - {work.endDate}
                      </div>
                    </div>
                    {work.responsibilities && work.responsibilities.length > 0 && (
                      <ul className="responsibilities ml-6">
                        {work.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex} className="text-gray-700 leading-relaxed mb-2" style={{listStyleType: 'disc', color: '#9333ea'}}>{resp.description}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.educations && data.educations.length > 0 && (
          <div className="education-section">
            <h3 className="section-title text-4xl font-black text-purple-600 mb-8 flex items-center gap-4">
              <span className="title-icon text-3xl">🎓</span>
              Education
            </h3>
            <div className="education-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.educations.map((edu, index) => (
                <div key={index} className="education-card bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl text-center shadow-lg hover:transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="degree font-bold text-purple-600 mb-3 text-xl">{edu.degree}</div>
                  <div className="institution text-gray-700 mb-2 text-lg">{edu.institution}</div>
                  <div className="year text-gray-600 font-semibold">{edu.graduationYear}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

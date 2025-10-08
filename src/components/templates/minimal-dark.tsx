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
    <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* LEFT SIDEBAR - Modern Dark Purple/Blue */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white p-10">
            {/* Profile Picture */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-slate-600 shadow-2xl">
                  <img 
                    src={data.profilePicture || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces"}
                    alt={data.primaryName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-slate-800">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Name on Sidebar */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">{data.primaryName}</h1>
              {data.workExperiences && data.workExperiences.length > 0 && (
                <p className="text-emerald-400 text-lg font-medium">
                  {data.workExperiences[0].jobTitle}
                </p>
              )}
            </div>

            <div className="w-16 h-1 bg-emerald-500 mx-auto mb-8"></div>

            {/* Contact Section */}
            <div className="mb-10">
              <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm break-words">{data.primaryEmail}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm">{data.primaryPhone}</span>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            {data.skills && data.skills.length > 0 && (
              <div className="mb-10">
                <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Skills
                </h3>
                <div className="space-y-3">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                      <span className="text-sm">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Section */}
            {data.educations && data.educations.length > 0 && (
              <div>
                <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  Education
                </h3>
                <div className="space-y-5">
                  {data.educations.map((edu, index) => (
                    <div key={index} className="border-l-2 border-emerald-400 pl-4">
                      <div className="font-semibold text-sm mb-1">{edu.degree}</div>
                      <div className="text-slate-300 text-xs mb-1">{edu.institution}</div>
                      <div className="text-emerald-400 text-xs font-medium">{edu.graduationYear}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT MAIN CONTENT - Clean White */}
          <div className="lg:col-span-3 bg-white p-10">
            {/* Profile Summary */}
            {data.summary && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  <div className="w-1 h-8 bg-emerald-500 mr-3"></div>
                  Professional Summary
                </h2>
                <p className="text-slate-700 leading-relaxed text-base">
                  {data.summary}
                </p>
              </div>
            )}

            {/* Work Experience */}
            {data.workExperiences && data.workExperiences.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <div className="w-1 h-8 bg-emerald-500 mr-3"></div>
                  Work Experience
                </h2>
                <div className="space-y-8">
                  {data.workExperiences.map((work, index) => (
                    <div key={index} className="relative pl-8 border-l-2 border-slate-200">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                      
                      <div className="bg-slate-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-wrap items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">
                              {work.jobTitle}
                            </h3>
                            <div className="text-emerald-600 font-semibold text-base">
                              {work.company}
                            </div>
                          </div>
                          <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                            {work.startDate} - {work.endDate}
                          </div>
                        </div>
                        
                        {work.responsibilities && work.responsibilities.length > 0 && (
                          <ul className="space-y-2 mt-4">
                            {work.responsibilities.map((resp, respIndex) => (
                              <li 
                                key={respIndex}
                                className="text-slate-700 leading-relaxed text-sm flex items-start"
                              >
                                <svg className="w-4 h-4 mr-2 mt-0.5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>{resp.description}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
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
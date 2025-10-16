/* eslint-disable @typescript-eslint/no-explicit-any */

// Seed resume data for template previews
export const seedResume: any = {
  title: 'John Doe - Software Engineer',
  primaryName: 'John Doe',
  primaryEmail: 'john.doe@example.com',
  primaryPhone: '+1 (555) 123-4567',
  primaryLocation: 'San Francisco, CA',
  summary:
    'Senior software engineer with 8+ years building scalable backend systems, APIs, and cloud infrastructure. Passionate about code quality, observability, and mentoring junior developers.',
  skills: [
    { id: 's1', name: 'Java', skill: 'Java' },
    { id: 's2', name: 'Spring Boot', skill: 'Spring Boot' },
    { id: 's3', name: 'PostgreSQL', skill: 'PostgreSQL' },
    { id: 's4', name: 'Kafka', skill: 'Kafka' },
    { id: 's5', name: 'Redis', skill: 'Redis' },
    { id: 's6', name: 'AWS', skill: 'AWS' },
    { id: 's7', name: 'Docker', skill: 'Docker' },
    { id: 's8', name: 'Kubernetes', skill: 'Kubernetes' },
    { id: 's9', name: 'React', skill: 'React' },
    { id: 's10', name: 'TypeScript', skill: 'TypeScript' }
  ],
  workExperiences: [
    {
      id: 'w1',
      jobTitle: 'Senior Software Engineer',
      companyName: 'Acme Corp',
      startDate: '2021-03',
      endDate: null,
      isCurrent: true,
      location: 'San Francisco, CA',
      responsibilities: [
        { id: 'r1', description: 'Designed and shipped event-driven billing services using Kafka and Spring Boot, processing 10M+ events daily.' },
        { id: 'r2', description: 'Reduced API p95 latency by 40% through query optimization and Redis caching strategies.' },
        { id: 'r3', description: 'Implemented comprehensive observability with OpenTelemetry, Prometheus, and Grafana dashboards.' }
      ]
    },
    {
      id: 'w2',
      jobTitle: 'Software Engineer',
      companyName: 'Globex',
      startDate: '2018-07',
      endDate: '2021-02',
      isCurrent: false,
      location: 'Remote',
      responsibilities: [
        { id: 'r4', description: 'Built and maintained microservices architecture using Java and Node.js.' },
        { id: 'r5', description: 'Introduced blue/green deployments and feature flags, reducing deployment risk by 60%.' },
        { id: 'r6', description: 'Improved database performance through index tuning and schema refactoring.' }
      ]
    },
    {
      id: 'w3',
      jobTitle: 'Software Engineer',
      companyName: 'Globex',
      startDate: '2018-07',
      endDate: '2021-02',
      isCurrent: false,
      location: 'Remote',
      responsibilities: [
        { id: 'r4', description: 'Built and maintained microservices architecture using Java and Node.js.' },
        { id: 'r5', description: 'Introduced blue/green deployments and feature flags, reducing deployment risk by 60%.' },
        { id: 'r6', description: 'Improved database performance through index tuning and schema refactoring.' }
      ]
    }
  ],
  educations: [
    {
      id: 'e1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science in Computer Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2014-09',
      endDate: '2018-05',
      gpa: 3.7,
      location: 'Berkeley, CA'
    }
  ]
};

// Profession-specific seed data
export const professionSeeds: Record<string, any> = {
  technology: seedResume,
  
  finance: {
    title: 'Jane Smith - Financial Analyst',
    primaryName: 'Jane Smith',
    primaryEmail: 'jane.smith@example.com',
    primaryPhone: '+1 (555) 987-6543',
    primaryLocation: 'New York, NY',
    summary: 'Experienced financial analyst with 6+ years in investment banking and portfolio management. Expert in financial modeling, valuation, and market analysis.',
    skills: [
      { id: 's1', name: 'Financial Modeling', skill: 'Financial Modeling' },
      { id: 's2', name: 'Excel & VBA', skill: 'Excel & VBA' },
      { id: 's3', name: 'Bloomberg Terminal', skill: 'Bloomberg Terminal' },
      { id: 's4', name: 'Valuation Analysis', skill: 'Valuation Analysis' },
      { id: 's5', name: 'Portfolio Management', skill: 'Portfolio Management' }
    ],
    workExperiences: [
      {
        id: 'w1',
        jobTitle: 'Senior Financial Analyst',
        companyName: 'Goldman Sachs',
        startDate: '2020-01',
        endDate: null,
        isCurrent: true,
        responsibilities: [
          { id: 'r1', description: 'Developed complex financial models for M&A transactions valued over $2B.' },
          { id: 'r2', description: 'Led valuation analysis for 15+ investment opportunities, achieving 18% average ROI.' }
        ]
      }
    ],
    educations: [
      {
        id: 'e1',
        institution: 'NYU Stern School of Business',
        degree: 'MBA in Finance',
        startDate: '2016-09',
        endDate: '2018-05'
      }
    ]
  },
  
  healthcare: {
    title: 'Dr. Michael Chen - Healthcare Professional',
    primaryName: 'Dr. Michael Chen',
    primaryEmail: 'michael.chen@example.com',
    primaryPhone: '+1 (555) 246-8135',
    primaryLocation: 'Boston, MA',
    summary: 'Board-certified physician with 10+ years of clinical experience in internal medicine. Committed to patient-centered care and evidence-based practice.',
    skills: [
      { id: 's1', name: 'Internal Medicine', skill: 'Internal Medicine' },
      { id: 's2', name: 'Patient Care', skill: 'Patient Care' },
      { id: 's3', name: 'Diagnosis & Treatment', skill: 'Diagnosis & Treatment' },
      { id: 's4', name: 'Electronic Health Records', skill: 'Electronic Health Records' },
      { id: 's5', name: 'Clinical Research', skill: 'Clinical Research' }
    ],
    workExperiences: [
      {
        id: 'w1',
        jobTitle: 'Attending Physician',
        companyName: 'Massachusetts General Hospital',
        startDate: '2018-07',
        endDate: null,
        isCurrent: true,
        responsibilities: [
          { id: 'r1', description: 'Provide comprehensive care to 20+ patients daily in internal medicine department.' },
          { id: 'r2', description: 'Lead clinical research initiatives focused on chronic disease management.' }
        ]
      }
    ],
    educations: [
      {
        id: 'e1',
        institution: 'Harvard Medical School',
        degree: 'Doctor of Medicine (M.D.)',
        startDate: '2010-09',
        endDate: '2014-05'
      }
    ]
  },
  
  marketing: {
    title: 'Sarah Johnson - Marketing Manager',
    primaryName: 'Sarah Johnson',
    primaryEmail: 'sarah.johnson@example.com',
    primaryPhone: '+1 (555) 369-2580',
    primaryLocation: 'Los Angeles, CA',
    summary: 'Creative marketing professional with 7+ years driving brand growth through digital campaigns, content strategy, and data-driven insights.',
    skills: [
      { id: 's1', name: 'Digital Marketing', skill: 'Digital Marketing' },
      { id: 's2', name: 'SEO/SEM', skill: 'SEO/SEM' },
      { id: 's3', name: 'Content Strategy', skill: 'Content Strategy' },
      { id: 's4', name: 'Google Analytics', skill: 'Google Analytics' },
      { id: 's5', name: 'Social Media', skill: 'Social Media' }
    ],
    workExperiences: [
      {
        id: 'w1',
        jobTitle: 'Marketing Manager',
        companyName: 'Adobe',
        startDate: '2019-03',
        endDate: null,
        isCurrent: true,
        responsibilities: [
          { id: 'r1', description: 'Managed $2M annual marketing budget, achieving 35% increase in qualified leads.' },
          { id: 'r2', description: 'Led cross-functional campaigns that grew brand awareness by 50% in 18 months.' }
        ]
      }
    ],
    educations: [
      {
        id: 'e1',
        institution: 'UCLA',
        degree: 'B.A. in Marketing',
        startDate: '2013-09',
        endDate: '2017-05'
      }
    ]
  }
};

export function getSeedForProfession(profession: string): any {
  return professionSeeds[profession] || seedResume;
}



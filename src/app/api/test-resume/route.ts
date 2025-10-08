import { NextResponse } from 'next/server';

export async function GET() {
  const sampleResumeData = {
    id: 26,
    title: "Renu_Gusain_Resume",
    primaryName: "Renu Gusain",
    primaryEmail: "renu.gusain05@gmail.com",
    primaryPhone: "+918802149906",
    primaryLocation: "India",
    profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    summary: "Experienced Java Software Developer with 8+ years of expertise in building scalable, high-performance applications. Specialized in Java, Intershop, Spring Boot, and Microservices. Strong team player committed to enhancing software quality and embracing continuous learning.",
    skills: [
      { id: 1, name: "Java" },
      { id: 2, name: "Spring Boot" },
      { id: 3, name: "Microservices" },
      { id: 4, name: "Intershop" },
      { id: 5, name: "JavaScript" },
      { id: 6, name: "React" },
      { id: 7, name: "Node.js" },
      { id: 8, name: "PostgreSQL" },
      { id: 9, name: "Docker" },
      { id: 10, name: "AWS" }
    ],
    workExperiences: [
      {
        id: 1,
        jobTitle: "Senior Java Developer",
        companyName: "Tech Corp",
        startDate: "2020-01",
        endDate: "2024-12",
        responsibilities: [
          { id: 1, description: "Developed scalable microservices using Spring Boot" },
          { id: 2, description: "Led a team of 5 developers in agile environment" },
          { id: 3, description: "Implemented CI/CD pipelines using Jenkins and Docker" }
        ]
      },
      {
        id: 2,
        jobTitle: "Java Developer",
        companyName: "Software Solutions Inc",
        startDate: "2018-06",
        endDate: "2019-12",
        responsibilities: [
          { id: 1, description: "Built RESTful APIs using Spring Framework" },
          { id: 2, description: "Worked with Intershop e-commerce platform" },
          { id: 3, description: "Collaborated with frontend team on React applications" }
        ]
      }
    ],
    educations: [
      {
        id: 1,
        institution: "Bachelor of Technology in Computer Science",
        degree: "B.Tech",
        fieldOfStudy: "Computer Science",
        startDate: 2014,
        endDate: 2018
      }
    ]
  };

  return NextResponse.json(sampleResumeData);
}

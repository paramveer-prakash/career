import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      location,
      currentRole,
      experience,
      skills,
      education,
      careerGoals,
      additionalInfo: _additionalInfo
    } = body;

    // Generate a unique ID (in real implementation, this would come from the database)
    const resumeId = `ai-generated-${Date.now()}`;

    // Parse skills from the input
    const skillsList = skills.split(',').map((skill: string, index: number) => ({
      id: `skill-${index + 1}`,
      name: skill.trim(),
      level: 'Intermediate',
      category: 'Technical',
      sortOrder: index + 1,
      isVisible: true
    }));

    // Create work experience entries based on the experience text
    const workExperiences = [{
      id: 'work-1',
      jobTitle: currentRole || 'Software Developer',
      companyName: 'Current Company',
      companyLocation: location || 'Remote',
      employmentType: 'Full-time',
      startDate: '2020-01-01',
      endDate: null,
      isCurrent: true,
      jobDescription: experience,
      technologies: skillsList.map((s: { name: string }) => s.name),
      industry: 'Technology',
      sortOrder: 1,
      isVisible: true,
      responsibilities: [{
        id: 'resp-1',
        description: experience,
        sortOrder: 1,
        isVisible: true
      }]
    }];

    // Create education entries
    const educations = education ? [{
      id: 'edu-1',
      institution: 'University',
      degree: 'Bachelor\'s Degree',
      fieldOfStudy: 'Computer Science',
      startDate: '2016-09-01',
      endDate: '2020-06-01',
      gpa: '3.5',
      description: education,
      sortOrder: 1,
      isVisible: true
    }] : [];

    // Create certifications if mentioned
    const certifications: { name: string; authority: string | null; date: string | null }[] = [];

    // Generate a professional summary
    const summary = careerGoals 
      ? `${experience.substring(0, 200)}... ${careerGoals}`
      : `${experience.substring(0, 300)}...`;

    // Create the resume object with the same structure as the existing API
    const generatedResume = {
      id: resumeId,
      title: `${name}_Resume`,
      primaryName: name,
      primaryEmail: email,
      primaryPhone: phone || '',
      primaryLocation: location || '',
      summary: summary,
      skills: skillsList,
      workExperiences: workExperiences,
      educations: educations,
      certifications: certifications,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In a real implementation, you would save this to the database here
    // For now, we'll just return the generated resume
    // The frontend will then redirect to the resume editor

    return NextResponse.json(generatedResume);
  } catch (error) {
    console.error('Error generating resume:', error);
    return NextResponse.json(
      { error: 'Failed to generate resume' },
      { status: 500 }
    );
  }
}

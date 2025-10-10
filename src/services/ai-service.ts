import { WorkExperience, Skill, Education } from './resume-service';

// AI Service Types
export interface AIEnhancementRequest {
  resumeId: string;
  content: string;
  context?: string;
}

export interface AIEnhancementResponse {
  success: boolean;
  enhancedContent: string;
  suggestions?: string[];
  confidence?: number;
}

export interface SkillRecommendationRequest {
  resumeId: string;
  jobDescription: string;
  currentSkills: Skill[];
}

export interface SkillRecommendationResponse {
  success: boolean;
  recommendedSkills: {
    skill: string;
    reason: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  missingKeywords: string[];
}

export interface SummaryGenerationRequest {
  resumeId: string;
  workExperiences: WorkExperience[];
  skills: Skill[];
  education: Education[];
}

export interface SummaryGenerationResponse {
  success: boolean;
  summary: string;
  alternativeSummaries?: string[];
}

// Chat and Interactive AI Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'question' | 'advice' | 'suggestion' | 'clarification';
}

export interface ResumeContext {
  skills: string[];
  workExperiences: string[];
  education: string[];
  currentRole?: string;
}

export interface ChatRequest {
  resumeId: string;
  message: string;
  conversationHistory?: ChatMessage[];
  resumeContext?: ResumeContext;
}

export interface ChatResponse {
  success: boolean;
  message?: string;
  suggestions?: string[];
  followUpQuestions?: string[];
  error?: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'technical' | 'behavioral' | 'situational' | 'company-specific';
  difficulty: 'easy' | 'medium' | 'hard';
  suggestedAnswer?: string;
  tips?: string[];
}

export interface InterviewPreparationRequest {
  resumeId: string;
  jobTitle?: string;
  company?: string;
  jobDescription?: string;
}

export interface InterviewPreparationResponse {
  success: boolean;
  questions?: InterviewQuestion[];
  preparationTips?: string[];
  error?: string;
}

export interface CareerGuidanceRequest {
  resumeId: string;
  currentGoals?: string;
  targetRole?: string;
  timeHorizon?: 'short-term' | 'medium-term' | 'long-term';
}

export interface CareerGuidanceResponse {
  success: boolean;
  recommendations?: Array<{
    action: string;
    priority: 'high' | 'medium' | 'low';
    timeline: string;
    resources?: string[];
  }>;
  skillGaps?: string[];
  nextSteps?: string[];
  error?: string;
}

// Dummy AI Service Implementation
export class AIService {
  // Simulate API delay
  private static async simulateDelay(ms: number = 1000): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 1. Resume Summary Generation
  static async generateResumeSummary(request: SummaryGenerationRequest): Promise<SummaryGenerationResponse> {
    await this.simulateDelay(1500);
    
    const { workExperiences, skills, education } = request;
    
    // Extract key information for summary generation
    const jobTitles = workExperiences.map(exp => exp.jobTitle).filter(Boolean);
    const companies = workExperiences.map(exp => exp.companyName).filter(Boolean);
    const topSkills = skills.slice(0, 5).map(skill => skill.name);
    const latestEducation = education[0];
    
    // Generate contextual summary based on experience
    let summary = '';
    let alternativeSummaries: string[] = [];
    
    if (workExperiences.length > 0) {
      const primaryRole = jobTitles[0] || 'Professional';
      const primaryCompany = companies[0] || 'various organizations';
      const experienceYears = this.calculateExperienceYears(workExperiences);
      
      summary = `Experienced ${primaryRole} with ${experienceYears} years of expertise in ${topSkills.slice(0, 3).join(', ')}. Proven track record of delivering results at ${primaryCompany} and driving innovation through strategic thinking and collaborative leadership.`;
      
      alternativeSummaries = [
        `Results-driven ${primaryRole} with ${experienceYears} years of experience in ${topSkills.slice(0, 2).join(' and ')}. Demonstrated success in leading cross-functional teams and delivering high-impact solutions that drive business growth.`,
        `Dynamic ${primaryRole} with ${experienceYears} years of progressive experience in ${topSkills.slice(0, 3).join(', ')}. Passionate about leveraging technology and data-driven insights to solve complex challenges and achieve organizational objectives.`
      ];
    } else if (education.length > 0) {
      const degree = latestEducation.degree || 'graduate';
      const field = latestEducation.fieldOfStudy || 'relevant field';
      const institution = latestEducation.institution || 'university';
      
      summary = `Recent ${degree} in ${field} from ${institution} with strong foundation in ${topSkills.slice(0, 3).join(', ')}. Eager to apply academic knowledge and technical skills in a professional environment while contributing to innovative projects.`;
      
      alternativeSummaries = [
        `Motivated ${degree} graduate with specialization in ${field} and hands-on experience in ${topSkills.slice(0, 2).join(' and ')}. Ready to make immediate impact through analytical thinking and collaborative approach.`,
        `Emerging professional with ${degree} in ${field} and demonstrated proficiency in ${topSkills.slice(0, 3).join(', ')}. Committed to continuous learning and delivering excellence in fast-paced environments.`
      ];
    } else {
      summary = `Professional with expertise in ${topSkills.slice(0, 3).join(', ')}. Seeking opportunities to leverage skills and experience in a challenging role that promotes growth and innovation.`;
      
      alternativeSummaries = [
        `Skilled professional with strong background in ${topSkills.slice(0, 2).join(' and ')}. Committed to delivering high-quality results and contributing to team success.`,
        `Experienced individual with proficiency in ${topSkills.slice(0, 3).join(', ')}. Ready to take on new challenges and drive positive outcomes.`
      ];
    }
    
    return {
      success: true,
      summary,
      alternativeSummaries
    };
  }

  // 2. Skill Gap Analysis & Recommendations
  static async analyzeSkillGaps(request: SkillRecommendationRequest): Promise<SkillRecommendationResponse> {
    await this.simulateDelay(2000);
    
    const { jobDescription, currentSkills } = request;
    
    // Extract skills from job description (simplified)
    const jobSkills = this.extractSkillsFromJobDescription(jobDescription);
    const currentSkillNames = currentSkills.map(skill => skill.name.toLowerCase());
    
    // Find missing skills
    const missingSkills = jobSkills.filter(skill => 
      !currentSkillNames.some(current => 
        current.includes(skill.toLowerCase()) || skill.toLowerCase().includes(current)
      )
    );
    
    // Generate recommendations with priorities
    const recommendedSkills = missingSkills.map(skill => ({
      skill,
      reason: this.generateSkillReason(skill, jobDescription),
      priority: this.determineSkillPriority(skill, jobDescription) as 'high' | 'medium' | 'low'
    }));
    
    // Sort by priority
    recommendedSkills.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    
    return {
      success: true,
      recommendedSkills: recommendedSkills.slice(0, 8), // Limit to top 8 recommendations
      missingKeywords: missingSkills.slice(0, 5)
    };
  }

  // 3. Achievement Enhancement
  static async enhanceAchievement(request: AIEnhancementRequest): Promise<AIEnhancementResponse> {
    await this.simulateDelay(1200);
    
    const { content, context } = request;
    
    // Enhanced achievement templates based on content analysis
    const enhancedContent = this.transformAchievement(content, context);
    const suggestions = this.generateAchievementSuggestions(content);
    
    return {
      success: true,
      enhancedContent,
      suggestions,
      confidence: 0.85
    };
  }

  // Helper Methods
  private static calculateExperienceYears(workExperiences: WorkExperience[]): string {
    if (workExperiences.length === 0) return '0';
    
    const totalMonths = workExperiences.reduce((total, exp) => {
      if (!exp.startDate) return total;
      const startDate = new Date(exp.startDate);
      const endDate = exp.isCurrent ? new Date() : new Date(exp.endDate || new Date());
      const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                    (endDate.getMonth() - startDate.getMonth());
      return total + Math.max(0, months);
    }, 0);
    
    const years = Math.floor(totalMonths / 12);
    return years > 0 ? `${years}+` : '1';
  }

  private static extractSkillsFromJobDescription(jobDescription: string): string[] {
    // Common technical skills to look for
    const commonSkills = [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'C#',
      'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Azure', 'Docker', 'Kubernetes',
      'Git', 'Agile', 'Scrum', 'Project Management', 'Leadership', 'Communication',
      'Problem Solving', 'Analytical Skills', 'Team Management', 'Data Analysis',
      'Machine Learning', 'AI', 'DevOps', 'CI/CD', 'Microservices', 'REST API',
      'GraphQL', 'HTML', 'CSS', 'Bootstrap', 'Tailwind', 'Vue.js', 'Angular',
      'Spring Boot', 'Django', 'Flask', 'Express.js', 'Next.js', 'Nuxt.js'
    ];
    
    const foundSkills: string[] = [];
    const lowerDescription = jobDescription.toLowerCase();
    
    commonSkills.forEach(skill => {
      if (lowerDescription.includes(skill.toLowerCase())) {
        foundSkills.push(skill);
      }
    });
    
    return foundSkills;
  }

  private static generateSkillReason(skill: string, jobDescription: string): string {
    const reasons = {
      'JavaScript': 'Essential for modern web development and mentioned in job requirements',
      'React': 'Core framework for frontend development, highly sought after',
      'Python': 'Versatile programming language with growing demand',
      'AWS': 'Leading cloud platform, critical for scalable applications',
      'Leadership': 'Management role requires strong leadership capabilities',
      'Communication': 'Essential soft skill for team collaboration',
      'Project Management': 'Key skill for delivering projects on time and budget',
      'SQL': 'Database management is fundamental for data-driven roles',
      'Agile': 'Modern development methodology used by most companies',
      'Git': 'Version control is essential for collaborative development'
    };
    
    return reasons[skill as keyof typeof reasons] || 
           `This skill is mentioned in the job description and would strengthen your application`;
  }

  private static determineSkillPriority(skill: string, jobDescription: string): string {
    const highPrioritySkills = ['JavaScript', 'React', 'Python', 'AWS', 'Leadership', 'SQL'];
    const mediumPrioritySkills = ['Node.js', 'Docker', 'Agile', 'Git', 'Communication'];
    
    if (highPrioritySkills.some(s => skill.toLowerCase().includes(s.toLowerCase()))) {
      return 'high';
    } else if (mediumPrioritySkills.some(s => skill.toLowerCase().includes(s.toLowerCase()))) {
      return 'medium';
    }
    return 'low';
  }

  private static transformAchievement(content: string, context?: string): string {
    const lowerContent = content.toLowerCase();
    
    // Achievement enhancement patterns
    if (lowerContent.includes('managed') || lowerContent.includes('led')) {
      return this.enhanceLeadershipAchievement(content);
    } else if (lowerContent.includes('developed') || lowerContent.includes('built')) {
      return this.enhanceDevelopmentAchievement(content);
    } else if (lowerContent.includes('increased') || lowerContent.includes('improved')) {
      return this.enhanceImpactAchievement(content);
    } else if (lowerContent.includes('designed') || lowerContent.includes('created')) {
      return this.enhanceCreativeAchievement(content);
    } else {
      return this.enhanceGenericAchievement(content);
    }
  }

  private static enhanceLeadershipAchievement(content: string): string {
    const enhancements = [
      'resulting in improved team productivity and project delivery',
      'leading to enhanced collaboration and streamlined processes',
      'achieving 25% faster project completion times',
      'fostering innovation and driving organizational growth',
      'delivering high-quality solutions on time and within budget'
    ];
    
    const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
    return `${content}, ${randomEnhancement}`;
  }

  private static enhanceDevelopmentAchievement(content: string): string {
    const enhancements = [
      'resulting in improved system performance and user experience',
      'reducing development time by 30% and increasing code quality',
      'enhancing scalability and maintainability of the application',
      'achieving 99.9% uptime and improved user satisfaction',
      'streamlining workflows and reducing manual processes'
    ];
    
    const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
    return `${content}, ${randomEnhancement}`;
  }

  private static enhanceImpactAchievement(content: string): string {
    const enhancements = [
      'contributing to significant business growth and customer satisfaction',
      'driving measurable improvements in key performance indicators',
      'establishing new industry standards and best practices',
      'creating lasting value for stakeholders and end users',
      'positioning the organization for future success and expansion'
    ];
    
    const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
    return `${content}, ${randomEnhancement}`;
  }

  private static enhanceCreativeAchievement(content: string): string {
    const enhancements = [
      'delivering innovative solutions that exceeded client expectations',
      'creating user-centric designs that improved engagement metrics',
      'establishing new design standards and visual identity guidelines',
      'leveraging cutting-edge technologies to solve complex challenges',
      'transforming ideas into impactful, market-ready products'
    ];
    
    const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
    return `${content}, ${randomEnhancement}`;
  }

  private static enhanceGenericAchievement(content: string): string {
    const enhancements = [
      'delivering exceptional results and exceeding performance expectations',
      'contributing to organizational success through innovative approaches',
      'establishing best practices and driving continuous improvement',
      'creating value through strategic thinking and collaborative execution',
      'achieving measurable outcomes that support business objectives'
    ];
    
    const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
    return `${content}, ${randomEnhancement}`;
  }

  private static generateAchievementSuggestions(content: string): string[] {
    return [
      'Consider adding specific metrics or numbers to quantify your impact',
      'Include the business outcome or benefit achieved',
      'Mention the scope or scale of your contribution',
      'Highlight any recognition or awards received',
      'Describe the challenges overcome or problems solved'
    ];
  }

  // Interactive AI Assistant Methods

  // 1. Resume Chatbot
  static async chatWithResume(request: ChatRequest): Promise<ChatResponse> {
    console.log('AI Service: Chat with resume for:', request);
    await this.simulateDelay(1500);

    const { message, resumeContext } = request;
    const messageLower = message.toLowerCase();

    // Analyze the user's question and provide contextual advice
    if (messageLower.includes('summary') || messageLower.includes('objective')) {
      return {
        success: true,
        message: "Your professional summary should be 2-3 sentences that highlight your key strengths and career focus. Based on your experience, I'd suggest emphasizing your technical expertise and leadership skills. Would you like me to help you craft a compelling summary?",
        suggestions: [
          "Generate a professional summary",
          "Review your current summary",
          "Get tips for writing summaries"
        ],
        followUpQuestions: [
          "What's your target role?",
          "What are your key achievements?",
          "What makes you unique?"
        ]
      };
    }

    if (messageLower.includes('skill') || messageLower.includes('competenc')) {
      return {
        success: true,
        message: "Your skills section should include both technical and soft skills relevant to your target role. I notice you have strong technical skills. Consider adding leadership, communication, or project management skills to show your versatility.",
        suggestions: [
          "Analyze skill gaps for a specific job",
          "Get skill recommendations",
          "Review your current skills"
        ],
        followUpQuestions: [
          "What role are you targeting?",
          "What skills are most important?",
          "How can I improve my skills section?"
        ]
      };
    }

    if (messageLower.includes('experience') || messageLower.includes('work')) {
      return {
        success: true,
        message: "Your work experience should use action verbs and quantify achievements where possible. Each bullet point should show impact and results. I can help you enhance your experience descriptions to make them more compelling.",
        suggestions: [
          "Enhance work experience descriptions",
          "Add quantifiable achievements",
          "Improve action verbs"
        ],
        followUpQuestions: [
          "Which experience needs improvement?",
          "How can I quantify my achievements?",
          "What action verbs should I use?"
        ]
      };
    }

    if (messageLower.includes('format') || messageLower.includes('layout') || messageLower.includes('design')) {
      return {
        success: true,
        message: "A clean, professional format is crucial for ATS compatibility and readability. Use consistent formatting, clear headings, and plenty of white space. I can suggest improvements to make your resume more visually appealing and ATS-friendly.",
        suggestions: [
          "Review resume formatting",
          "Check ATS compatibility",
          "Improve visual design"
        ],
        followUpQuestions: [
          "Is my resume ATS-friendly?",
          "How can I improve the layout?",
          "What format works best?"
        ]
      };
    }

    // Default response for general questions
    return {
      success: true,
      message: "I'm here to help you improve your resume! I can assist with writing summaries, enhancing work experience descriptions, analyzing skill gaps, and providing formatting advice. What specific area would you like to focus on?",
      suggestions: [
        "Improve my professional summary",
        "Enhance my work experience",
        "Analyze my skills",
        "Check my resume format"
      ],
      followUpQuestions: [
        "What's your biggest resume challenge?",
        "What role are you targeting?",
        "How can I make my resume stand out?"
      ]
    };
  }

  // 2. Interview Preparation
  static async generateInterviewQuestions(request: InterviewPreparationRequest): Promise<InterviewPreparationResponse> {
    console.log('AI Service: Generating interview questions for:', request);
    await this.simulateDelay(2000);

    const { jobTitle, company, jobDescription } = request;

    const questions: InterviewQuestion[] = [
      {
        id: '1',
        question: 'Tell me about yourself and your background.',
        category: 'behavioral',
        difficulty: 'easy',
        suggestedAnswer: 'Start with your current role, highlight 2-3 key achievements, and connect them to the role you\'re applying for.',
        tips: ['Keep it under 2 minutes', 'Focus on relevant experience', 'End with why you\'re interested in this role']
      },
      {
        id: '2',
        question: 'What are your greatest strengths?',
        category: 'behavioral',
        difficulty: 'easy',
        suggestedAnswer: 'Choose 2-3 strengths that are relevant to the role and provide specific examples.',
        tips: ['Be specific with examples', 'Connect strengths to job requirements', 'Show how you\'ve used these strengths']
      },
      {
        id: '3',
        question: 'Describe a challenging project you worked on and how you overcame obstacles.',
        category: 'behavioral',
        difficulty: 'medium',
        suggestedAnswer: 'Use the STAR method: Situation, Task, Action, Result. Focus on your problem-solving skills.',
        tips: ['Use the STAR method', 'Focus on your role', 'Quantify the results']
      },
      {
        id: '4',
        question: 'Where do you see yourself in 5 years?',
        category: 'behavioral',
        difficulty: 'medium',
        suggestedAnswer: 'Show career progression within the company while demonstrating commitment to growth.',
        tips: ['Be realistic', 'Show growth mindset', 'Connect to the company']
      },
      {
        id: '5',
        question: 'Why do you want to work for our company?',
        category: 'company-specific',
        difficulty: 'medium',
        suggestedAnswer: 'Research the company\'s values, mission, and recent achievements. Connect your goals to theirs.',
        tips: ['Research the company', 'Connect to your values', 'Show genuine interest']
      }
    ];

    // Add technical questions if it's a technical role
    if (jobTitle?.toLowerCase().includes('developer') || jobTitle?.toLowerCase().includes('engineer')) {
      questions.push(
        {
          id: '6',
          question: 'Explain a complex technical problem you solved recently.',
          category: 'technical',
          difficulty: 'hard',
          suggestedAnswer: 'Walk through your problem-solving process, the technologies used, and the outcome.',
          tips: ['Be specific about technologies', 'Explain your thought process', 'Show learning and growth']
        },
        {
          id: '7',
          question: 'How do you stay updated with the latest technologies?',
          category: 'technical',
          difficulty: 'medium',
          suggestedAnswer: 'Mention specific resources, communities, courses, or projects you work on.',
          tips: ['Be specific about resources', 'Show continuous learning', 'Mention practical application']
        }
      );
    }

    const preparationTips = [
      'Research the company thoroughly - mission, values, recent news',
      'Prepare 3-5 questions to ask the interviewer',
      'Practice the STAR method for behavioral questions',
      'Prepare specific examples for common questions',
      'Review the job description and match your experience',
      'Prepare for technical questions if applicable',
      'Practice your elevator pitch (tell me about yourself)',
      'Prepare questions about team culture and growth opportunities'
    ];

    return {
      success: true,
      questions,
      preparationTips
    };
  }

  // 3. Career Path Guidance
  static async getCareerGuidance(request: CareerGuidanceRequest): Promise<CareerGuidanceResponse> {
    console.log('AI Service: Getting career guidance for:', request);
    await this.simulateDelay(1800);

    const { targetRole, timeHorizon, currentGoals } = request;

    const recommendations = [
      {
        action: 'Enhance your technical skills with advanced certifications',
        priority: 'high' as const,
        timeline: '3-6 months',
        resources: ['AWS Certification', 'Google Cloud Platform', 'Advanced Java/Spring Boot']
      },
      {
        action: 'Develop leadership and management skills',
        priority: 'high' as const,
        timeline: '6-12 months',
        resources: ['Project Management Certification', 'Leadership workshops', 'Mentoring opportunities']
      },
      {
        action: 'Build a strong professional network',
        priority: 'medium' as const,
        timeline: 'Ongoing',
        resources: ['LinkedIn networking', 'Industry conferences', 'Professional associations']
      },
      {
        action: 'Contribute to open source projects',
        priority: 'medium' as const,
        timeline: '3-9 months',
        resources: ['GitHub contributions', 'Technical blogging', 'Community involvement']
      },
      {
        action: 'Consider advanced education or specialized training',
        priority: 'low' as const,
        timeline: '1-2 years',
        resources: ['Master\'s degree', 'Specialized bootcamps', 'Executive education programs']
      }
    ];

    const skillGaps = [
      'Cloud Architecture and DevOps',
      'Machine Learning and AI',
      'Data Analytics and Visualization',
      'Agile/Scrum Methodologies',
      'Cross-functional Team Leadership'
    ];

    const nextSteps = [
      'Identify 2-3 priority skills to develop this quarter',
      'Set up informational interviews with professionals in your target role',
      'Create a learning plan with specific milestones',
      'Update your resume and LinkedIn profile regularly',
      'Seek feedback from mentors and peers',
      'Consider taking on stretch assignments at work'
    ];

    return {
      success: true,
      recommendations,
      skillGaps,
      nextSteps
    };
  }
}

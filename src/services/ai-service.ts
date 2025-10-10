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
}

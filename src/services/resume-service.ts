import { api } from '@/lib/api';

export interface Resume {
  id: string;
  primaryName?: string;
  primaryEmail?: string;
  primaryPhone?: string;
  primaryLocation?: string;
  summary?: string;
  title?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  companyName: string;
  companyLocation?: string;
  employmentType?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  jobDescription?: string;
  technologies?: string[];
  industry?: string;
  sortOrder?: number;
  isVisible?: boolean;
  responsibilities?: WorkResponsibility[];
}

export interface WorkResponsibility {
  id: string;
  description: string;
  sortOrder?: number;
  isVisible?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level?: string;
  category?: string;
  sortOrder?: number;
  isVisible?: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
  description?: string;
  sortOrder?: number;
  isVisible?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer?: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  sortOrder?: number;
  isVisible?: boolean;
}

export class ResumeService {
  // Resume CRUD operations
  static async getResumes(): Promise<Resume[]> {
    const response = await api.get('/api/v1/resumes');
    const data = response.data;
    return Array.isArray(data) ? data : (Array.isArray(data?.content) ? data.content : []);
  }

  static async getResume(id: string): Promise<Resume> {
    const response = await api.get(`/api/v1/resumes/${id}`);
    return response.data;
  }

  static async updateResume(id: string, resume: Partial<Resume>): Promise<Resume> {
    const response = await api.put(`/api/v1/resumes/${id}`, resume);
    return response.data;
  }

  static async deleteResume(id: string): Promise<void> {
    await api.delete(`/api/v1/resumes/${id}`);
  }

  static async uploadResumeFile(file: File, overwrite: boolean = false, newName?: string): Promise<Resume[]> {
    const formData = new FormData();
    formData.append('file', file, newName || file.name);
    
    const response = await api.post('/api/v1/resumes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(overwrite && { 'X-Overwrite': 'true' }),
      },
    });
    return response.data;
  }

  // Skills operations
  static async getSkills(resumeId: string): Promise<Skill[]> {
    const response = await api.get(`/api/v1/resumes/${resumeId}/skills`);
    return response.data;
  }

  static async createSkill(resumeId: string, skill: Omit<Skill, 'id'>): Promise<Skill> {
    const response = await api.post(`/api/v1/resumes/${resumeId}/skills`, skill);
    return response.data;
  }

  static async updateSkill(resumeId: string, skillId: string, skill: Partial<Skill>): Promise<Skill> {
    const response = await api.put(`/api/v1/resumes/${resumeId}/skills/${skillId}`, skill);
    return response.data;
  }

  static async deleteSkill(resumeId: string, skillId: string): Promise<void> {
    await api.delete(`/api/v1/resumes/${resumeId}/skills/${skillId}`);
  }

  // Work Experience operations
  static async getWorkExperiences(resumeId: string): Promise<WorkExperience[]> {
    const response = await api.get(`/api/v1/resumes/${resumeId}/work-experiences`);
    return response.data;
  }

  static async createWorkExperience(resumeId: string, workExp: Omit<WorkExperience, 'id'>): Promise<WorkExperience> {
    const response = await api.post(`/api/v1/resumes/${resumeId}/work-experiences`, workExp);
    return response.data;
  }

  static async updateWorkExperience(resumeId: string, workExpId: string, workExp: Partial<WorkExperience>): Promise<WorkExperience> {
    const response = await api.put(`/api/v1/resumes/${resumeId}/work-experiences/${workExpId}`, workExp);
    return response.data;
  }

  static async deleteWorkExperience(resumeId: string, workExpId: string): Promise<void> {
    await api.delete(`/api/v1/resumes/${resumeId}/work-experiences/${workExpId}`);
  }

  // Education operations
  static async getEducations(resumeId: string): Promise<Education[]> {
    const response = await api.get(`/api/v1/resumes/${resumeId}/educations`);
    return response.data;
  }

  static async createEducation(resumeId: string, education: Omit<Education, 'id'>): Promise<Education> {
    const response = await api.post(`/api/v1/resumes/${resumeId}/educations`, education);
    return response.data;
  }

  static async updateEducation(resumeId: string, educationId: string, education: Partial<Education>): Promise<Education> {
    const response = await api.put(`/api/v1/resumes/${resumeId}/educations/${educationId}`, education);
    return response.data;
  }

  static async deleteEducation(resumeId: string, educationId: string): Promise<void> {
    await api.delete(`/api/v1/resumes/${resumeId}/educations/${educationId}`);
  }

  // Certifications operations
  static async getCertifications(resumeId: string): Promise<Certification[]> {
    const response = await api.get(`/api/v1/resumes/${resumeId}/certifications`);
    return response.data;
  }

  static async createCertification(resumeId: string, certification: Omit<Certification, 'id'>): Promise<Certification> {
    const response = await api.post(`/api/v1/resumes/${resumeId}/certifications`, certification);
    return response.data;
  }

  static async updateCertification(resumeId: string, certificationId: string, certification: Partial<Certification>): Promise<Certification> {
    const response = await api.put(`/api/v1/resumes/${resumeId}/certifications/${certificationId}`, certification);
    return response.data;
  }

  static async deleteCertification(resumeId: string, certificationId: string): Promise<void> {
    await api.delete(`/api/v1/resumes/${resumeId}/certifications/${certificationId}`);
  }
}

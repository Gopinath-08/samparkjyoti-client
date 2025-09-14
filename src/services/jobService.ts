import api from './api';

export interface JobPostingData {
  title: string;
  description: string;
  category: string;
  workType: string;
  duration: string;
  salary: number;
  salaryType: string;
  location: string;
  district: string;
  state: string;
  pincode: string;
  requiredSkills: string[];
  experienceRequired: string;
  educationRequired: string;
  ageRange: {
    min: number;
    max: number;
  };
  urgency: 'low' | 'medium' | 'high';
  benefits: string[];
  workingHours: {
    start: string;
    end: string;
  };
  workingDays: string[];
}

export const jobService = {
  async getJobs(filters?: {
    category?: string;
    location?: string;
    workType?: string;
    status?: string;
    search?: string;
  }) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }
    const response = await api.get(`/jobs?${params.toString()}`);
    return response;
  },

  async getJobById(id: string) {
    const response = await api.get(`/jobs/${id}`);
    return response;
  },

  async postJob(jobData: JobPostingData) {
    const response = await api.post('/jobs', jobData);
    return response;
  },

  async applyForJob(jobId: string) {
    const response = await api.post(`/jobs/${jobId}/apply`);
    return response;
  },

  async getMyJobApplications() {
    const response = await api.get('/jobs/my-applications');
    return response;
  },

  async getMyPostedJobs() {
    const response = await api.get('/jobs/my-jobs');
    return response;
  },

  async updateJob(jobId: string, jobData: Partial<JobPostingData>) {
    const response = await api.put(`/jobs/${jobId}`, jobData);
    return response;
  },

  async deleteJob(jobId: string) {
    const response = await api.delete(`/jobs/${jobId}`);
    return response;
  },
};

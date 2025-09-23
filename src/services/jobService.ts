import api from './api';
import { normalizeLocation, filterJobsByLocation } from '../utils/locationMatcher';

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

  async getJobsForUser(userLocation?: string, filters?: {
    category?: string;
    workType?: string;
    status?: string;
    search?: string;
  }) {
    // Get all jobs first
    const response = await this.getJobs(filters);
    const jobs = response.data?.data?.jobs || response.data?.jobs || [];
    
    // Map _id to id for frontend compatibility first
    const jobsWithId = jobs.map((job: any) => ({
      ...job,
      id: job._id || job.id
    }));
    
    // If user location is provided, filter and sort by location match
    if (userLocation) {
      const filteredJobs = filterJobsByLocation(jobsWithId, userLocation);
      return {
        ...response,
        data: {
          ...response.data,
          jobs: filteredJobs,
          locationFiltered: true,
          userLocation: normalizeLocation(userLocation)
        }
      };
    }
    
    return {
      ...response,
      data: {
        ...response.data,
        jobs: jobsWithId
      }
    };
  },

  async getLocationBasedRecommendations(userLocation: string, limit: number = 10) {
    const response = await this.getJobs();
    const jobs = response.data?.data?.jobs || response.data?.jobs || [];
    
    // Map _id to id for frontend compatibility first
    const jobsWithId = jobs.map((job: any) => ({
      ...job,
      id: job._id || job.id
    }));
    
    // Filter jobs by location and get recommendations
    const locationFilteredJobs = filterJobsByLocation(jobsWithId, userLocation);
    const recommendations = locationFilteredJobs.slice(0, limit);
    
    return {
      ...response,
      data: {
        ...response.data,
        jobs: recommendations,
        recommendations: true,
        userLocation: normalizeLocation(userLocation),
        totalMatches: locationFilteredJobs.filter(job => job.locationMatch).length
      }
    };
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

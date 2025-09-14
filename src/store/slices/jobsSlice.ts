import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jobService } from '../../services/jobService';

interface Job {
  id: string;
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
  employer: {
    name: string;
    phone: string;
    email: string;
    organization: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  urgency: 'low' | 'medium' | 'high';
  benefits: string[];
  workingHours: {
    start: string;
    end: string;
  };
  workingDays: string[];
  views: number;
  applications: number;
  shortlisted: number;
  postedAt: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

interface JobsState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  stats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    underReview: number;
  };
}

const initialState: JobsState = {
  jobs: [],
  loading: false,
  error: null,
  stats: {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    underReview: 0,
  },
};

// Async thunks
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await jobService.getJobs();
      console.log('Redux - fetchJobs response:', response.data);
      // Backend returns: { status: "success", data: { jobs: [...] } }
      const jobs = response.data?.data?.jobs || response.data?.jobs || [];
      console.log('Redux - extracted jobs:', jobs);
      return jobs;
    } catch (error: any) {
      console.error('Redux - fetchJobs error:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch jobs');
    }
  }
);

export const fetchJobById = createAsyncThunk(
  'jobs/fetchJobById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await jobService.getJobById(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch job');
    }
  }
);

export const applyForJob = createAsyncThunk(
  'jobs/applyForJob',
  async (jobId: string, { rejectWithValue }) => {
    try {
      const response = await jobService.applyForJob(jobId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to apply for job');
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        // Map _id to id for frontend compatibility
        const jobsWithId = action.payload.map((job: any) => ({
          ...job,
          id: job._id || job.id
        }));
        state.jobs = jobsWithId;
        state.stats = {
          total: jobsWithId.length,
          pending: jobsWithId.filter((job: Job) => job.status === 'pending').length,
          approved: jobsWithId.filter((job: Job) => job.status === 'approved').length,
          rejected: jobsWithId.filter((job: Job) => job.status === 'rejected').length,
          underReview: jobsWithId.filter((job: Job) => job.status === 'under_review').length,
        };
        console.log('Redux - Jobs loaded:', jobsWithId.length, 'jobs');
        console.log('Redux - Approved jobs:', state.stats.approved);
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch job by ID
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        const existingIndex = state.jobs.findIndex(job => job.id === action.payload.id);
        if (existingIndex >= 0) {
          state.jobs[existingIndex] = action.payload;
        } else {
          state.jobs.push(action.payload);
        }
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Apply for job
      .addCase(applyForJob.fulfilled, (state, action) => {
        const job = state.jobs.find(job => job.id === action.payload.jobId);
        if (job) {
          job.applications += 1;
        }
      });
  },
});

export const { clearError } = jobsSlice.actions;
export default jobsSlice.reducer;



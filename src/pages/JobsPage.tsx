import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchJobs, fetchJobsForUser, fetchLocationRecommendations, clearLocationFilter } from '../store/slices/jobsSlice';
import { useAuth } from '../contexts/AuthContext';
import { locationsMatch } from '../utils/locationMatcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faClock,
  faBriefcase,
  faRupeeSign,
  faUser,
  faEye,
  faPhone,
  faEnvelope,
  faStar,
  faCheckCircle,
  faLocationArrow
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const JobsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #1565C0;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  margin: 0.5rem 0 0 0;
  font-weight: 400;
`;

const SearchSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const SearchRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #1976D2;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const SearchGroup = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #1976D2;
  }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const JobCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 1px solid #e0e0e0;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  }
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const JobTitle = styled.h3`
  color: #1565C0;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

const JobCompany = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${props => {
    switch(props.status) {
      case 'pending': return '#fef3c7';
      case 'under_review': return '#dbeafe';
      case 'approved': return '#d1fae5';
      case 'rejected': return '#fee2e2';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'pending': return '#92400e';
      case 'under_review': return '#1e40af';
      case 'approved': return '#065f46';
      case 'rejected': return '#991b1b';
      default: return '#374151';
    }
  }};
`;

const JobMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const JobDescription = styled.p`
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const JobSkills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const SkillTag = styled.span`
  background: #E3F2FD;
  color: #1976D2;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const JobActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  background: #1976D2;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s;

  &:hover {
    background: #1565C0;
  }
`;

const SecondaryButton = styled.button`
  background: white;
  color: #1976D2;
  border: 2px solid #1976D2;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #1976D2;
    color: white;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

const EmptyTitle = styled.h3`
  color: #1565C0;
  margin-bottom: 0.5rem;
`;

const EmptyDescription = styled.p`
  margin-bottom: 1rem;
`;

const LocationMatchBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 0.5rem;
`;

const LocationMatchInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4CAF50;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;

const FilterSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const CategoryFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterLabel = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 1rem;
`;

const CategorySelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  min-width: 200px;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #1976D2;
  }
`;

const EmployerInfo = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const EmployerName = styled.div`
  font-weight: 600;
  color: #1976D2;
  margin-bottom: 0.5rem;
`;

const EmployerDetails = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const EmployerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #1976D2;
  }
`;

const LocationIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
  color: #1976D2;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  border-left: 4px solid #1976D2;
`;

const JobSalary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Salary = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1976D2;
`;

const PostedDate = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

// Extended Job type for location matching
interface JobWithLocationMatch {
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
  locationMatch?: boolean;
  locationScore?: number;
  normalizedLocation?: string;
}

const JobsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { jobs, loading, error, locationFiltered, userLocation, totalMatches } = useSelector((state: RootState) => state.jobs);
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showLocationFilter, setShowLocationFilter] = useState(true);

  useEffect(() => {
    // Use location-based fetching if user has a location
    if (user?.location && showLocationFilter) {
      dispatch(fetchLocationRecommendations({ userLocation: user.location, limit: 50 }));
    } else {
      dispatch(fetchJobs());
    }
  }, [dispatch, user?.location, showLocationFilter]);

  // Enhanced location matching using the proper utility
  const isLocationMatch = (jobLocation: string, userLocation?: string) => {
    if (!userLocation) return false;
    return locationsMatch(userLocation, jobLocation);
  };

  // Toggle location filtering
  const toggleLocationFilter = () => {
    setShowLocationFilter(!showLocationFilter);
    if (showLocationFilter) {
      dispatch(clearLocationFilter());
    }
  };

  // Filter jobs based on approval status, location, and category
  const filteredJobs = jobs.filter(job => {
    // Must be approved
    const isApproved = job.status === 'approved';
    
    // Location matching (if location filter is enabled)
    const matchesLocation = showLocationFilter ? isLocationMatch(job.location, user?.location) : true;
    
    // Must match selected category (if any)
    const matchesCategory = selectedCategory === '' || job.category === selectedCategory;
    
    return isApproved && matchesLocation && matchesCategory;
  });

  // Sort jobs: location matches first, then by applications
  const sortedJobs = filteredJobs.sort((a, b) => {
    const jobA = a as JobWithLocationMatch;
    const jobB = b as JobWithLocationMatch;
    
    // Location matches first
    if (jobA.locationMatch && !jobB.locationMatch) return -1;
    if (!jobA.locationMatch && jobB.locationMatch) return 1;
    
    // Then by applications (popularity)
    return b.applications - a.applications;
  });

  const categories = ['cooking', 'construction', 'agriculture', 'driving', 'household', 'other'];

  const handleApply = (jobId: string) => {
    toast.success('Application functionality will be implemented soon!');
  };

  const handleContact = (phone: string, email: string) => {
    if (phone) {
      window.open(`tel:${phone}`, '_self');
    } else if (email) {
      window.open(`mailto:${email}`, '_self');
    } else {
      toast.error('Contact information not available');
    }
  };

  if (loading) {
    return (
      <JobsContainer>
        <LoadingMessage>Loading jobs...</LoadingMessage>
      </JobsContainer>
    );
  }

  return (
    <JobsContainer>
      <Header>
        <div>
          <Title>
            {locationFiltered && showLocationFilter 
              ? `Jobs Near ${userLocation || user?.location || 'Your Location'}`
              : 'All Approved Jobs'
            }
          </Title>
          <Subtitle>
            {locationFiltered && showLocationFilter ? (
              <>
                Showing {sortedJobs.length} approved jobs near your location
                {totalMatches > 0 && ` • ${totalMatches} location matches found`}
              </>
            ) : (
              `Showing ${sortedJobs.length} approved jobs ${selectedCategory ? `in ${selectedCategory}` : ''}`
            )}
          </Subtitle>
        </div>
        {user?.location && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={toggleLocationFilter}
              style={{
                background: showLocationFilter ? '#4CAF50' : '#E0E0E0',
                color: showLocationFilter ? 'white' : '#666',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '0.5rem' }} />
              {showLocationFilter ? 'Location Filter On' : 'Location Filter Off'}
            </button>
          </div>
        )}
      </Header>

      <FilterSection>
        <CategoryFilter>
          <FilterLabel>Filter by Category:</FilterLabel>
          <CategorySelect
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </CategorySelect>
        </CategoryFilter>
      </FilterSection>

      {locationFiltered && showLocationFilter && userLocation && (
        <LocationIndicator>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span>
            Showing jobs near <strong>{userLocation}</strong>
            {totalMatches > 0 && ` • ${totalMatches} location matches found`}
          </span>
        </LocationIndicator>
      )}

      {sortedJobs.length === 0 ? (
        <EmptyMessage>
          <EmptyTitle>No Approved Jobs Found</EmptyTitle>
          <EmptyDescription>
            {showLocationFilter && user?.location ? (
              selectedCategory 
                ? `No approved ${selectedCategory} jobs found near your location (${userLocation || user?.location}). Try turning off location filtering or selecting a different category.`
                : `No approved jobs found near your location (${userLocation || user?.location}). Try turning off location filtering to see all jobs.`
            ) : (
              selectedCategory 
                ? `No approved ${selectedCategory} jobs found. Try selecting a different category.`
                : 'No approved jobs found. Check back later for new opportunities.'
            )}
          </EmptyDescription>
          {showLocationFilter && user?.location && (
            <button
              onClick={toggleLocationFilter}
              style={{
                background: '#1976D2',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                marginTop: '1rem'
              }}
            >
              Show All Jobs
            </button>
          )}
        </EmptyMessage>
      ) : (
        <JobsGrid>
          {sortedJobs.map((job) => {
            const jobWithLocation = job as JobWithLocationMatch;
            return (
            <JobCard key={job.id} style={{
              borderLeft: jobWithLocation.locationMatch ? '4px solid #4CAF50' : '1px solid #e0e0e0'
            }}>
              <JobHeader>
                <div>
                  <JobTitle>{job.title}</JobTitle>
                  <JobCompany>{job.employer.organization || job.employer.name}</JobCompany>
                </div>
                <StatusBadge status={job.status}>{job.status}</StatusBadge>
              </JobHeader>

              <JobMeta>
                <MetaItem>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  {job.location}, {job.state}
                  {jobWithLocation.locationMatch && (
                    <LocationMatchBadge>
                      <FontAwesomeIcon icon={faCheckCircle} />
                      Location Match
                    </LocationMatchBadge>
                  )}
                </MetaItem>
                <MetaItem>
                  <FontAwesomeIcon icon={faClock} />
                  {job.duration}
                </MetaItem>
                <MetaItem>
                  <FontAwesomeIcon icon={faBriefcase} />
                  {job.category}
                </MetaItem>
                <MetaItem>
                  <FontAwesomeIcon icon={faUser} />
                  {job.experienceRequired} experience
                </MetaItem>
              </JobMeta>

              {jobWithLocation.locationMatch && showLocationFilter && (
                <LocationMatchInfo>
                  <FontAwesomeIcon icon={faLocationArrow} />
                  This job matches your location: {userLocation || user?.location}
                  {jobWithLocation.locationScore && ` (Score: ${jobWithLocation.locationScore})`}
                </LocationMatchInfo>
              )}

              <JobDescription>
                {job.description.length > 150 
                  ? `${job.description.substring(0, 150)}...` 
                  : job.description
                }
              </JobDescription>

              {job.requiredSkills && job.requiredSkills.length > 0 && (
                <JobSkills>
                  {job.requiredSkills.slice(0, 3).map((skill, index) => (
                    <SkillTag key={index}>{skill}</SkillTag>
                  ))}
                  {job.requiredSkills.length > 3 && (
                    <SkillTag>+{job.requiredSkills.length - 3} more</SkillTag>
                  )}
                </JobSkills>
              )}

              <EmployerInfo>
                <EmployerName>{job.employer.name}</EmployerName>
                <EmployerDetails>
                  {job.employer.phone && (
                    <EmployerItem onClick={() => handleContact(job.employer.phone, '')}>
                      <FontAwesomeIcon icon={faPhone} />
                      {job.employer.phone}
                    </EmployerItem>
                  )}
                  {job.employer.email && (
                    <EmployerItem onClick={() => handleContact('', job.employer.email)}>
                      <FontAwesomeIcon icon={faEnvelope} />
                      {job.employer.email}
                    </EmployerItem>
                  )}
                </EmployerDetails>
              </EmployerInfo>

              <JobSalary>
                <Salary>₹{job.salary}/{job.salaryType}</Salary>
                <PostedDate>{new Date(job.postedAt).toLocaleDateString()}</PostedDate>
              </JobSalary>

              <JobActions>
                <SecondaryButton onClick={() => handleContact(job.employer.phone, job.employer.email)}>
                  <FontAwesomeIcon icon={faPhone} /> Contact
                </SecondaryButton>
                <ActionButton onClick={() => handleApply(job.id)}>
                  <FontAwesomeIcon icon={faBriefcase} /> Apply Now
                </ActionButton>
              </JobActions>
            </JobCard>
            );
          })}
        </JobsGrid>
      )}
    </JobsContainer>
  );
};

export default JobsPage;


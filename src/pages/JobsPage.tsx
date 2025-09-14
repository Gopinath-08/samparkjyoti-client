import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchJobs } from '../store/slices/jobsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faMapMarkerAlt,
  faClock,
  faBriefcase,
  faRupeeSign,
  faUser,
  faFilter,
  faEye,
  faPhone,
  faEnvelope,
  faStar
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

const JobsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, error } = useSelector((state: RootState) => state.jobs);
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: '',
    workType: '',
    status: 'approved'
  });

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = filters.search === '' || 
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.location.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCategory = filters.category === '' || job.category === filters.category;
    const matchesLocation = filters.location === '' || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesWorkType = filters.workType === '' || job.workType === filters.workType;
    const matchesStatus = filters.status === '' || job.status === filters.status;

    return matchesSearch && matchesCategory && matchesLocation && matchesWorkType && matchesStatus;
  });

  const categories = ['cooking', 'construction', 'agriculture', 'driving', 'household', 'other'];
  const workTypes = ['daily_wage', 'contract', 'full_time', 'part_time'];

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
        <Title>Find Jobs</Title>
      </Header>

      <SearchSection>
        <SearchRow>
          <SearchGroup>
            <SearchIcon>
              <FontAwesomeIcon icon={faSearch} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search jobs by title, description, or location..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </SearchGroup>
        </SearchRow>

        <FilterRow>
          <Select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </Select>

          <Select
            value={filters.workType}
            onChange={(e) => handleFilterChange('workType', e.target.value)}
          >
            <option value="">All Work Types</option>
            {workTypes.map(type => (
              <option key={type} value={type}>
                {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </Select>

          <Select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="approved">Approved Jobs</option>
            <option value="pending">Pending Jobs</option>
            <option value="">All Jobs</option>
          </Select>
        </FilterRow>
      </SearchSection>

      {filteredJobs.length === 0 ? (
        <EmptyMessage>
          <EmptyTitle>No jobs found</EmptyTitle>
          <EmptyDescription>
            Try adjusting your search criteria or check back later for new opportunities.
          </EmptyDescription>
        </EmptyMessage>
      ) : (
        <JobsGrid>
          {filteredJobs.map((job) => (
            <JobCard key={job.id}>
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
          ))}
        </JobsGrid>
      )}
    </JobsContainer>
  );
};

export default JobsPage;


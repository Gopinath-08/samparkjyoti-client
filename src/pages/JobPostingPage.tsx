import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { jobService } from '../services/jobService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faMapMarkerAlt, faRupeeSign, faClock, faUser, faBuilding, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #1565C0;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: #1976D2;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #E3F2FD;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
`;

const Required = styled.span`
  color: #ef4444;
  margin-left: 0.25rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #1976D2;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #1976D2;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #1976D2;
  }
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #1976D2 0%, #1565C0 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const JobPostingPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    workType: '',
    duration: '',
    salary: '',
    salaryType: 'daily',
    location: '',
    district: '',
    state: '',
    pincode: '',
    requiredSkills: '',
    experienceRequired: 'none',
    educationRequired: 'none',
    employerName: '',
    employerPhone: '',
    employerEmail: '',
    employerOrganization: '',
    urgency: 'medium',
    benefits: '',
    workingHoursStart: '',
    workingHoursEnd: '',
    workingDays: [] as string[],
  });

  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'cooking', label: 'Cooking' },
    { value: 'construction', label: 'Construction' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'driving', label: 'Driving' },
    { value: 'household', label: 'Household' },
    { value: 'other', label: 'Other' }
  ];

  const workTypes = [
    { value: 'daily_wage', label: 'Daily Wage' },
    { value: 'contract', label: 'Contract' },
    { value: 'full_time', label: 'Full Time' },
    { value: 'part_time', label: 'Part Time' }
  ];

  const salaryTypes = [
    { value: 'daily', label: 'Per Day' },
    { value: 'monthly', label: 'Per Month' },
    { value: 'hourly', label: 'Per Hour' }
  ];

  const experienceLevels = [
    { value: 'none', label: 'No Experience' },
    { value: '0-1', label: '0-1 Years' },
    { value: '1-3', label: '1-3 Years' },
    { value: '3-5', label: '3-5 Years' },
    { value: '5+', label: '5+ Years' }
  ];

  const educationLevels = [
    { value: 'none', label: 'No Education Required' },
    { value: 'primary', label: 'Primary School' },
    { value: 'secondary', label: 'Secondary School' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'degree', label: 'Degree' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  const workingDaysOptions = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWorkingDaysChange = (day: string) => {
    setFormData(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || 
        !formData.workType || !formData.duration || !formData.salary || 
        !formData.location || !formData.district || !formData.state || 
        !formData.employerName || !formData.employerPhone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const jobData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        workType: formData.workType as 'daily_wage' | 'contract' | 'full_time' | 'part_time',
        duration: formData.duration,
        salary: parseFloat(formData.salary),
        salaryType: formData.salaryType as 'daily' | 'monthly' | 'hourly',
        location: formData.location,
        district: formData.district,
        state: formData.state,
        pincode: formData.pincode,
        requiredSkills: formData.requiredSkills.split(',').map(skill => skill.trim()).filter(skill => skill),
        experienceRequired: formData.experienceRequired as 'none' | '0-1' | '1-3' | '3-5' | '5+',
        educationRequired: formData.educationRequired as 'none' | 'primary' | 'secondary' | 'diploma' | 'degree',
        urgency: formData.urgency as 'low' | 'medium' | 'high',
        benefits: formData.benefits.split(',').map(benefit => benefit.trim()).filter(benefit => benefit),
        workingHours: {
          start: formData.workingHoursStart,
          end: formData.workingHoursEnd
        },
        workingDays: formData.workingDays,
        ageRange: {
          min: 18,
          max: 65
        }
      };

      await jobService.postJob(jobData);
      toast.success('Job posted successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        workType: '',
        duration: '',
        salary: '',
        salaryType: 'daily',
        location: '',
        district: '',
        state: '',
        pincode: '',
        requiredSkills: '',
        experienceRequired: 'none',
        educationRequired: 'none',
        employerName: '',
        employerPhone: '',
        employerEmail: '',
        employerOrganization: '',
        urgency: 'medium',
        benefits: '',
        workingHoursStart: '',
        workingHoursEnd: '',
        workingDays: [],
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Post a Job Opportunity</Title>
      
      <Form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Job Details</SectionTitle>
          <FormGrid>
            <InputGroup>
              <Label>Job Title <Required>*</Required></Label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Farm Laborer, Construction Worker"
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Category <Required>*</Required></Label>
              <Select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </FormGrid>

          <InputGroup>
            <Label>Job Description <Required>*</Required></Label>
            <TextArea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the job responsibilities, requirements, and what the worker will be doing..."
              required
            />
          </InputGroup>

          <FormGrid>
            <InputGroup>
              <Label>Work Type <Required>*</Required></Label>
              <Select
                value={formData.workType}
                onChange={(e) => handleInputChange('workType', e.target.value)}
                required
              >
                <option value="">Select Work Type</option>
                {workTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
            </InputGroup>

            <InputGroup>
              <Label>Duration <Required>*</Required></Label>
              <Input
                type="text"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="e.g., 3 months, 6 months, 1 year"
                required
              />
            </InputGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>Compensation</SectionTitle>
          <FormGrid>
            <InputGroup>
              <Label>Salary <Required>*</Required></Label>
              <Input
                type="number"
                value={formData.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                placeholder="Enter salary amount"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Salary Type <Required>*</Required></Label>
              <Select
                value={formData.salaryType}
                onChange={(e) => handleInputChange('salaryType', e.target.value)}
                required
              >
                {salaryTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>Location</SectionTitle>
          <FormGrid>
            <InputGroup>
              <Label>Location <Required>*</Required></Label>
              <Input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City or Village"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>District <Required>*</Required></Label>
              <Input
                type="text"
                value={formData.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
                placeholder="District"
                required
              />
            </InputGroup>
          </FormGrid>

          <FormGrid>
            <InputGroup>
              <Label>State <Required>*</Required></Label>
              <Input
                type="text"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="State"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Pincode</Label>
              <Input
                type="text"
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                placeholder="Pincode"
              />
            </InputGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>Requirements</SectionTitle>
          <FormGrid>
            <InputGroup>
              <Label>Experience Required</Label>
              <Select
                value={formData.experienceRequired}
                onChange={(e) => handleInputChange('experienceRequired', e.target.value)}
              >
                {experienceLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </Select>
            </InputGroup>

            <InputGroup>
              <Label>Education Required</Label>
              <Select
                value={formData.educationRequired}
                onChange={(e) => handleInputChange('educationRequired', e.target.value)}
              >
                {educationLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </FormGrid>

          <InputGroup>
            <Label>Required Skills</Label>
            <Input
              type="text"
              value={formData.requiredSkills}
              onChange={(e) => handleInputChange('requiredSkills', e.target.value)}
              placeholder="e.g., Driving License, Cooking Experience, Physical Fitness (separate with commas)"
            />
          </InputGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>Employer Information</SectionTitle>
          <FormGrid>
            <InputGroup>
              <Label>Employer Name <Required>*</Required></Label>
              <Input
                type="text"
                value={formData.employerName}
                onChange={(e) => handleInputChange('employerName', e.target.value)}
                placeholder="Your name"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Phone Number <Required>*</Required></Label>
              <Input
                type="tel"
                value={formData.employerPhone}
                onChange={(e) => handleInputChange('employerPhone', e.target.value)}
                placeholder="Phone number"
                required
              />
            </InputGroup>
          </FormGrid>

          <FormGrid>
            <InputGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.employerEmail}
                onChange={(e) => handleInputChange('employerEmail', e.target.value)}
                placeholder="Email address"
              />
            </InputGroup>

            <InputGroup>
              <Label>Organization</Label>
              <Input
                type="text"
                value={formData.employerOrganization}
                onChange={(e) => handleInputChange('employerOrganization', e.target.value)}
                placeholder="Company or Organization name"
              />
            </InputGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>Work Schedule</SectionTitle>
          <FormGrid>
            <InputGroup>
              <Label>Working Hours Start</Label>
              <Input
                type="time"
                value={formData.workingHoursStart}
                onChange={(e) => handleInputChange('workingHoursStart', e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <Label>Working Hours End</Label>
              <Input
                type="time"
                value={formData.workingHoursEnd}
                onChange={(e) => handleInputChange('workingHoursEnd', e.target.value)}
              />
            </InputGroup>
          </FormGrid>

          <InputGroup>
            <Label>Working Days</Label>
            <CheckboxGroup>
              {workingDaysOptions.map(day => (
                <CheckboxItem key={day.value}>
                  <Checkbox
                    type="checkbox"
                    checked={formData.workingDays.includes(day.value)}
                    onChange={() => handleWorkingDaysChange(day.value)}
                  />
                  {day.label}
                </CheckboxItem>
              ))}
            </CheckboxGroup>
          </InputGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>Additional Information</SectionTitle>
          <FormGrid>
            <InputGroup>
              <Label>Urgency</Label>
              <Select
                value={formData.urgency}
                onChange={(e) => handleInputChange('urgency', e.target.value)}
              >
                {urgencyLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </FormGrid>

          <InputGroup>
            <Label>Benefits</Label>
            <Input
              type="text"
              value={formData.benefits}
              onChange={(e) => handleInputChange('benefits', e.target.value)}
              placeholder="e.g., Free meals, Accommodation, Transport (separate with commas)"
            />
          </InputGroup>
        </FormSection>

        <Button type="submit" disabled={loading}>
          {loading ? 'Posting Job...' : 'Post Job'}
        </Button>
      </Form>
    </Container>
  );
};

export default JobPostingPage;


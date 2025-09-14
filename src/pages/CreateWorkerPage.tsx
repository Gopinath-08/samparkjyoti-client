import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faBriefcase,
  faCog,
  faCar,
  faIdCard,
  faDumbbell,
  faHeartbeat,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #1976D2;
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
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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

const SwitchGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  background: #f9fafb;
`;

const Switch = styled.input`
  width: 20px;
  height: 20px;
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

const CreateWorkerPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    age: '',
    workExperience: '0',
    minimumWage: '',
    workRole: '',
    speciality: '',
    extraSkills: '',
    skillLevel: 'beginner',
    availability: 'full_time',
    workingHours: 'day_shift',
    hasVehicle: false,
    vehicleType: 'none',
    hasLicense: false,
    licenseType: 'none',
    canLiftHeavyObjects: false,
    hasHealthIssues: false,
    bio: '',
  });

  const [fieldOfWork, setFieldOfWork] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const workRoles = [
    { value: '', label: 'Select Work Role' },
    { value: 'driver', label: 'Driver' },
    { value: 'construction_worker', label: 'Construction Worker' },
    { value: 'domestic_helper', label: 'Domestic Helper' },
    { value: 'cook', label: 'Cook' },
    { value: 'cleaner', label: 'Cleaner' },
    { value: 'security_guard', label: 'Security Guard' },
    { value: 'gardener', label: 'Gardener' },
    { value: 'electrician', label: 'Electrician' },
    { value: 'plumber', label: 'Plumber' },
    { value: 'carpenter', label: 'Carpenter' },
    { value: 'mechanic', label: 'Mechanic' },
    { value: 'delivery_person', label: 'Delivery Person' },
    { value: 'farm_worker', label: 'Farm Worker' },
    { value: 'factory_worker', label: 'Factory Worker' },
    { value: 'painter', label: 'Painter' },
    { value: 'welder', label: 'Welder' },
    { value: 'mason', label: 'Mason' },
    { value: 'other', label: 'Other' },
  ];

  const fieldOptions = [
    'agriculture', 'construction', 'manufacturing', 'services', 
    'transportation', 'retail', 'domestic', 'security'
  ];

  const skillLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const availabilityOptions = [
    { value: 'full_time', label: 'Full Time' },
    { value: 'part_time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' }
  ];

  const workingHoursOptions = [
    { value: 'day_shift', label: 'Day Shift (6 AM - 6 PM)' },
    { value: 'night_shift', label: 'Night Shift (6 PM - 6 AM)' },
    { value: 'flexible', label: 'Flexible' },
    { value: 'any', label: 'Any Time' }
  ];

  const vehicleTypes = [
    { value: 'none', label: 'No Vehicle' },
    { value: 'bicycle', label: 'Bicycle' },
    { value: 'motorcycle', label: 'Motorcycle' },
    { value: 'car', label: 'Car' },
    { value: 'truck', label: 'Truck' }
  ];

  const licenseTypes = [
    { value: 'none', label: 'No License' },
    { value: 'two_wheeler', label: 'Two Wheeler' },
    { value: 'four_wheeler', label: 'Four Wheeler' },
    { value: 'heavy_vehicle', label: 'Heavy Vehicle' },
    { value: 'commercial', label: 'Commercial' }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleFieldOfWork = (field: string) => {
    setFieldOfWork(prev => 
      prev.includes(field) 
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.phone || 
        !formData.location || !formData.age || !formData.minimumWage || 
        !formData.workRole || !formData.speciality) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (parseInt(formData.age) < 18 || parseInt(formData.age) > 70) {
      toast.error('Age must be between 18 and 70');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const workerData = {
        ...formData,
        age: parseInt(formData.age),
        workExperience: parseInt(formData.workExperience),
        minimumWage: parseFloat(formData.minimumWage),
        fieldOfWork,
      };

      // Here you would call your API to create the worker
      console.log('Worker data:', workerData);
      toast.success('Worker profile created successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        phone: '',
        location: '',
        age: '',
        workExperience: '0',
        minimumWage: '',
        workRole: '',
        speciality: '',
        extraSkills: '',
        skillLevel: 'beginner',
        availability: 'full_time',
        workingHours: 'day_shift',
        hasVehicle: false,
        vehicleType: 'none',
        hasLicense: false,
        licenseType: 'none',
        canLiftHeavyObjects: false,
        hasHealthIssues: false,
        bio: '',
      });
      setFieldOfWork([]);
    } catch (error: any) {
      toast.error('Failed to create worker profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Create Worker Profile</Title>
      
      <Form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Personal Information</SectionTitle>
          <FormGrid>
            <InputGroup>
              <Label>Full Name <Required>*</Required></Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter full name"
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Email <Required>*</Required></Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email address"
                required
              />
            </InputGroup>
          </FormGrid>

          <FormGrid>
            <InputGroup>
              <Label>Password <Required>*</Required></Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter password (min 6 characters)"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Phone Number <Required>*</Required></Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </InputGroup>
          </FormGrid>

          <FormGrid>
            <InputGroup>
              <Label>Location <Required>*</Required></Label>
              <Input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, State"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Age <Required>*</Required></Label>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="Age (18-70)"
                min="18"
                max="70"
                required
              />
            </InputGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>Work Experience & Skills</SectionTitle>
          <FormGrid>
            <InputGroup>
              <Label>Work Experience (Years)</Label>
              <Select
                value={formData.workExperience}
                onChange={(e) => handleInputChange('workExperience', e.target.value)}
              >
                <option value="0">No Experience</option>
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="4">4 Years</option>
                <option value="5">5+ Years</option>
              </Select>
            </InputGroup>

            <InputGroup>
              <Label>Minimum Wage Expected <Required>*</Required></Label>
              <Input
                type="number"
                value={formData.minimumWage}
                onChange={(e) => handleInputChange('minimumWage', e.target.value)}
                placeholder="Expected minimum wage per day"
                required
              />
            </InputGroup>
          </FormGrid>

          <FormGrid>
            <InputGroup>
              <Label>Work Role <Required>*</Required></Label>
              <Select
                value={formData.workRole}
                onChange={(e) => handleInputChange('workRole', e.target.value)}
                required
              >
                {workRoles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </Select>
            </InputGroup>

            <InputGroup>
              <Label>Speciality <Required>*</Required></Label>
              <Input
                type="text"
                value={formData.speciality}
                onChange={(e) => handleInputChange('speciality', e.target.value)}
                placeholder="Your area of speciality"
                required
              />
            </InputGroup>
          </FormGrid>

          <InputGroup>
            <Label>Field of Work</Label>
            <CheckboxGroup>
              {fieldOptions.map(field => (
                <CheckboxItem key={field}>
                  <Checkbox
                    type="checkbox"
                    checked={fieldOfWork.includes(field)}
                    onChange={() => toggleFieldOfWork(field)}
                  />
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </CheckboxItem>
              ))}
            </CheckboxGroup>
          </InputGroup>

          <InputGroup>
            <Label>Additional Skills</Label>
            <TextArea
              value={formData.extraSkills}
              onChange={(e) => handleInputChange('extraSkills', e.target.value)}
              placeholder="List any additional skills or certifications..."
            />
          </InputGroup>

          <FormGrid>
            <InputGroup>
              <Label>Skill Level</Label>
              <Select
                value={formData.skillLevel}
                onChange={(e) => handleInputChange('skillLevel', e.target.value)}
              >
                {skillLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>Availability & Preferences</SectionTitle>
          <FormGrid>
            <InputGroup>
              <Label>Availability</Label>
              <Select
                value={formData.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
              >
                {availabilityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </InputGroup>

            <InputGroup>
              <Label>Working Hours</Label>
              <Select
                value={formData.workingHours}
                onChange={(e) => handleInputChange('workingHours', e.target.value)}
              >
                {workingHoursOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>Additional Information</SectionTitle>
          <FormGrid>
            <SwitchGroup>
              <Switch
                type="checkbox"
                checked={formData.hasVehicle}
                onChange={(e) => handleInputChange('hasVehicle', e.target.checked)}
              />
              <Label>Has Vehicle</Label>
            </SwitchGroup>

            {formData.hasVehicle && (
              <InputGroup>
                <Label>Vehicle Type</Label>
                <Select
                  value={formData.vehicleType}
                  onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                >
                  {vehicleTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            )}
          </FormGrid>

          <FormGrid>
            <SwitchGroup>
              <Switch
                type="checkbox"
                checked={formData.hasLicense}
                onChange={(e) => handleInputChange('hasLicense', e.target.checked)}
              />
              <Label>Has Driving License</Label>
            </SwitchGroup>

            {formData.hasLicense && (
              <InputGroup>
                <Label>License Type</Label>
                <Select
                  value={formData.licenseType}
                  onChange={(e) => handleInputChange('licenseType', e.target.value)}
                >
                  {licenseTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            )}
          </FormGrid>

          <FormGrid>
            <SwitchGroup>
              <Switch
                type="checkbox"
                checked={formData.canLiftHeavyObjects}
                onChange={(e) => handleInputChange('canLiftHeavyObjects', e.target.checked)}
              />
              <Label>Can Lift Heavy Objects</Label>
            </SwitchGroup>

            <SwitchGroup>
              <Switch
                type="checkbox"
                checked={formData.hasHealthIssues}
                onChange={(e) => handleInputChange('hasHealthIssues', e.target.checked)}
              />
              <Label>Has Health Issues</Label>
            </SwitchGroup>
          </FormGrid>

          <InputGroup>
            <Label>Bio/About Me</Label>
            <TextArea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell us about yourself, your experience, and what makes you unique..."
            />
          </InputGroup>
        </FormSection>

        <Button type="submit" disabled={loading}>
          {loading ? 'Creating Profile...' : 'Create Worker Profile'}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateWorkerPage;


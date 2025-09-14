import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { register } from '../store/slices/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faLock,
  faPhone,
  faMapMarkerAlt,
  faBriefcase,
  faLeaf,
  faShoppingCart,
  faBuilding,
  faCheck,
  faArrowRight,
  faArrowLeft,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1976D2 0%, #1565C0 100%);
  padding: 2rem;
`;

const RegisterCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LogoTitle = styled.h1`
  color: #1976D2;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const LogoSubtitle = styled.p`
  color: #666;
  font-size: 1rem;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Step = styled.div<{ $active: boolean; $completed: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;
  background: ${props => props.$completed ? '#4CAF50' : props.$active ? '#1976D2' : '#e5e7eb'};
  color: ${props => props.$completed || props.$active ? 'white' : '#666'};
  font-weight: 600;
  transition: all 0.3s ease;
`;

const StepTitle = styled.h2`
  color: #1976D2;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const StepSubtitle = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #1976D2;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #1976D2;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.25rem;
`;

const Select = styled.select`
  width: 100%;
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

const RoleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const RoleCard = styled.div<{ $selected: boolean }>`
  padding: 1.5rem;
  border: 2px solid ${props => props.$selected ? '#1976D2' : '#e5e7eb'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.$selected ? '#f8f9ff' : 'white'};

  &:hover {
    border-color: #1976D2;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(25, 118, 210, 0.15);
  }
`;

const RoleIcon = styled.div`
  font-size: 2rem;
  color: #1976D2;
  margin-bottom: 0.5rem;
`;

const RoleTitle = styled.h3`
  color: #1976D2;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const RoleDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const RoleCheckbox = styled.div<{ $selected: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.$selected ? '#1976D2' : '#e5e7eb'};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$selected ? '#1976D2' : 'white'};
  color: white;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const LanguageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const LanguageItem = styled.div<{ $selected: boolean }>`
  padding: 0.5rem;
  border: 2px solid ${props => props.$selected ? '#1976D2' : '#e5e7eb'};
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.$selected ? '#f8f9ff' : 'white'};

  &:hover {
    border-color: #1976D2;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #1976D2 0%, #1565C0 100%);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecondaryButton = styled.button`
  flex: 1;
  background: white;
  color: #1976D2;
  padding: 0.75rem;
  border: 2px solid #1976D2;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: #1976D2;
    color: white;
  }
`;

const LoginLink = styled(Link)`
  text-align: center;
  color: #1976D2;
  text-decoration: none;
  font-weight: 500;
  margin-top: 1rem;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    roles: [] as string[],
    primaryRole: '',
    languages: ['english'],
    preferredLanguage: 'english',
    // Labour-specific fields
    age: '',
    workRole: '',
    speciality: '',
    minimumWage: '',
    // Farmer-specific fields
    farmingType: '',
    landSize: '',
    // Employer-specific fields
    businessName: '',
    businessType: '',
  });
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const availableRoles = [
    { id: 'labour', label: 'Labour', icon: faBriefcase, description: 'Seeking employment opportunities' },
    { id: 'employer', label: 'Employer', icon: faBuilding, description: 'Offering work opportunities' },
    { id: 'farmer', label: 'Farmer', icon: faLeaf, description: 'Agricultural producer' },
    { id: 'buyer', label: 'Buyer', icon: faShoppingCart, description: 'Purchasing agricultural products' },
  ];

  const workRoles = [
    'driver', 'construction_worker', 'domestic_helper', 'cook', 'cleaner',
    'security_guard', 'gardener', 'electrician', 'plumber', 'carpenter',
    'mechanic', 'delivery_person', 'farm_worker', 'factory_worker',
    'painter', 'welder', 'mason', 'helper', 'supervisor', 'other'
  ];

  const specialities = [
    'heavy_vehicle_driving', 'light_vehicle_driving', 'two_wheeler_driving',
    'house_construction', 'road_construction', 'building_maintenance',
    'cooking', 'cleaning', 'child_care', 'elderly_care',
    'electrical_work', 'plumbing', 'carpentry', 'welding', 'painting',
    'security', 'gardening', 'farming', 'machine_operation',
    'computer_skills', 'language_skills', 'other'
  ];

  const farmingTypes = [
    'organic', 'conventional', 'mixed', 'hydroponic', 'other'
  ];

  const businessTypes = [
    'agriculture', 'construction', 'manufacturing', 'services', 'transportation', 'retail', 'other'
  ];

  const availableLanguages = [
    { code: 'english', name: 'English' },
    { code: 'hindi', name: 'हिंदी' },
    { code: 'marathi', name: 'मराठी' },
    { code: 'gujarati', name: 'ગુજરાતી' },
    { code: 'bengali', name: 'বাংলা' },
    { code: 'telugu', name: 'తెలుగు' },
    { code: 'tamil', name: 'தமிழ்' },
    { code: 'kannada', name: 'ಕನ್ನಡ' },
    { code: 'malayalam', name: 'മലയാളം' },
    { code: 'punjabi', name: 'ਪੰਜਾਬੀ' },
    { code: 'urdu', name: 'اردو' },
  ];

  const handleRoleSelection = (roleId: string) => {
    if (selectedRoles.includes(roleId)) {
      const newRoles = selectedRoles.filter(role => role !== roleId);
      setSelectedRoles(newRoles);
      if (formData.primaryRole === roleId) {
        setFormData(prev => ({ ...prev, primaryRole: newRoles[0] || '' }));
      }
    } else {
      const newRoles = [...selectedRoles, roleId];
      setSelectedRoles(newRoles);
      if (!formData.primaryRole) {
        setFormData(prev => ({ ...prev, primaryRole: roleId }));
      }
    }
  };

  const handleLanguageSelection = (languageCode: string) => {
    if (formData.languages.includes(languageCode)) {
      if (formData.languages.length > 1) {
        setFormData(prev => ({
          ...prev,
          languages: prev.languages.filter(lang => lang !== languageCode),
          preferredLanguage: prev.preferredLanguage === languageCode ? 'english' : prev.preferredLanguage
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, languageCode]
      }));
    }
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone) {
      toast.error('Please fill in all fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    if (formData.phone.length !== 10) {
      toast.error('Phone number must be 10 digits');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.location) {
      toast.error('Please enter your location');
      return false;
    }
    if (selectedRoles.length === 0) {
      toast.error('Please select at least one role');
      return false;
    }
    if (!formData.primaryRole) {
      toast.error('Please select a primary role');
      return false;
    }
    
    // Role-specific validation
    if (selectedRoles.includes('labour')) {
      if (!formData.age || !formData.workRole || !formData.speciality || !formData.minimumWage) {
        toast.error('Please fill in all labour-specific fields (Age, Work Role, Speciality, Minimum Wage)');
        return false;
      }
      if (isNaN(Number(formData.age)) || Number(formData.age) < 18 || Number(formData.age) > 70) {
        toast.error('Age must be between 18 and 70');
        return false;
      }
      if (isNaN(Number(formData.minimumWage)) || Number(formData.minimumWage) < 0) {
        toast.error('Minimum wage must be a valid number');
        return false;
      }
    }
    
    if (selectedRoles.includes('farmer')) {
      if (!formData.farmingType) {
        toast.error('Please select farming type');
        return false;
      }
    }
    
    if (selectedRoles.includes('employer')) {
      if (!formData.businessName || !formData.businessType) {
        toast.error('Please fill in business details');
        return false;
      }
    }
    
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      handleRegister();
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        location: formData.location,
        roles: selectedRoles,
        primaryRole: formData.primaryRole,
        languages: formData.languages,
        preferredLanguage: formData.preferredLanguage,
        // Include role-specific profiles
        labourProfile: selectedRoles.includes('labour') ? {
          age: Number(formData.age),
          workRole: formData.workRole,
          speciality: formData.speciality,
          minimumWage: Number(formData.minimumWage),
        } : undefined,
        farmerProfile: selectedRoles.includes('farmer') ? {
          farmingType: formData.farmingType,
          landSize: formData.landSize ? Number(formData.landSize) : undefined,
        } : undefined,
        employerProfile: selectedRoles.includes('employer') ? {
          businessDetails: {
            businessName: formData.businessName,
            businessType: formData.businessType,
          }
        } : undefined,
        // For backward compatibility
        isAgent: selectedRoles.includes('employer'),
      };

      await dispatch(register(userData)).unwrap();
      toast.success('Registration successful!');
      navigate('/home');
    } catch (error: any) {
      toast.error(error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <>
      <StepTitle>Basic Information</StepTitle>
      <StepSubtitle>Tell us about yourself</StepSubtitle>

      <InputGroup>
        <InputIcon>
          <FontAwesomeIcon icon={faUser} />
        </InputIcon>
        <Input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </InputGroup>

      <InputGroup>
        <InputIcon>
          <FontAwesomeIcon icon={faEnvelope} />
        </InputIcon>
        <Input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
        />
      </InputGroup>

      <InputGroup>
        <InputIcon>
          <FontAwesomeIcon icon={faLock} />
        </InputIcon>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          required
        />
        <PasswordToggle
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </PasswordToggle>
      </InputGroup>

      <InputGroup>
        <InputIcon>
          <FontAwesomeIcon icon={faLock} />
        </InputIcon>
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          required
        />
        <PasswordToggle
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
        </PasswordToggle>
      </InputGroup>

      <InputGroup>
        <InputIcon>
          <FontAwesomeIcon icon={faPhone} />
        </InputIcon>
        <Input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          maxLength={10}
          required
        />
      </InputGroup>
    </>
  );

  const renderStep2 = () => (
    <>
      <StepTitle>Role & Location</StepTitle>
      <StepSubtitle>Select your role and location</StepSubtitle>

      <InputGroup>
        <InputIcon>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
        </InputIcon>
        <Input
          type="text"
          placeholder="Location (City, State)"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          required
        />
      </InputGroup>

      <div>
        <h3 style={{ marginBottom: '1rem', color: '#1976D2' }}>Select Your Role(s)</h3>
        <RoleGrid>
          {availableRoles.map(role => (
            <RoleCard
              key={role.id}
              $selected={selectedRoles.includes(role.id)}
              onClick={() => handleRoleSelection(role.id)}
            >
              <RoleIcon>
                <FontAwesomeIcon icon={role.icon} />
              </RoleIcon>
              <RoleTitle>{role.label}</RoleTitle>
              <RoleDescription>{role.description}</RoleDescription>
              <RoleCheckbox $selected={selectedRoles.includes(role.id)}>
                {selectedRoles.includes(role.id) && <FontAwesomeIcon icon={faCheck} />}
              </RoleCheckbox>
            </RoleCard>
          ))}
        </RoleGrid>
      </div>

      {selectedRoles.length > 1 && (
        <div>
          <h3 style={{ marginBottom: '1rem', color: '#1976D2' }}>Primary Role</h3>
          <Select
            value={formData.primaryRole}
            onChange={(e) => setFormData(prev => ({ ...prev, primaryRole: e.target.value }))}
            required
          >
            <option value="">Select Primary Role</option>
            {selectedRoles.map(roleId => {
              const role = availableRoles.find(r => r.id === roleId);
              return (
                <option key={roleId} value={roleId}>
                  {role?.label}
                </option>
              );
            })}
          </Select>
        </div>
      )}

      <div>
        <h3 style={{ marginBottom: '1rem', color: '#1976D2' }}>Languages</h3>
        <LanguageGrid>
          {availableLanguages.map(lang => (
            <LanguageItem
              key={lang.code}
              $selected={formData.languages.includes(lang.code)}
              onClick={() => handleLanguageSelection(lang.code)}
            >
              {lang.name}
            </LanguageItem>
          ))}
        </LanguageGrid>
      </div>

      {selectedRoles.includes('labour') && (
        <div>
          <h3 style={{ marginBottom: '1rem', color: '#1976D2' }}>Labour Details</h3>
          <InputGroup>
            <Input
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
              min="18"
              max="70"
            />
          </InputGroup>
          <Select
            value={formData.workRole}
            onChange={(e) => setFormData(prev => ({ ...prev, workRole: e.target.value }))}
          >
            <option value="">Select Work Role</option>
            {workRoles.map(role => (
              <option key={role} value={role}>
                {role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </Select>
          <Select
            value={formData.speciality}
            onChange={(e) => setFormData(prev => ({ ...prev, speciality: e.target.value }))}
          >
            <option value="">Select Speciality</option>
            {specialities.map(speciality => (
              <option key={speciality} value={speciality}>
                {speciality.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </Select>
          <InputGroup>
            <Input
              type="number"
              placeholder="Minimum Wage Expected (per day)"
              value={formData.minimumWage}
              onChange={(e) => setFormData(prev => ({ ...prev, minimumWage: e.target.value }))}
            />
          </InputGroup>
        </div>
      )}

      {selectedRoles.includes('farmer') && (
        <div>
          <h3 style={{ marginBottom: '1rem', color: '#1976D2' }}>Farmer Details</h3>
          <Select
            value={formData.farmingType}
            onChange={(e) => setFormData(prev => ({ ...prev, farmingType: e.target.value }))}
          >
            <option value="">Select Farming Type</option>
            {farmingTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </Select>
          <InputGroup>
            <Input
              type="number"
              placeholder="Land Size (acres) - Optional"
              value={formData.landSize}
              onChange={(e) => setFormData(prev => ({ ...prev, landSize: e.target.value }))}
            />
          </InputGroup>
        </div>
      )}

      {selectedRoles.includes('employer') && (
        <div>
          <h3 style={{ marginBottom: '1rem', color: '#1976D2' }}>Business Details</h3>
          <InputGroup>
            <Input
              type="text"
              placeholder="Business Name"
              value={formData.businessName}
              onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
            />
          </InputGroup>
          <Select
            value={formData.businessType}
            onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
          >
            <option value="">Select Business Type</option>
            {businessTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </Select>
        </div>
      )}
    </>
  );

  return (
    <RegisterContainer>
      <RegisterCard>
        <Logo>
          <LogoTitle>Sampark Jyoti</LogoTitle>
          <LogoSubtitle>Join our community and find opportunities</LogoSubtitle>
        </Logo>
        
        <StepIndicator>
          <Step $active={step === 1} $completed={step > 1}>1</Step>
          <Step $active={step === 2} $completed={step > 2}>2</Step>
        </StepIndicator>

        <Form onSubmit={(e) => e.preventDefault()}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}

          <ButtonGroup>
            {step > 1 && (
              <SecondaryButton type="button" onClick={handlePrevious}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Previous
              </SecondaryButton>
            )}
            <Button type="button" onClick={handleNext} disabled={loading}>
              {step === 2 ? (
                <>
                  {loading ? 'Creating Account...' : 'Create Account'}
                  <FontAwesomeIcon icon={faCheck} />
                </>
              ) : (
                <>
                  Next
                  <FontAwesomeIcon icon={faArrowRight} />
                </>
              )}
            </Button>
          </ButtonGroup>
        </Form>

        <LoginLink to="/login">
          Already have an account? Sign in here
        </LoginLink>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default RegisterPage;
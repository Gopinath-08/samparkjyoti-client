import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/store';
import { login } from '../store/slices/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: 
    var(--pattern-organic),
    var(--pattern-dots),
    linear-gradient(135deg, var(--color-saddle-brown) 0%, var(--color-sienna) 100%);
  background-size: 100% 100%, 25px 25px, 100% 100%;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    animation: float 20s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    animation: float 25s ease-in-out infinite reverse;
  }
  
  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(120deg); }
    66% { transform: translate(-20px, 20px) rotate(240deg); }
  }
`;

const LoginCard = styled.div`
  background: 
    var(--pattern-waves),
    var(--color-card-background);
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(139, 69, 19, 0.1);
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--color-border);
  position: relative;
  z-index: 1;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--color-sea-green), var(--color-peru), var(--color-warm-orange));
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LogoTitle = styled.h1`
  color: var(--color-saddle-brown);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const LogoSubtitle = styled.p`
  color: var(--color-dim-gray);
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  background: var(--color-cornsilk);

  &:focus {
    outline: none;
    border-color: var(--color-saddle-brown);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-dim-gray);
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-dim-gray);
  cursor: pointer;
  padding: 0.25rem;
`;

const Button = styled.button`
  background: linear-gradient(135deg, var(--color-saddle-brown) 0%, var(--color-sienna) 100%);
  color: var(--color-pure-white);
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Divider = styled.div`
  text-align: center;
  margin: 1.5rem 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--color-border);
  }

  span {
    background: var(--color-card-background);
    padding: 0 1rem;
    color: var(--color-dim-gray);
    font-size: 0.9rem;
  }
`;

const RegisterLink = styled(Link)`
  text-align: center;
  color: var(--color-saddle-brown);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const MainWebsiteButton = styled.a`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 10;
  opacity: 0.8;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: var(--color-pure-white);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    opacity: 1;
  }

  &::before {
    content: '←';
    font-size: 1.1rem;
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: translateX(-2px);
  }

  /* Subtle pulse animation */
  animation: subtlePulse 3s ease-in-out infinite;

  @keyframes subtlePulse {
    0%, 100% {
      opacity: 0.8;
    }
    50% {
      opacity: 0.9;
    }
  }
`;

const ErrorMessage = styled.div`
  color: var(--color-warm-orange);
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('LoginPage - Form submitted with data:', formData);
    setIsLoading(true);
    setError('');

    try {
      console.log('LoginPage - Dispatching login action...');
      await dispatch(login(formData)).unwrap();
      console.log('LoginPage - Login successful, navigating to home');
      toast.success('Login successful!');
      navigate('/home');
    } catch (error: any) {
      console.error('LoginPage - Login error:', error);
      setError(error || 'Login failed');
      toast.error(error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <MainWebsiteButton
        href="https://samparkjyoti.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        title="Visit Main Website"
      >
        Main Website
      </MainWebsiteButton>
      <LoginCard>
        <Logo>
          <LogoTitle>Sampark Jyoti</LogoTitle>
          <LogoSubtitle>Connect • Grow • Prosper</LogoSubtitle>
        </Logo>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputIcon>
              <FontAwesomeIcon icon={faUser} />
            </InputIcon>
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <FontAwesomeIcon icon={faLock} />
            </InputIcon>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </PasswordToggle>
          </InputGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>

          <Divider>
            <span>Don't have an account?</span>
          </Divider>

          <RegisterLink to="/register">
            Create a new account
          </RegisterLink>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;



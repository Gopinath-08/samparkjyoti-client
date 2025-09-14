import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #1565C0;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const ProfileCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Title>Profile</Title>
      <ProfileCard>
        <h2>User Profile</h2>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Phone:</strong> {user?.phone}</p>
        <p><strong>Location:</strong> {user?.location || 'Not set'}</p>
        <p><strong>Account Type:</strong> {user?.isAgent ? 'Agent' : 'Regular User'}</p>
      </ProfileCard>
    </Container>
  );
};

export default ProfilePage;



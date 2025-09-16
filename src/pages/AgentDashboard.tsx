import React from 'react';
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

const ComingSoon = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const AgentDashboard: React.FC = () => {
  return (
    <Container>
      <Title>Agent Dashboard</Title>
      <ComingSoon>
        <h2>Coming Soon</h2>
        <p>Agent dashboard functionality will be available soon!</p>
      </ComingSoon>
    </Container>
  );
};

export default AgentDashboard;







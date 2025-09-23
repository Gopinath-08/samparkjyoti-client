import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck,
  faMapMarkerAlt,
  faStar,
  faCube,
  faCashRegister,
  faLocationDot,
  faSearch,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #E3F2FD;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1565C0;
  margin: 0 0 1rem 0;
`;

const SearchContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #E3F2FD;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #1976D2;
  }
`;

const FilterButton = styled.button`
  background: #1976D2;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #1565C0;
  }
`;

const ProviderList = styled.div`
  display: grid;
  gap: 1rem;
`;

const ProviderCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid #E3F2FD;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ProviderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
`;

const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background: #E3F2FD;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1976D2;
`;

const ProviderName = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #1565C0;
  margin: 0;
`;

const RatingBadge = styled.div`
  display: flex;
  align-items: center;
  background: #FFF8E1;
  border: 1px solid #FFE082;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  gap: 0.25rem;
`;

const RatingText = styled.span`
  font-size: 0.75rem;
  color: #8D6E63;
  font-weight: 700;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #333;
  font-size: 0.75rem;
  font-weight: 500;
`;

const BookButton = styled.button`
  background: #1976D2;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.75rem;
  transition: all 0.3s ease;

  &:hover {
    background: #1565C0;
  }
`;

const LogisticsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Transportation providers data (matching React Native app)
  const providers = [
    { 
      name: 'Shakti Transport', 
      service: 'Pickup Truck', 
      coverage: 'Within 100 km', 
      price: '₹20/km', 
      location: 'Balangir', 
      rating: '4.4' 
    },
    { 
      name: 'Maa Durga Logistics', 
      service: 'Mini Tempo', 
      coverage: 'Within 60 km', 
      price: '₹18/km', 
      location: 'Boudh', 
      rating: '4.1' 
    },
    { 
      name: 'Odisha Freight', 
      service: '10T Truck', 
      coverage: 'Statewide', 
      price: '₹32/km', 
      location: 'Burla', 
      rating: '4.3' 
    },
    { 
      name: 'FastMove Carriers', 
      service: '3T Lorry', 
      coverage: 'Within 150 km', 
      price: '₹25/km', 
      location: 'Jharsuguda', 
      rating: '4.2' 
    },
  ];

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookProvider = (providerName: string) => {
    alert(`Booking request sent to ${providerName}. They will contact you soon!`);
  };

  return (
    <Container>
      <Header>
        <Title>Logistics & Transport</Title>
      </Header>

      <SearchContainer>
        <FontAwesomeIcon icon={faSearch} color="#666" />
        <SearchInput
          type="text"
          placeholder="Search transportation providers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterButton>
          <FontAwesomeIcon icon={faFilter} />
          Filter
        </FilterButton>
      </SearchContainer>

      <ProviderList>
        {filteredProviders.map((provider) => (
          <ProviderCard key={provider.name}>
            <CardHeader>
              <ProviderInfo>
                <Avatar>
                  <FontAwesomeIcon icon={faTruck} size="sm" />
                </Avatar>
                <ProviderName>{provider.name}</ProviderName>
              </ProviderInfo>
              <RatingBadge>
                <FontAwesomeIcon icon={faStar} size="xs" color="#FFC107" />
                <RatingText>{provider.rating}</RatingText>
              </RatingBadge>
            </CardHeader>
            
            <MetaRow>
              <MetaItem>
                <FontAwesomeIcon icon={faCube} size="xs" color="#1976D2" />
                <span>{provider.service}</span>
              </MetaItem>
              <MetaItem>
                <FontAwesomeIcon icon={faMapMarkerAlt} size="xs" color="#1976D2" />
                <span>{provider.coverage}</span>
              </MetaItem>
              <MetaItem>
                <FontAwesomeIcon icon={faCashRegister} size="xs" color="#1976D2" />
                <span>{provider.price}</span>
              </MetaItem>
              <MetaItem>
                <FontAwesomeIcon icon={faLocationDot} size="xs" color="#1976D2" />
                <span>{provider.location}</span>
              </MetaItem>
            </MetaRow>

            <BookButton onClick={() => handleBookProvider(provider.name)}>
              Book Now
            </BookButton>
          </ProviderCard>
        ))}
      </ProviderList>
    </Container>
  );
};

export default LogisticsPage;

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faMapMarkerAlt,
  faFilter,
  faChartLine,
  faClock
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

const OdiaSlogan = styled.div`
  color: #1976D2;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0.5rem 0;
  font-family: 'Noto Sans Oriya', sans-serif;
  text-align: center;
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

const CategoryChips = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const CategoryChip = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.active ? '#1976D2' : '#E3F2FD'};
  background: ${props => props.active ? '#E3F2FD' : 'white'};
  color: ${props => props.active ? '#1976D2' : '#666'};
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    border-color: #1976D2;
    background: #E3F2FD;
    color: #1976D2;
  }
`;

const PricesList = styled.div`
  display: grid;
  gap: 1rem;
`;

const PriceCard = styled.div`
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

const PriceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1565C0;
  margin: 0;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #4CAF50;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.8rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const MarketPricesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Demo market prices data
  const marketPrices = [
    {
      id: 1,
      product: 'Rice (Basmati)',
      price: '₹45/kg',
      location: 'Bhubaneswar',
      category: 'grains',
      lastUpdated: '2 hours ago',
      trend: 'up'
    },
    {
      id: 2,
      product: 'Wheat',
      price: '₹28/kg',
      location: 'Cuttack',
      category: 'grains',
      lastUpdated: '1 hour ago',
      trend: 'stable'
    },
    {
      id: 3,
      product: 'Tomato',
      price: '₹35/kg',
      location: 'Puri',
      category: 'vegetables',
      lastUpdated: '30 mins ago',
      trend: 'down'
    },
    {
      id: 4,
      product: 'Onion',
      price: '₹25/kg',
      location: 'Berhampur',
      category: 'vegetables',
      lastUpdated: '1 hour ago',
      trend: 'up'
    },
    {
      id: 5,
      product: 'Potato',
      price: '₹20/kg',
      location: 'Rourkela',
      category: 'vegetables',
      lastUpdated: '45 mins ago',
      trend: 'stable'
    },
    {
      id: 6,
      product: 'Lentils (Dal)',
      price: '₹85/kg',
      location: 'Sambalpur',
      category: 'pulses',
      lastUpdated: '1 hour ago',
      trend: 'up'
    }
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'grains', name: 'Grains' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'pulses', name: 'Pulses' },
    { id: 'fruits', name: 'Fruits' }
  ];

  const filteredPrices = marketPrices.filter(price => {
    const matchesSearch = price.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         price.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || price.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container>
      <Header>
        <Title>Market Prices</Title>
        <OdiaSlogan>ସମ୍ପର୍କ ଜ୍ୟୋତି ଆପଣଙ୍କ ସେବାରେ</OdiaSlogan>
      </Header>

      <SearchContainer>
        <FontAwesomeIcon icon={faSearch} color="#666" />
        <SearchInput
          type="text"
          placeholder="Search products or locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterButton>
          <FontAwesomeIcon icon={faFilter} />
          Filter
        </FilterButton>
      </SearchContainer>

      <CategoryChips>
        {categories.map((category) => (
          <CategoryChip
            key={category.id}
            active={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </CategoryChip>
        ))}
      </CategoryChips>

      <PricesList>
        {filteredPrices.map((price) => (
          <PriceCard key={price.id}>
            <PriceHeader>
              <ProductName>{price.product}</ProductName>
              <Price>{price.price}</Price>
            </PriceHeader>
            <Location>
              <FontAwesomeIcon icon={faMapMarkerAlt} size="sm" color="#666" />
              <span>{price.location}</span>
            </Location>
            <MetaRow>
              <MetaItem>
                <FontAwesomeIcon icon={faClock} size="sm" color="#666" />
                <span>{price.lastUpdated}</span>
              </MetaItem>
              <MetaItem>
                <FontAwesomeIcon 
                  icon={faChartLine} 
                  size="sm" 
                  color={price.trend === 'up' ? '#4CAF50' : price.trend === 'down' ? '#F44336' : '#FF9800'} 
                />
                <span>{price.trend}</span>
              </MetaItem>
            </MetaRow>
          </PriceCard>
        ))}
      </PricesList>
    </Container>
  );
};

export default MarketPricesPage;




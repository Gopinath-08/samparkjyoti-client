import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchProducts, fetchLocationRecommendations, clearLocationFilter } from '../store/slices/productsSlice';
import { useAuth } from '../contexts/AuthContext';
import { getPageSlogan } from '../utils/slogans';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faMapMarkerAlt,
  faStar,
  faShoppingCart,
  faFilter,
  faLeaf,
  faWeight,
  faCalendar,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  location: string;
  district: string;
  state: string;
  pincode: string;
  farmer: {
    name: string;
    phone: string;
    email: string;
    organization?: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  available: number;
  harvestDate: string;
  rating: number;
  reviews: number;
  images: string[];
  features: string[];
  postedAt: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  locationMatch?: boolean;
  locationScore?: number;
  normalizedLocation?: string;
}

const Container = styled.div`
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
  color: #4CAF50;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
`;

const OdiaTitle = styled.div`
  color: #4CAF50;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0.5rem 0 0 0;
  font-family: 'Noto Sans Oriya', sans-serif;
`;

const EnglishSubtitle = styled.div`
  color: #6b7280;
  font-size: 1rem;
  margin: 0.5rem 0;
  font-style: italic;
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
    border-color: #4CAF50;
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
    border-color: #4CAF50;
  }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ProductCard = styled.div`
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

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ProductName = styled.h3`
  color: #4CAF50;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

const ProductCategory = styled.span`
  background: #E8F5E8;
  color: #4CAF50;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const ProductImage = styled.div`
  width: 100%;
  height: 120px;
  background: linear-gradient(135deg, #E8F5E8, #C8E6C9);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ProductMeta = styled.div`
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

const ProductDescription = styled.p`
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const ProductPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Price = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #4CAF50;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #fbbf24;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  background: #4CAF50;
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
    background: #45a049;
  }
`;

const SecondaryButton = styled.button`
  background: white;
  color: #4CAF50;
  border: 2px solid #4CAF50;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #4CAF50;
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
  color: #4CAF50;
  margin-bottom: 0.5rem;
`;

const EmptyDescription = styled.p`
  margin-bottom: 1rem;
`;

const LocationIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%);
  color: #2E7D32;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  border-left: 4px solid #4CAF50;
`;

const MarketPage: React.FC = () => {
  console.log('🏪 MarketPage component mounting...');

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const pageSlogan = getPageSlogan('market');
  const { products, loading, error, locationFiltered, userLocation, totalMatches } = useSelector((state: RootState) => state.products);

  console.log('🏪 MarketPage render - user:', user);
  console.log('🏪 MarketPage render - user?.location:', user?.location);
  console.log('🏪 MarketPage render - user?.roles:', user?.roles);
  console.log('🏪 MarketPage render - user?.primaryRole:', user?.primaryRole);
  console.log('🏪 MarketPage render - products state:', { products, loading, error, locationFiltered, userLocation, totalMatches });

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: '',
    priceMin: '',
    priceMax: ''
  });

  // Debug useEffect to track component mounting
  useEffect(() => {
    console.log('🔄 MarketPage component mounted/updated');
  });

  useEffect(() => {
    console.log('🔄 MarketPage useEffect triggered - user:', user);
    console.log('🔄 MarketPage useEffect triggered - user?.location:', user?.location);
    console.log('🔄 MarketPage useEffect triggered - user roles:', user?.roles);
    console.log('🔄 MarketPage useEffect triggered - user primaryRole:', user?.primaryRole);

    // Use location-based fetching if user has a location
    if (user?.location) {
      console.log('🔄 MarketPage: User has location, dispatching fetchLocationRecommendations:', user.location);
      dispatch(fetchLocationRecommendations({ userLocation: user.location, limit: 50 }));
    } else {
      console.log('🔄 MarketPage: User has no location, dispatching fetchProducts');
      dispatch(fetchProducts());
    }
  }, [dispatch, user]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredProducts = products.filter((product: Product) => {
    const matchesSearch = filters.search === '' ||
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.location.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCategory = filters.category === '' || product.category === filters.category;

    // If location-based matching is active, skip location filter to avoid conflicts
    // The location matching already filtered products by location
    const matchesLocation = locationFiltered ? true : (filters.location === '' || product.location.toLowerCase().includes(filters.location.toLowerCase()));

    const price = product.price;
    const matchesPriceMin = filters.priceMin === '' || price >= parseFloat(filters.priceMin);
    const matchesPriceMax = filters.priceMax === '' || price <= parseFloat(filters.priceMax);

    const matches = matchesSearch && matchesCategory && matchesLocation && matchesPriceMin && matchesPriceMax;

    console.log(`🔍 Product "${product.name}" filter check:`, {
      product: { name: product.name, category: product.category, location: product.location, price: product.price },
      filters,
      locationFiltered,
      matches: { matchesSearch, matchesCategory, matchesLocation, matchesPriceMin, matchesPriceMax },
      finalMatch: matches
    });

    return matches;
  });

  console.log('📋 MarketPage: Filtered products result:', {
    totalProducts: products.length,
    filteredProducts: filteredProducts.length,
    filters,
    products: products.map((p: Product) => ({ name: p.name, location: p.location, price: p.price }))
  });

  const categories = ['vegetables', 'fruits', 'grains', 'dairy', 'spices', 'other'];

  const handlePurchase = (productId: string) => {
    toast.success('Purchase functionality will be implemented soon!');
  };

  if (loading) {
    return (
      <Container>
        <LoadingMessage>Loading products...</LoadingMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>{pageSlogan.odia}</Title>
      </Header>

      <SearchSection>
        <SearchRow>
          <SearchGroup>
            <SearchIcon>
              <FontAwesomeIcon icon={faSearch} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search products by name, description, or location..."
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
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            disabled={locationFiltered}
            style={{
              opacity: locationFiltered ? 0.6 : 1,
              cursor: locationFiltered ? 'not-allowed' : 'pointer'
            }}
          >
            <option value="">
              {locationFiltered ? `Location: ${userLocation} (Auto-filtered)` : 'All Locations'}
            </option>
            <option value="sambalpur">Sambalpur</option>
            <option value="jharsuguda">Jharsuguda</option>
            <option value="bargarh">Bargarh</option>
            <option value="bolangir">Bolangir</option>
            <option value="sundargarh">Sundargarh</option>
          </Select>

          <Select
            value={filters.priceMin}
            onChange={(e) => handleFilterChange('priceMin', e.target.value)}
          >
            <option value="">Min Price</option>
            <option value="0">₹0</option>
            <option value="50">₹50</option>
            <option value="100">₹100</option>
            <option value="200">₹200</option>
            <option value="500">₹500</option>
          </Select>

          <Select
            value={filters.priceMax}
            onChange={(e) => handleFilterChange('priceMax', e.target.value)}
          >
            <option value="">Max Price</option>
            <option value="100">₹100</option>
            <option value="200">₹200</option>
            <option value="500">₹500</option>
            <option value="1000">₹1000</option>
            <option value="2000">₹2000+</option>
          </Select>
        </FilterRow>
      </SearchSection>

      {locationFiltered && userLocation && (
        <LocationIndicator>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span>
            Showing products near <strong>{userLocation}</strong>
            {totalMatches > 0 && ` • ${totalMatches} location matches found`}
          </span>
          <button
            onClick={() => {
              dispatch(fetchProducts());
              dispatch(clearLocationFilter());
            }}
            style={{
              marginLeft: '1rem',
              padding: '0.25rem 0.75rem',
              background: 'white',
              border: '1px solid #4CAF50',
              borderRadius: '4px',
              color: '#4CAF50',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            Show All Products
          </button>
        </LocationIndicator>
      )}

      {filteredProducts.length === 0 ? (
        <EmptyMessage>
          <EmptyTitle>No products found</EmptyTitle>
          <EmptyDescription>
            Try adjusting your search criteria or check back later for new products.
          </EmptyDescription>
        </EmptyMessage>
      ) : (
        <ProductsGrid>
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id}>
              <ProductHeader>
                <div>
                  <ProductName>{product.name}</ProductName>
                </div>
                <ProductCategory>{product.category}</ProductCategory>
              </ProductHeader>

              <ProductImage>
                {product.category === 'vegetables' && '🥬'}
                {product.category === 'fruits' && '🍎'}
                {product.category === 'grains' && '🌾'}
                {product.category === 'dairy' && '🥛'}
                {product.category === 'spices' && '🌶️'}
                {product.category === 'other' && '🌱'}
              </ProductImage>

              <ProductMeta>
                <MetaItem>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  {product.location}, {product.state}
                </MetaItem>
                <MetaItem>
                  <FontAwesomeIcon icon={faWeight} />
                  {product.available} {product.unit}
                </MetaItem>
                <MetaItem>
                  <FontAwesomeIcon icon={faCalendar} />
                  {product.harvestDate}
                </MetaItem>
              </ProductMeta>

              <ProductDescription>
                {product.description.length > 100
                  ? `${product.description.substring(0, 100)}...`
                  : product.description
                }
              </ProductDescription>

              <ProductPrice>
                <Price>₹{product.price}/{product.unit}</Price>
                <Rating>
                  <FontAwesomeIcon icon={faStar} />
                  {product.rating} ({product.reviews})
                </Rating>
              </ProductPrice>

              <ProductActions>
                <SecondaryButton>
                  <FontAwesomeIcon icon={faUser} /> Contact Farmer
                </SecondaryButton>
                <ActionButton onClick={() => handlePurchase(product.id)}>
                  <FontAwesomeIcon icon={faShoppingCart} /> Buy Now
                </ActionButton>
              </ProductActions>
            </ProductCard>
          ))}
        </ProductsGrid>
      )}
    </Container>
  );
};

export default MarketPage;


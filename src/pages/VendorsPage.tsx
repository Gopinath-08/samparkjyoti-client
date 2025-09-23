import React, { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStore, 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope, 
  faClock,
  faTag,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { vendorService, Vendor } from '../services/vendorService';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useAppSelector } from '../store/store';
import { hasRole } from '../utils/roleUtils';

const Container = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
`;

const Subtitle = styled.p`
  color: #718096;
  font-size: 1.125rem;
  margin: 0;
`;

const VendorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const VendorCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  border-left: 4px solid #667eea;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const VendorHeader = styled.div`
  margin-bottom: 1rem;
`;

const VendorName = styled.h3`
  color: #2d3748;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

const MarketName = styled.p`
  color: #4a5568;
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
`;

const Location = styled.p`
  color: #718096;
  font-size: 0.875rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const VendorDetails = styled.div`
  margin-bottom: 1rem;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-size: 0.875rem;
`;

const TradeProducts = styled.div`
  margin-bottom: 1rem;
`;

const TradeProductsLabel = styled.p`
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
`;

const ProductTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ProductTag = styled.span`
  background: #edf2f7;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #718096;
  font-size: 1.125rem;
  padding: 3rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
`;

const VendorsPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<string>('');

  // Check if user has farmer role
  const isFarmer = hasRole(user, 'farmer');

  const fetchVendors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await vendorService.getVendorsByLocation();
      setVendors(response.data.vendors);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVendorsByLocation = useCallback(async (location: string) => {
    try {
      setLoading(true);
      const response = await vendorService.getVendorsByLocation({ location });
      setVendors(response.data.vendors);
    } catch (error) {
      console.error('Error fetching vendors by location:', error);
      // Fallback to all vendors
      fetchVendors();
    } finally {
      setLoading(false);
    }
  }, [fetchVendors]);

  useEffect(() => {
    // Get user location from localStorage or prompt user
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setUserLocation(savedLocation);
      fetchVendorsByLocation(savedLocation);
    } else {
      // Prompt user for location
      const location = prompt('Please enter your location (e.g., Balangir, Odisha):');
      if (location) {
        setUserLocation(location);
        localStorage.setItem('userLocation', location);
        fetchVendorsByLocation(location);
      } else {
        fetchVendors(); // Fetch all vendors if no location provided
      }
    }
  }, [fetchVendorsByLocation, fetchVendors]);

  // Redirect non-farmers to home page
  if (!isFarmer) {
    return <Navigate to="/home" replace />;
  }

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Local Vendors</Title>
        <Subtitle>
          {userLocation 
            ? `Find vendors in ${userLocation} to sell your products`
            : 'Find vendors in your area to sell your products'
          }
        </Subtitle>
        {userLocation && (
          <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#667eea' }}>
            Showing vendors near: <strong>{userLocation}</strong>
          </div>
        )}
      </Header>

      {vendors.length === 0 ? (
        <EmptyState>
          <FontAwesomeIcon icon={faStore} size="3x" style={{ marginBottom: '1rem', opacity: 0.3 }} />
          <h3>No vendors found</h3>
          <p>No vendors are currently available in your area.</p>
        </EmptyState>
      ) : (
        <VendorsGrid>
          {vendors.map((vendor: Vendor) => (
            <VendorCard key={vendor._id}>
              <VendorHeader>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <VendorName>{vendor.vendorName}</VendorName>
                    <MarketName>{vendor.marketName}</MarketName>
                  </div>
                  {vendor.isVerified && (
                    <span style={{ 
                      background: '#10b981', 
                      color: 'white', 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      ✓ Verified
                    </span>
                  )}
                </div>
                <Location>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  {vendor.marketLocation}, {vendor.district}, {vendor.state}
                </Location>
              </VendorHeader>

              <VendorDetails>
                <DetailRow>
                  <FontAwesomeIcon icon={faUser} />
                  {vendor.contactPerson}
                </DetailRow>
                <DetailRow>
                  <FontAwesomeIcon icon={faPhone} />
                  {vendor.phone}
                </DetailRow>
                {vendor.email && (
                  <DetailRow>
                    <FontAwesomeIcon icon={faEnvelope} />
                    {vendor.email}
                  </DetailRow>
                )}
                <DetailRow>
                  <FontAwesomeIcon icon={faClock} />
                  {vendor.operatingHours.start} - {vendor.operatingHours.end}
                </DetailRow>
                <DetailRow>
                  <FontAwesomeIcon icon={faTag} />
                  {vendor.businessType.charAt(0).toUpperCase() + vendor.businessType.slice(1)}
                </DetailRow>
              </VendorDetails>

              <TradeProducts>
                <TradeProductsLabel>Buying Products:</TradeProductsLabel>
                <ProductTags>
                  {vendor.tradeProducts.map((product: string, index: number) => (
                    <ProductTag key={index}>{product}</ProductTag>
                  ))}
                </ProductTags>
              </TradeProducts>
            </VendorCard>
          ))}
        </VendorsGrid>
      )}
    </Container>
  );
};

export default VendorsPage;
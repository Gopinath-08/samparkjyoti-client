import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { vendorService, Vendor } from '../services/vendorService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../store/store';
import { hasRole } from '../utils/roleUtils';
import {
  faArrowLeft,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faClock,
  faStore,
  faTag,
  faBuilding,
  faUser,
  faCalendar
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 2rem;

  &:hover {
    background: #edf2f7;
    border-color: #cbd5e0;
  }
`;

const VendorCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #4CAF50;
`;

const VendorHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

const VendorName = styled.h1`
  color: #2d3748;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

const MarketName = styled.h2`
  color: #4a5568;
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0 0 1rem 0;
`;


const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const DetailSection = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
`;

const SectionTitle = styled.h3`
  color: #2d3748;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #4a5568;
  font-size: 0.95rem;
`;

const TradeProducts = styled.div`
  margin-top: 1rem;
`;

const ProductTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ProductTag = styled.span`
  background: #e2e8f0;
  color: #4a5568;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const ContactSection = styled.div`
  background: #4CAF50;
  color: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  margin-top: 2rem;
`;

const ContactTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

const ContactButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ContactButton = styled.button`
  background: white;
  color: #4CAF50;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 150px;
  justify-content: center;

  &:hover {
    background: #f7fafc;
    transform: translateY(-2px);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  font-size: 1.125rem;
  color: #718096;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: #e53e3e;
`;

const VendorDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user has farmer role
  const isFarmer = hasRole(user, 'farmer');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchVendorDetails(id);
    }
  }, [id]);

  const fetchVendorDetails = async (vendorId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await vendorService.getVendorById(vendorId);
      setVendor(response.data?.vendor);
    } catch (error) {
      console.error('Error fetching vendor details:', error);
      setError('Failed to load vendor details');
      toast.error('Failed to load vendor details');
    } finally {
      setLoading(false);
    }
  };

  const handleCallVendor = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleEmailVendor = (email: string) => {
    window.open(`mailto:${email}`);
  };

  const handleBack = () => {
    navigate('/vendors');
  };

  // Redirect non-farmers to home page
  if (!isFarmer) {
    return <Navigate to="/home" replace />;
  }

  if (loading) {
    return (
      <LoadingContainer>
        <div>Loading vendor details...</div>
      </LoadingContainer>
    );
  }

  if (error || !vendor) {
    return (
      <Container>
        <BackButton onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Vendors
        </BackButton>
        <ErrorContainer>
          <h2>Vendor not found</h2>
          <p>The vendor you're looking for doesn't exist or has been removed.</p>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton onClick={handleBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Vendors
      </BackButton>

      <VendorCard>
        <VendorHeader>
          <VendorName>
            <FontAwesomeIcon icon={faStore} />
            {vendor.vendorName}
          </VendorName>
          <MarketName>{vendor.marketName}</MarketName>
        </VendorHeader>

        <DetailsGrid>
          <DetailSection>
            <SectionTitle>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              Location Details
            </SectionTitle>
            <DetailRow>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              {vendor.marketLocation}, {vendor.district}, {vendor.state}
            </DetailRow>
            {vendor.pincode && (
              <DetailRow>
                <FontAwesomeIcon icon={faTag} />
                Pincode: {vendor.pincode}
              </DetailRow>
            )}
            <DetailRow>
              <FontAwesomeIcon icon={faUser} />
              Contact Person: {vendor.contactPerson}
            </DetailRow>
          </DetailSection>

          <DetailSection>
            <SectionTitle>
              <FontAwesomeIcon icon={faClock} />
              Business Hours
            </SectionTitle>
            <DetailRow>
              <FontAwesomeIcon icon={faClock} />
              {vendor.operatingHours.start} - {vendor.operatingHours.end}
            </DetailRow>
            <DetailRow>
              <FontAwesomeIcon icon={faCalendar} />
              Operating Days: {vendor.operatingDays.join(', ')}
            </DetailRow>
            <DetailRow>
              <FontAwesomeIcon icon={faBuilding} />
              Business Type: {vendor.businessType.charAt(0).toUpperCase() + vendor.businessType.slice(1)}
            </DetailRow>
          </DetailSection>
        </DetailsGrid>

        <DetailSection>
          <SectionTitle>
            <FontAwesomeIcon icon={faTag} />
            Trade Products
          </SectionTitle>
          <TradeProducts>
            <ProductTags>
              {vendor.tradeProducts.map((product: string, index: number) => (
                <ProductTag key={index}>{product}</ProductTag>
              ))}
            </ProductTags>
          </TradeProducts>
        </DetailSection>

        {vendor.description && (
          <DetailSection>
            <SectionTitle>
              <FontAwesomeIcon icon={faStore} />
              About
            </SectionTitle>
            <p style={{ color: '#4a5568', lineHeight: '1.6', margin: 0 }}>
              {vendor.description}
            </p>
          </DetailSection>
        )}


        <ContactSection>
          <ContactTitle>Contact This Vendor</ContactTitle>
          <ContactButtons>
            <ContactButton onClick={() => handleCallVendor(vendor.phone)}>
              <FontAwesomeIcon icon={faPhone} />
              Call Now
            </ContactButton>
            {vendor.email && (
              <ContactButton onClick={() => handleEmailVendor(vendor.email!)}>
                <FontAwesomeIcon icon={faEnvelope} />
                Send Email
              </ContactButton>
            )}
          </ContactButtons>
        </ContactSection>
      </VendorCard>
    </Container>
  );
};

export default VendorDetailsPage;

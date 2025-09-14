import React, { useState } from 'react';
import { productService } from '../services/productService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faMapMarkerAlt, faRupeeSign, faWeight, faCalendar, faUser, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #1565C0;
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
  color: #4CAF50;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #E8F5E8;
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
    border-color: #4CAF50;
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
    border-color: #4CAF50;
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
    border-color: #4CAF50;
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
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
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
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ProductPostingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    unit: 'kg',
    location: '',
    district: '',
    state: '',
    pincode: '',
    available: '',
    harvestDate: '',
    features: '',
    farmerName: '',
    farmerPhone: '',
    farmerEmail: '',
    farmerOrganization: '',
  });

  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'grains', label: 'Grains' },
    { value: 'dairy', label: 'Dairy & Honey' },
    { value: 'spices', label: 'Spices' },
    { value: 'other', label: 'Other' }
  ];

  const units = [
    { value: 'kg', label: 'Kilogram (kg)' },
    { value: 'g', label: 'Gram (g)' },
    { value: 'liter', label: 'Liter' },
    { value: 'piece', label: 'Piece' },
    { value: 'dozen', label: 'Dozen' },
    { value: 'quintal', label: 'Quintal' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.category || 
        !formData.price || !formData.location || !formData.district || 
        !formData.state || !formData.farmerName || !formData.farmerPhone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        unit: formData.unit,
        location: formData.location,
        district: formData.district,
        state: formData.state,
        pincode: formData.pincode,
        available: parseFloat(formData.available) || 1,
        harvestDate: formData.harvestDate,
        features: formData.features.split(',').map(feature => feature.trim()).filter(feature => feature),
      };

      await productService.postProduct(productData);
      toast.success('Product posted successfully!');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        unit: 'kg',
        location: '',
        district: '',
        state: '',
        pincode: '',
        available: '',
        harvestDate: '',
        features: '',
        farmerName: '',
        farmerPhone: '',
        farmerEmail: '',
        farmerOrganization: '',
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to post product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Sell Your Agricultural Product</Title>
      
      <Form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Product Details</SectionTitle>
          <FormGrid>
            <InputGroup>
              <Label>Product Name <Required>*</Required></Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Fresh Organic Tomatoes"
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Category <Required>*</Required></Label>
              <Select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </FormGrid>

          <InputGroup>
            <Label>Product Description <Required>*</Required></Label>
            <TextArea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your product, its quality, freshness, and any special features..."
              required
            />
          </InputGroup>

          <FormGrid>
            <InputGroup>
              <Label>Price <Required>*</Required></Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="Enter price per unit"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Unit <Required>*</Required></Label>
              <Select
                value={formData.unit}
                onChange={(e) => handleInputChange('unit', e.target.value)}
                required
              >
                {units.map(unit => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </FormGrid>

          <FormGrid>
            <InputGroup>
              <Label>Available Quantity</Label>
              <Input
                type="number"
                value={formData.available}
                onChange={(e) => handleInputChange('available', e.target.value)}
                placeholder="How much is available?"
              />
            </InputGroup>

            <InputGroup>
              <Label>Harvest Date</Label>
              <Input
                type="date"
                value={formData.harvestDate}
                onChange={(e) => handleInputChange('harvestDate', e.target.value)}
              />
            </InputGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>Location</SectionTitle>
          <FormGrid>
            <InputGroup>
              <Label>Location <Required>*</Required></Label>
              <Input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City or Village"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>District <Required>*</Required></Label>
              <Input
                type="text"
                value={formData.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
                placeholder="District"
                required
              />
            </InputGroup>
          </FormGrid>

          <FormGrid>
            <InputGroup>
              <Label>State <Required>*</Required></Label>
              <Input
                type="text"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="State"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Pincode</Label>
              <Input
                type="text"
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                placeholder="Pincode"
              />
            </InputGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>Farmer Information</SectionTitle>
          <FormGrid>
            <InputGroup>
              <Label>Farmer Name <Required>*</Required></Label>
              <Input
                type="text"
                value={formData.farmerName}
                onChange={(e) => handleInputChange('farmerName', e.target.value)}
                placeholder="Your name"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Phone Number <Required>*</Required></Label>
              <Input
                type="tel"
                value={formData.farmerPhone}
                onChange={(e) => handleInputChange('farmerPhone', e.target.value)}
                placeholder="Phone number"
                required
              />
            </InputGroup>
          </FormGrid>

          <FormGrid>
            <InputGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.farmerEmail}
                onChange={(e) => handleInputChange('farmerEmail', e.target.value)}
                placeholder="Email address"
              />
            </InputGroup>

            <InputGroup>
              <Label>Farm/Organization Name</Label>
              <Input
                type="text"
                value={formData.farmerOrganization}
                onChange={(e) => handleInputChange('farmerOrganization', e.target.value)}
                placeholder="Farm or organization name"
              />
            </InputGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>Product Features</SectionTitle>
          <InputGroup>
            <Label>Special Features</Label>
            <Input
              type="text"
              value={formData.features}
              onChange={(e) => handleInputChange('features', e.target.value)}
              placeholder="e.g., Organic, Fresh, No Pesticides, High Quality (separate with commas)"
            />
          </InputGroup>
        </FormSection>

        <Button type="submit" disabled={loading}>
          {loading ? 'Posting Product...' : 'Post Product'}
        </Button>
      </Form>
    </Container>
  );
};

export default ProductPostingPage;


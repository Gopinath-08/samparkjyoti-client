import api from './api';

export interface Vendor {
  _id: string;
  vendorName: string;
  marketName: string;
  marketLocation: string;
  district: string;
  state: string;
  pincode?: string;
  contactPerson: string;
  phone: string;
  email?: string;
  address?: string;
  tradeProducts: string[];
  tradeCategories: string[];
  businessType: 'wholesale' | 'retail' | 'both';
  operatingDays: string[];
  operatingHours: {
    start: string;
    end: string;
  };
  status: 'active' | 'inactive' | 'suspended';
  isVerified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
  description?: string;
  specializations: string[];
  paymentMethods: string[];
  createdAt: string;
  updatedAt: string;
  // Computed fields for display
  operatingDaysDisplay?: string;
  tradeProductsDisplay?: string;
  fullAddress?: string;
}

export interface VendorFilters {
  location?: string;
  district?: string;
  state?: string;
  tradeProduct?: string;
  limit?: number;
  page?: number;
}

export const vendorService = {
  async getVendorsByLocation(filters?: VendorFilters) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }
    
    const response = await api.get(`/vendors?${params.toString()}`);
    return response.data;
  },

  async getVendorById(id: string) {
    const response = await api.get(`/vendors/${id}`);
    return response.data;
  }
};

export default vendorService;
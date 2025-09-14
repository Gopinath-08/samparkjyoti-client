import api from './api';

export interface ProductPostingData {
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  location: string;
  district: string;
  state: string;
  pincode: string;
  available: number;
  harvestDate: string;
  features: string[];
  images?: string[];
}

export const productService = {
  async getProducts(filters?: {
    category?: string;
    location?: string;
    priceMin?: number;
    priceMax?: number;
    search?: string;
  }) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }
    const response = await api.get(`/products?${params.toString()}`);
    return response;
  },

  async getProductById(id: string) {
    const response = await api.get(`/products/${id}`);
    return response;
  },

  async postProduct(productData: ProductPostingData) {
    const response = await api.post('/products', productData);
    return response;
  },

  async purchaseProduct(productId: string, quantity: number = 1) {
    const response = await api.post(`/products/${productId}/purchase`, { quantity });
    return response;
  },

  async getMyProducts() {
    const response = await api.get('/products/my-products');
    return response;
  },

  async updateProduct(productId: string, productData: Partial<ProductPostingData>) {
    const response = await api.put(`/products/${productId}`, productData);
    return response;
  },

  async deleteProduct(productId: string) {
    const response = await api.delete(`/products/${productId}`);
    return response;
  },

  async getMarketPrices() {
    const response = await api.get('/market-prices');
    return response;
  },
};

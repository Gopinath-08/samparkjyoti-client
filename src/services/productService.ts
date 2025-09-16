import api from './api';
import { normalizeLocation, locationsMatch, filterProductsByLocation } from '../utils/locationMatcher';

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
  farmerName: string;
  farmerPhone: string;
  farmerEmail?: string;
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
    console.log('🔄 productService.getProducts called with filters:', filters);
    const response = await api.get(`/products?${params.toString()}`);
    console.log('📊 productService.getProducts response:', response.data);
    return response;
  },

  async getProductsForUser(userLocation?: string, filters?: {
    category?: string;
    priceMin?: number;
    priceMax?: number;
    search?: string;
    limit?: number;
  }) {
    const response = await this.getProducts(filters);
    const products = response.data?.data?.products || response.data?.products || [];

    // Map _id to id for frontend compatibility and handle MongoDB extended JSON
    const productsWithId = products.map((product: any) => ({
      ...product,
      id: product._id?.$oid || product._id || product.id,
      price: product.pricePerUnit?.$numberInt || product.pricePerUnit || product.price,
      available: product.availableQuantity?.$numberInt || product.availableQuantity || product.quantity || product.available
    }));

    if (userLocation) {
      const filteredProducts = filterProductsByLocation(productsWithId, userLocation);
      return {
        ...response,
        data: {
          ...response.data,
          products: filteredProducts,
          locationFiltered: true,
          userLocation: normalizeLocation(userLocation)
        }
      };
    }
    return {
      ...response,
      data: {
        ...response.data,
        products: productsWithId
      }
    };
  },

  async getLocationBasedRecommendations(userLocation: string, limit: number = 20) {
    console.log('🔄 productService.getLocationBasedRecommendations called with:', { userLocation, limit });
    
    const response = await this.getProducts();
    console.log('📊 Full API response:', response.data);
    const products = response.data?.data?.products || [];
    
    console.log('📊 Raw products from API:', products);

    // Map _id to id for frontend compatibility and handle MongoDB extended JSON
    const productsWithId = products.map((product: any) => ({
      ...product,
      id: product._id?.$oid || product._id || product.id,
      price: product.pricePerUnit?.$numberInt || product.pricePerUnit || product.price,
      available: product.availableQuantity?.$numberInt || product.availableQuantity || product.quantity || product.available
    }));
    
    console.log('📦 Products with mapped IDs:', productsWithId);

    const filteredProducts = filterProductsByLocation(productsWithId, userLocation);
    
    console.log('🎯 Filtered products:', filteredProducts);
    
    return {
      ...response,
      data: {
        ...response.data,
        products: filteredProducts,
        locationFiltered: true,
        userLocation: normalizeLocation(userLocation),
        totalMatches: filteredProducts.length
      }
    };
  },

  async getProductById(id: string) {
    const response = await api.get(`/products/${id}`);
    return response;
  },

  async postProduct(productData: ProductPostingData) {
    // Map frontend field names to backend expected format
    const backendData = {
      productName: productData.name,
      category: productData.category,
      description: productData.description,
      quantity: productData.available,
      unit: productData.unit,
      pricePerUnit: productData.price,
      location: productData.location,
      district: productData.district,
      state: productData.state,
      pincode: productData.pincode,
      harvestDate: productData.harvestDate,
      farmer: {
        name: productData.farmerName,
        phone: productData.farmerPhone,
        email: productData.farmerEmail || "farmer@example.com"
      },
      // Optional fields
      subcategory: "",
      minimumOrder: 1,
      quality: "good",
      condition: "fresh",
      organic: false,
      certification: [],
      urgency: "medium",
      storageCondition: "room temperature",
      packaging: "standard",
      deliveryOptions: ["pickup"],
      deliveryRadius: 50,
      images: productData.images || []
    };
    
    const response = await api.post('/products', backendData);
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

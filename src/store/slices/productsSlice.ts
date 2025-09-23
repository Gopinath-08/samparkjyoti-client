import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../services/productService';

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

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  locationFiltered: boolean;
  userLocation: string | null;
  totalMatches: number;
  stats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    underReview: number;
  };
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  locationFiltered: false,
  userLocation: null,
  totalMatches: 0,
  stats: {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    underReview: 0,
  },
};

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 fetchProducts thunk called');
      const response = await productService.getProducts();
      console.log('📊 fetchProducts response:', response.data);
      const products = response.data?.data?.products || [];
      console.log('📦 fetchProducts extracted products:', products);
      return products;
    } catch (error: any) {
      console.error('❌ fetchProducts error:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await productService.getProductById(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

export const purchaseProduct = createAsyncThunk(
  'products/purchaseProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await productService.purchaseProduct(productId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to purchase product');
    }
  }
);

export const fetchProductsForUser = createAsyncThunk(
  'products/fetchProductsForUser',
  async ({ userLocation, filters }: { userLocation?: string; filters?: any }, { rejectWithValue }) => {
    try {
      const response = await productService.getProductsForUser(userLocation, filters);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products for user');
    }
  }
);

export const fetchLocationRecommendations = createAsyncThunk(
  'products/fetchLocationRecommendations',
  async ({ userLocation, limit }: { userLocation: string; limit?: number }, { rejectWithValue }) => {
    try {
      const response = await productService.getLocationBasedRecommendations(userLocation, limit);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch location recommendations');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLocationFilter: (state, action) => {
      state.userLocation = action.payload;
      state.locationFiltered = true;
    },
    clearLocationFilter: (state) => {
      state.locationFiltered = false;
      state.userLocation = null;
      state.totalMatches = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        console.log('📊 fetchProducts.fulfilled - action.payload:', action.payload);
        // Map backend data structure to frontend expected structure
        const mappedProducts = (action.payload || []).map((product: any) => ({
          id: product._id?.$oid || product._id || product.id,
          name: product.productName || product.name,
          description: product.description,
          category: product.category,
          price: product.pricePerUnit?.$numberInt || product.pricePerUnit || product.price,
          unit: product.unit,
          location: product.location,
          district: product.district,
          state: product.state,
          pincode: product.pincode,
          farmer: product.farmer || {
            name: 'Unknown',
            phone: 'N/A',
            email: 'N/A'
          },
          status: product.status,
          available: product.availableQuantity?.$numberInt || product.availableQuantity || product.quantity || product.available,
          harvestDate: product.harvestDate || '',
          rating: product.rating || 0,
          reviews: product.reviews || 0,
          images: product.images || [],
          features: product.features || [],
          postedAt: product.postedAt?.$date?.$numberLong || product.postedAt || product.createdAt,
          expiresAt: product.expiresAt?.$date?.$numberLong || product.expiresAt || '',
          createdAt: product.createdAt?.$date?.$numberLong || product.createdAt || '',
          updatedAt: product.updatedAt?.$date?.$numberLong || product.updatedAt || ''
        }));
        
        console.log('📦 fetchProducts.fulfilled - mappedProducts:', mappedProducts);
        state.products = mappedProducts;
        state.stats = {
          total: mappedProducts.length,
          pending: mappedProducts.filter((product: Product) => product.status === 'pending').length,
          approved: mappedProducts.filter((product: Product) => product.status === 'approved').length,
          rejected: mappedProducts.filter((product: Product) => product.status === 'rejected').length,
          underReview: mappedProducts.filter((product: Product) => product.status === 'under_review').length,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        const existingIndex = state.products.findIndex(product => product.id === action.payload.id);
        if (existingIndex >= 0) {
          state.products[existingIndex] = action.payload;
        } else {
          state.products.push(action.payload);
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Purchase product
      .addCase(purchaseProduct.fulfilled, (state, action) => {
        const product = state.products.find(product => product.id === action.payload.productId);
        if (product) {
          product.available -= action.payload.quantity || 1;
        }
      })

      // Fetch products for user with location filtering
      .addCase(fetchProductsForUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsForUser.fulfilled, (state, action) => {
        state.loading = false;
        const { products, locationFiltered, userLocation } = action.payload;

        // Map _id to id for frontend compatibility and handle MongoDB extended JSON
        const productsWithId = products.map((product: any) => ({
          ...product,
          id: product._id?.$oid || product._id || product.id,
          price: product.pricePerUnit?.$numberInt || product.pricePerUnit || product.price,
          available: product.availableQuantity?.$numberInt || product.availableQuantity || product.quantity || product.available
        }));

        state.products = productsWithId;
        state.locationFiltered = locationFiltered || false;
        state.userLocation = userLocation || null;
        
        // Update stats
        state.stats = {
          total: productsWithId.length,
          pending: productsWithId.filter((product: any) => product.status === 'pending').length,
          approved: productsWithId.filter((product: any) => product.status === 'approved').length,
          rejected: productsWithId.filter((product: any) => product.status === 'rejected').length,
          underReview: productsWithId.filter((product: any) => product.status === 'under_review').length,
        };
      })
      .addCase(fetchProductsForUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch location-based recommendations
      .addCase(fetchLocationRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        console.log('📊 fetchLocationRecommendations.fulfilled payload:', action.payload);
        const { products, totalMatches, userLocation } = action.payload;

        // Map _id to id for frontend compatibility and handle MongoDB extended JSON
        const productsWithId = products.map((product: any) => ({
          ...product,
          id: product._id?.$oid || product._id || product.id,
          price: product.pricePerUnit?.$numberInt || product.pricePerUnit || product.price,
          available: product.availableQuantity?.$numberInt || product.availableQuantity || product.quantity || product.available
        }));

        console.log('📦 Mapped products:', productsWithId);
        state.products = productsWithId;
        state.locationFiltered = true;
        state.userLocation = userLocation;
        state.totalMatches = totalMatches;
        
        // Update stats
        state.stats = {
          total: productsWithId.length,
          pending: productsWithId.filter((product: any) => product.status === 'pending').length,
          approved: productsWithId.filter((product: any) => product.status === 'approved').length,
          rejected: productsWithId.filter((product: any) => product.status === 'rejected').length,
          underReview: productsWithId.filter((product: any) => product.status === 'under_review').length,
        };
      })
      .addCase(fetchLocationRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setLocationFilter, clearLocationFilter } = productsSlice.actions;
export default productsSlice.reducer;







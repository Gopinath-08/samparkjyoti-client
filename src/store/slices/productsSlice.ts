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
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
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
      const response = await productService.getProducts();
      return response.data?.products || [];
    } catch (error: any) {
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

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
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
        state.products = action.payload;
        state.stats = {
          total: action.payload.length,
          pending: action.payload.filter((product: Product) => product.status === 'pending').length,
          approved: action.payload.filter((product: Product) => product.status === 'approved').length,
          rejected: action.payload.filter((product: Product) => product.status === 'rejected').length,
          underReview: action.payload.filter((product: Product) => product.status === 'under_review').length,
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
      });
  },
});

export const { clearError } = productsSlice.actions;
export default productsSlice.reducer;



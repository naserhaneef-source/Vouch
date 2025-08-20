import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

export const productService = {
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  
  getProduct: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  createProduct: async (productData: any) => {
    const response = await api.post('/products', productData);
    return response.data;
  },
  
  getUserProducts: async () => {
    const response = await api.get('/products/user/my-products');
    return response.data;
  }
};

export const transactionService = {
  createTransaction: async (productId: string) => {
    const response = await api.post('/transactions', { productId });
    return response.data;
  },
  
  getUserTransactions: async () => {
    const response = await api.get('/transactions/my-transactions');
    return response.data;
  }
};

export default api;
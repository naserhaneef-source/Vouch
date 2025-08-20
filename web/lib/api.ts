import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },
  
  register: async (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string
  }) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me')
    return response.data
  }
}

export const productService = {
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params })
    return response.data
  },
  
  getProduct: async (id: string) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },
  
  createProduct: async (productData: any) => {
    const response = await api.post('/products', productData)
    return response.data
  },
  
  getUserProducts: async () => {
    const response = await api.get('/products/user/my-products')
    return response.data
  }
}

export const transactionService = {
  createTransaction: async (productId: string) => {
    const response = await api.post('/transactions', { productId })
    return response.data
  },
  
  getUserTransactions: async () => {
    const response = await api.get('/transactions/my-transactions')
    return response.data
  },
  
  getTransaction: async (id: string) => {
    const response = await api.get(`/transactions/${id}`)
    return response.data
  }
}

export default api
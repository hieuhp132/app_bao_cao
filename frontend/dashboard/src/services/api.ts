import axios from 'axios';
import { ApiResponse } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API methods
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post<ApiResponse<{ user: any; token: string }>>('/auth/login', credentials),
  register: (userData: { email: string; password: string; username: string }) =>
    api.post<ApiResponse<{ user: any; token: string }>>('/auth/register', userData),
  logout: () => api.post<ApiResponse<void>>('/auth/logout'),
};

export const userAPI = {
  getProfile: () => api.get<ApiResponse<any>>('/users/profile'),
  updateProfile: (data: any) => api.put<ApiResponse<any>>('/users/profile', data),
};

export const productAPI = {
  getAll: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get<ApiResponse<any>>('/products', { params }),
  getById: (id: string) => api.get<ApiResponse<any>>(`/products/${id}`),
  create: (data: any) => api.post<ApiResponse<any>>('/products', data),
  update: (id: string, data: any) => api.put<ApiResponse<any>>(`/products/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse<void>>(`/products/${id}`),
};

export const orderAPI = {
  getAll: (params?: { page?: number; limit?: number; status?: string }) =>
    api.get<ApiResponse<any>>('/orders', { params }),
  getById: (id: string) => api.get<ApiResponse<any>>(`/orders/${id}`),
  create: (data: any) => api.post<ApiResponse<any>>('/orders', data),
  update: (id: string, data: any) => api.put<ApiResponse<any>>(`/orders/${id}`, data),
};

export const supportAPI = {
  getAll: (params?: { page?: number; limit?: number; status?: string }) =>
    api.get<ApiResponse<any>>('/support', { params }),
  getById: (id: string) => api.get<ApiResponse<any>>(`/support/${id}`),
  create: (data: any) => api.post<ApiResponse<any>>('/support', data),
  update: (id: string, data: any) => api.put<ApiResponse<any>>(`/support/${id}`, data),
};

export default api; 
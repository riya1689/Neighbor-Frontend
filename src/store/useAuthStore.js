import { create } from 'zustand';
import Cookies from 'js-cookie';
import api from '@/lib/api';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/api/auth/login', credentials);
      const { token, user } = response.data;
      
      if (token) {
        Cookies.set('token', token, { expires: 7 });
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      
      set({ user, isAuthenticated: true, isLoading: false });
      return response;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Login failed Check your credentials.', isLoading: false });
      throw error;
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/api/auth/register', userData);
      const { token, user } = response.data;
      
      if (token) {
        Cookies.set('token', token, { expires: 7 });
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      
      set({ user, isAuthenticated: true, isLoading: false });
      return response;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Registration failed.', isLoading: false });
      throw error;
    }
  },

  logout: () => {
    Cookies.remove('token');
    delete api.defaults.headers.common['Authorization'];
    set({ user: null, isAuthenticated: false, error: null });
  },

  checkAuth: async () => {
    const token = Cookies.get('token');
    if (!token) {
      set({ isAuthenticated: false, isLoading: false, user: null });
      return;
    }

    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get('/api/users/me');
      set({ user: response.data?.user || response.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      Cookies.remove('token');
      delete api.defaults.headers.common['Authorization'];
      set({ isAuthenticated: false, isLoading: false, user: null });
    }
  },
  
  clearError: () => set({ error: null })
}));

export default useAuthStore;


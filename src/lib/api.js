import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to catch URL mismatches (double /api/)
api.interceptors.request.use((config) => {
  if (config.url && config.url.startsWith('/api/')) {
    config.url = config.url.replace('/api/', '/');
  }
  
  // Format the visual log slightly cleaner to prevent duplicate slashes
  const fullUrl = `${config.baseURL?.replace(/\/$/, '')}${config.url?.startsWith('/') ? '' : '/'}${config.url}`;
  console.log(`[Axios Request]: ${config.method.toUpperCase()} ${fullUrl}`);
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;


import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api', // Proxy will handle this or full URL if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`, config.data || config.params || '');
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging and error handling
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`[API Error] ${error.response.status} ${error.config.url}`, error.response.data);
    } else {
      console.error('[API Error] Network/Unknown', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;

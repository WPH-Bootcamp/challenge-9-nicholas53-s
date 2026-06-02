import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — inject API key ke setiap request
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  config.params = {
    ...config.params,
    api_key: apiKey,
  };
  return config;
});

// Response interceptor — handle error global
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error('Invalid API key');
    } else if (error.response?.status === 404) {
      console.error('Resource not found');
    }
    return Promise.reject(error);
  }
);

export default api;

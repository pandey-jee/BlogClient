import axios from 'axios';

// Backend API Configuration
// TODO: Replace this URL with your actual deployed backend URL
const PRODUCTION_API_URL = 'https://blog-server-uckw.onrender.com/api'; // ✅ NEW

const DEVELOPMENT_API_URL = 'http://localhost:3001/api';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? PRODUCTION_API_URL
  : DEVELOPMENT_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

// Posts API
export const postsAPI = {
  getAllPosts: () => api.get('/posts'),
  getPost: (id) => api.get(`/posts/${id}`),
  createPost: (postData) => api.post('/posts', postData),
  updatePost: (id, postData) => api.put(`/posts/${id}`, postData),
  deletePost: (id) => api.delete(`/posts/${id}`),
  searchPosts: (query) => api.get(`/posts/search/${query}`),
};

export default api;

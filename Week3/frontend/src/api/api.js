import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userAPI = {
  register: async (userData) => {
    const response = await api.post('/user/register', userData);
    return response.data;
  },
};

export default api;

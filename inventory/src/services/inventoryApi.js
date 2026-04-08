import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; 

const api = axios.create({
  baseURL: BASE_URL,
});

export const inventoryService = {
  getAll: () => api.get('/inventory'),

  getById: (id) => api.get(`/inventory/${id}`),

  create: (formData) => api.post('/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),

  updateText: (id, data) => api.put(`/inventory/${id}`, data),

  updatePhoto: (id, formData) => api.put(`/inventory/${id}/photo`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),

  delete: (id) => api.delete(`/inventory/${id}`),
};
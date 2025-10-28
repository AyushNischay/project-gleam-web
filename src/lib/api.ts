import axios from 'axios';

// Base URL for backend API. Prefer env var, fallback to running backend on 8081.
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8081';

export const api = axios.create({ baseURL: API_BASE_URL });

// Consistent token storage key
const TOKEN_KEY = 'authToken';

export function setAuthToken(token?: string) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    delete (api.defaults.headers.common as any)['Authorization'];
    localStorage.removeItem(TOKEN_KEY);
  }
}

// Get token from localStorage
const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Generic API call function (fetch-based) for places not using axios instance
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    (headers as any)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = 'API call failed';
    try {
      const error = await response.json();
      message = error.message || message;
    } catch {}
    throw new Error(message);
  }

  return response.json();
};

// Auth APIs
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Store token in localStorage consistently
    if ((response as any)?.token) {
      setAuthToken((response as any).token);
    }

    return response;
  },

  register: async (email: string, password: string, role: string) => {
    return apiCall('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
  },

  logout: () => {
    setAuthToken(undefined);
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
  },
};

// Student APIs
export const studentAPI = {
  getAll: async () => {
    return apiCall('/api/students');
  },

  getById: async (id: number) => {
    return apiCall(`/api/students/${id}`);
  },

  create: async (studentData: any) => {
    return apiCall('/api/students', {
      method: 'POST',
      body: JSON.stringify(studentData),
    });
  },

  update: async (id: number, studentData: any) => {
    return apiCall(`/api/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData),
    });
  },

  delete: async (id: number) => {
    return apiCall(`/api/students/${id}`, {
      method: 'DELETE',
    });
  },
};

// Study Material APIs
export const studyMaterialAPI = {
  getWeakSubjects: async (studentId: number) => {
    return apiCall(`/api/study-materials/weak-subjects/${studentId}`);
  },

  getRecommendations: async (studentId: number, subjectId?: number) => {
    const params = subjectId ? `?subjectId=${subjectId}` : '';
    return apiCall(`/api/study-materials/recommendations/${studentId}${params}`);
  },
};
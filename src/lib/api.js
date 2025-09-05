const API_BASE_URL = 'https://fakestoreapi.com';

export const api = {
  // Auth endpoints
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  },

  // Get user profile
  getUser: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user');
    }
  },

  // Get all users (for finding user by token)
  getUsers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch users');
    }
  }
};

// Helper function to get current user from localStorage
export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (token && user) {
    return JSON.parse(user);
  }
  
  return null;
};

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};
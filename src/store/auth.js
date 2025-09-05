import { api } from '../lib/api';

class AuthStore {
  constructor() {
    this.user = this.getStoredUser();
    this.token = this.getStoredToken();
    this.isAuthenticated = !!this.token;
    this.listeners = [];
  }

  getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getStoredToken() {
    return localStorage.getItem('token');
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  notify() {
    this.listeners.forEach(callback => callback(this.getState()));
  }

  getState() {
    return {
      user: this.user,
      token: this.token,
      isAuthenticated: this.isAuthenticated
    };
  }

  async login(username, password) {
    try {
      const response = await api.login({ username, password });
      
      if (response.token) {
        this.token = response.token;
        this.isAuthenticated = true;
        
        // Store token
        localStorage.setItem('token', response.token);
        
        // Get user details (using a mock user since Fake Store API doesn't return user details with login)
        const mockUser = {
          id: 1,
          username: username,
          name: { firstname: 'John', lastname: 'Doe' },
          email: 'john@gmail.com',
          phone: '1-570-236-7033'
        };
        
        this.user = mockUser;
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        this.notify();
        return { success: true, user: mockUser };
      }
      
      throw new Error('Login failed');
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  }

  logout() {
    this.user = null;
    this.token = null;
    this.isAuthenticated = false;
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    this.notify();
  }
}

export const authStore = new AuthStore();
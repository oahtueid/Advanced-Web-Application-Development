import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authAPI } from '../services/api';
import { tokenService } from '../services/tokenService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = () => {
      const refreshToken = tokenService.getRefreshToken();
      setIsAuthenticated(!!refreshToken);
      setIsLoading(false);
    };

    initAuth();
  }, []);

  
  // React Query mutation for registration
  const registerMutation = useMutation({
    mutationFn: authAPI.register,
    onSuccess: (data) => {
      console.log('Registration successful:', data);
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      tokenService.setAccessToken(data.accessToken);
      tokenService.setRefreshToken(data.refreshToken);
      setIsAuthenticated(true);
      navigate('/dashboard');
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      tokenService.clearTokens();
      setIsAuthenticated(false);
      queryClient.clear();
      navigate('/login');
    },
    onError: () => {
      // Even if API call fails, clear tokens locally
      tokenService.clearTokens();
      setIsAuthenticated(false);
      queryClient.clear();
      navigate('/login');
    },
  });

  const signup = (data) => {
    return registerMutation.mutate({
      email: data.email,
      password: data.password,
    });
}

  const login = (credentials) => {
    return loginMutation.mutateAsync(credentials);
  };

  const logout = () => {
    return logoutMutation.mutate();
  };

  const value = {
    isAuthenticated,
    isLoading,
    signup,
    login,
    logout,
    registerMutation,
    loginMutation,
    logoutMutation,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
